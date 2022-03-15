import k from "./../kaboom";
import floor from "./floor";

const JUMP_FORCE = 800;

let floor_initialized = false;

export default function key_handlers(dino, start) {

  // const dino_down = add([
  //   pos(30, 30), 
  //   // move(LEFT, SPEED),
  //   // layer("ui"),
  //   sprite("down")
  // ]);
  // dino_down.play("run");

  // Space key pressed
  onKeyPressRepeat("space", () => {
    if (!floor_initialized) {
      floor();
      floor_initialized = true;
    }

    dino.play("idle");

    if (start.exists()) {
      destroy(start);
    }

    if (dino.grounded()) {
      dino.jump(JUMP_FORCE);
    }
  });

  // Ground
  dino.on("ground", () => {
    if (floor_initialized) {
      dino.play("run");
    }
  });
  
  // Down pressed
  onKeyPress("down", () => {
    if (floor_initialized) {
      dino.use(sprite('down'));
      dino.play("run");
    }
  });

  // Down released
  onKeyRelease("down", () => {
    if (floor_initialized) {
      dino.use(sprite('dino'));
    }
  });
}
