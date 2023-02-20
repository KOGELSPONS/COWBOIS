class Bullet {
  constructor(x,y,w,h,addvx,addvy,type,direction){
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
    this.direction = direction;
    this.bullettype = type;
    this.AddVX = addvx;
    this.AddVY = addvy;
    
    //Calculation 1 TIME
    if (this.bullettype == 'pistol'){
      this.AddV = 8;
      this.friciton = 0.1;
    } else if (this.bullettype == 'shotgun') {
      this.AddV = 7;
      this.friciton = 0.15;
    } else if (this.bullettype == 'revolver') {
      this.AddV = 9;
      this.friciton = 0.05;
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
    if (diff(this.vx,0) < 2 && diff(this.vy,0) < 2){
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
        if (this.vx > 0){
          this.vx -= this.friciton;
        } if (this.vx < 0){
          this.vx += this.friciton;
        } if (this.vy > 0){
          this.vy -= this.friciton;
        } if (this.vy < 0){
          this.vy += this.friciton;
        }
        //Than apply the velocity to the bullet
        this.x += this.vx;
        this.y += this.vy;
      }
    }
  }
  remove(){
    console.log("ammo removed");
    console.log(this);
    let idx = bullets.indexOf(this); 
    bullets.splice(idx,1);
  }
  collision(){
    for (let i = 0; i < enemies.length; i++) {
      let TheEnenemy = enemies[i];
      if (collision(this.x,this.y,this.w,this.h , TheEnenemy.x,TheEnenemy.y,TheEnenemy.w,TheEnenemy.h)) {
        this.remove();
        TheEnenemy.hit(2 * player.damagemutliplier,Math.abs(this.vx) + Math.abs(this.vy));
      }
    }
  }
}