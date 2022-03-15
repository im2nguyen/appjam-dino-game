import kaboom from "kaboom";

export const k = kaboom({
  background: [255, 255, 255],
  width: 600,
  height: 150,
  canvas: document.querySelector("#game_canvas")
});

export default k;
