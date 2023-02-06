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
      r.show();
      r.collisionwalls();
  })
  //Show and check if a player is in contact with a item
  items.forEach(p => {
    p.show();
    p.pickup();
  })
  //After the player movement has been done and the changes by the collision system update the players position 
  //(thats why the order is important)
  player.show();
  player.camera();  
  //console.log(colliding);
}

function keyPressed() {
  if (keyIsDown(82)) { //Press r-button 
    checkRoom();
  } if (keyIsDown(78)) { //Press n-button
    console.log(maps);
  } 
}