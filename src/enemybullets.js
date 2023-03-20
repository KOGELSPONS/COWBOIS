class Enemybullet {
  constructor(mx,my,size,type,velx, vely,playerdist){
    this.mx = mx;
    this.my = my;

    this.s = size;
    this.w = size;
    this.h = size;
    this.halfWidth = this.w/2;
    this.halfHeight = this.h/2;

    this.x = this.mx - this.halfWidth;
    this.y = this.my - this.halfHeight;
    
    this.bullettype = type;
    this.velx = velx;
    this.vely = vely;
    this.playerdist = playerdist
  }
  show(){
    this.x = this.mx - this.halfWidth;
    this.y = this.my - this.halfHeight;
    fill('red')
    rect(this.x, this.y, this.w,this.h)
  }    
  move(){
    this.mx += this.velx;
    this.my += this.vely;
    this.playerdist += this.velx + this.vely
    
  }
  remove(){
    if(this.playerdist < 0){
      let idx = enemybullets.indexOf(this); 
      enemybullets.splice(idx,1);
    }
  }
}