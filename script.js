//test item
//items.push(new Item(1000, 750,'revolver'))
function draw() {
  if (gameState == 0){
    gameState = 1;
  } else if (gameState == 1){
    background(0);
    menu();
  } else if (gameState == 2){
    background(0);
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
    currentplaceables = 0;
    //Shows eatch placeable if the placeable is in the room
    placables.forEach(p => {
      if (p.roomnumber == currentRoom){
        currentplaceables ++;
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
    
    boss.forEach(b => {
      if (b.roomnumber == currentRoom){
        b.show();
        b.move();
      }
    })
    //Check if doggo active
    if (dogActive){
      dog.heal();
      dog.show();
      dog.move();
      dog.collisionwalls();
    }
    
    bullets.forEach(b => {
      b.collision();
      b.move();
      b.show();
    })
    enemybullets.forEach(eb => {
      eb.show();
      eb.move();
      eb.collision();
    })

    updatecamera();
    
    //After the player movement has been done and the changes by the collision system update the players position 
    //(thats why the order is important)
    player.show();
    player.inventory();

    //debug
    debug();
    textAlign(RIGHT,CENTER);
    fill("red");
    textSize(30);
    text("Time: " + gameTimer,ROOMX + TILEX-15, ROOMY+45);
    if (frameCount % 60 == 0) { 
      gameTimer++;
    }
    //Death screen
    if (player.hp <= 0){
      DeathTime = gameTimer;
      //storeItem('DeathTime', DeathTime);
      deaths += 1;
      makeButton();
      createcamera.setPosition(camX,camY,468);
      translate(0,0,0.02);
      texture(deathscreen);
      textureMode(NORMAL);
      rect(ROOMX,ROOMY,TILEX,TILEY);
      translate(0,0,-0.02);
      lastdead = new Date().getTime();
      gameState = 3;
    }
  } else if (gameState == 3){
    deadscreen();
  } else if (gameState == 4){
    winscreen();
  }
  //all gameState's
  if (MouseClicked){
    MouseClicked = false;
  }
  updateSound();
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

function updatecamera(){
  let RX = random(-5.1, 5.1);
  let RY = random(-5.1, 5.1);
  if (cameraMode == "shake" && (new Date().getTime() - player.shaketime) > 20){
    cameraMode = "still";
  } 
  if (cameraMode == "still") {
    createcamera.setPosition(camX,camY,468);
    blendMode(MULTIPLY);
    texture(staticnoise);
    rect(ROOMX,ROOMY,TILEX,TILEY);
    blendMode(BLEND);
  } else if (cameraMode == "shake") {
    createcamera.setPosition(camX+RX, camY+RY, 468);
    blendMode(MULTIPLY);
    texture(staticnoise);
    rect(ROOMX+RX,ROOMY+RY,TILEX,TILEY);
    blendMode(BLEND);
  }
}

function mousePressed() {
  MouseClicked = true;
  if(!firstClick){
    randomMusic(true);
    updateSound();
    firstClick = true;
  } 
}