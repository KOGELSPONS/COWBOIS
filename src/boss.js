var attackType = 1;
var attackAmount = 0;
var walkTimer = 10
var direction = ['L', 'R','T','B']
var currentDirection = 'L'
var enemyChance

class Boss {
  constructor(x, y, w, h, maxvx, maxvy, type, numberroom, hp) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.vx = 0;
    this.vy = 0;
    this.maxvx = maxvx
    this.maxvy = maxvy
    this.type = type
    this.roomnumber = numberroom
    this.halfWidth = this.w / 2;
    this.halfHeight = this.h / 2;
    this.mx = this.x + this.halfWidth;
    this.my = this.y + this.halfHeight;
    this.hp = hp;

    this.lastshot = new Date().getTime();
    this.damage = 10;
    this.hitdelay = 200;
  }
  show() {
    fill('red')
    //rect(this.x, this.y, this.w, this.h)
    if (this.type == 'monstro') {
      //image(monstro, this.x, this.y, this.w, this.h)
    }
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
    //console.log(attackAmount)
    if (this.type == 'monstro') {
        if (new Date().getTime() >= this.lastshot && collision(this.x,this.y,this.w,this.h, player.x,player.y,player.w,player.h)){
          this.lastshot = new Date().getTime() + this.hitdelay;
          player.hit(this.damage);
        }
        
      if (attackType == 0) { //DASH ATTACK
        this.damage = 10;
        if(currentDirection == 'L'){this.vx = this.maxvx,this.vy = 0, image(monstrodash_right, this.x, this.y, this.w, this.h);}
        if(currentDirection == 'R'){this.vx = -this.maxvx,this.vy = 0, image(monstrodash_left, this.x, this.y, this.w, this.h);}
        if(currentDirection == 'T'){this.vy = this.maxvy,this.vx = 0, image(monstrodash_vert, this.x, this.y-20, this.w, this.h+20);}
        if(currentDirection == 'B'){this.vy = -this.maxvy,this.vx = 0, image(monstrodash_vert, this.x, this.y-20, this.w, this.h+20);}
        console.log(currentDirection)
        rooms.forEach(r => {
          if (r.roomnumber == currentRoom) {
            borderleftx = r.x + DOORH
            borderrightx = r.x + r.w - DOORH
            bordertopy = r.y + DOORH
            borderbottomy = r.y + r.h - DOORH

            if(currentDirection == 'L' && this.x > borderrightx + 200 ||
              currentDirection == 'R' && this.x < borderleftx -200 ||
              currentDirection == 'T' && this.y > borderbottomy + 200 ||
              currentDirection == 'B' && this.y < bordertopy - 200){
              attackAmount++;
              currentDirection = direction[Math.floor(Math.random()*direction.length)];
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
              enemyChance = Math.round(random(-0.5, 1.4))
              if(enemyChance == 0){
                enemies.push(new Enemy(this.x, this.y, 80, 80, 'walker', this.roomnumber, enemies, 1))
              }
            }
          }
        })
      }

      if (attackType == 1) {
        this.damage = 5;
        if (frameCount % 60 == 0 && walkTimer > 0) { 
          walkTimer --;
        }
        if (walkTimer == 0) {
          attackAmount = 8;
        }
        console.log(walkTimer)
        let angle = atan2(player.my - this.y + this.h / 2, player.mx - this.x + this.w / 2);
        if (diff(this.y + this.h / 2, player.my) >= 30){
          let speed = sin(angle) * 5 ;
          this.vy = speed;
        }else{this.vy = 0} 
        if (diff(this.x + this.w / 2, player.mx) >= 10){
          let speed = cos(angle) * 5 ;
          this.vx = speed;
          if(this.vx >= 0){
            image(monstrowalk_right, this.x, this.y, this.w, this.h)
          }else{
            image(monstrowalk_left, this.x, this.y, this.w, this.h)
          }
        }else{this.vx = 0}
      }
      this.x += this.vx
      this.y += this.vy
      if (attackAmount == 8) {
        newAttack();
        attackAmount = 0;
      }
      if (this.hp <= 0) {
        this.hp = 0;
        console.log("killed Enemy: ");
        console.log(this);
        let idx = boss.indexOf(this); 
        boss.splice(idx,1);
      }
    }
  }
  hit(bulletdamage, distancedropoff){
    if(attackType != 0){
      console.log(bulletdamage * distancedropoff);
      this.hp -= bulletdamage * distancedropoff; 
    }  
    
      
  }
}
function newAttack() {
  if (attackType == 0) {
    attackType = 1;
    walkTimer = 10
  } else {
    attackType = 0;
  }
}