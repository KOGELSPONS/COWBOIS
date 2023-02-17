class Item{
  constructor(x,y,type,name,numberroom){
    this.x = x;
    this.y = y;
    this.type = type;
    this.name = name;
    this.roomnumber = numberroom;
  }
  show(){
    if (this.roomnumber == currentRoom){
      if(this.name == 'revolver'){
        fill('red')
        image(revolver, this.x, this.y, 50,50)
      }
      if(this.name == 'shotgun'){
        fill('red')
      rect(this.x, this.y, 50,50);      
      }
      if(this.name == 'stone'){
        fill('gray')
        image(rock, this.x, this.y, 50,50)
      }
      stroke(10);
      //rect(this.x, this.y, 50,50);
      noStroke();
    }
  }
  interaction(){
    if (this.roomnumber == currentRoom){
      if(collision(player.x,player.y,player.w,player.h, this.x,this.y,50,50)){
        if(this.type == 'wall'){
          let COLLISION = checkCollision();
          if(COLLISION  == "right"){
            player.x -= overlapXUpdt; 
            player.vx = 0;
          }
          if(COLLISION  == "left"){
            player.x += overlapXUpdt; 
            player.vx = 0;
          }
          if(COLLISION == "top"){
            player.y += overlapYUpdt;
            player.vy = 0;
          }
          if(COLLISION  == "bottom"){
            player.y -= overlapYUpdt;
            player.vy = 0;
          }
        }
      }
    }
  }
  pickup(){
    if (this.roomnumber == currentRoom){
      if(collision(player.x,player.y,player.w,player.h, this.x,this.y,50,50)){
        if(this.type == 'pickup'){
          console.log("pick up item");
          console.log(this);
          inventory.push(this.name);
          console.log('inventory: ' + inventory)
          let idx = items.indexOf(this); 
          console.log(items)
          items.splice(idx,1);
        }
      }
    }
  }
  inventory(){
    fill('red')
    for(let i = 100; i < 280; i+=60){
      rect(CENTERX+i, CENTERY+480, 50,50)
    }
    if(inventory[0] == 'revolver'){
      image(revolver, CENTERX+100, CENTERY+480, 50,50)
    }
    if(inventory[0] == 'shotgun'){
      fill('blue')
      rect(CENTERX+100, CENTERY+480, 50,50)
    }
  }
}  
function makeItemTiles(itemtiles, d_cols, itemsize_x, itemsize_y, numberroom) {
  //items = [];
  for (let i = itemtiles.length - 1; i > -1; --i) {
    let value = itemtiles[i];
    let tileOffsetX = (currentRoom % 3) * 960;
    let tileOffsetY = (Math.floor(currentRoom / 3)) * 540;
    // distenation x , y
    let dx = (i % d_cols) * itemsize_x;
    let dy = Math.floor(i / d_cols) * itemsize_y;
    
    // render image
    if(value == 1){
      items.push(new Item(dx+80 + tileOffsetX,dy+60 + tileOffsetY,'pickup','revolver', numberroom))
    }
    if(value == 2){
      items.push(new Item(dx+80 + tileOffsetX,dy+60 + tileOffsetY,'wall', 'stone', numberroom))
    }
    if(value == 3){
      items.push(new Item(dx+80 + tileOffsetX,dy+60 + tileOffsetY,'pickup', 'shotgun', numberroom))
    }
    if(value == 4){
      enemies.push(new Enemy(dx+80 + tileOffsetX, dy+60 + tileOffsetY, 80, 80, 'walker', numberroom, enemies, 1))
    }
  }
}