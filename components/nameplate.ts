import { TweenMax, TimelineMax, SteppedEase, TextPlugin } from 'gsap/all';

import { Runner } from '../models/runner';
import { Team } from '../models/team';

import animate from "../utils/animations";



export class Nameplate {
  container: HTMLElement;
  runner: Runner;
  team: Team;
  timeline: TimelineMax

  constructor(container: HTMLElement, runner: Runner) {
    this.container = container;
    this.runner = runner;
    this.team = runner.team;
    this.timeline = new TimelineMax();
  }

  update(runner: Runner) {
    this.runner = runner;
    this.team = runner.team;
    this.timeline.clear();
    this.timeline.add(animate.image(".nameplate__avatar", this.runner.avatar_url), 0);
    this.timeline.add(animate.text(".nameplate__name", ""), 0.1);
    this.timeline.add(animate.text(".nameplate__team", ""), 0.2);
    this.timeline.add(animate.text(".nameplate__twitch__text", ""), 0.3);
    this.timeline.add(animate.color(".nameplate", this.team.color), 0.6);
    this.timeline.add(animate.text(".nameplate__name", this.runner.name), 0.8)
    this.timeline.add(animate.text(".nameplate__team", this.team.name), 0.9)
    this.timeline.add(animate.text(".nameplate__twitch__text", this.runner.twitch), 1);
  }

  rerender() {
    this.update(this.runner);
  }
};
