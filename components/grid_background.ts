const PIXEL_SIZE = 10;
const TIME_SCALE = 1.0 / 50.0;
const ALPHA = 0.3;

const canvas = document.querySelector("canvas");
canvas.width = 1600 / PIXEL_SIZE;
canvas.height = 900 / PIXEL_SIZE;
const ctx = canvas.getContext('2d');
ctx.globalAlpha = ALPHA;

const style = getComputedStyle(document.body);

const COLORS = [
  style.getPropertyValue("--red"),
  style.getPropertyValue("--orange"),
  style.getPropertyValue("--yellow"),
  style.getPropertyValue("--pink"),
  style.getPropertyValue("--gray"),
  style.getPropertyValue("--green"),
  style.getPropertyValue("--blue"),
  style.getPropertyValue("--purple")
];

function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function rand(max, maybe_min) {
  let min = maybe_min || 0;
  return min + Math.floor(Math.random() * max);
}



class Snake {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  color: string;

  constructor(x, y, vx, vy, ax, ay, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.ax = ax;
    this.ay = ay;
    this.color = color;
  }

  update(delta) {
    this.x += this.vx * delta;
    this.y += this.vy * delta;
    this.vx += this.ax;
    this.vy += this.ay;
  }

  render(ctx) {
    ctx.save();

    ctx.shadowBlur = 3;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.x,
      this.y,
      1.2,
      1.2
    );

    ctx.restore();
  }
}

export class Scene {
  objects: any[];

  constructor() {
    this.objects = [];
  }

  update(delta, frame_count) {
    if(frame_count % 30 == 0) {
      if(this.objects.length > 100) {
        this.objects.shift();
      }
      this.objects.push(new Snake(
        rand(canvas.width-50, 0),
        rand(canvas.height-10, 10),
        rand(10, -5),
        rand(2, -1),
        rand(400, -200) / 1000.0,
        rand(200, -100) / 1000.0,
        randomColor()
      ));
    }

    for(let object of this.objects) {
      object.update(delta);
    }
  }

  render(ctx) {
    this.renderTrails(ctx);

    for(let object of this.objects) {
      object.render(ctx);
    }
  }


  renderTrails(ctx) {
    ctx.save();
    let lastImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixelData = lastImage.data;
    for(let i = 3; i < pixelData.length; i += 4) {
      pixelData[i] -= 1;
    }
    ctx.putImageData(lastImage, 0, 0);
    ctx.restore();
  }


  run() {
    let last_frame = 0;
    let this_frame = 1;

    let self = this;
    function step(timestamp) {
      let delta = (this_frame - last_frame) * TIME_SCALE;
      self.update(delta, this_frame);
      self.render(ctx);

      last_frame = this_frame;
      this_frame += 1;
      window.requestAnimationFrame(step);
    };

    step(0);
  }
}
