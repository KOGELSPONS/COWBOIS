let inventory = [];

var camX = TILEX/2, camY = TILEY/2;

class Player {
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vx = 0;
    this.vy = 0;
  }
  show(){    
    //Apply the velocity to the seen player
    this.x += this.vx;
    this.y += this.vy;
    
    fill(255,0,0);
    rect(this.x, this.y, this.w, this.h);
  }
  move(){
    // velocity adding system
    if (keyIsDown(68)) {
      this.vx += 2;
    }
    if (keyIsDown(65)) {
      this.vx -= 2;
    }
    if (keyIsDown(87)) {
      this.vy -= 2;
    }
    if (keyIsDown(83)) {
      this.vy += 2;
    }

    //Drag system
    if (this.vx > 0){
      this.vx -= 1;
    } if (this.vx < 0){
      this.vx += 1;
    } if (this.vy > 0){
      this.vy -= 1;
    } if (this.vy < 0){
      this.vy += 1;
    }
    //Max speed system
    if (this.vx >= 8){
      this.vx = 8
    } if (this.vx <= -8){
      this.vx = -8
    } if (this.vy >= 8){
      this.vy = 8
    } if (this.vy <= -8){
      this.vy = -8
    }
  }
  camera(){
    createcamera.setPosition(camX,camY,468); //468 best camera zoom
  }
}  
function addItem(item) {
  inventory.push(item);
}