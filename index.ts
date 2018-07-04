import { Scene } from "./components/grid_background";
import { Nameplate } from "./components/nameplate";
import { Gameplate } from "./components/gameplate";
import { WipeTransition } from "./components/wipe_transition";
import { TimelineMax} from "gsap/all";

const runners = [
  {
    name: "ActuallyImJerome",
    team: {
      name: "Team Washi Washi",
      color: "#8c5eac"
    },
    twitter: "spudlyman",
    twitch: "spudlyman",
    avatar_url: "https://fifteenfortyfive-assets.nyc3.digitaloceanspaces.com/4c6a99df-8d45-4cbf-8723-00f68eee2b5c"
  },
  {
    name: "wedc517",
    team: {
      name: "A Picture of Snoop Dogg",
      color: "#6fa56b"
    },
    twitter: "wedc517",
    twitch: "wedc517",
    avatar_url: "https://fifteenfortyfive-assets.nyc3.digitaloceanspaces.com/a6825902-1ed8-49f1-9877-880d92fe4096"
  }
]

const games = [
  {
    name: "Spyro 3",
    category: "117%",
    color: "#8c5eac",
    progress_unit: "%",
    progress_max: "117"
  },
  {
    name: "Banjo Tooie",
    category: "100%",
    color: "#f0c566",
    progress_unit: "%",
    progress_max: "100"
  }
]

let runner_idx = 0;
let game_idx = 0;
const nameplate = new Nameplate(document.querySelector("#main_nameplate"), runners[0]);
const gameplate = new Gameplate(document.querySelector("#main_gameplate"), games[0], "03:45:00");

function rotate() {
  let runner = runners[runner_idx % runners.length];
  let game = games[game_idx % games.length];
  new TimelineMax()
    .call(function() {
      nameplate.update(runner);
    }, [], null, 0)
    .call(function() {
      gameplate.update(game, "04:54:00");
    }, [], null, 0.2);
  runner_idx += 1;
  game_idx += 1;
}

const wipeTransition = new WipeTransition(runners[0], games[0], runners[1], games[1]);
function wipe() {
  wipeTransition.run();
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

  rotate();
  setInterval(rotate, 7500);

  setTimeout(wipe, 1700);
};
