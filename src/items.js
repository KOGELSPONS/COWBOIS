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
    if(this.type == 'stone'){
        fill('gray')
    }
    stroke(10);
    rect(this.x, this.y, 50,50);
    noStroke();
  }
  pickup(){
    if(collision(player.x,player.y,player.w,player.h, this.x,this.y,50,50)){
      if(this.type == 'revolver'){
        console.log("pick up item");
        console.log(this);
        let idx = items.indexOf(this); 
        items.splice(idx,1)  
      }
      if(this.type == 'stone'){
        if(COLLISION == "right"){
          player.x -= overlapXUpdt; 
          this.vx = 0;
        }
        if(COLLISION == "left"){
          player.x += overlapXUpdt; 
          this.vx = 0;
        }
        if(COLLISION == "top"){
          this.vy = 0;
          player.y += overlapYUpdt;
        }
        if(COLLISION == "bottom"){
          player.y -= overlapYUpdt;
          this.vy = 0;
        }
      }
    }
  }
}  

var itemtiles = [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  ];


function spawn(){


}  
function makeItemTiles(itemtiles, d_cols, itemsize_x, itemsize_y) {
  for (let i = itemtiles.length - 1; i > -1; --i) {
    let value = itemtiles[i];
    
    // distenation x , y
    let dx = (i % d_cols) * itemsize_x;
    let dy = Math.floor(i / d_cols) * itemsize_y;
    
    // render image
    if(value == 1){
      items.push(new Item(dx+80,dy+60,'revolver'))
    }
    if(value == 2){
      items.push(new Item(dx+80,dy+60,'stone'))
    }
  }
}