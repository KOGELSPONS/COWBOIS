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
    this.movementmultiplier = 1;
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
    this.currentWeapon = 'null';
    this.look = "Right";
  }
  show(){    
    //Apply the velocity to the seen player
    this.x += this.vx;
    this.y += this.vy;
    this.mx = this.x + this.halfWidth;
    this.my = this.y + this.halfHeight;
    
    //Player Head 
    fill('aqua');
    if (this.look == "Right"){
      fill('purple');
      image(body, this.x, this.y, this.w, this.h);
      image(RockRight,this.x - 5, this.y - ((this.w + 10)*1.5) + 10,this.w + 10,(this.w + 10)*1.5);
    } else if (this.look == "Left"){
      fill('purple');
      image(body, this.x, this.y, this.w, this.h);
      image(RockLeft,this.x - 5, this.y - ((this.w + 10)*1.5) + 10,this.w + 10,(this.w + 10)*1.5)
    }
    //Debug colors
    if (showCollision){
      fill(debugColorPlayer);
      //Player bottom (collision)
      rect(this.x, this.y, this.w, this.h);
    }
    
    //HP bar
    translate(0,0,0.01);
    fill('floralwhite');
    stroke("black");
    strokeWeight(2);
    rect(ROOMX + TILEX - 300, ROOMY + 480, 200, 50);
    noStroke();
    fill('red');
    rect(ROOMX + TILEX - 300, ROOMY + 480, this.hp*2, 50);
    fill("black");
    textSize(30);
    textAlign(CENTER, CENTER);
    text(this.hp, ROOMX + TILEX - 200, ROOMY + 501);
    textAlign(LEFT, BASELINE);
    
    //Ammo text
    fill('red');
    textSize(50);
    text(this.ammo,ROOMX + TILEX-90, ROOMY+45 + 480);

    if(reload_show_timer){
      textSize(20);
      text('(R)',ROOMX + TILEX-57, ROOMY+45 + 480);
    }
    translate(0,0,-0.01);
  }
  move(){
    if (this.hp <= 0){
      gameState = 3;
      image(deathscreen,0,0,WIDTH,HEIGHT);
    }
    //Max speed system
    if (this.vx >= 5){
      this.vx = 5
    } if (this.vx <= - 5){
      this.vx = - 5
    } if (this.vy >= 5){
      this.vy = 5
    } if (this.vy <= - 5){
      this.vy = - 5
    }

    //Drag system
    if (1.0 > this.vx < -1.0){
      this.vx = 0;
    } else {
      this.vx *= this.friction;
    }
    
    if (1.0 > this.vy < -1.0){
      this.vy = 0;
    } else {
      this.vy *= this.friction;
    }
    
    // velocity adding system
    if (keyIsDown(68)) {
      this.vx += 0.8;
    }
    if (keyIsDown(65)) {
      this.vx -= 0.8;
    }
    if (keyIsDown(87)) {
      this.vy -= 0.8;
    }
    if (keyIsDown(83)) {
      this.vy += 0.8;
    }
    if (this.vx > 0){
      this.look = "Right"
    } else if (this.vx < 0){
      this.look = "Left"
    }
  }
  // camera(){
  //   createcamera.setPosition(camX,camY,468); //468 best camera zoom
  // }
  attack(direction){
    this.nowshot = new Date().getTime();
    if (this.nowshot - this.lastshot >= this.shottime && this.ammo > 0 && this.able_to_shoot){
      this.ammo -= 1;
      this.lastshot = this.nowshot;
      if (this.currentWeapon == 'revolver' || this.currentWeapon == 'rifle'){
        bullets.push(new Bullet(this.mx, this.my, 8,player.vx,player.vy, this.currentWeapon, direction));
        if(inventory[1] == 'dualshot'){
          if(direction == 'L'){ direction = 'R';}
          else if(direction == 'R'){ direction = 'L';}
          else if(direction == 'U'){ direction = 'D';}
          else if(direction == 'D'){ direction = 'U';}
          bullets.push(new Bullet(this.mx, this.my, 8,player.vx,player.vy, this.currentWeapon, direction));
        }  
      }
      else if (this.currentWeapon == 'shotgun'){
        for(let i = 0; i < 20; i +=1){
          if(shotgun_shot.isPlaying()){
            shotgun_shot.stop();
          }
          shotgun_shot.play(); 
          bullets.push(new Bullet(this.mx, this.my, 5,player.vx,player.vy, this.currentWeapon, direction));      
        }
        if(inventory[1] == 'dualshot'){
          if(direction == 'L'){ direction = 'R';}
          else if(direction == 'R'){ direction = 'L';}
          else if(direction == 'U'){ direction = 'D';}
          else if(direction == 'D'){ direction = 'U';}
          for(let i = 0; i < 20; i +=1){
            bullets.push(new Bullet(this.mx, this.my, 5,player.vx,player.vy, this.currentWeapon, direction));      
          }    
        }
      }
    } else if (this.ammo == 0) {
      this.reload();
      if (this.currentWeapon == 'shotgun'){
        shotgun_reload.play();
      }
    }
  }
  reload(){
    // SOUND!!
    this.ammo = this.maxammo;
    this.lastshot = new Date().getTime() + this.reloadtime;
  }
  hit(damage){
    cameraMode = "shake";
    this.shaketime = new Date().getTime();
    this.hp -= damage * this.resistancemutliplier;
    if (this.hp < 0){
      this.hp = 0;
    }
  }
  inventory(){

    if(this.able_to_shoot){
      if (this.ammo == 0){
        reload_show_timer = true;
      } else if (this.lastshot <= new Date().getTime()){
        reload_show_timer = false;
      }
    }
    
    translate(0,0,0.01);
    stroke("black");
    fill('floralwhite');
    rect(ROOMX + 100, ROOMY+480, 50,50);
    rect(ROOMX + 155, ROOMY+480, 50,50);
    rect(ROOMX + 210, ROOMY+480, 50,50);
    noStroke();
    

    if(inventory[0] == 'revolver'){
      image(revolver, ROOMX + 100, ROOMY+480, 50,50);

    } else if(inventory[0] == 'shotgun'){
      image(shotgun, ROOMX + 100, ROOMY+480, 50,50);
      
    } else if(inventory[0] == 'rifle'){
      image(rifle, ROOMX + 100, ROOMY+480, 50,50);
      
    } else {
      fill('red');
      rect(ROOMX + 100 , ROOMY+480, 50,50);
      // this.able_to_shoot = false;
    }
    
    //inventory slot 1
    if(inventory[1] == 'dualshot'){
      image(dualshot, ROOMX + 155 , ROOMY+480, 50,50);
      dogActive = false;
    }else if(inventory[1] == 'collar'){
      image(collar, ROOMX + 155 , ROOMY+480, 50,50);
      dogActive = true;
    }
    else{
      fill('red');
      rect(ROOMX + 155 , ROOMY+480, 50,50);
      dogActive = false;
    }
    
    //inveotory slot 2
    if(inventory[2] == "empty"){
      fill('red');
      rect(ROOMX + 210 , ROOMY+480, 50,50);
    }
    translate(0,0,-0.01);
  }
  update(){
    if(inventory[0] == 'revolver'){
      console.log('revolver');
      this.able_to_shoot = true;
      this.maxammo = 8 + this.extraammo;
      this.shottime = 100 * this.shoottimemutliplier;
      this.reloadtime = 500 * this.reloadmutliplier;
      this.currentWeapon = inventory[0];
      
    } else if(inventory[0] == 'shotgun'){
      console.log('shotgun');
      this.able_to_shoot = true;
      this.maxammo = 2 + this.extraammo;
      this.shottime = 150 * this.shoottimemutliplier;
      this.reloadtime = 800 * this.reloadmutliplier;
      this.currentWeapon = inventory[0];
      
    } else if(inventory[0] == 'rifle'){
      console.log('rifle');
      this.able_to_shoot = true;
      this.maxammo = 4 + this.extraammo;
      this.shottime = 300 * this.shoottimemutliplier;
      this.reloadtime = 1000 * this.reloadmutliplier;
      this.currentWeapon = inventory[0];
    } else {
      this.able_to_shoot = false;
    }
  }
}

class Dog{
  constructor(x,y,w,h,r){
    this.x = x
    this.y = y
    this.halfWidth = this.w/2;
    this.halfHeight = this.h/2;
    this.mx = this.x + this.halfWidth;
    this.my = this.y + this.halfHeight;
    this.w = w
    this.h = h
    this.r = r
    this.walkDirectionX = 0;
    this.walkDirectionY = 0;    
    this.moveTimer = 4;
    this.enemyKilled = false;
    this.healTimer = 3;
  }
  show(){
    //rect(this.x, this.y, this.w, this.h)
    if(dog.walkDirectionX >= 0){
      image(dog_r,this.x,this.y,this.w,this.h);
    }else if(dog.walkDirectionX < 0){
      image(dog_l,this.x,this.y,this.w,this.h);
    }
  }
  move(){
    
    if (frameCount % 60 == 0 && this.moveTimer > 0) {
      this.moveTimer --;
    }
    if (this.moveTimer == 4) {
      this.walkDirectionX = round(random(-1,1))
      this.walkDirectionY = round(random(-1,1))
      this.moveTimer --;
    }
    if(this.moveTimer <= 0){
      this.moveTimer = 4;
    }
    this.x += this.walkDirectionX;
    this.y += this.walkDirectionY;
  }
  heal(){
    if (frameCount % 60 == 0 && this.healTimer > 0 && this.enemyKilled) {
      this.healTimer --;
    }
    if(this.healTimer <= 0){
      this.healTimer = 3
      this.enemyKilled = false;
    }else if(this.healTimer > 0 && this.enemyKilled){
      fill("white");
      circle(this.x+this.w/2, this.y+this.h/2, this.r)
      if(dist(player.mx, player.my, this.x+this.w/2, this.y+this.h/2) < this.r/1.5 && player.hp < 100){
        player.hp += 10
        this.enemyKilled = false;
      }  
    }
    
  }
  collisionwalls(){
    rooms.forEach(r => {
      if (r.roomnumber == currentRoom){
        borderleftx = r.x + DOORH
        borderrightx = r.x + r.w - DOORH
        bordertopy = r.y + DOORH
        borderbottomy = r.y + r.h - DOORH
        if (showCollision){
          noFill();
          stroke(debugColorStatic);
          strokeWeight(2);
          rect(borderleftx, bordertopy, r.w-DOORH*2, r.h-DOORH*2);
          noStroke();
        }
      }
      if (dog.x < borderleftx){
        dog.x = borderleftx;
      } else if (dog.x + dog.w > borderrightx){
        dog.x = borderrightx - dog.w;
      } if (dog.y < bordertopy){
        dog.y = bordertopy;
      } else if (dog.y + dog.h > borderbottomy){
        dog.y = borderbottomy - dog.h;
      }
    })
    placables.forEach(p => {
      if(collision(dog.x,dog.y,dog.w,dog.h, p.x,p.y,p.w,p.h)){
        dog.walkDirectionY *= -1
        dog.walkDirectionX *= -1

      }
    })
  }
}