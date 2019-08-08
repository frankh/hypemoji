import React from 'react';
import logo from './logo.svg';
import './App.css';
import ImageUploader from 'react-images-upload';
import Jimp from 'jimp';
const { GifFrame, GifUtil, GifCodec } = require('gifwrap');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { images: [], previews: [], frames: 10, delay: 10, rainbow: false };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(imageFiles) {
    this.setState({
      images: imageFiles,
    });

    Promise.all(imageFiles.map((im) => (
      this.hypify(im, this.state.frames, this.state.delay)
    ))).then((previews) => {
      this.setState({previews: previews});
    });
  }

  async hypify(image, numFrames, delay) {
    console.log(`Hypifying with ${numFrames} frames and ${delay} delay`);
    const frames = [];

    let jimg_tmp = await Jimp.read(await image.arrayBuffer());
    jimg_tmp.scaleToFit(1, 1);

    let averageColor = jimg_tmp.getPixelColor(0, 0);

    let jimg = await Jimp.read(await image.arrayBuffer());

    let {r, g, b} = Jimp.intToRGBA(averageColor);
    if( Math.max(r, g, b) - Math.min(r, g, b) < 30 ) {
      console.log("not vibrant enough, adding red")
      // Not enough color contrast, have to tint first
      jimg.color([
        { apply: 'red', params: [100] }
      ])
    }

    const width = jimg.getWidth(), height = jimg.getHeight();
    // reduce color depth to 16 bit
    jimg.posterize(16);
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
      console.log(`done frame ${i}/${numFrames}`);
    }

    const codec = new GifCodec();
    let gif = await codec.encodeGif(frames, {loops: 0})
    return 'data:image/gif;base64,' + btoa(String.fromCharCode.apply(null, gif.buffer));
  }

  framesChange = (e) => {
    let value = parseInt(e.target.value);
    if( value <= 0 ) {
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
        <ImageUploader
          withIcon={true}
          buttonText='Choose images'
          onChange={this.onDrop}
          imgExtension={['.jpg', '.gif', '.png', '.gif']}
          maxFileSize={5242880}
        />
        {this.state.previews.map((dataUri, i) => (
          <img key={`image-${i}`} width="128" height="128" src={dataUri}/>
        ))}
      </div>
    );
  }
}

export default App;
