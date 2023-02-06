class Room{
  constructor(x,y,w,h,l,r,t,b,roomnumber){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.left =  l
    this.right = r
    this.top =  t
    this.bottom = b
    this.roomnumber = roomnumber
  }
  show(){
    if (this.roomnumber == currentRoom){
      fill(200);
      rect(this.x, this.y, this.w, this.h); //room
      fill(255);
      
      if (this.left){
        image(DoorFinalLeft, this.x, this.y+this.h/2-DOORW/2, DOORH, DOORW);//door (links)
        //rect(this.x, this.y+this.h/2-DOORW/2, DOORH + 5, DOORW);//door (links)
        if (collision(player.x, player.y, player.w, player.h  ,  this.x, this.y+this.h/2-DOORW/2, DOORH + 5, DOORW)) { 
          currentRoom -= 1
          player.x -= 10 + DOORH*2 + player.w
          camX -= TILEX;
          if(!explored.includes(currentRoom)){
            makeItemTiles(itemLocation[currentRoom], 16, 50,50, currentRoom);
            explored.push(currentRoom);
          }
        }
      } 
      
      if (this.right){
        image(DoorFinalRight, this.x + this.w - DOORH, this.y+this.h/2-DOORW/2, DOORH, DOORW);//door (rechts)
        //rect(this.x + this.w - DOORH - 5, this.y+this.h/2-DOORW/2, DOORH + 5, DOORW);//door (rechts)
        if (collision(player.x, player.y, player.w, player.h  ,  this.x + this.w - DOORH - 5, this.y+this.h/2-DOORW/2, DOORH + 5, DOORW)) { 
          currentRoom += 1
          player.x += 10 + DOORH*2 + player.w
          camX += TILEX;
          if(!explored.includes(currentRoom)){
            makeItemTiles(itemLocation[currentRoom], 16, 50,50, currentRoom);
            explored.push(currentRoom);
          }
        }
      } 
      
      if (this.top){
        image(DoorFinalTop, this.x + this.w/2 - DOORW/2, this.y, DOORW, DOORH);//door (boven)
        //rect(this.x + this.w/2 - DOORW/2, this.y , DOORW, DOORH + 5);//door (boven)
        if (collision(player.x, player.y, player.w, player.h  ,  this.x + this.w/2 - DOORW/2, this.y , DOORW, DOORH + 5)) { 
          currentRoom -= 3
          player.y -= 10 + DOORH*2 + player.h
          camY -= TILEY;
          if(!explored.includes(currentRoom)){
            makeItemTiles(itemLocation[currentRoom], 16, 50,50, currentRoom);
            explored.push(currentRoom);
          }
        }
      } 
      
      if (this.bottom){
        image(DoorFinalBottom, this.x + this.w/2 - DOORW/2, this.y + this.h-DOORH, DOORW, DOORH);//door (onder)
        //rect(this.x + this.w/2 - DOORW/2, this.y + this.h-DOORH - 5, DOORW, DOORH + 5);//door (onder)
        if (collision(player.x, player.y, player.w, player.h  ,  this.x + this.w/2 - DOORW/2, this.y + this.h-DOORH - 5, DOORW, DOORH + 5)) { 
          currentRoom += 3
          player.y += 10 + DOORH*2 + player.h
          camY += TILEY;
          if(!explored.includes(currentRoom)){
            makeItemTiles(itemLocation[currentRoom], 16, 50,50, currentRoom);
            explored.push(currentRoom);
          }
        }
      }
    }
  }
  collisionwalls(){
    if (this.roomnumber == currentRoom){
      let borderleftx = this.x + DOORH
      let borderrightx = this.x + this.w - DOORH
      let bordertopy = this.y + DOORH
      let borderbottomy = this.y + this.h - DOORH
      noFill(); 
      stroke("blue");
      strokeWeight(2);
      rect(borderleftx, bordertopy, this.w-DOORH*2, this.h-DOORH*2)
      noStroke();

      if (player.x + player.vx < borderleftx){
        player.vx = 0;
        player.x = borderleftx;
      } else if (player.x + player.w + player.vx > borderrightx){
        player.vx = 0;
        player.x = borderrightx - player.w;
      } if (player.y + player.vy < bordertopy){
        player.vy = 0;
        player.y = bordertopy;
      } else if (player.y + player.h + player.vy > borderbottomy){
        player.vy = 0;
        player.y = borderbottomy - player.h;
      }
      
    }
  }
}

function makeRoomTiles(map, d_cols, roomsize_x, roomsize_y) {
  for (let i = map.maprooms.length - 1; i > -1; --i) {
    let value = map.maprooms[i];
    let l = map.doorleft[i];
    let r = map.doorright[i];
    let t = map.doortop[i];
    let b = map.doorbottom[i];
    
    // distenation x , y
    let dx = (i % d_cols) * roomsize_x;
    let dy = Math.floor(i / d_cols) * roomsize_y;
    
    // render image
    if(value == 1){
      rooms.push(new Room(dx, dy, roomsize_x, roomsize_y, l,r,t,b,i));
    }
  }
}

//DEBUG!!! OFZOIETS
function checkRoom() {
  console.log(currentRoom);
}