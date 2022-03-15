import {
  TIME_INTERVALS,
  TIME_POSITION_OFFSET,
  TIME_Y_POSITION,
  TIME_X_POSITION,
  TIME_APPEAR_INTERVAL,
  TIME_HI_INTERVAL,
  SPACE_BETWEEN_SCORE_AND_TIME,
  TIME_SECOND_DELAY,
} from "./../utils/constants";

let times = [];
let scores = [];
let score = 0;
let delta = 0;
let enemy = false;
let cactusMiddle = false;
let cactusBig = false;
let reached = 0;

const ENEMIES_APPEAR_TIME_IN_SECONDS = 10;
const CACTUS_MIDDLE_APPEAR_TIME_IN_SECONDS = 10;
const CACTUS_BIG_APPEAR_TIME_IN_SECONDS = 20;
const REACHED_STEP = 10;

export default function hi() {
  // Adding timer
  const timer = add([{ times, scores }, "timer"]);

  // Draw numbers with timeout
  let position = TIME_X_POSITION;
  const h = add([
    pos(position - TIME_HI_INTERVAL, TIME_Y_POSITION),
    sprite("hi"),
    "hi",
  ]);
  h.hidden = true;

  setTimeout(function () {
    TIME_INTERVALS.forEach(function (el, index) {
      setTimeout(function () {
        // Adding scores
        let s = add([pos(position, TIME_Y_POSITION), sprite("0"), "score"]);
        s.hidden = true;
        scores.push(s);

        // Adding times
        times.push(
          add([
            pos(position + SPACE_BETWEEN_SCORE_AND_TIME, TIME_Y_POSITION),
            sprite("0"),
            "time",
          ])
        );
        position += TIME_POSITION_OFFSET;
      }, (index + 1) * TIME_APPEAR_INTERVAL);
    });
  }, TIME_SECOND_DELAY);

  // Update timer
  timer.onUpdate(() => {
    delta += dt();
    let str = (delta.toFixed(1) * 10).toString()
    // Draw timer
    for (let i = 0; i < str.length; i++) {
      if (times[TIME_INTERVALS.length - str.length + i]) {
        times[TIME_INTERVALS.length - str.length + i].use(sprite(str[i]));
      }
    }
    if (delta > ENEMIES_APPEAR_TIME_IN_SECONDS && !enemy) {
      timer.trigger("enemy");
      enemy = true;
    }
    if (delta > CACTUS_MIDDLE_APPEAR_TIME_IN_SECONDS && !cactusMiddle) {
      timer.trigger("cactus_middle");
      cactusMiddle = true;
    }
    if (delta > CACTUS_BIG_APPEAR_TIME_IN_SECONDS && !cactusBig) {
      timer.trigger("cactus_big");
      cactusBig = true;
    }
  });

  onCollide("dino", "obstacle", (d, c) => {
    if (timer.paused) {
      return;
    }
    collide();
  });

  function collide() {
    // Pause the update
    timer.paused = true;

    // Set scores
    if (score < delta) {
      score = delta;
      let str = delta.toFixed(1).toString().split(".").join("");
      for (let j = 0; j < str.length; j++) {
        if (scores[TIME_INTERVALS.length - str.length + j]) {
          scores[TIME_INTERVALS.length - str.length + j].use(sprite(str[j]));
        }
      }
    }
    delta = 0;

    // Make scores visible
    every("hi", (h) => {
      h.hidden = false;
    });
    every("score", (s) => {
      s.hidden = false;
    });

    // Reset enemies flag
    enemy = false;

    // Reset reached
    // reached = 0;
  }

  // Click anywhere and unpause
  // onClick(() => unPause());

  onKeyPress("up", () => {
    if (timer.paused) wait(0.2, unPause);
  });
}

function unPause() {
  const timer = get("timer")[0];
  if (timer.paused == true) {
    // Reset the timer
    timer.paused = false;

    // Set 0 sprite for every number
    every("time", (s) => {
      s.use(sprite("0"));
    });
  }
}
