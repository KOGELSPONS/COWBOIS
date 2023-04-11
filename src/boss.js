var direction = ['L', 'R','T','B']; //Different directions the boss can move/dash towards

class Boss {
  constructor(x, y, w, h, maxvx, maxvy, type, numberroom, hp) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vx = 0;
    this.vy = 0;
    this.maxvx = maxvx; //Max boss movementspeed on x-axis
    this.maxvy = maxvy; //Max boss movementspeed on y-axis
    this.type = type;
    this.roomnumber = numberroom;
    this.halfWidth = this.w / 2;
    this.halfHeight = this.h / 2;
    this.mx = this.x + this.halfWidth;
    this.my = this.y + this.halfHeight;
    this.hp = hp;
    this.walkSpeed = 2; //How fast the boss will walk.

    this.lastshot = new Date().getTime(); //Make sure the boss cannot spam attack 
    this.hitdelay = 200; //The delay before the boss will attack again
    this.damage = 10; //The damage the boss does
    this.attackPhase = 1; //The attack phase of the boss
    this.attackCounter = 0; //Keeps track of the amount of times a boss does an attack
    this.walkTimer = 10; //How long bosses will walk around
    this.shootTimer = 30 //How long the (slime) boss will be in it's shoot phase
    this.currentDirection = 'L'; //The direction the attack will start at
    this.enemyChance; //The chance an enemy will spawn during a bossfight
    
    this.slimeAngle = 0; //The angle the slime boss will shoot at
    this.slimeBulletLimit = 0; //A counter which makes sure the boss shoots once every frame
    this.slimeShootPhase = 1; //This is the different shooting phases the boss has
    this.slimeBulletCounter = 0; //How many bullets the boss shoots
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
      if (this.attackPhase == 0) { 
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
              this.attackCounter++;
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
      if (this.attackPhase == 1) {
        this.damage = 5; //When the boss is in his walking phase he will have 5 damage points
        
        //Timer for how long the boss will walk around
        if (frameCount % 60 == 0 && this.walkTimer > 0) { 
          this.walkTimer --;
        }
        if (this.walkTimer == 0) {
          this.attackCounter = 8; //When the timer runs out, reset it
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

      //Whenever the amount the boss has attacked, make the boss do a new attack and reset the this.attackCounter value
      if (this.attackCounter == 8) {
        newAttack();
        this.attackCounter = 0;
      }
    }

    //----------------------------------------------
    //-----------------SLIME_BOSS-------------------
    //----------------------------------------------
    
    if (this.type == 'slime') {
      //When the player's bullets hit the boss. 
      if (new Date().getTime() >= this.lastshot && collision(this.x,this.y,this.w,this.h, player.x,player.y,player.w,player.h)){
        this.lastshot = new Date().getTime() + this.hitdelay;
        player.hit(this.damage);
      }
      
      //Shoot phase
      if (this.attackPhase == 0) { 
        this.damage = 5; //When the boss is in his dashing phase he will have 10 damage points
        
        let angle = atan2((ROOMY + TILEY/2) - this.my, (ROOMX + TILEX/2) - this.mx);
        if (diff(this.my, (ROOMY + TILEY/2)) >= 10){ //only move when further than 10 away from the middle of the map
          let speed = sin(angle) * this.walkSpeed; //Make a velocity from the angle
          this.vy = speed;
        }else{this.vy = 0} 
        if (diff(this.mx, (ROOMX + TILEX/2)) >= 10){ //only move when further than 10 away from the middle of the map
          let speed = cos(angle) * this.walkSpeed; //Make a velocity from the angle
          this.vx = speed;
        }else{this.vx = 0}
        
        if(this.vy == 0 && this.vx == 0){ //When the boss stands still in the middle
          //Timer for how long the boss will shoot around
          if (frameCount % 60 == 0 && this.shootTimer > 0) { 
            this.shootTimer --;
          }
          if (this.shootTimer == 0) {//Reset the boss's values and make it do a new attack
            newAttack()
          }
          
          let velocity = p5.Vector.fromAngle(this.slimeAngle); //Creates a vector for the velocity so it can more easily move in a certain angle
          velocity.mult(3); // set the speed of the bullet, using mult() because we're working with vectors
          
          if(this.slimeBulletLimit == 1){ //spawn a bullet every 2 frames
            enemybullets.push(new Enemybullet(this.mx, this.my, 20, 'molotov', velocity.x, velocity.y,'',this.damage))
            this.slimeBulletLimit = 0 //reset the limiter 
            this.slimeBulletCounter ++; //Count the amount of bullets shot
          }
          this.slimeBulletLimit++ //Add 1 to this counter so a bullet gets shot every 2 frames. 
          
          if(this.slimeBulletCounter >= 500){ //If the amount of bullets shot is more or equal to 500 
            if(this.slimeShootPhase == 3){ //When on shooting-phase 3 reset the shooting phase to 0
              this.slimeShootPhase = 0
            }
            this.slimeShootPhase ++; //Change the shooting-phase by adding 1 to it
            this.slimeBulletCounter = 0; //Reset the amount of bullets shot
          }
          
          // Change the angle for the next bullet
          this.slimeAngle += TWO_PI / this.slimeShootPhase; 
          this.slimeAngle+=0.02 
        }
      }
      
      //Walk phase
      if (this.attackPhase == 1) {
        this.damage = 5; //When the boss is in his walking phase he will have 5 damage points
        
        //Timer for how long the boss will walk around
        if (frameCount % 60 == 0 && this.walkTimer > 0) { 
          this.walkTimer --;
        }
        if (this.walkTimer == 0) {
          newAttack()
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

  //subtract the according damage the player does from the boss's health
  hit(bulletdamage, distancedropoff){
    if(this.attackPhase != 0){
      console.log(bulletdamage * distancedropoff);
      this.hp -= bulletdamage * distancedropoff; 
    }  
  }
}

//Change the attack the boss does whenever this function is called.
function newAttack() {
  boss.forEach(b => {
    if (b.attackPhase == 0) {
        b.attackPhase = 1;
        b.walkTimer = 10
        b.shootTimer = 30;
    } else {
      b.attackPhase = 0;
    }
  })
}