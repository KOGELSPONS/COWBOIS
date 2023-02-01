let map = [
    1, 1, 1,
    0, 1, 0,
    1, 1, 0,
    0, 1, 1
];
let left = [
    0, 1, 1,
    0, 0, 0,
    0, 1, 0,
    0, 0, 1
];
let right = [
    1, 1, 0,
    0, 0, 0,
    1, 0, 0,
    0, 1, 0
];
let top = [
    0, 0, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0
];
let bottom = [
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 0, 0
];

let rooms = [];

class Room{
  constructor(x,y,w,h,type){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = type;
  }
  show(){
    fill(200);
    rect(this.x, this.y, this.w, this.h); //room
    if (this.type == 1){
      fill(255);
      rect(this.x, this.y+this.h/2-50, 15, 100);//door (links)
    } else if (this.type == 2){
      fill(255);
      rect(this.x + this.w - 15, this.y+this.h/2-50, 15, 100);//door (rechts)
    } else if (this.type == 3){
      fill(255);
      rect(this.x + this.w/2 - 50, this.y, 100, 15);//door (boven)
    } else if (this.type == 4){
      fill(255);
      rect(this.x + this.w - 15, this.y+this.h/2-50, 15, 100);//door (onder)
    }
  }
}

function drawTiles(map, d_cols, roomsize_x, roomsize_y) {
  for (let i = map.length - 1; i > -1; --i) {
    let value = map[i];
    
    // distenation x , y
    let dx = (i % d_cols) * roomsize_x;
    let dy = Math.floor(i / d_cols) * roomsize_y;
    
    // render image
    if(value >= 1){
      rooms.push(new Room(dx, dy, roomsize_x, roomsize_y, value));
    }
  }
}