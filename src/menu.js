function menu(){
  createcamera.setPosition(W/2,H/2,780);
  image(mainmenu,0,0,WIDTH,HEIGHT);
  buttons.forEach(t => {
    t.show();
    t.clicked();
  })
  if (mouseIsPressed === true) {
    fill(255, 255, 255, 128);
    strokeWeight(1);
    ellipse(mouseX, mouseY, 25, 25);
    //gameState = 2;
  }
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
    text("Current Static: " + currentplaceables, ROOMX+5, ROOMY+70);
  }
}

class Button {
  constructor(x, y, w, h, text, size, img,action) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
    this.size = size;
    this.img = img;
    this.action = action;
  }
  show() {
    fill(255, 0, 0,255)
    rect(this.x, this.y, this.w, this.h);
    fill(255,255,255,255)
    textAlign(CENTER, CENTER);
    textSize(this.size);
    text(this.text, this.x + this.w * 0.5, this.y + this.h * 0.5);
  }
  clicked() {
    if (mouseX > this.x && mouseX < (this.x + this.w) && mouseY > this.y && mouseY < (this.y + this.h) && mouseIsPressed === true) {
      this.action();
    }
  }
}

function makeButton() {
  buttons.push( new Button(1 , 1 , 100, 100, "Play", 10, function(){gameState = 2}));
}