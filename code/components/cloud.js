import {
  CLOUD_SPEED,
  CLOUD_HEIGHT_1,
  CLOUD_HEIGHT_2,
} from "./../utils/constants";

const min_cloud_gap = 100;
const max_cloud_gap = 400;

// Spawn clouds
export function handlecloud(position) {
  let spawned = false;
  return {
    id: "handlecloud",
    require: ["pos"],
    update() {
      const spos = this.screenPos();
      if (spos.x < width() - position && !spawned) {
        this.trigger("spawn");
        spawned = true;
      }
    },
  };
}

export default function cloud() {
  // Stop spawning clouds if game is paused
  if (pauseGame) {
    return false;
  }

  add([
    pos(width(), choose([CLOUD_HEIGHT_1, CLOUD_HEIGHT_2])),
    move(LEFT, CLOUD_SPEED),
    layer("ui"),
    sprite("cloud"),
    handlecloud(rand(min_cloud_gap, max_cloud_gap)),
    "cloud",
  ]);
}

on("spawn", "cloud", (m, next) => {
  cloud();
});
