function draw() {
  background(0);
  player.move();
  
  rooms.forEach(r => {
      r.show();
  })
  
  items.forEach(p => {
    p.show();
    p.pickup();
  })
  
  player.camera();  
  player.show();
}

function keyPressed() {
  if (keyIsDown(82)) { //Press r-button 
    checkRoom();
  }
}