//In this class you can only find pickupable items
class Item{
  constructor(x,y,type,name,numberroom,location){
    this.x = x;
    this.y = y;
    this.type = type;
    this.name = name;
    this.roomnumber = numberroom;
    this.itemOffset = false;
    this.invlocation = location;
  }
  show(){
    if(this.name == 'revolver'){
      image(revolver, this.x, this.y, 50,50)
    } else if(this.name == 'shotgun'){
      fill('blue')
      rect(this.x, this.y, 50,50);      
    } else if(this.name == 'rifle'){
      fill('green')
      rect(this.x, this.y, 50,50);      
    }
  }
  pickup(){
    if(collision(player.x,player.y,player.w,player.h, this.x,this.y,50,50)){
        // console.log("pick up item");
        // console.log(this);

        //certain things only for 1 type
        if (this.type == 'weapon'){
          player.ammo = 0;
        } else if (this.type == 'attactment'){
          //reset stats??
        } else if (this.type == 'booster'){
          //reset booster time??
        }
        
        if (inventory[this.invlocation] == 'empty'){
          inventory[this.invlocation] = this.name;
          let idx = items.indexOf(this); 
          items.splice(idx,1);
        } else {
          let oldname = this.name;
          this.name = inventory[this.invlocation];
          inventory[this.invlocation] = oldname;
        }

        if(!this.itemOffset){
          this.x +=100;
          this.itemOffset = true;
        }else{
          this.x -= 100;
          this.itemOffset = false;
        }
        // console.log('inventory: ' + inventory)
        // console.log(items)
      }
    }
}  

//In this class there are only collision things sutch as walls
class Placable{
  constructor(x,y,name,numberroom){
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.mx = this.x + this.w/2
    this.my = this.y + this.h/2
    this.name = name;
    this.roomnumber = numberroom;
    this.itemOffset = false;
  }
  show(){
    if(this.name == 'stone'){
      image(rock, this.x, this.y,this.w,this.h)
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

    // 1 -> 10 placables
    if(value == 1){
      placables.push(new Placable(dx+80 + tileOffsetX,dy+60 + tileOffsetY,'stone', numberroom))
    }

    // 11 -> 20 enemies
    if(value == 11){
      enemies.push(new Enemy(dx+80 + tileOffsetX, dy+60 + tileOffsetY, 80, 80, 'walker', numberroom, enemies, 1))
    }

    // 21 -> 30 weapons
    if(value == 21){
      items.push(new Item(dx+80 + tileOffsetX,dy+60 + tileOffsetY,'weapon','revolver', numberroom,0))
    }
    if(value == 22){
      items.push(new Item(dx+80 + tileOffsetX,dy+60 + tileOffsetY,'weapon', 'shotgun', numberroom,0))
    }
    if(value == 23){
      items.push(new Item(dx+80 + tileOffsetX,dy+60 + tileOffsetY,'weapon', 'rifle', numberroom,0))
    }
    // 31 -> 40 attactments
    if(value == 31){
      items.push(new Item(dx+80 + tileOffsetX,dy+60 + tileOffsetY,'attactment', '??', numberroom,1))
    }
    // 41 -> 50 boosters
    if(value == 41){
      items.push(new Item(dx+80 + tileOffsetX,dy+60 + tileOffsetY,'booster', '??', numberroom,2))
    }
  }
}