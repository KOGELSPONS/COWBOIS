class Bullet {
  constructor(mx,my,size,addvx,addvy,type,direction){
    this.mx = mx; //the middle of the bullet's x-axis
    this.my = my; //the middle of the bullet's y-axis

    this.s = size;
    this.w = size;
    this.h = size;
    this.halfWidth = this.w/2;
    this.halfHeight = this.h/2;

    this.x = this.mx - this.halfWidth;
    this.y = this.my - this.halfHeight;
    
    this.vx = 0; //bullets x velocity
    this.vy = 0; //bullets y velocity
    this.direction = direction; //The direction the bullet is shot at
    this.bullettype = type; //the type of bullet shot
    this.AddVX = addvx; //any extra velocity given to the bullet
    this.AddVY = addvy; //any extra velocity given to the bullet
    
    //Calculation 1 TIME
    if (this.bullettype == 'revolver'){ //bullet variables for revolver
      this.AddV = 10;
      this.friciton = 0.98 * random(0.996 , 1);
      this.damage = 3;
      this.recoil = 3;
    } else if (this.bullettype == 'shotgun') { //bullet variables for shotgun
      this.AddV = 8;
      this.friciton = 0.975 * random(0.985 , 1);
      this.damage = 0.8;
      this.recoil = 8;
    } else if (this.bullettype == 'rifle') {  //bullet variables for revolver
      this.AddV = 12;
      this.friciton = 0.985 * random(0.996 , 1);
      this.damage = 5;
      this.recoil = 5;
    } 

    //diferent velocities given to different shooting directions
    if (this.direction == 'L') { //When player shoots to the left
      this.vx = -this.AddV;
      this.vy = this.AddVY;
      if(this.bullettype == 'shotgun'){
        this.vy += random(-4,4); //shotgun bulletspread
      }
      player.vx += this.recoil;
    } else if (this.direction == 'R') { //When player shoots to the right
      this.vx = this.AddV;
      this.vy = this.AddVY;
      if(this.bullettype == 'shotgun'){
        this.vy += random(-4,4); //shotgun bulletspread
      }
      player.vx -= this.recoil;
    } else if (this.direction == 'U') { //When player shoots up
      this.vx = this.AddVX;
      this.vy = -this.AddV;
      if(this.bullettype == 'shotgun'){
        this.vx += random(-4,4); //shotgun bulletspread
      }
      player.vy += this.recoil;
    } else if (this.direction == 'D') { //When player shoots down
      this.vx = this.AddVX;
      this.vy = this.AddV;
      if(this.bullettype == 'shotgun'){
        this.vx += random(-4,4); //shotgun bulletspread
      }
      player.vy -= this.recoil; //add the recoil to the player velocity
    }
  }

  show(){
    fill('#db883b');
    if (this.bullettype != "shotgun"){ //Bullets when they are not shotgun shells
      rect(this.x, this.y, this.w, this.h);
      if (this.direction == "L"){
        circle(this.x, this.y + this.s/2, this.s);
      } else if (this.direction == "R"){
        circle(this.x + this.s, this.y + this.s/2, this.s);
      } else if (this.direction == "U"){
        circle(this.x + this.s/2, this.y, this.s);
      } else if (this.direction == "D"){
        circle(this.x + this.s/2, this.y + this.s, this.s);
      } 
    } else { //Bullets when they are shotgun shells
      circle(this.x + this.s/2, this.y + this.s/2, this.s);
    }
  }
  move(){
    //Check if bullet not to slow, when too slow, remove the bullet
    if (diff(this.vx,0) < 3 && diff(this.vy,0) < 3){
      this.remove();
    } else {
      //Check if bullet is in collision with wall (or soon to be), and remove the bullet if that's the case
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
  remove(){ //remove the bullet
    let idx = bullets.indexOf(this); 
    bullets.splice(idx,1);
  }
  collision(){
    for (let i = 0; i < enemies.length; i++) { //When the bullet collides with an enemy
      let TheEnenemy = enemies[i];
      if (collision(this.x,this.y,this.w,this.h , TheEnenemy.x,TheEnenemy.y,TheEnenemy.w,TheEnenemy.h)) {
        this.remove();
        TheEnenemy.hit(this.damage * player.damagemutliplier,Math.abs(this.vx) + Math.abs(this.vy));
      }
    }
    for (let i = 0; i < boss.length; i++) { //When the bullet collides with a boss
      let Boss = boss[i];
      if (collision(this.x,this.y,this.w,this.h , Boss.x,Boss.y,Boss.w,Boss.h)) {
        this.remove();
        Boss.hit(this.damage * player.damagemutliplier,Math.abs(this.vx) + Math.abs(this.vy));
      }
    }
    for (let i = 0; i < enemybullets.length; i++) { //When the bullet collides with an enemy bullet
      let EnemyBullet = enemybullets[i];
      if (collision(this.x,this.y,this.w,this.h , EnemyBullet.x,EnemyBullet.y,EnemyBullet.w,EnemyBullet.h)) {
        this.remove();
        EnemyBullet.hit();
      }
    }
  }
}