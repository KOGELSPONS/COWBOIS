function menu(){
  gameState = 2;
}

function deadscreen(){
  gameState = 3;
}

function debug(){
  fill(51);
  textSize(10);
  text("FPS: " + FPS, ROOMX+5, ROOMY+10);
  text("HP: " + player.hp, ROOMX+5, ROOMY+20);
  text("Bullets: " + BulletCount, ROOMX+5, ROOMY+30);
}