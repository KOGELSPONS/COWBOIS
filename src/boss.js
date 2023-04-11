var direction = ['L', 'R','T','B'];

class Boss {
  constructor(x, y, w, h, maxvx, maxvy, type, numberroom, hp) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vx = 0;
    this.vy = 0;
    this.maxvx = maxvx;
    this.maxvy = maxvy;
    this.type = type;
    this.roomnumber = numberroom;
    this.halfWidth = this.w / 2;
    this.halfHeight = this.h / 2;
    this.mx = this.x + this.halfWidth;
    this.my = this.y + this.halfHeight;
    this.hp = hp;
    this.walkSpeed = 2;

    this.lastshot = new Date().getTime();
    this.damage = 10;
    this.hitdelay = 200;
    this.attackType = 0;
    this.attackAmount = 0;
    this.walkTimer = 10;
    this.shootTimer = 30
    this.currentDirection = 'L';
    this.enemyChance;
    this.slimeAngle = 0
    this.slimeBulletSpawn = 0;
    this.slimeShootPhase = 1;
    this.slimePhase = 0;
  }
  show() {
    //HP bar
    rect(this.x, this.y, this.w, this.h)
    translate(0,0,0.01);
    fill('white');
    stroke("black");
    rect(this.x + this.halfWidth - 50, this.y - 15, 100, 10);
    noStroke();
    fill('red')
    rect(this.x + this.halfWidth - 50, this.y - 15, this.hp/10, 10);
    translate(0,0,-0.01);
  }
  move() {
    //m(x/y) is the middle x and y. This is where the boss will move towards when in his walking phase.
    this.mx = this.x + this.halfWidth;
    this.my = this.y + this.halfHeight;
    
    if (this.type == 'monstro') {
      //When the player's bullets hit the boss. 
      if (new Date().getTime() >= this.lastshot && collision(this.x,this.y,this.w,this.h, player.x,player.y,player.w,player.h)){
        this.lastshot = new Date().getTime() + this.hitdelay;
        player.hit(this.damage);
      }
      
      //Dash phase
      if (this.attackType == 0) { 
        this.damage = 10; //When the boss is in his dashing phase he will have 10 damage points
        
        //Different images and movement variables in certain dash-directions
        if(this.currentDirection == 'L'){this.vx = this.maxvx,this.vy = 0, image(monstrodash_right, this.x, this.y, this.w, this.h);}
        if(this.currentDirection == 'R'){this.vx = -this.maxvx,this.vy = 0, image(monstrodash_left, this.x, this.y, this.w, this.h);}
        if(this.currentDirection == 'T'){this.vy = this.maxvy,this.vx = 0, image(monstrodash_vert, this.x, this.y-20, this.w, this.h+20);}
        if(this.currentDirection == 'B'){this.vy = -this.maxvy,this.vx = 0, image(monstrodash_vert, this.x, this.y-20, this.w, this.h+20);}

        //Boss and wall interaction
        rooms.forEach(r => {
          if (r.roomnumber == currentRoom) {
            borderleftx = r.x + DOORH
            borderrightx = r.x + r.w - DOORH
            bordertopy = r.y + DOORH
            borderbottomy = r.y + r.h - DOORH
            
            //When the boss collides with any of the walls in that room.
            if(this.currentDirection == 'L' && this.x > borderrightx + 200 ||
              this.currentDirection == 'R' && this.x < borderleftx -200 ||
              this.currentDirection == 'T' && this.y > borderbottomy + 200 ||
              this.currentDirection == 'B' && this.y < bordertopy - 200){
              this.attackAmount++;
              this.currentDirection = direction[Math.floor(Math.random()*direction.length)]; //Chooses a random direction from the 'direction' array
              
              //Position reset when the a new direction is chosen
              if(this.currentDirection == 'L'){
                this.x = borderleftx -300;
                this.y = player.y - player.h;
              }else if(this.currentDirection == 'R'){
                this.x = borderrightx +300;
                this.y = player.y - player.h;
              }else if(this.currentDirection == 'T'){
                this.y = bordertopy -300;
                this.x = player.x ;
              }else if(this.currentDirection == 'B'){
                this.y = borderbottomy +300;
                this.x = player.x ;
              }
              
              //Make it a 1 in 3 chance an enemy spawns during the boss fight
              this.enemyChance = Math.round(random(-0.5, 2.4))
              if(this.enemyChance == 0){
                enemies.push(new Enemy(this.x, this.y, 80, 80, 'walker', this.roomnumber, enemies, 1))
              }
            }
          }
        })
      }

      //Walk phase
      if (this.attackType == 1) {
        this.damage = 5; //When the boss is in his walking phase he will have 5 damage points
        
        //Timer for how long the boss will walk around
        if (frameCount % 60 == 0 && this.walkTimer > 0) { 
          this.walkTimer --;
        }
        if (this.walkTimer == 0) {
          this.attackAmount = 8; //When the timer runs out, reset it
        }
        
        //Get the angle the boss will have to walk to get to the player
        let angle = atan2(player.my - this.my, player.mx - this.mx);
        if (diff(this.my, player.my) >= 50){ //only move when further than 50 away from the player
          let speed = sin(angle) * this.walkSpeed; //Make a velocity from the angle
          this.vy = speed;
        }else{this.vy = 0} 
        if (diff(this.mx, player.mx) >= 50){ //only move when further than 50 away from the player
          let speed = cos(angle) * this.walkSpeed; //Make a velocity from the angle
          this.vx = speed;
          //Different images for different velocities
          if(this.vx >= 0){
            image(monstrowalk_right, this.x, this.y, this.w, this.h)
          }else{
            image(monstrowalk_left, this.x, this.y, this.w, this.h)
          }
        }else{
          this.vx = 0; 
          image(monstrowalk_right, this.x, this.y, this.w, this.h);
        }
      }
      
      //Apply the velocities onto the positional values
      this.x += this.vx
      this.y += this.vy

      //Whenever the amount the boss has attacked, make the boss do a new attack and reset the this.attackAmount value
      if (this.attackAmount == 8) {
        newAttack();
        this.attackAmount = 0;
      }

      //When getting the boss's hp to 0 or below, delete the boss from the 'boss' array
      if (this.hp <= 0) {
        this.hp = 0;
        console.log("killed Enemy: ");
        console.log(this);
        let idx = boss.indexOf(this); 
        boss.splice(idx,1);
      }
    }

    
    if (this.type == 'slime') {
      //When the player's bullets hit the boss. 
      if (new Date().getTime() >= this.lastshot && collision(this.x,this.y,this.w,this.h, player.x,player.y,player.w,player.h)){
        this.lastshot = new Date().getTime() + this.hitdelay;
        player.hit(this.damage);
      }
      
      //Shoot phase
      if (this.attackType == 0) { 
        this.damage = 5; //When the boss is in his dashing phase he will have 10 damage points
        
        //Timer for how long the boss will shoot around
        if (frameCount % 60 == 0 && this.shootTimer > 0) { 
          this.shootTimer --;
        }
        if (this.shootTimer == 0) {//Reset the boss's values
          newAttack()
        }
        let velocity = p5.Vector.fromAngle(this.slimeAngle);
        velocity.mult(3); // set the speed of the bullet
        if(this.slimeBulletSpawn == 1){
          enemybullets.push(new Enemybullet(this.mx, this.my, 20, 'molotov', velocity.x, velocity.y,'',this.damage))
          this.slimeBulletSpawn = 0
          this.slimePhase ++;
        }
        if(this.slimePhase >= 500){
          if(this.slimeShootPhase == 3){
            this.slimeShootPhase = 0
          }
          this.slimeShootPhase ++;
          this.slimePhase = 0;
        }
        console.log(this.slimePhase)
        this.slimeBulletSpawn++
        this.slimeAngle += TWO_PI / this.slimeShootPhase; // change the angle for the next bullet
        this.slimeAngle+=0.02 
      }
      //Walk phase
      if (this.attackType == 1) {
        this.damage = 5; //When the boss is in his walking phase he will have 5 damage points
        
        //Timer for how long the boss will walk around
        if (frameCount % 60 == 0 && this.walkTimer > 0) { 
          this.walkTimer --;
        }
        if (this.walkTimer == 0) {
          this.attackAmount = 8; //When the timer runs out, reset it
        }
        
        //Get the angle the boss will have to walk to get to the player
        let angle = atan2(player.my - this.my, player.mx - this.mx);
        if (diff(this.my, player.my) >= 50){ //only move when further than 50 away from the player
          let speed = sin(angle) * this.walkSpeed; //Make a velocity from the angle
          this.vy = speed;
        }else{this.vy = 0} 
        if (diff(this.mx, player.mx) >= 50){ //only move when further than 50 away from the player
          let speed = cos(angle) * this.walkSpeed; //Make a velocity from the angle
          this.vx = speed;
          //Different images for different velocities
          if(this.vx >= 0){
            image(monstrowalk_right, this.x, this.y, this.w, this.h)
          }else{
            image(monstrowalk_left, this.x, this.y, this.w, this.h)
          }
        }else{
          this.vx = 0; 
          image(monstrowalk_right, this.x, this.y, this.w, this.h);
        }
      }else{ //When the boss is not walking, make him stand still
        this.vx = 0;
        this.vy = 0;
      }
      
      //Apply the velocities onto the positional values
      this.x += this.vx
      this.y += this.vy

      //Whenever the amount the boss has attacked, make the boss do a new attack and reset the this.attackAmount value
      if (this.attackAmount == 8) {
        newAttack()
        this.attackAmount = 0;
      }

      //When getting the boss's hp to 0 or below, delete the boss from the 'boss' array
      if (this.hp <= 0) {
        this.hp = 0;
        console.log("killed Enemy: ");
        console.log(this);
        let idx = boss.indexOf(this); 
        boss.splice(idx,1);
      }
    }
  }

  //subtract the according damage the player does from the boss's health
  hit(bulletdamage, distancedropoff){
    if(this.attackType != 0){
      console.log(bulletdamage * distancedropoff);
      this.hp -= bulletdamage * distancedropoff; 
    }  
  }
}

//Change the attack the boss does whenever this function is called.
function newAttack() {
  boss.forEach(b => {
    if (b.attackType == 0) {
        b.attackType = 1;
        b.walkTimer = 10
        b.shootTimer = 30;
    } else {
      b.attackType = 0;
    }
  })
}