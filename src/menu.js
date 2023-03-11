function menu(){
  gameState = 2;
}

function deadscreen(){
  gameState = 2;
}

function debug(){
  if (showCollision){
    debugColorInteract = color(255, 0, 240);
    debugColorInteract.setAlpha(128 + 128 * sin(millis() / 1000));
    
    debugColorStatic = color(0, 100, 255);
    debugColorStatic.setAlpha(128 + 128 * sin(millis() / 1000));
    
    debugColorEnemy = color(255, 0, 0);
    debugColorEnemy.setAlpha(128 + 128 * sin(millis() / 1000));
    
    debugColorPlayer = color(0, 255, 0);
    debugColorPlayer.setAlpha(128 + 128 * sin(millis() / 1000));
  } if (showData){
    fill(51, 204, 51);
    textSize(10);
    text("FPS: " + FPS, ROOMX+5, ROOMY+10);
    text("HP: " + player.hp, ROOMX+5, ROOMY+20);
    text("Bullets: " + BulletCount, ROOMX+5, ROOMY+30);
    text("Enemies: " + EnemyCount, ROOMX+5, ROOMY+40);
    text("Interact: " + ItemCount, ROOMX+5, ROOMY+50);
    text("Static: " + StaticCount, ROOMX+5, ROOMY+60);
  }
}