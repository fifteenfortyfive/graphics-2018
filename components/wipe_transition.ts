import { TimelineMax, Power2, Power3, Linear } from "gsap/all";

import { Runner } from "../models/runner";
import { Game } from "../models/game";

import animate from "../utils/animations";

export class WipeTransition {
  old_runner: Runner;
  old_game: Game;
  new_runner: Runner;
  new_game: Game

  constructor(old_runner: Runner, old_game: Game, new_runner: Runner, new_game: Game) {
    this.old_runner = old_runner;
    this.old_game = old_game;
    this.new_runner = new_runner;
    this.new_game = new_game;
  }

  run() {
    const tl = new TimelineMax();
    // initialize image slates
    tl.set(".wipe-overlay__runner", { text: this.old_runner.name });
    tl.set(".wipe-overlay__info", { text: `${this.old_runner.team.name} – ${this.old_game.name}` });
    tl.set(".wipe-overlay", { backgroundColor: this.old_runner.team.color, height: 0, visibility: "visible" });
    tl.set(".wipe-overlay__background--old", { src: this.old_runner.avatar_url, opacity: 1 });
    tl.set(".wipe-overlay__background--new", { src: this.new_runner.avatar_url, opacity: 0 });
    // wipe in
    tl.to(".wipe-overlay-leader.--1", 0.4, { height: 900, ease: Power3.easeIn }, 0);
    tl.to(".wipe-overlay-leader.--2", 0.3, { height: 900, ease: Power3.easeIn }, 0.27);
    tl.to(".wipe-overlay", 0.4, { height: 900, ease: Power3.easeOut }, 0.6);
    // slide background image
    tl.fromTo(".wipe-overlay__background--old", 5.8, { y: -200 }, { y: 0, ease: Linear.easeInOut }, 0);
    tl.fromTo(".wipe-overlay__background--new", 5.8, { y: -200 }, { y: 0, ease: Linear.easeInOut }, 0);
    // transition to new state
    tl.add(animate.text(".wipe-overlay__runner", ""), 1.4);
    tl.add(animate.text(".wipe-overlay__info", ""), 1.6);
    tl.fromTo(".wipe-overlay__background--old", 1.2, { opacity: 1 }, { opacity: 0 }, 1.8)
    tl.fromTo(".wipe-overlay__background--new", 1.2, { opacity: 0 }, { opacity: 1 }, 1.8)
    tl.to(".wipe-overlay", 1.2, { backgroundColor: this.new_runner.team.color }, 1.8);
    tl.add(animate.text(".wipe-overlay__runner", this.new_runner.name), 2.1);
    tl.add(animate.text(".wipe-overlay__info", `${this.new_runner.team.name} – ${this.new_game.name}`), 2.1);
    // wipe out
    tl.to(".wipe-overlay", 0.5, { height: 0, ease: Power3.easeIn }, 4.4);
    tl.to(".wipe-overlay-leader.--2", 0.4, { height: 0, ease: Power3.easeIn }, 4.8);
    tl.to(".wipe-overlay-leader.--1", 0.4, { height: 0, ease: Power3.easeIn }, 5.0);
  }
}
