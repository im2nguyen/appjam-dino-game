import k from "./../kaboom";

export default function hi() {
  // let i = 0;
  // loop(0.1, () => {
  //   // toStr(i);
  //   i++;
  // });
}

const toStr = (num) => {
  let p = 20;
  let position = 355;
  
  destroyAll("time");

  let str = num.toString();
  for (let i = 0; i < str.length; i++) {
    add([
      pos((i-1 >= 0 && str[i-1] == 0) ? position + 5 : position, 30), 
      sprite(str[i]),
      "time"
    ]);
    position = position + p;
  }
}