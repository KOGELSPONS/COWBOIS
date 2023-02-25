class Bullet {
  constructor(mx,my,w,h,addvx,addvy,type,direction){
    this.mx = mx;
    this.my = my;

    this.w = w;
    this.h = h;
    this.halfWidth = this.w/2;
    this.halfHeight = this.h/2;

    this.x = mx - this.halfWidth;
    this.y = my - this.halfHeight;
    
    this.vx = 0;
    this.vy = 0;
    this.direction = direction;
    this.bullettype = type;
    this.AddVX = addvx;
    this.AddVY = addvy;
    
    //Calculation 1 TIME
    if (this.bullettype == 'revolver'){
      this.AddV = 10;
      this.friciton = 0.98 * random(0.996 , 1);
      this.damage = 3;
    } else if (this.bullettype == 'shotgun') {
      this.AddV = 8;
      this.friciton = 0.975 * random(0.996 , 1);
      this.damage = 5;
    } else if (this.bullettype == 'rifle') {
      this.AddV = 12;
      this.friciton = 0.985 * random(0.996 , 1);
      this.damage = 5;
    } 
    
    if (this.direction == 'L') {
      this.vx = -this.AddV;
      this.vy = this.AddVY;
    } else if (this.direction == 'R') {
      this.vx = this.AddV;
      this.vy = this.AddVY;
    } else if (this.direction == 'U') {
      this.vx = this.AddVX;
      this.vy = -this.AddV;
    } else if (this.direction == 'D') {
      this.vx = this.AddVX;
      this.vy = this.AddV;
    }
  }
  show(){
    fill(255,0,0);
    rect(this.x, this.y, this.w, this.h);
  }
  move(){
    //Check if bullet not to slow
    if (diff(this.vx,0) < 3 && diff(this.vy,0) < 3){
      this.remove();
    } else {
      //Check if bullet is in collision with wall (or soon to be)
      if (this.x + this.vx <= borderleftx){
        this.remove();
      } else if (this.x + this.w + this.vx >= borderrightx){
        this.remove();
      } else if (this.y + this.vy <= bordertopy){
        this.remove();
      } else if (this.y + this.h + this.vy >= borderbottomy){
        this.remove();
      } else {
        //After is still exist go apply friction
        this.vx *= this.friciton;
        this.vy *= this.friciton;
        //Than apply the velocity to the bullet
        this.x += this.vx;
        this.y += this.vy;
      }
    }
  }
  remove(){
    let idx = bullets.indexOf(this); 
    bullets.splice(idx,1);
  }
  collision(){
    for (let i = 0; i < enemies.length; i++) {
      let TheEnenemy = enemies[i];
      if (collision(this.x,this.y,this.w,this.h , TheEnenemy.x,TheEnenemy.y,TheEnenemy.w,TheEnenemy.h)) {
        this.remove();
        TheEnenemy.hit(this.damage * player.damagemutliplier,Math.abs(this.vx) + Math.abs(this.vy));
      }
    }
  }
}

class EnemyBullet {
  constructor(mx,my,w,h,addvx,addvy,type,direction,xdamage){
    this.mx = mx;
    this.my = my;

    this.w = w;
    this.h = h;
    this.halfWidth = this.w/2;
    this.halfHeight = this.h/2;

    this.x = mx - this.halfWidth;
    this.y = my - this.halfHeight;

    this.damagemultiplier = xdamage;
    
    this.vx = 0;
    this.vy = 0;
    this.direction = direction;
    this.bullettype = type;
    this.AddVX = addvx;
    this.AddVY = addvy;
    
    //Calculation 1 TIME
    if (this.bullettype == 'Light'){
      this.AddV = 10;
      this.friciton = 0.985 * random(0.996 , 1);
      this.damage = 5
    } else if (this.bullettype == 'Medium') {
      this.AddV = 8;
      this.friciton = 0.98 * random(0.996 , 1);
      this.damage = 8;
    } else if (this.bullettype == 'Heavy') {
      this.AddV = 12;
      this.friciton = 0.975 * random(0.996 , 1);
      this.damage = 12;
    } 
    
    if (this.direction == 'L') {
      this.vx = -this.AddV;
      this.vy = this.AddVY;
    } else if (this.direction == 'R') {
      this.vx = this.AddV;
      this.vy = this.AddVY;
    } else if (this.direction == 'U') {
      this.vx = this.AddVX;
      this.vy = -this.AddV;
    } else if (this.direction == 'D') {
      this.vx = this.AddVX;
      this.vy = this.AddV;
    }
  }
  show(){
    fill(255,0,0);
    rect(this.x, this.y, this.w, this.h);
  }
  move(){
    //Check if bullet not to slow
    if (diff(this.vx,0) < 3 && diff(this.vy,0) < 3){
      this.remove();
    } else {
      //Check if bullet is in collision with wall (or soon to be)
      if (this.x + this.vx <= borderleftx){
        this.remove();
      } else if (this.x + this.w + this.vx >= borderrightx){
        this.remove();
      } else if (this.y + this.vy <= bordertopy){
        this.remove();
      } else if (this.y + this.h + this.vy >= borderbottomy){
        this.remove();
      } else {
        //After is still exist go apply friction
        this.vx *= this.friciton;
        this.vy *= this.friciton;
        //Than apply the velocity to the bullet
        this.x += this.vx;
        this.y += this.vy;
      }
    }
  }
  remove(){
    let idx = enemybullets.indexOf(this); 
    enemybullets.splice(idx,1);
  }
  collision(){
    if (collision(this.x,this.y,this.w,this.h , player.x,player.y,player.w,player.h)) {
      this.remove();
      player.hit(this.damage * this.damagemultiplier);
    }
  }
}

