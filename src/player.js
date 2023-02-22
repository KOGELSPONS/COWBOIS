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
    
    this.hp = 100;
    this.resistancemutliplier = 1;
    this.damagemutliplier = 1;
    this.distancemutliplier = 1;
    this.reloadmutliplier = 1;
    this.shoottimemutliplier = 1;
    this.extraammo = 0;
    
    this.lastshot = 0;
    this.nowshot = 0;
    this.shottime = 0; //this.nowshot - this.lastshot
    
    this.maxammo = 0;
    this.ammo = this.maxammo;
    this.able_to_shoot = false;
    this.reloadtime = 0;
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

    //HP bar
    translate(0,0,0.01);
    fill('white');
    stroke("black");
    rect(ROOMX + TILEX - 300, ROOMY + 480, 200, 50);
    noStroke();
    fill('red')
    rect(ROOMX + TILEX - 300, ROOMY + 480, this.hp*2, 50);
    translate(0,0,-0.01);
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
      this.lastshot = new Date().getTime() + this.reloadtime;
    }
  }
  hit(damage){
    this.hp -= damage * this.resistancemutliplier;
    if (this.hp < 0){
      this.hp = 0;
    }
  }
  inventory(){
    stroke("black");
    fill('white');
    rect(ROOMX + 100, ROOMY+480, 50,50);
    rect(ROOMX + 155, ROOMY+480, 50,50);
    rect(ROOMX + 210, ROOMY+480, 50,50);
    noStroke();

    //inventory slot 0
    if(inventory[0] == 'revolver'){
      image(revolver, ROOMX + 100, ROOMY+480, 50,50);
      //border
      this.able_to_shoot = true;
      this.maxammo = 8 + this.extraammo;
      this.shottime = 100 * this.shoottimemutliplier;
      this.reloadtime = 500 * this.reloadmutliplier;
      
    } else if(inventory[0] == 'shotgun'){
      fill('blue');
      rect(ROOMX + 100, ROOMY+480, 50,50);
      //border
      this.able_to_shoot = true;
      this.maxammo = 6 + this.extraammo;
      this.shottime = 150 * this.shoottimemutliplier;
      this.reloadtime = 800 * this.reloadmutliplier;
      
    } else if(inventory[0] == 'rifle'){
      fill('green');
      rect(ROOMX + 100, ROOMY+480, 50,50);
      //border
      this.able_to_shoot = true;
      this.maxammo = 4 + this.extraammo;
      this.shottime = 200 * this.shoottimemutliplier;
      this.reloadtime = 1000 * this.reloadmutliplier;
      
    } else {
      fill('red');
      rect(ROOMX + 100 , ROOMY+480, 50,50);
      this.able_to_shoot = false;
    }
    //inventory slot 1
    if(inventory[1] == "empty"){
      fill('red');
      rect(ROOMX + 155 , ROOMY+480, 50,50);
    }
    //inveotory slot 2
    if(inventory[2] == "empty"){
      fill('red');
      rect(ROOMX + 210 , ROOMY+480, 50,50);
    }
  }
}