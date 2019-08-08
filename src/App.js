import React from 'react';
import './App.css';
import Dropzone from 'react-dropzone';
import Jimp from 'jimp';
import { Line } from 'rc-progress';
import { GifFrame, GifUtil, GifCodec } from 'gifwrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { images: [], previews: [], frames: 10, delay: 10, rainbow: false, progress: null };
    this.onDrop = this.onDrop.bind(this);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onDrop(imageFiles) {
    this.setState({
      images: imageFiles,
    });

    setTimeout(() => {
      Promise.all(imageFiles.map((im) => (
        this.hypify(im, this.state.frames, this.state.delay)
      ))).then((previews) => {
        this.setState({previews: previews});
        this.setState({
          progress: null
        });
      });
    })
  }

  async progress(n) {
    this.setState({
      progress: n
    });
    await this.sleep(1);
  }

  async hypify(image, numFrames, delay) {
    console.log(`Hypifying with ${numFrames} frames and ${delay} delay`);
    const frames = [];

    await this.progress(0);
    let jimg_tmp = await Jimp.read(await image.arrayBuffer());
    jimg_tmp.resize(1, 1);
    let averageColor = jimg_tmp.getPixelColor(0, 0);

    await this.progress(0.05);
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
    await this.progress(0.07);

    const width = jimg.getWidth(), height = jimg.getHeight();
    for(var i = 0; i < numFrames; i++) {
      let frame = new GifFrame(width, height, { delayCentisecs: delay });
      frames.push(frame);

      // Initially there was actually a bug in the hue_shift
      // The shift is persistent between frames, so shifting 360/numFrames
      // each time cycles evenly through all colours

      // However, multiplying this shift by i each time causes the colours
      // to be a lot more erratic, and i liked the effect, so we're keeping it as the default.
      let hue_shift = (360 / numFrames);
      if( !this.state.rainbow ) {
        hue_shift *= i;
      }
      jimg.color([
        { apply: 'hue', params: [hue_shift] },
      ])

      frame.bitmap.data = jimg.bitmap.data.slice();
      // Have to resolve this here for some reason or all frames are the same
      await jimg.getBase64Async('image/png');
      await this.progress((i + 1) / numFrames);
    }

    const codec = new GifCodec();
    GifUtil.quantizeDekker(frames);
    let gif = await codec.encodeGif(frames, {loops: 0})

    this.setState({
      progress: null
    });

    return 'data:image/gif;base64,' + btoa(String.fromCharCode.apply(null, gif.buffer));
  }

  framesChange = (e) => {
    let value = parseInt(e.target.value);
    if( value <= 0 || value ) {
      value = 1;
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
    console.log('render ' + this.state.progress);
    return (
      <div>
        {this.state.previews.length > 0 ? (
          <form>
            <label>
              Number of Frames:
              <input type="number" name="frames" placeholder="10" onChange={this.framesChange} />
            </label>
            <label>
              Frame delay (in centiseconds):
              <input type="number" name="delay" placeholder="10" onChange={this.delayChange} />
            </label>
            <label>
              Rainbow:
              <input type="checkbox" name="rainbow" onChange={this.rainbowChange} />
            </label>

            <button type="submit" name="submit" onClick={this.regenerate}>Regenerate</button>
          </form>
        ) : null}
        <Dropzone onDrop={this.onDrop} multiple={false}>
          {({getRootProps, getInputProps}) => (
            <div className="dropzone" {...getRootProps()}>
              <p>Drag image here, or click to select</p>
              <input {...getInputProps()} />
            </div>
          )}
        </Dropzone>
        {this.state.progress != null ? (
          <Line percent={this.state.progress * 100} />
        ): null}
        {this.state.previews.map((dataUri, i) => (
          <a key={`image-${i}`} href={dataUri} download>
            <img src={dataUri}/>
          </a>
        ))}
      </div>
    );
  }
}

export default App;
