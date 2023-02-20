var camX = TILEX*1.5, camY = TILEY/2;

class Player {
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.halfWidth = this.w/2;
    this.halfHeight = this.h/2;
    this.mx = this.x + this.halfWidth;
    this.my = this.y + this.halfHeight;
    this.vx = 0;
    this.vy = 0;
    this.damagemutliplier = 1;
    this.distancemutliplier = 1;
  }
  show(){    
    //Apply the velocity to the seen player
    this.x += this.vx;
    this.y += this.vy;
    this.mx = this.x + this.halfWidth;
    this.my = this.y + this.halfHeight;
    
    //Player Head
    fill(255,255,0);
    rect(this.x - 5, this.y - 40, this.w + 10, 40)
    //Player bottom (collision)
    fill(255,0,0);
    rect(this.x, this.y, this.w, this.h);
  }
  move(){
    // Update middle of thing X and Y
    this.mx = this.x + this.halfWidth;
    this.my = this.y + this.halfHeight;
    
    // velocity adding system
    if (keyIsDown(68)) {
      this.vx += 1.5;
    }
    if (keyIsDown(65)) {
      this.vx -= 1.5;
    }
    if (keyIsDown(87)) {
      this.vy -= 1.5;
    }
    if (keyIsDown(83)) {
      this.vy += 1.5;
    }

    //Drag system
    if (this.vx > 0){
      this.vx -= 0.5;
    } if (this.vx < 0){
      this.vx += 0.5;
    } if (this.vy > 0){
      this.vy -= 0.5;
    } if (this.vy < 0){
      this.vy += 0.5;
    }
    //Max speed system
    if (this.vx >= 6){
      this.vx = 6
    } if (this.vx <= - 6){
      this.vx = -6
    } if (this.vy >= 6){
      this.vy = 6
    } if (this.vy <= - 6){
      this.vy = - 6
    }
  }
  camera(){
    createcamera.setPosition(camX,camY,468); //468 best camera zoom
  }
  attack(direction){
    if (currentWeapon == 'pistol' || 'revolver'){
      bullets.push(new Bullet(this.mx, this.my, 10,10,player.vx,player.vy, currentWeapon, direction));
    } else if (currentWeapon == 'shotgun'){
      bullets.push(new Bullet(this.mx, this.my, 15,15,player.vx,player.vy, currentWeapon, direction));
    }
  }
}  

function addItem(item) {
  inventory.push(item);
}