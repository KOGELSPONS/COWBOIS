class Enemybullet {
  constructor(mx ,my ,size ,type ,velx ,vely ,playerdist, damage){
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
    this.playerdist = playerdist;
    this.damage = damage;
  }
  show(){
    this.x = this.mx - this.halfWidth;
    this.y = this.my - this.halfHeight;
    if(this.bullettype == 'bullet'){
      fill('#db883b');
      }else{
          texture(slimeball)
        }
    circle(this.x + this.s/2, this.y + this.s/2, this.s);
  }    
  move(){
    this.mx += this.velx;
    this.my += this.vely;
    this.playerdist += this.velx + this.vely
    if (this.x + this.velx <= borderleftx){
      this.remove();
    } else if (this.x + this.w + this.velx >= borderrightx){
      this.remove();
    } else if (this.y + this.vely <= bordertopy){
      this.remove();
    } else if (this.y + this.h + this.vely >= borderbottomy){
      this.remove();
    }
  }
  remove(){
    let idx = enemybullets.indexOf(this); 
    enemybullets.splice(idx,1);
  }
  collision(){
    if (collision(this.x,this.y,this.w,this.h,player.x,player.y,player.w,player.h)){
      player.hit(this.damage);
      let idx = enemybullets.indexOf(this); 
      enemybullets.splice(idx,1);
      if(this.bullettype == 'bullet'){
        player.vx += this.velx;
        player.vy += this.vely;
      }else{
          texture(slimeball)
        }
    }
  }
  hit(){
    this.remove(); 
  }
}