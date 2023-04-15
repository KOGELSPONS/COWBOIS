//In this class you can only find pickupable items
class Item {
  constructor(x, y, type, name, numberroom, location) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.name = name;
    this.roomnumber = numberroom;
    this.itemOffset = false;
    this.invlocation = location;
  }
  show() {
    //Debug rect
    if (showCollision) {
      fill(debugColorInteract);
      rect(this.x, this.y, 50, 50);
    }

    if (enemies.length == 0) {
      if (this.name == 'revolver') {
        image(revolver, this.x, this.y, 50, 50)
      } else if (this.name == 'shotgun') {
        image(shotgun, this.x, this.y, 50, 50)
      } else if (this.name == 'rifle') {
        image(rifle, this.x, this.y, 50, 50)
      }else if(this.name == 'dualshot'){
        image(dualshot, this.x, this.y, 50, 50)
      }else if(this.name == 'collar'){
        image(collar, this.x, this.y, 50, 50)
      }else if(this.name == 'stopwatch'){
        image(stopwatch, this.x, this.y, 50, 50)
      }else if(this.name == 'healthpack_10'){
        image(healthpack_10, this.x, this.y, 50, 50)
      }else if(this.name == 'healthpack_20'){
        image(healthpack_20, this.x, this.y, 50, 50)
      }else if(this.name == 'healthpack_40'){
        image(healthpack_40, this.x, this.y, 50, 50)
      }
    } else {
      image(chest_closed, this.x, this.y, 50, 50)
    }
  }
  pickup() {
    if (collision(player.x, player.y, player.w, player.h, this.x, this.y, 50, 50) && enemies.length == 0) {
      // console.log("pick up item");
      // console.log(this);
      sfx[2].play();
      //certain things only for 1 type
      if (this.type == 'weapon') {
        player.ammo = 0;
      } else if (this.type == 'attactment') {
        //reset stats??
      } else if (this.type == 'booster') {
        //reset booster time??
      }

      if (inventory[this.invlocation] == 'empty') {
        inventory[this.invlocation] = this.name;
        let idx = items.indexOf(this);
        items.splice(idx, 1);
      } else {
        let oldname = this.name;
        this.name = inventory[this.invlocation];
        inventory[this.invlocation] = oldname;
      }

      player.update();
      
      //give items new offset so you cant pick them up twice
      if (!this.itemOffset) {
        this.x += 100;
        this.itemOffset = true;
      } else {
        this.x -= 100;
        this.itemOffset = false;
      }
    }
  }
  remove(){
    let idx = items.indexOf(this);
    items.splice(idx, 1);
  }
}

//In this class there are only collision things sutch as walls
class Placable {
  constructor(x, y, name, collide, numberroom) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.halfWidth = this.w / 2;
    this.halfHeight = this.h / 2;
    this.mx = this.x + this.w / 2
    this.my = this.y + this.h / 2
    this.name = name;
    this.collide = collide;
    this.roomnumber = numberroom;
    this.itemOffset = false;
  }
  show() {
    //Debug Rect
    if (showCollision) {
      fill(debugColorStatic);
      rect(this.x, this.y, 50, 50);
    }

    if (this.name == 'stone') {
      //image(rock, this.x, this.y,this.w,this.h);
      texture(rock);
      rect(this.x, this.y, this.w, this.h);
    }
    if (this.name == 'vent') {
      image(vent, this.x, this.y, this.w, this.h)
    }
  }
  vent() {
    if (collision(player.x, player.y, player.w, player.h, this.x, this.y, 50, 50)) {
      player.x = this.mx;
      player.y = this.my;
      rooms = [];
      upgrades = [];
      items = [];
      placables = [];
      explored = [currentRoom];
      enemies = [];
      bullets = [];
      enemybullets = [];
      currentMap++;
      makeRoomTiles(theMaps[currentMap], 3, TILEX, TILEY);
      makeItemTiles(itemLocation[currentMap][currentRoom], 16, 50, 50, currentRoom);
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

    // 1 -> 9 placables
    if (value == 1) {
      placables.push(new Placable(dx + 80 + tileOffsetX, dy + 60 + tileOffsetY, 'stone', true, numberroom))
    }
    if (value == 9) {
      placables.push(new Placable(dx + 105 + tileOffsetX, dy + 60 + tileOffsetY, 'vent', false, numberroom))
    }
    // 10 -> 19 enemies
    if (value == 10) {
      enemies.push(new Enemy(dx + 80 + tileOffsetX, dy + 60 + tileOffsetY, 80, 80, 'walker', numberroom, enemies, 1))
    }
    if (value == 11) {
      enemies.push(new Enemy(dx + 80 + tileOffsetX, dy + 60 + tileOffsetY, 80, 80, 'shooter', numberroom, enemies, 1))
    }
    if(value == 15){
      boss.push(new Boss(dx + 80 + tileOffsetX, dy + 60 + tileOffsetY, 110, 110, 10, 8, 'monstro', numberroom, 1000, 1))
    }
    if(value == 16){
      boss.push(new Boss(dx + 80 + tileOffsetX, dy + 60 + tileOffsetY, 180, 130, 10, 8, 'slime', numberroom, 3000, 1))
    }
    if(value == 17){
      boss.push(new Boss(dx + 80 + tileOffsetX, dy + 60 + tileOffsetY, 110, 80, 10, 8, 'monstro', numberroom, 1000, 0))
    }
    if(value == 18){
      boss.push(new Boss(dx + 80 + tileOffsetX, dy + 60 + tileOffsetY, 110, 80, 10, 8, 'monstro', numberroom, 1000, 1))
    }

    // 20 -> 29 weapons
    if (value == 20) {
      items.push(new Item(dx + 80 + tileOffsetX, dy + 60 + tileOffsetY, 'weapon', 'revolver', numberroom, 0))
    }
    if (value == 21) {
      items.push(new Item(dx + 80 + tileOffsetX, dy + 60 + tileOffsetY, 'weapon', 'shotgun', numberroom, 0))
    }
    if (value == 22) {
      items.push(new Item(dx + 80 + tileOffsetX, dy + 60 + tileOffsetY, 'weapon', 'rifle', numberroom, 0))
    }
    // 30 -> 39 attactments
    if (value == 30) {
      items.push(new Item(dx + 80 + tileOffsetX, dy + 60 + tileOffsetY, 'attactment', 'dualshot', numberroom, 1))
    }
    if (value == 31) {
      items.push(new Item(dx + 80 + tileOffsetX, dy + 60 + tileOffsetY, 'attactment', 'collar', numberroom, 1))
    }
    // 40 -> 49 boosters
    if (value == 40) {
      items.push(new Item(dx + 80 + tileOffsetX, dy + 60 + tileOffsetY, 'booster', 'stopwatch', numberroom, 2))
    }
    if (value == 41) {
      items.push(new Item(dx + 80 + tileOffsetX, dy + 60 + tileOffsetY, 'booster', 'healthpack_10', numberroom, 2))
    }
    if (value == 42) {
      items.push(new Item(dx + 80 + tileOffsetX, dy + 60 + tileOffsetY, 'booster', 'healthpack_20', numberroom, 2))
    }
    if (value == 43) {
      items.push(new Item(dx + 80 + tileOffsetX, dy + 60 + tileOffsetY, 'booster', 'healthpack_40', numberroom, 2))
    }
  }
}