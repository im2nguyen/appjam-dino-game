import k from "./../kaboom";

const FLOOR_POSITION_Y = 196;
const FLOOR_MOVEMENT_STEP = 150;
const FLOOR_FRAMES = [0, 1, 2, 3, 4, 5, 6];

const FLOOR_HEIGHT = 1;

export default function floor() {
  const floor = [];

  // Explain this
  let step = 0;
  let interval = 120;
  FLOOR_FRAMES.forEach(function (el, index) {
    setTimeout(function () {
      floor.push(add([pos(step, FLOOR_POSITION_Y), sprite("floor")]));
      step += FLOOR_MOVEMENT_STEP;
    }, index * interval);
  });

  // And this
  setTimeout(function () {
    let i = 0;
    loop(0.2, () => {
      for (let j = 0; j < floor.length; j++) {
        floor[j].frame = (j + i) % 15;
      }
      i++;
    });
  }, 600); // 120 * 5
}

// And this
export function realFloor() {
  add([
    rect(width(), FLOOR_HEIGHT),
    pos(0, height()),
    origin("botleft"),
    area(),
    solid(),
    // color(127, 200, 255),
  ]);
}
