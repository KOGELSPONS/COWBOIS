var attackType = 1;
var attackAmount = 0;
var walkTimer = 10;
var direction = ['L', 'R','T','B'];
var currentDirection = 'L';
var enemyChance;

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
  }
  show() {
    //HP bar
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
      if (attackType == 0) { 
        this.damage = 10; //When the boss is in his dashing phase he will have 10 damage points
        
        //Different images and movement variables in certain dash-directions
        if(currentDirection == 'L'){this.vx = this.maxvx,this.vy = 0, image(monstrodash_right, this.x, this.y, this.w, this.h);}
        if(currentDirection == 'R'){this.vx = -this.maxvx,this.vy = 0, image(monstrodash_left, this.x, this.y, this.w, this.h);}
        if(currentDirection == 'T'){this.vy = this.maxvy,this.vx = 0, image(monstrodash_vert, this.x, this.y-20, this.w, this.h+20);}
        if(currentDirection == 'B'){this.vy = -this.maxvy,this.vx = 0, image(monstrodash_vert, this.x, this.y-20, this.w, this.h+20);}

        //Boss and wall interaction
        rooms.forEach(r => {
          if (r.roomnumber == currentRoom) {
            borderleftx = r.x + DOORH
            borderrightx = r.x + r.w - DOORH
            bordertopy = r.y + DOORH
            borderbottomy = r.y + r.h - DOORH
            
            //When the boss collides with any of the walls in that room.
            if(currentDirection == 'L' && this.x > borderrightx + 200 ||
              currentDirection == 'R' && this.x < borderleftx -200 ||
              currentDirection == 'T' && this.y > borderbottomy + 200 ||
              currentDirection == 'B' && this.y < bordertopy - 200){
              attackAmount++;
              currentDirection = direction[Math.floor(Math.random()*direction.length)]; //Chooses a random direction from the 'direction' array
              
              //Position reset when the a new direction is chosen
              if(currentDirection == 'L'){
                this.x = borderleftx -300;
                this.y = player.y - player.h;
              }else if(currentDirection == 'R'){
                this.x = borderrightx +300;
                this.y = player.y - player.h;
              }else if(currentDirection == 'T'){
                this.y = bordertopy -300;
                this.x = player.x ;
              }else if(currentDirection == 'B'){
                this.y = borderbottomy +300;
                this.x = player.x ;
              }
              
              //Make it a 1 in 3 chance an enemy spawns during the boss fight
              enemyChance = Math.round(random(-0.5, 2.4))
              if(enemyChance == 0){
                enemies.push(new Enemy(this.x, this.y, 80, 80, 'walker', this.roomnumber, enemies, 1))
              }
            }
          }
        })
      }

      //Walk phase
      if (attackType == 1) {
        this.damage = 5; //When the boss is in his walking phase he will have 5 damage points
        
        //Timer for how long the boss will walk around
        if (frameCount % 60 == 0 && walkTimer > 0) { 
          walkTimer --;
        }
        if (walkTimer == 0) {
          attackAmount = 8; //When the timer runs out, reset it
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

      //Whenever the amount the boss has attacked, make the boss do a new attack and reset the attackAmount value
      if (attackAmount == 8) {
        newAttack();
        attackAmount = 0;
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
      
      //Dash phase
      if (attackType == 0) { 
        this.damage = 10; //When the boss is in his dashing phase he will have 10 damage points
        
        //Different images and movement variables in certain dash-directions
        if(currentDirection == 'L'){this.vx = this.maxvx,this.vy = 0, image(monstrodash_right, this.x, this.y, this.w, this.h);}
        if(currentDirection == 'R'){this.vx = -this.maxvx,this.vy = 0, image(monstrodash_left, this.x, this.y, this.w, this.h);}
        if(currentDirection == 'T'){this.vy = this.maxvy,this.vx = 0, image(monstrodash_vert, this.x, this.y-20, this.w, this.h+20);}
        if(currentDirection == 'B'){this.vy = -this.maxvy,this.vx = 0, image(monstrodash_vert, this.x, this.y-20, this.w, this.h+20);}
      }

      //Walk phase
      if (attackType == 1) {
        this.damage = 5; //When the boss is in his walking phase he will have 5 damage points
        
        //Timer for how long the boss will walk around
        if (frameCount % 60 == 0 && walkTimer > 0) { 
          walkTimer --;
        }
        if (walkTimer == 0) {
          attackAmount = 8; //When the timer runs out, reset it
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

      //Whenever the amount the boss has attacked, make the boss do a new attack and reset the attackAmount value
      if (attackAmount == 8) {
        newAttack();
        attackAmount = 0;
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
    if(attackType != 0){
      console.log(bulletdamage * distancedropoff);
      this.hp -= bulletdamage * distancedropoff; 
    }  
  }
}

//Change the attack the boss does whenever this function is called.
function newAttack() {
  if (attackType == 0) {
    attackType = 1;
    walkTimer = 10
  } else {
    attackType = 0;
  }
}