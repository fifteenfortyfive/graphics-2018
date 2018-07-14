import { Scene } from "./components/grid_background";
import { Nameplate } from "./components/nameplate";

declare var Twitch:any;

const STREAM_ROTATION_CYCLE_TIME = 6 * 60 * 1000;

var base_uri = (window.location.protocol === "https:" ? "wss://" : "ws://") + window.location.host;
let socket = new WebSocket("wss://fifteenfortyfive.org/stream");

function fetch_current_runs() {
  socket.send(`{"request": "all_current_runs"}`);
}

function fetch_ping() {
  socket.send(`{"request": "ping"}`);
}

const no_feature_player_options = {
  width: 672,
  height: 378,
  controls: false
};

const nameplate_left_top      = new Nameplate(document.querySelector("#left-top_nameplate"));
const nameplate_left_bottom   = new Nameplate(document.querySelector("#left-bottom_nameplate"));
const nameplate_right_top      = new Nameplate(document.querySelector("#right-top_nameplate"));
const nameplate_right_bottom   = new Nameplate(document.querySelector("#right-bottom_nameplate"));

const player_left_top       = new Twitch.Player("left-top_player", no_feature_player_options);
const player_left_bottom    = new Twitch.Player("left-bottom_player", no_feature_player_options);
const player_right_top       = new Twitch.Player("right-top_player", no_feature_player_options);
const player_right_bottom    = new Twitch.Player("right-bottom_player", no_feature_player_options);

player_left_top.setVolume(0);
player_left_bottom.setVolume(0);
player_right_top.setVolume(0);
player_right_bottom.setVolume(0);


function update_current_runs(runs) {
  console.log(runs);
  let stream_flip_time = STREAM_ROTATION_CYCLE_TIME / 2;

  let first_left_top_run = runs[0];
  let first_left_bottom_run = runs[1];
  let first_right_top_run = runs[2];
  let first_right_bottom_run = runs[3];

  nameplate_left_top.update({
    ...first_left_top_run,
    name: first_left_top_run.username,
    avatar_url: first_left_top_run.avatar_object_id || "default-avatar",
    team: {
      name: first_left_top_run.team_name,
      color: '#' + first_left_top_run.team_color
    }
  });
  player_left_top.setChannel(first_left_top_run.twitch);

  nameplate_left_bottom.update({
    ...first_left_bottom_run,
    name: first_left_bottom_run.username,
    avatar_url: first_left_bottom_run.avatar_object_id || "default-avatar",
    team: {
      name: first_left_bottom_run.team_name,
      color: '#' + first_left_bottom_run.team_color
    }
  });
  player_left_bottom.setChannel(first_left_bottom_run.twitch);

  nameplate_right_top.update({
    ...first_right_top_run,
    name: first_right_top_run.username,
    avatar_url: first_right_top_run.avatar_object_id || "default-avatar",
    team: {
      name: first_right_top_run.team_name,
      color: '#' + first_right_top_run.team_color
    }
  });
  player_right_top.setChannel(first_right_top_run.twitch);

  nameplate_right_bottom.update({
    ...first_right_bottom_run,
    name: first_right_bottom_run.username,
    avatar_url: first_right_bottom_run.avatar_object_id || "default-avatar",
    team: {
      name: first_right_bottom_run.team_name,
      color: '#' + first_right_bottom_run.team_color
    }
  });
  player_right_bottom.setChannel(first_right_bottom_run.twitch);


  setTimeout(function() {
    let second_left_top_run = runs[4];
    let second_left_bottom_run = runs[5];
    let second_right_top_run = runs[6];
    let second_right_bottom_run = runs[7];

    nameplate_left_top.update({
      ...second_left_top_run,
      name: second_left_top_run.username,
      avatar_url: second_left_top_run.avatar_object_id || "default-avatar",
      team: {
        name: second_left_top_run.team_name,
        color: '#' + second_left_top_run.team_color
      }
    });
    player_left_top.setChannel(second_left_top_run.twitch);

    nameplate_left_bottom.update({
      ...second_left_bottom_run,
      name: second_left_bottom_run.username,
      avatar_url: second_left_bottom_run.avatar_object_id || "default-avatar",
      team: {
        name: second_left_bottom_run.team_name,
        color: '#' + second_left_bottom_run.team_color
      }
    });
    player_left_bottom.setChannel(second_left_bottom_run.twitch);

    nameplate_right_top.update({
      ...second_right_top_run,
      name: second_right_top_run.username,
      avatar_url: second_right_top_run.avatar_object_id || "default-avatar",
      team: {
        name: second_right_top_run.team_name,
        color: '#' + second_right_top_run.team_color
      }
    });
    player_right_top.setChannel(second_right_top_run.twitch);

    nameplate_right_bottom.update({
      ...second_right_bottom_run,
      name: second_right_bottom_run.username,
      avatar_url: second_right_bottom_run.avatar_object_id || "default-avatar",
      team: {
        name: second_right_bottom_run.team_name,
        color: '#' + second_right_bottom_run.team_color
      }
    });
    player_right_bottom.setChannel(second_right_bottom_run.twitch);
  }, stream_flip_time);
}

function setUpdateTimers() {
  setInterval(function() {
    fetch_current_runs();
  }, STREAM_ROTATION_CYCLE_TIME);

  setInterval(function() {
    fetch_ping();
  }, 10000);
}


socket.onmessage = function(msg) {
  const message = JSON.parse(msg.data);
  switch(message.type) {
    case "all_current_runs":
      update_current_runs(message.runs);
      break;
    case "ping":
      break;
    case "initialize":
      fetch_current_runs();
      setUpdateTimers();
      break;
  }
}



window.onload = function() {
  const scene = new Scene();
  scene.run();
};
