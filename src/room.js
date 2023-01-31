let map = [
    1, 1, 1,
    0, 1, 0,
    0, 1, 0,
    0, 1, 1
];
let rooms = [];

class Room{
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  show(){
    fill(200);
    rect(this.x, this.y, this.w, this.h); //room
    fill(255);
    rect(this.x, this.y+H/2-50, 15, 100)//door
  }
}

function drawTiles(map, d_cols, s_cols, tilesize) {
  for (let i = map.length - 1; i > -1; --i) {
    let value = map[i];
    // source x , y
    let sx = (value % s_cols) * tilesize;
    let sy = Math.floor(value / s_cols) * tilesize;
    // distenation x , y
    let dx = (i % d_cols) * tilesize;
    let dy = Math.floor(i / d_cols) * tilesize;
    let dist = (i % s_cols) * 200;

    // render image
    if(value ==1){
      rooms.push(new Room(dx+dist, dy, tilesize+200, tilesize));
    }
  }
}