import k from "./../kaboom";

const SPEED = 180;
const CLOUD_HEIGHT_1 = 15;
const CLOUD_HEIGHT_2 = 25;

export default function cloud() {
  add([
    pos(width(), randomInteger(CLOUD_HEIGHT_1, CLOUD_HEIGHT_2)), 
    move(LEFT, SPEED),
    layer("ui"),
    sprite("cloud")
  ]);

  // wait a random amount of time to spawn next cloud
  wait(rand(0.5, 3.5), cloud)
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
