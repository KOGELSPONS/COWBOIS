let rooms = [];

var [DOORW, DOORH] = [100, 80]

var currentRoom = 0;

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
    fill(200);
    rect(this.x, this.y, this.w, this.h); //room
    fill(255);
    if (this.left == 1){
      image(DoorFinalLeft, this.x, this.y+this.h/2-DOORW/2, DOORH, DOORW);//door (links)
      //rect(this.x, this.y+this.h/2-DOORW/2, DOORH, DOORW);//door (links)
      if (collision(player.x, player.y, player.w, player.h  ,  this.x, this.y+this.h/2-DOORW/2, DOORH, DOORW)) { 
        currentRoom -= 1
        player.x -= 5 + DOORH*2 + player.w
        camX -= TILEX;
      }
    } if (this.right == 1){
      image(DoorFinalRight, this.x + this.w - DOORH, this.y+this.h/2-DOORW/2, DOORH, DOORW);//door (rechts)
      //rect(this.x + this.w - DOORH, this.y+this.h/2-DOORW/2, DOORH, DOORW);//door (rechts)
      if (collision(player.x, player.y, player.w, player.h  ,  this.x + this.w - DOORH, this.y+this.h/2-DOORW/2, DOORH, DOORW)) { 
        currentRoom += 1
        player.x += 5 + DOORH*2 + player.w
        camX += TILEX;
      }
    } if (this.top == 1){
      image(DoorFinalTop, this.x + this.w/2 - DOORW/2, this.y, DOORW, DOORH);//door (boven)
      //rect(this.x + this.w/2 - DOORW/2, this.y, DOORW, DOORH);//door (boven)
      if (collision(player.x, player.y, player.w, player.h  ,  this.x + this.w/2 - DOORW/2, this.y, DOORW, DOORH)) { 
        currentRoom -= 3
        player.y -= 5 + DOORH*2 + player.h
        camY -= TILEY;
      }
    } if (this.bottom == 1){
      image(DoorFinalBottom, this.x + this.w/2 - DOORW/2, this.y + this.h-DOORH, DOORW, DOORH);//door (onder)
      //rect(this.x + this.w/2 - DOORW/2, this.y + this.h-DOORH, DOORW, DOORH);//door (onder)
      if (collision(player.x, player.y, player.w, player.h  ,  this.x + this.w/2 - DOORW/2, this.y + this.h-DOORH, DOORW, DOORH)) { 
        currentRoom += 3
        player.y += 5 + DOORH*2 + player.h
        camY += TILEY;
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
        player.y = borderleftx;
      } else if (player.y + player.h + player.vy > borderbottomy){
        player.vy = 0;
        player.y = borderbottomy - player.h;
      }
      
    }
  }
}

function drawTiles(map, d_cols, roomsize_x, roomsize_y) {
  for (let i = map.length - 1; i > -1; --i) {
    let value = map[i];
    let l = doorleft[i];
    let r = doorright[i];
    let t = doortop[i];
    let b = doorbottom[i];
    
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