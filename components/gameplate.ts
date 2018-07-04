import { TimelineMax } from 'gsap/all';
import { Game } from '../models/game';

import animate from "../utils/animations";


export class Gameplate {
  container: HTMLElement;
  game: Game;
  estimate: string;
  timeline: TimelineMax;

  constructor(container: HTMLElement, game: Game, estimate: string) {
    this.container = container;
    this.game = game;
    this.estimate = estimate;
    this.timeline = new TimelineMax();
  }

  update(game: Game, estimate: string) {
    this.game = game;
    this.estimate = estimate;

    this.timeline.clear();
    this.timeline.add(animate.text(".gameplate__category", ""), 0.1);
    this.timeline.add(animate.text(".gameplate__estimate", ""), 0.2);
    this.timeline.add(animate.text(".gameplate__name", ""), 0.3);
    this.timeline.add(animate.color(".gameplate", this.game.color), 0.5);
    this.timeline.add(animate.text(".gameplate__category", this.game.category), 0.8);
    this.timeline.add(animate.text(".gameplate__estimate", this.estimate), 0.9);
    this.timeline.add(animate.text(".gameplate__name", this.game.name), 1);
  }

  rerender() {
    this.update(this.game, this.estimate);
  }
};
