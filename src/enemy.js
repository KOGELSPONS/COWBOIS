class Enemy{
  constructor(x, y, w, h, type, numberroom, others, mutlix){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.halfWidth = this.w/2;
    this.halfHeight = this.h/2;
    this.mx = this.x + this.halfWidth;
    this.my = this.y + this.halfHeight;
    this.type = type;
    this.roomnumber = numberroom;
    this.others = others;
    this.speed = random(1, 1.8);
    this.hp = 100;
    this.damagemultiplier = mutlix;
    this.direction = "R";

    
  }
  show(){
      //Debug Rect
      if (showCollision){
        fill(debugColorEnemy);
        rect(this.x, this.y, this.w, this.h);
      }
    
      if(this.type == 'walker'){
        if(this.direction == "R"){
          image(ghostenemy1_r,this.x,this.y,this.w,this.h);
        }
        if(this.direction == "L"){
          image(ghostenemy1_l,this.x,this.y,this.w,this.h);
        }
      }else if(this.type == 'dynamo'){
        if(this.direction == "R"){
          rect(this.x,this.y,this.w,this.h);
        }
        if(this.direction == "L"){
          rect(this.x,this.y,this.w,this.h);
        }
      }

      //HP bar
      translate(0,0,0.01);
      fill('white');
      stroke("black");
      rect(this.mx - 25, this.y - 15, 50, 10);
      noStroke();
      fill('red')
      rect(this.mx - 25, this.y - 15, this.hp/2, 10);
      translate(0,0,-0.01);
  }

  move(){
      // Update middle of thing X and Y
      this.mx = this.x + this.halfWidth;
      this.my = this.y + this.halfHeight;
      
      //HP system
      if (this.hp <= 0) {
        this.hp = 0;
        console.log("killed Enemy: ");
        console.log(this);
        let idx = enemies.indexOf(this); 
        enemies.splice(idx,1);
      }
      
      if(this.type == 'walker'){
        if (collision(this.x,this.y,this.w,this.h, player.x,player.y,player.w,player.h)){
          
        }
        
        //Walking to player system
        let angle = atan2(player.my - this.my, player.mx - this.mx);
        if (diff(this.my, player.my) >= 30){
          let speed = sin(angle) * this.speed ;
          this.y += speed;
        } if (diff(this.mx, player.mx) >= 30){
          let speed = cos(angle) * this.speed ;
          if (speed > 0){
            this.direction = "R";
          }else if (speed < 0){
            this.direction = "L";
          }
          this.x += speed;
        }
        
        for (let i = 0; i < enemies.length; i++) {
          let otherEnemy = enemies[i];
          let distance = dist(this.mx, this.my, otherEnemy.mx, otherEnemy.my);
        
          if (distance < 50 && otherEnemy != this) {
            // If the enemies collide, move them apart from each other
            angle = atan2(this.y - otherEnemy.y, this.x - otherEnemy.x);
            this.x += cos(angle);
            this.y += sin(angle);
          }
        }
        
      }
    
      if(this.type == 'dynamo'){
        
        //Walking to player system
        let enemyPlayerdistance = dist(player.mx, player.my, this.mx, this.my);
        if(enemyPlayerdistance > 300){
          let angle = atan2(player.my - this.my, player.mx - this.mx);
          if (diff(this.my, player.my) >= 30){
            let speed = sin(angle) * this.speed ;
            this.y += speed;
          } 
          if (diff(this.mx, player.mx) >= 30){
            let speed = cos(angle) * this.speed ;
            if (speed > 0){
              this.direction = "R";
            } else if (speed < 0){
              this.direction = "L";
            }
            this.x += speed;
          }
        }
        
        for (let i = 0; i < enemies.length; i++) {
          let otherEnemy = enemies[i];
          let distance = dist(this.mx, this.my, otherEnemy.mx, otherEnemy.my);
        
          if (distance < 50 && otherEnemy != this) {
            // If the enemies collide, move them apart from each other
            angle = atan2(this.y - otherEnemy.y, this.x - otherEnemy.x);
            this.x += cos(angle);
            this.y += sin(angle);
          }
        }

        let dynamoTimer = 1;
        if (frameCount % 60 == 0 && dynamoTimer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
          dynamoTimer --;
        }
        
        if (dynamoTimer == 0) {
          let angle = atan2(player.my - this.my, player.mx - this.mx);
          let velX = cos(angle) * 5;
          let velY = sin(angle) * 5;
          let playerEnemyDist = dist(this.x, this.y, player.x, player.y)
          enemybullets.push(new Enemybullet(this.mx, this.my, 20, 'molotov', velX, velY,playerEnemyDist))
          console.log(velX)
          dynamoTimer = 1;
        }
      }
  }
  attack(type){
    if (type == "light"){
      
    } else if (type == "heavy") {
      
    } else if (type == "shoot") {
      
    } else if (type == "molotov"){
      
    }
  }
  hit(bulletdamage, distancedropoff){
      
    console.log(this.damagemultiplier * bulletdamage * distancedropoff);
    this.hp -= this.damagemultiplier * bulletdamage * distancedropoff;
      
  }
}