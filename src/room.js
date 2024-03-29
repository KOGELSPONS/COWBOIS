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
      ROOMX = this.x;
      ROOMY = this.y;
      
      image(wall_img,this.x, this.y);
      if(1 === currentRoom && currentMap == 0){
        image(explain_bg, this.x+230, this.y+200,this.w-460, this.h-400);
      }
      if(12 === currentRoom && currentMap == 2){
        image(saloon_door, this.x + this.w/2 - DOORW/2, this.y+12 , DOORW, DOORH - 10);
        if (collision(player.x, player.y, player.w, player.h , this.x + this.w/2 - DOORW/2, this.y+12 , DOORW, DOORH - 10) && enemies.length == 0 && boss.length == 0) {
          win();
          makeButton();
          gameState = 4;
        }
      }
      //Debug Rect
      if (showCollision){
        fill(debugColorInteract);
        if (this.left){
          rect(this.x, this.y+this.h/2-DOORW/2, DOORH + 5, DOORW);//door (links)
        } if (this.right){
          rect(this.x + this.w - DOORH - 5, this.y+this.h/2-DOORW/2, DOORH + 5, DOORW);//door (rechts)
        } if (this.top){
          rect(this.x + this.w/2 - DOORW/2, this.y , DOORW, DOORH + 5);//door (boven)
        } if (this.bottom){
          rect(this.x + this.w/2 - DOORW/2, this.y + this.h-DOORH - 5, DOORW, DOORH + 5);//door (links)
        }
      }
      
      if (this.left){
        if(enemies.length == 0 && boss.length == 0){
          image(doorLeftOpen, this.x, this.y+this.h/2-DOORW/2, DOORH, DOORW);//door (links)
          if (collision(player.x, player.y, player.w, player.h  ,  this.x, this.y+this.h/2-DOORW/2, DOORH + 5, DOORW) && enemies.length == 0 && boss.length == 0) {
            currentRoom -= 1
            player.x -= 10 + DOORH*2 + player.w
            if(inventory[1] == 'collar'){
              dog.x = player.x;
              dog.y = player.y;
            }
            camX -= TILEX;
            if(!explored.includes(currentRoom)){
              makeItemTiles(itemLocation[currentMap][currentRoom], 16, 50,50, currentRoom);
              explored.push(currentRoom);
            }
          }
        }else{
            image(doorLeft, this.x, this.y+this.h/2-DOORW/2, DOORH, DOORW);//door (links)
          }
      } 
      
      if (this.right){
        if(enemies.length == 0 && boss.length == 0){
          image(doorRightOpen, this.x + this.w - DOORH, this.y+this.h/2-DOORW/2, DOORH, DOORW);//door (rechts)
          if (collision(player.x, player.y, player.w, player.h  ,  this.x + this.w - DOORH - 5, this.y+this.h/2-DOORW/2, DOORH + 5, DOORW) && enemies.length == 0 && boss.length == 0) { 
            currentRoom += 1
            player.x += 10 + DOORH*2 + player.w
            if(inventory[1] == 'collar'){
              dog.x = player.x;
              dog.y = player.y;
            }
            camX += TILEX;
            if(!explored.includes(currentRoom)){
              makeItemTiles(itemLocation[currentMap][currentRoom], 16, 50,50, currentRoom);
              explored.push(currentRoom);
            }
          }
        }else{
            image(doorRight, this.x + this.w - DOORH, this.y+this.h/2-DOORW/2, DOORH, DOORW);//door (rechts)
          }
      } 
      
      if (this.top){
        if(enemies.length == 0 && boss.length == 0){
          image(doorTopOpen, this.x + this.w/2 - DOORW/2, this.y, DOORW, DOORH);//door 
          if (collision(player.x, player.y, player.w, player.h  ,  this.x + this.w/2 - DOORW/2, this.y , DOORW, DOORH + 5)) {
              currentRoom -= 3
              player.y -= 10 + DOORH*2 + player.h
              if(inventory[1] == 'collar'){
                dog.x = player.x;
                dog.y = player.y;
              }
              camY -= TILEY;
              if(!explored.includes(currentRoom)){
                makeItemTiles(itemLocation[currentMap][currentRoom], 16, 50,50, currentRoom);
                explored.push(currentRoom);
              }
            }
        }else{
            image(doorTop, this.x + this.w/2 - DOORW/2, this.y, DOORW, DOORH);//door 
          }
      } 
      
      if (this.bottom){
        if(enemies.length == 0 && boss.length == 0){
          image(doorBottomOpen, this.x + this.w/2 - DOORW/2, this.y + this.h-DOORH, DOORW, DOORH);//door (onder)
          if (collision(player.x, player.y, player.w, player.h  ,  this.x + this.w/2 - DOORW/2, this.y + this.h-DOORH - 5, DOORW, DOORH + 5) && enemies.length == 0 && boss.length == 0) { 
            currentRoom += 3
            player.y += 10 + DOORH*2 + player.h
            if(inventory[1] == 'collar'){
              dog.x = player.x;
              dog.y = player.y;
            }
            camY += TILEY;
            if(!explored.includes(currentRoom)){
              makeItemTiles(itemLocation[currentMap][currentRoom], 16, 50,50, currentRoom);
              explored.push(currentRoom);
            }
          }
        }else{
            image(doorBottom, this.x + this.w/2 - DOORW/2, this.y + this.h-DOORH, DOORW, DOORH);//door (onder)
          }
      }
    }
  }
  collisionwalls(){
    if (this.roomnumber == currentRoom){
      borderleftx = this.x + DOORH
      borderrightx = this.x + this.w - DOORH
      bordertopy = this.y + DOORH
      borderbottomy = this.y + this.h - DOORH
      if (showCollision){
        noFill();
        stroke(debugColorStatic);
        strokeWeight(2);
        rect(borderleftx, bordertopy, this.w-DOORH*2, this.h-DOORH*2);
        noStroke();
      }
      
      //LATER make this 1 system with bullet border detection and other out of map detections
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