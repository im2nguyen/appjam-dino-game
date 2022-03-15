import k from "./../kaboom";

const SPEED = 180;
const SMALL_CACTUS_POSITION = 140;
const BIG_CACTUS_POSITION = 115;

export default function cactus() {
  const cactusSize = randomInteger(0,1);
  add([
    pos(width(), (cactusSize) ? BIG_CACTUS_POSITION : SMALL_CACTUS_POSITION), 
    move(LEFT, SPEED),
    layer("ui"),
    sprite(cactusSize + "cactus" + randomInteger(1, 3))
  ]);

  // wait a random amount of time to spawn next cactus
  wait(rand(0.5, 3.5), cactus)
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
