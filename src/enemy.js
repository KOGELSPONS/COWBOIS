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
    this.xspeed = random(1, 1.8);
    this.yspeed = random(1, 1.8);
    this.hp = 100;
    this.damagemultiplier = mutlix
  }
  show(){
    if (this.roomnumber == currentRoom){
      if(this.type == 'walker'){
        //fill('red')    
        //rect(this.x, this.y, this.w, this.h);
        image(ghostenemy1,this.x,this.y,this.w,this.h);
      }
      translate(0,0,0.01);
      fill('white');
      stroke("black");
      rect(this.x, this.y - 15, 50, 10);
      noStroke();
      fill('red')
      rect(this.x, this.y - 15, this.hp/2, 10);
      translate(0,0,-0.01);
    }
  }
  move(){
    if (this.hp <= 0) {
      this.hp = 0;
      console.log("killed this Enemy");
      console.log(this);
      let idx = enemies.indexOf(this); 
      enemies.splice(idx,1);
    }
    if (this.roomnumber == currentRoom){
      if(this.type == 'walker'){
        let angle = atan2(player.my - this.my, player.mx - this.mx);
        if (diff(this.my, player.my) >= 30){
          this.y += sin(angle) * this.yspeed;
        } if (diff(this.mx, player.mx) >= 30){
          this.x += cos(angle) * this.xspeed;
        }
        this.mx = this.x + this.halfWidth;
        this.my = this.y + this.halfHeight;
        
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
    }
  }
  hit(bulletdamage, distancedropoff){
    if (this.roomnumber == currentRoom){
      console.log(this.damagemultiplier * bulletdamage * distancedropoff);
      this.hp -= this.damagemultiplier * bulletdamage * distancedropoff;
    }
  }
}