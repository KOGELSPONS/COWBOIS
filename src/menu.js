function menu(){
  createcamera.setPosition(W/2,H/2,780);
  if (currentMenu == "start"){
    image(mainmenu,0,0,WIDTH,HEIGHT);
    MainMenuButtons.forEach(t => {
      t.show();
      t.clicked();
    })
  } else if (currentMenu == "settings"){
    image(mainmenu,0,0,WIDTH,HEIGHT);
    SettingsMenuButtons.forEach(t => {
      t.show();
      t.clicked();
    })
    SettingSliders.forEach(t => {
      t.show();
      t.clicked();
    })
  } else if (currentMenu == "quit"){
    image(exitscreen,0,0,WIDTH,HEIGHT);
    song[0].stop();
    song[1].stop();
    song[2].stop();
    song[3].stop();
    song[4].loop();
    fail;
  }

  if (mouseIsPressed === true) {
    fill(255, 255, 255, 128);
    strokeWeight(1);
    ellipse(mouseX, mouseY, 15, 15);
  }
}

function deadscreen(){
  if (currentDeathMenu == "begin"){
    if (mouseIsPressed === true || new Date().getTime() - lastdead >= 5000){
      currentDeathMenu = "second";
    }
  } else if (currentDeathMenu == "second"){
    createcamera.setPosition(W/2,H/2,780);
    image(mainmenu,0,0,WIDTH,HEIGHT);
    DeadscreenButtons.forEach(t => {
      t.show();
      t.clicked();
    })
  }
}

function winscreen() {
  
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
  constructor(x, y, w, h, text, size, img, action, menu) {
    this.x = x - w/2;
    this.y = y - h/2;
    this.w = w;
    this.h = h;
    this.text = text;
    this.size = size;
    this.img = img;
    this.action = action;
    this.menu = menu;
  }
  show() {
    fill(255, 0, 0,255);
    stroke("floralwhite");
    strokeWeight(4);
    texture(this.img);
    rect(this.x, this.y, this.w, this.h);
    fill("floralwhite")
    textAlign(CENTER, CENTER);
    textSize(this.size);
    text(this.text, this.x + this.w * 0.5, this.y + this.h * 0.45);
  }
  clicked() {
    if (mouseX > this.x && mouseX < (this.x + this.w) && mouseY > this.y && mouseY < (this.y + this.h) && MouseClicked) {
      this.action();
    }
  }
}

class Slider {
  constructor(x, y, w, h, text, size, img) {
    this.x = x - w/2;
    this.y = y - h/2;
    this.w = w;
    this.h = h;
    this.text = text;
    this.size = size;
    this.img = img;
    this.value = w/2;
  }
  show() {
    fill(255, 0, 0,255);
    stroke("floralwhite");
    strokeWeight(4);
    texture(this.img);
    rect(this.x, this.y, this.w, this.h);
    fill("red");
    rect(this.x, this.y, this.value, this.h);
    fill("floralwhite")
    textAlign(CENTER, CENTER);
    textSize(this.size);
    text(this.text + ": " + round(this.value/8) , this.x + this.w * 0.5, this.y + this.h * 0.45);
  }  
  clicked() {
    if (mouseX > this.x && mouseX < (this.x + this.w) && mouseY > this.y && mouseY < (this.y + this.h) && mouseIsPressed === true) {
      this.value = mouseX - this.x;
      updateSound();
    }
  }
}

function makeButton() {
  MainMenuButtons = [];
  SettingsMenuButtons = [];
  DeadscreenButtons = [];
  //Start menu
  MainMenuButtons.push( new Button(WIDTH/2, HEIGHT/2 + 100 , 800, 100, "Play", 50, blackpaint, function(){gameState = 2;} ,"start"));
  MainMenuButtons.push( new Button(WIDTH/2, HEIGHT/2 + 220 , 800, 100, "Settings", 50, blackpaint, function(){currentMenu = "settings";} ,"start"));
  MainMenuButtons.push( new Button(WIDTH/2, HEIGHT/2 + 340 , 800, 100, "Quit", 50, blackpaint, function(){currentMenu = "quit";} ,"start"));
  //Settings
  //SettingsMenuButtons.push( new Button(WIDTH/2, HEIGHT/2 - 120 , 800, 100, "Test", 50, blackpaint, function(){console.log("test");} ,"settings"));
  //SettingsMenuButtons.push( new Button(WIDTH/2, HEIGHT/2 + 0 , 800, 100, "Test", 50, blackpaint, function(){console.log("test");} ,"settings"));
  SettingsMenuButtons.push( new Button(WIDTH/2, HEIGHT/2 + 120 , 800, 100, "Clear LocalStorage", 50, blackpaint, function(){localStorage.clear();} ,"settings"));
  SettingsMenuButtons.push( new Button(WIDTH/2, HEIGHT/2 + 240 , 800, 100, "Back", 50, blackpaint, function(){currentMenu = "start";} ,"settings"));
  //Deadscreen
  DeadscreenButtons.push( new Button(WIDTH/2, HEIGHT/2 - 20 , 1000, 100, "Time to Death: " + DeathTime + " sec", 50, blackpaint, function(){} ,""));
  DeadscreenButtons.push( new Button(WIDTH/2, HEIGHT/2 + 100 , 800, 100, "Restart", 50, blackpaint, function(){Reset();} ,""));
  DeadscreenButtons.push( new Button(WIDTH/2, HEIGHT/2 + 220 , 800, 100, "To Menu", 50, blackpaint, function(){Reset(); gameState = 1;} ,""));
  DeadscreenButtons.push( new Button(WIDTH/2, HEIGHT/2 + 340 , 800, 100, "Quit", 50, blackpaint, function(){gameState = 1; currentMenu = "quit";} ,""));
}

function makeSliders() {
  SettingSliders = [];
  SettingSliders.push( new Slider(WIDTH/2, HEIGHT/2 - 120 , 800, 100, "SFX", 50, blackpaint));
  SettingSliders.push( new Slider(WIDTH/2, HEIGHT/2 + 0 , 800, 100, "Music", 50, blackpaint));
}

function Reset() {
  camX = TILEX*1.5, camY = TILEY/2;
  currentRoom = 1;
  currentMap = 0;
  inventory = ["empty","empty","empty"];
  reload_show_timer = false;
  explored = [1];
  dogActive = false;
  currentMenu = "start";
  currentDeathMenu = "begin";
  cameraMode = "still";
  MouseClicked = false;

  gameTimer = 0;

  ROOMX, ROOMY;
  borderleftx, borderrightx, bordertopy, borderbottomy;
  room;
  rooms = [];
  upgrades = [];
  items = [];
  placables = [];
  enemies = [];
  bullets = [];
  enemybullets = [];
  boss = [];

  makeRoomTiles(theMaps[currentMap] , 3, TILEX, TILEY); //16:9 (x60)
  makeItemTiles(itemLocation[currentMap][currentRoom], 16, 50,50, currentRoom);

  player = new Player(TILEX*1.5,TILEY/2,40,35);
  dog = new Dog(TILEX*1.5,TILEY/2, 50,50,200);
  
  gameState = 2;
}

function randomMusic() {
  song[0].stop();
  song[1].stop();
  song[2].stop();
  song[3].stop();
  pickone=round(random(-0.5,3.4));
  if (pickone == prevpick){
    randomMusic(prevpick);
  } else{
    song[pickone].play();
    prevpick = pickone;
  }
}

function updateSound() {
  let ValueSFX = round(SettingSliders[0].value)/800
  let ValueMusic = round(SettingSliders[1].value)/800
  
  //SFX
  for (let i = 0; i < sfx.length; i++) {
    sfx[i].setVolume(ValueSFX);
  }

  //Music
  for (let i = 0; i < song.length; i++) {
    song[i].setVolume(ValueMusic);
  }
}