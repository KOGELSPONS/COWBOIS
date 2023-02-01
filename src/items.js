class Item{
  constructor(x,y,type){
    this.x = x;
    this.y = y;
    this.type = type;
  }
  show(){
    if(this.type == 'revolver'){
        fill('red')
    }
    rect(this.x, this.y, 50,50);
  }
  pickup(){
    if(player.x + player.w > this.x && player.x < this.x +50){
      if(player.y +player.h > this.y && player.y < this.y +50){
        console.log("pick up item");
        console.log(this);
        let idx = items.indexOf(this); 
        items.splice(idx,1)
      }
    }
  }
}

function spawn(){
  items.push(new Item(1000,1000,'revolver'))
}