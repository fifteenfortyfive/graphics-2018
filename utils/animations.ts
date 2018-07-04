import { TimelineMax, TextPlugin } from 'gsap/all';
const plugins = [TextPlugin];

function image(element: string, new_src: string) {
  return new TimelineMax()
      .to(element, 0.6, { opacity: 0 })
      .set(element, { attr: { src: new_src }})
      .to(element, 0.6, { opacity: 1 }, "+=0.2");
}

function text(element: string, new_text: string) {
  return new TimelineMax()
    .to(element, 0.3, { text: new_text });
}

function color(element: string, new_color: string) {
  return new TimelineMax()
    .to(element, 0.6, { "--color": new_color });
}

export default { text, color, image };
