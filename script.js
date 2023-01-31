function draw() {
  background(0);
  rooms.forEach(r => {
      r.show();
    })
  player.show();
  player.move();
  player.camera();
}