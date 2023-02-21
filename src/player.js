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
    this.friction = 0.90;
    this.damagemutliplier = 1;
    this.distancemutliplier = 1;
    this.lastshot = 0;
    this.nowshot = 100;
    this.shottime = 100; //this.nowshot - this.lastshot
    this.maxammo = 0;
    this.ammo = this.maxammo;
    this.able_to_shoot = false;
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

    //Drag system
    if (0.2 > this.vx < -0.2){
      this.vx = 0;
    } else {
      this.vx *= this.friction;
    }
    
    if (0.2 > this.vy < -0.2){
      this.vy = 0;
    } else {
      this.vy *= this.friction;
    }
    
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
  }
  camera(){
    createcamera.setPosition(camX,camY,468); //468 best camera zoom
  }
  attack(direction){
      this.nowshot = new Date().getTime();
      if (this.nowshot - this.lastshot >= this.shottime && this.ammo > 0 && this.able_to_shoot){
        this.ammo -= 1;
        this.lastshot = this.nowshot;
        if (currentWeapon == 'revolver' || 'rifle'){
          bullets.push(new Bullet(this.mx, this.my, 10,10,player.vx,player.vy, currentWeapon, direction));
        } else if (currentWeapon == 'shotgun'){
          bullets.push(new Bullet(this.mx, this.my, 15,15,player.vx,player.vy, currentWeapon, direction));
        }
      } else if (this.ammo == 0) {
      // SOUND!!
      this.ammo = this.maxammo;
      this.lastshot = new Date().getTime() + 500;
    }
  }
  inventory(){
    stroke("black");
    fill('white');
    rect(CENTERX+100, CENTERY+480, 50,50);
    rect(CENTERX+155, CENTERY+480, 50,50);
    rect(CENTERX+210, CENTERY+480, 50,50);
    noStroke();

    //inventory slot 0
    if(inventory[0] == 'revolver'){
      image(revolver, CENTERX+100, CENTERY+480, 50,50);
      //border
      this.able_to_shoot = true;
      this.maxammo = 8;
    } else if(inventory[0] == 'shotgun'){
      fill('blue');
      rect(CENTERX+100, CENTERY+480, 50,50);
      //border
      this.able_to_shoot = true;
      this.maxammo = 6;
    } else if(inventory[0] == 'rifle'){
      fill('green');
      rect(CENTERX+100, CENTERY+480, 50,50);
      //border
      this.able_to_shoot = true;
      this.maxammo = 4;
    } else {
      fill('red');
      rect(CENTERX + 100 , CENTERY+480, 50,50);
      this.able_to_shoot = false;
    }
    //inventory slot 1
    if(inventory[1] == "empty"){
      fill('red');
      rect(CENTERX + 155 , CENTERY+480, 50,50);
    }
    //inveotory slot 2
    if(inventory[2] == "empty"){
      fill('red');
      rect(CENTERX + 210 , CENTERY+480, 50,50);
    }
  }
}