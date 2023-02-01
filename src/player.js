let inventory = [];
var camX = 1125, camY = 250;
class Player {
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  show(){
    fill(255,0,0);
    rect(this.x, this.y, this.w, this.h);
  }
  move(){
    if (keyIsDown(68)) {
      this.x += 5;
    }
    if (keyIsDown(65)) {
      this.x -= 5;
    }
    if (keyIsDown(87)) {
      this.y -= 5;
    }
    if (keyIsDown(83)) {
      this.y += 5;
    }
  }
  camera(){
    createcamera.setPosition(camX,camY,434);
    
  }
}  
function addItem(item) {
  inventory.push(item);
}