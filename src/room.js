let map = [
    1, 1, 1,
    0, 1, 0,
    1, 1, 0,
    0, 1, 1
];
let doorleft = [
    0, 1, 1,
    0, 0, 0,
    0, 1, 0,
    0, 0, 1
];
let doorright = [
    1, 1, 0,
    0, 0, 0,
    1, 0, 0,
    0, 1, 0
];
let doortop = [
    0, 0, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0
];
let doorbottom = [
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 0, 0
];

let rooms = [];

var currentRoom = 1;

class Room{
  constructor(x,y,w,h,l,r,t,b,roomnumber){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.left =  l
    this.right = r
    this.top =  t
    this.bottom = b
    this.roomnumber = roomnumber
  }
  show(){
    fill(200);
    rect(this.x, this.y, this.w, this.h); //room
    if (this.left == 1){
      fill(255);
      rect(this.x, this.y+this.h/2-50, 15, 100);//door (links)
      if (collision(player.x, player.y, player.w, player.h  ,  this.x, this.y+this.h/2-50, 15, 100)) { 
        currentRoom -= 1
        player.x -= 60
        camX -= 750;
      }
    } if (this.right == 1){
      fill(255);
      rect(this.x + this.w - 15, this.y+this.h/2-50, 15, 100);//door (rechts)
      if (collision(player.x, player.y, player.w, player.h  ,  this.x + this.w - 15, this.y+this.h/2-50, 15, 100)) { 
        currentRoom += 1
        player.x += 60
        camX += 750;
      }
    } if (this.top == 1){
      fill(255);
      rect(this.x + this.w/2 - 50, this.y, 100, 15);//door (boven)
      if (collision(player.x, player.y, player.w, player.h  ,  this.x + this.w/2 - 50, this.y, 100, 15)) { 
        currentRoom -= 3
        player.y -= 100
        camY -= 500;
      }
    } if (this.bottom == 1){
      fill(255);
      rect(this.x + this.w/2 - 50, this.y + this.h-15, 100, 15);//door (onder)
      if (collision(player.x, player.y, player.w, player.h  ,  this.x + this.w/2 - 50, this.y + this.h-15, 100, 15)) { 
        currentRoom += 3
        player.y += 100
        camY += 500;
      }
    }
  }
  collisionwalls(){
    if (roomnumber == currentRoom){
    }
  }
}

function drawTiles(map, d_cols, roomsize_x, roomsize_y) {
  for (let i = map.length - 1; i > -1; --i) {
    let value = map[i];
    let l = doorleft[i];
    let r = doorright[i];
    let t = doortop[i];
    let b = doorbottom[i];
    
    // distenation x , y
    let dx = (i % d_cols) * roomsize_x;
    let dy = Math.floor(i / d_cols) * roomsize_y;
    
    // render image
    if(value == 1){
      rooms.push(new Room(dx, dy, roomsize_x, roomsize_y, l,r,t,b,map.length));
    }
  }
}

//DEBUG!!! OFZOIETS
function checkRoom() {
  console.log(currentRoom);
}