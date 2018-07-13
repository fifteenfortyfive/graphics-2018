import { Scene } from "./components/grid_background";
import { Nameplate } from "./components/nameplate";
import { Gameplate } from "./components/gameplate";
import { WipeTransition } from "./components/wipe_transition";
import { TimelineMax} from "gsap/all";

import * as moment from "moment";
import "moment-duration-format";


declare var Twitch:any;

const STREAM_ROTATION_CYCLE_TIME = 4 * 60 * 1000;

var base_uri = (window.location.protocol === "https:" ? "wss://" : "ws://") + window.location.host;
let socket = new WebSocket("wss://fifteenfortyfive.org/stream");

let featured_run_id = 91;
let featured_team_id = 4;


function increment_timers() {
  [].forEach.call(document.querySelectorAll(".live-timer"), function(timer) {
    if(timer.dataset.started_at) {
      let now = moment().unix();
      let start_time = parseInt(timer.dataset.started_at);
      timer.innerText = (<any>moment.duration(now - start_time, 's')).format("hh:mm:ss", { trim: false });
    } else {
      let previous_time = moment.duration(timer.innerText);
      timer.innerText = (<any>previous_time.add(1, 's')).format("hh:mm:ss", { trim: false });
    }
  });
}

setInterval(increment_timers, 1000);



function fetch_sidebar_runs() {
  socket.send('{"request": "sidebar_runs"}');
}

function fetch_featured_run() {
  socket.send('{"request": "featured_run"}');
}

function fetch_run_data(run_id) {
  socket.send(`{"request": "run_data", "run_id": "${run_id}"}`);
}



const sidebar_player_options = {
  width: 512,
  height: 288,
  controls: false
};

const sidebar_nameplate_top    = new Nameplate(document.querySelector("#cycled-stream__top_nameplate"));
const sidebar_nameplate_bottom = new Nameplate(document.querySelector("#cycled-stream__bottom_nameplate"));
const sidebar_top_player     = new Twitch.Player("side-bar__cycled-stream__top", sidebar_player_options);
const sidebar_bottom_player  = new Twitch.Player("side-bar__cycled-stream__bottom", sidebar_player_options);
sidebar_top_player.setVolume(0);
sidebar_bottom_player.setVolume(0);

function update_sidebar(top_run, bottom_run) {
  sidebar_nameplate_top.update({
    ...top_run,
    name: top_run.username,
    avatar_url: top_run.avatar_object_id || "default-avatar",
    team: {
      name: top_run.team_name,
      color: '#' + top_run.team_color
    }
  });

  sidebar_top_player.setChannel(top_run.twitch);

  sidebar_nameplate_bottom.update({
    ...bottom_run,
    name: bottom_run.username,
    avatar_url: bottom_run.avatar_object_id || "default-avatar",
    team: {
      name: bottom_run.team_name,
      color: '#' + bottom_run.team_color
    }
  });

  sidebar_bottom_player.setChannel(bottom_run.twitch);
}


const featured_nameplate = new Nameplate(document.querySelector("#main_nameplate"));
const featured_gameplate = new Gameplate(document.querySelector("#main_gameplate"));
const featured_timer = document.querySelector("#main_timeplate .timeplate-timer__time");
const featured_player_options = {
  width: 1088,
  height: 612,
  controls: false
}

const featured_player = new Twitch.Player("featured_stream", featured_player_options);
featured_player.setVolume(0.92);

let featured_run_update_interval = null;

function update_featured_run(run) {
  featured_nameplate.update({
    ...run,
    name: run.username,
    avatar_url: run.avatar_object_id || "default-avatar",
    team: {
      name: run.team_name,
      color: '#' + run.team_color
    }
  });

  featured_gameplate.update({
    ...run,
    name: run.game_name,
    category: `${run.progress_max}${run.progress_unit}`,
    color: getComputedStyle(document.body).getPropertyValue(`--${run.game_series}`),
  }, run.estimate);

  document.querySelector("#featured_stream").innerHTML = "";
  featured_player.setChannel(run.twitch);

  featured_timer.classList.remove("live-timer");

  if(run.actual_start_time) {
    (<any>featured_timer).dataset.started_at = moment(run.actual_start_time).unix();
    featured_timer.classList.add("live-timer");
  }

  if(run.actual_time_seconds) {
    featured_timer.classList.remove("live-timer");
    (<any>featured_timer).innerText = (<any>moment.duration(run.actual_time_seconds, 's')).format("hh:mm:ss", { trim: false });
  }

  clearInterval(featured_run_update_interval);
  featured_run_update_interval = setInterval(function() {
    fetch_run_data(run.run_id);
  }, 2000);
}

function update_featured_run_timer(run_data) {
  featured_timer.classList.remove("live-timer");

  if(run_data.actual_start_time) {
    (<any>featured_timer).dataset.started_at = moment(run_data.actual_start_time).unix();
    featured_timer.classList.add("live-timer");
  }

  if(run_data.actual_time_seconds) {
    featured_timer.classList.remove("live-timer");
    (<any>featured_timer).innerText = (<any>moment.duration(run_data.actual_time_seconds, 's')).format("hh:mm:ss", { trim: false });
  }
}

function setUpdateTimers() {
  setInterval(function() {
    fetch_sidebar_runs();
  }, STREAM_ROTATION_CYCLE_TIME);
  // fetch_featured_run();
}



socket.onmessage = function(msg) {
  const message = JSON.parse(msg.data);
  switch(message.type) {
    case "sidebar_runs":
      update_sidebar(message.runs[0], message.runs[1]);
      break;
    case "featured_run":
      update_featured_run(message.run);
      break;
    case "run_data":
      update_featured_run_timer(message.run);
      break;
    case "ping":
      break;
    case "initialize":
      fetch_featured_run();
      fetch_sidebar_runs();
      setUpdateTimers();
      break;
  }
}



window.onload = function() {
  const scene = new Scene();
  scene.run();

  let delay = 100;
  let growth = 40;
  document.querySelectorAll(".teambox").forEach(function(box) {
    setTimeout(function() {
      box.classList.remove("initial")
    }, delay);

    growth += 10;
    delay += growth;
  });

  // rotate();
  // setInterval(rotate, 7500);
};
