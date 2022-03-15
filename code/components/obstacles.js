import {
  OBSTACLE_SPEED,
  SMALL_CACTUS_POSITION,
  BIG_CACTUS_POSITION,
  ACCELERATION,
  OBSTACLE_MAX_SPEED,
  ENEMY_HEIGHT_1,
  ENEMY_HEIGHT_2,
  ENEMY_SCALE_AREA,
  MIN_CACTUS_GAP,
  MAX_CACTUS_GAP,
  MIN_ENEMY_GAP,
  MAX_ENEMY_GAP,
} from "../utils/constants";

// Cactuses - 0
// Pteradactyles - 1
let possible_obstacles = [0];

// Three different cactus sizes
// Small - 1
// Medium - 2
// Large - 3
let possible_cactuses = [1];

let currentSpeed = OBSTACLE_SPEED;

// Spawn obstacles
export function spawnObstacle(next) {
  let spawned = false;
  return {
    id: "spawnObstacle",
    require: ["pos"],
    update() {
      const spos = this.screenPos();
      if (spos.x < width() - next.position && !spawned) {
        this.trigger("spawn", next);
        spawned = true;
      }
    },
  };
}

export default function obstacles(next = null) {
  // Stop spawning obstacles if game is paused
  if (pauseGame) return false;

  // if next doesn't exist, spawn first obstacle
  if (next === null) {
    spawnFirstObstacle();
  } else {
    spawnNextObstacle(next);
  }
}

// Generating next obstacle
function getNextObstacle() {
  let nextSize;
  let nextSpeed;
  let nextSprite;
  let nextPosition;
  let id;

  const nextObstacle = choose(possible_obstacles);
  // 0 - cactus, 1 - pterodactyl
  if (nextObstacle === 0) {
    const cactusSize = choose([0, 1]);
    id = "cactus";
    nextSize = cactusSize ? BIG_CACTUS_POSITION : SMALL_CACTUS_POSITION;
    nextSpeed = OBSTACLE_SPEED;
    nextSprite = cactusSize + "cactus" + choose(possible_cactuses);
    nextPosition = rand(MIN_CACTUS_GAP, MAX_CACTUS_GAP);
  } else {
    id = "enemy";
    nextSize = choose([ENEMY_HEIGHT_1, ENEMY_HEIGHT_2]);
    nextSpeed = OBSTACLE_SPEED;
    nextSprite = "enemy";
    nextPosition = rand(MIN_ENEMY_GAP, MAX_ENEMY_GAP);
  }
  return {
    id: id,
    size: nextSize,
    speed: nextSpeed,
    sprite: nextSprite,
    position: nextPosition,
  };
}

function spawnFirstObstacle() {
  const cactusSize = choose([0, 1]);
  add([
    pos(width(), cactusSize ? BIG_CACTUS_POSITION : SMALL_CACTUS_POSITION),
    move(LEFT, currentSpeed),
    layer("ui"),
    area(),
    cleanup(),
    spawnObstacle(getNextObstacle()),
    sprite(cactusSize + "cactus" + choose(possible_cactuses)),
    "obstacle",
  ]);
}

function spawnNextObstacle(next) {
  const obstacle = add([
    pos(width(), next.size),
    move(LEFT, currentSpeed),
    layer("ui"),
    area(),
    cleanup(),
    spawnObstacle(getNextObstacle()),
    sprite(next.sprite),
    "obstacle",
  ]);
  if (next.id == "enemy") {
    obstacle.use(area({ scale: ENEMY_SCALE_AREA }));
    obstacle.use(origin("center"));
    obstacle.play("fly");
  }
}

on("spawn", "obstacle", (m, next) => {
  obstacles(next);
});

on("cactus_middle", "timer", () => {
  possible_cactuses.push(2);
});

on("cactus_big", "timer", () => {
  possible_cactuses.push(3);
});

// Add pterodactyles to the obstacles list
on("enemy", "timer", () => {
  possible_obstacles.push(1);
});

onCollide("dino", "obstacle", (d, c) => {
  possible_obstacles = [0];
  possible_cactuses = [1];
  currentSpeed = OBSTACLE_SPEED;
});

onUpdate("obstacle", (f) => {
  if (currentSpeed < OBSTACLE_MAX_SPEED) {
    currentSpeed += ACCELERATION;
  }
});
