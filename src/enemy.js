class Enemy{
  constructor(x, y, w, h, type, numberroom){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = type;
    this.roomnumber = numberroom;
  }
  show(){
    if(this.type == 'walker'){
      fill('red')    
      rect(this.x, this.y, this.w, this.h);
    }
  }

  move(){
    if (this.roomnumber == currentRoom){
      if(this.type == 'walker'){
        if(this.x < player.x-player.w/4){
          this.x++;
        }else{
          this.x--;
        }
        if(this.y < player.y-player.h/2){
          this.y++;
        }else{
          this.y--;
        }
      }
    }
  }
}