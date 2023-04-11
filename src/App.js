import React from 'react';
import './App.css';
import Dropzone from 'react-dropzone';
import Jimp from 'jimp';
import { Line } from 'rc-progress';
import { GifFrame, GifUtil, GifCodec } from 'gifwrap';
import { Buffer } from 'buffer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { images: [], previews: [], frames: 10, delay: 10, rainbow: false, progresses: [] };
    this.onDrop = this.onDrop.bind(this);

    document.onpaste = (pasteEvent) => {
      var items = pasteEvent.clipboardData.items;

      for (var i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") === 0) {
          var blob = items[i].getAsFile();
          this.onDrop([blob]);
        }
      }
    };
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onDrop(imageFiles) {
    this.setState({
      images: imageFiles,
      progresses: imageFiles.map(() => 0),
    });

    setTimeout(() => {
      Promise.all(imageFiles.map((im, i) => (
        this.hypify(i, im, this.state.frames, this.state.delay)
      ))).then((previews) => {
        this.setState({previews: previews});
        this.setState({
          progresses: []
        });
      });
    })
  }

  async progress(i, n) {
    let progresses = this.state.progresses;
    progresses[i] = n;
    this.setState({
      progresses: progresses
    });
    await this.sleep(1);
  }

  async hypify(index, image, numFrames, delay) {
    let frames = [];
    if (image.type === "image/gif") {
      const codec = new GifCodec();
      let inputImg = await codec.decodeGif(new Uint8Array(await image.arrayBuffer()))
      numFrames = inputImg.frames.length
      frames = inputImg.frames
    }
    console.log(`Hypifying with ${numFrames} frames and ${delay} delay`);
    await this.progress(index, 0);
    let jimg_tmp = await Jimp.read(await image.arrayBuffer());
    jimg_tmp.resize(1, 1);
    let averageColor = jimg_tmp.getPixelColor(0, 0);

    await this.progress(index, 0.05);
    let jimg = await Jimp.read(await image.arrayBuffer());
    if( jimg.getWidth() >= 128 || jimg.getHeight() >= 128 ) {
      jimg.scaleToFit(128, 128);
    }
    let {r, g, b} = Jimp.intToRGBA(averageColor);
    if( Math.max(r, g, b) - Math.min(r, g, b) < 30 ) {
      console.log("not vibrant enough, adding red")
      // Not enough color contrast, have to tint first
      jimg.color([
        { apply: 'red', params: [100] }
      ])
    }
    await this.progress(index, 0.07);

    const width = jimg.getWidth(), height = jimg.getHeight();
    for(var i = 0; i < numFrames; i++) {
      let frame;
      let hue_shift = (360 / numFrames);

      if (frames[i] === undefined) {
        frame = new GifFrame(width, height, { delayCentisecs: delay });
        frames.push(frame);
      } else {
        // We have an existing frame here
        frame = frames[i]
        jimg = new Jimp({...frame.bitmap});
        hue_shift = (hue_shift * i) % 360;
      }

      // Initially there was actually a bug in the hue_shift
      // The shift is persistent between frames, so shifting 360/numFrames
      // each time cycles evenly through all colours

      // However, multiplying this shift by i each time causes the colours
      // to be a lot more erratic, and i liked the effect, so we're keeping it as the default.
      if( !this.state.rainbow ) {
        hue_shift = (hue_shift * i) % 360;
      }

      jimg.color([
        { apply: 'hue', params: [hue_shift] },
      ])

      frame.bitmap.data = jimg.bitmap.data.slice();
      // Have to resolve this here for some reason or all frames are the same
      await jimg.getBase64Async('image/png');
      await this.progress(index, (i + 1) / numFrames);
    }

    debugger
    const codec = new GifCodec();
    GifUtil.quantizeDekker(frames);
    let gif = await codec.encodeGif(frames, {loops: 0})

    await this.progress(index, 1);

    return 'data:image/gif;base64,' + Buffer.from(gif.buffer).toString("base64")
  }

  framesChange = (e) => {
    let value = parseInt(e.target.value);
    if( value <= 0 || !value ) {
      value = 10;
    }

    this.setState({frames: value});
  }

  delayChange = (e) => {
    let value = parseInt(e.target.value);
    if( value <= 0 ) {
      value = 1;
    }

    this.setState({delay: value});
  }

  rainbowChange = (e) => {
    let value = e.target.checked;
    this.setState({rainbow: value});
  }

  regenerate = (e) => {
    e.preventDefault();
    this.onDrop(this.state.images);
    return false;
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>Hypemoji</h1>
        </div>
        <div onPaste={this.onPaste}>
          {this.state.previews.length > 0 ? (
            <form>
              <label>
                Number of Frames:
                <input type="number" name="frames" min="2" max="100" placeholder="10" onChange={this.framesChange} />
              </label>
              <label>
                Frame delay (in centiseconds):
                <input type="number" name="delay" min="2" placeholder="10" onChange={this.delayChange} />
              </label>
              <label>
                Rainbow:
                <input type="checkbox" name="rainbow" onChange={this.rainbowChange} />
              </label>

              <button type="submit" name="submit" onClick={this.regenerate}>Regenerate</button>
            </form>
          ) : null}
          <Dropzone onDrop={this.onDrop} multiple={true}>
            {({getRootProps, getInputProps}) => (
              <div className="dropzone" {...getRootProps()}>
                <p>Drag image here, paste from clipboard, or click to select</p>
                <input {...getInputProps()} />
              </div>
            )}
          </Dropzone>
          <div className="result">
          {(this.state.progresses || []).map((p, i) => (
            <Line key={`line_${i}`} percent={p * 100} />
          ))}
          {this.state.previews.map((dataUri, i) => (
            <a key={`image-${i}`} href={dataUri} download={`${this.state.images[i].name.split('.').slice(0, -1).join('.')}`}>
              <img alt="hype emoji" src={dataUri}/>
            </a>
          ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
