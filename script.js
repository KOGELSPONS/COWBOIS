//test item
//items.push(new Item(1000, 750,'revolver'))
function draw() {
  background(0);
  smooth();
  //First let the player move the chracter
  //variable player.(class)move
  player.move();
  //Show the room and its doors
  //Check if the player is in contact with the wall
  rooms.forEach(r => {
    r.collisionwalls();
    r.show();
  })
  //Show and check if a player is in contact with a item
  items.forEach(i => {
    i.interaction();
    i.show();
    i.pickup();
    //i.inventory();
  })

  enemies.forEach(e => {
    e.move();
    e.show();
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
  if (keyIsDown(82)) { //Press r-button 
    checkRoom();
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