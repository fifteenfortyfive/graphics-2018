import { TweenMax, TimelineMax, SteppedEase, TextPlugin } from 'gsap/all';

import { Runner } from '../models/runner';
import { Team } from '../models/team';

import animate from "../utils/animations";



export class Nameplate {
  container: HTMLElement;
  container_id: string;
  runner: Runner;
  team: Team;
  timeline: TimelineMax;

  constructor(container: HTMLElement) {
    this.container = container;
    this.container_id = this.container.id;
    this.runner = null;
    this.team = null;
    this.timeline = new TimelineMax();
  }

  update(runner: Runner) {
    this.runner = runner;
    this.team = runner.team;
    this.timeline.clear();
    this.timeline.add(animate.image(`#${this.container.id} .nameplate__avatar`, `https://fifteenfortyfive-assets.nyc3.digitaloceanspaces.com/${this.runner.avatar_url}`), 0);
    this.timeline.add(animate.text(`#${this.container.id} .nameplate__name`, ""), 0.1);
    this.timeline.add(animate.text(`#${this.container.id} .nameplate__team`, ""), 0.2);
    this.timeline.add(animate.text(`#${this.container.id} .nameplate__twitch__text`, ""), 0.3);
    this.timeline.add(animate.color(`#${this.container.id}`, this.team.color), 0.6);
    this.timeline.add(animate.text(`#${this.container.id} .nameplate__name`, this.runner.name), 0.8)
    this.timeline.add(animate.text(`#${this.container.id} .nameplate__team`, this.team.name), 0.9)
    this.timeline.add(animate.text(`#${this.container.id} .nameplate__twitch__text`, this.runner.twitch), 1);
  }

  rerender() {
    this.update(this.runner);
  }
};
