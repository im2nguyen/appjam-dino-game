import {
  FLOOR_POSITION_Y,
  REAL_FLOOR_POSITION_Y,
  FLOOR_START_FLOOR_DISAPEAR_X,
  FLOOR_WIDTH,
  FLOOR_HEIGHT,
  FLOOR_SPEED,
  START_FLOOR_SPEED,
  FLOOR_MAX_SPEED,
  ACCELERATION,
  FLOOR_WIDTH_SCREEN,
  START_FLOOR_POSITION_X_RECTANGLE,
  FLOOR_WIDTH_HEIGHT,
} from "./../utils/constants";

let currentSpeed = FLOOR_SPEED;

export const spawnStartFloor = () => {
  return add([
    pos(START_FLOOR_POSITION_X_RECTANGLE, REAL_FLOOR_POSITION_Y),
    "start_rectangle",
    rect(FLOOR_WIDTH_SCREEN, FLOOR_WIDTH_HEIGHT),
    { speed: START_FLOOR_SPEED },
  ]);
};

export default function run() {
  const spawnFinishFloor = (x) => {
    return add([
      pos(x, REAL_FLOOR_POSITION_Y),
      "finish",
      layer("ui"),
      sprite("floor"),
    ]);
  };

  onUpdate("start_rectangle", (f) => {
    f.move(f.speed, 0);
    if (f.pos.x > FLOOR_WIDTH_SCREEN) {
      spawnFinishFloor(0);
      destroy(f);
      destroyAll("start_floor");
    }
  });

  let spawned = false;
  onUpdate("finish", (f) => {
    // Do nothing if paused
    if (pauseGame) return;
    f.move(currentSpeed, 0);
    if (f.pos.x < FLOOR_START_FLOOR_DISAPEAR_X && !spawned) {
      spawnFinishFloor(width());
      spawned = true;
    }
    if (f.pos.x < FLOOR_WIDTH) {
      destroy(f);
      spawned = false;
    }
    if (currentSpeed > FLOOR_MAX_SPEED) {
      currentSpeed -= ACCELERATION;
    }
  });
}

export function floor() {
  add([
    rect(width(), FLOOR_HEIGHT),
    pos(0, FLOOR_POSITION_Y),
    layer("ui"),
    area(),
    solid(),
  ]);
}
