//test item
//items.push(new Item(1000, 750,'revolver'))
function draw() {
  background(0);

  if (gameState == 0){
    //play music
    gameState = 1;
  } else if (gameState == 1){
    menu();
  } else if (gameState == 2){
    //First let the player move the chracter
    //variable player.(class)move
    player.move();
    //Show the room and its doors
    //Check if the player is in contact with the wall
    rooms.forEach(r => {
      if (r.roomnumber == currentRoom){
        r.collisionwalls();
        r.show()
      }
    })
    
    //Check if the player is in contact with any placables
    checkCollision();
  
    //Shows eatch placeable if the placeable is in the room
    placables.forEach(p => {
      if (p.roomnumber == currentRoom){
        p.show();
        if (p.name == "vent"){
          p.vent();
        }
      }
    })
    
    //Show and check if a player is in contact with a item
    items.forEach(i => {
      if (i.roomnumber == currentRoom){
        i.show();
        i.pickup();
      }
    })
  
    enemies.forEach(e => {
      if (e.roomnumber == currentRoom){
        e.move();
        e.show();
      }
    })
    
    bullets.forEach(b => {
      b.collision();
      b.move();
      b.show();
    })
    //After the player movement has been done and the changes by the collision system update the players position 
    //(thats why the order is important)
    player.show();
    player.camera();  
    player.inventory();

    //debug
    debug();
  } else if (gameState == 3){
    //deadscreen();
    
  }else if(gameState == 1000000000){
    console.log("GAMESTATE 1000000000 HEHEHEHA")
  }
}

//Calculate the difference between 2 numbers but always return a positive number (so distance is not -5 but 5)
function diff (num1, num2) {
  if (num1 > num2) {
    return num1 - num2
  } else {
    return num2 - num1
  }
}

function keyPressed() {
  if (keyIsDown(33)) { //Press Page-up button
    gameState += 1;
  } if (keyIsDown(34)) { //Press Page-up button
    gameState -= 1;
  } if (keyIsDown(82)) { //Press r-button 
    player.reload();
  } if (keyIsDown(78)) { //Press n-button
    console.log(theMaps);
    console.log(itemLocation);
    console.log(items);
  } if (keyIsDown(37)) { //Press arrow-left button 
    player.attack('L');
  } if (keyIsDown(38)) { //Press arrow-up button 
    player.attack('U');
  } if (keyIsDown(39)) { //Press arrow-right button 
    player.attack('R');
  }  if (keyIsDown(40)) { //Press arrow-down button 
    player.attack('D');
  } 
}

function mouseClicked(){
  
}
