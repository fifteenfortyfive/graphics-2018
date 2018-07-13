import { TimelineMax } from 'gsap/all';

import { Nameplate } from "./nameplate";
import { Gameplate } from "./gameplate";
import { Game } from '../models/game';
import { RunData } from '../models/run_data';



export class RunDisplay {
  nameplate: Nameplate;
  gameplate: Gameplate;
  timer: HTMLElement;
  stream_container: HTMLElement;
  run_data: RunData;

  constructor(
        nameplate_element: HTMLElement,
        gameplate_element: HTMLElement,
        timer_element: HTMLElement,
        stream_container: HTMLElement
      ) {
    this.stream_container = stream_container;
    this.nameplate = new Nameplate(nameplate_element);
    this.gameplate = null;
    this.timer = timer_element;
  }

  update(run_data: RunData) {
    if(this.run_data == run_data) { return; }
    this.run_data = run_data;
    console.log(this.run_data);
    this.nameplate.update({
      name: run_data.username,
      avatar_url: run_data.avatar_object_id || "default-avatar",
      twitch: run_data.twitch,
      twitter: run_data.twitter,
      team: {
        name: run_data.team_name,
        color: '#' + run_data.team_color
      }
    });

    this.gameplate.update({
      name: run_data.game_name,
      progress_unit: run_data.progress_unit,
      progress_max: run_data.progress_max,
      category: `${run_data.progress_max}${run_data.progress_unit}`,
      color: getComputedStyle(document.body).getPropertyValue(`--${run_data.game_series}`),
    }, run_data.estimate);
  }

  rerender() {
    this.update(this.run_data);
  }
};
