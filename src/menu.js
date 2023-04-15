function menu(){
  //setting the camera so you can see the same ammount of pixels as your canvas size
  createcamera.setPosition(W/2,H/2,780);
  if (currentMenu == "start"){
    //showing the enu image
    image(mainmenu,0,0,WIDTH,HEIGHT);
    //Drawing the pressable buttons
    MainMenuButtons.forEach(t => {
      if (t.menu == currentMenu){
        t.show();
        t.clicked();
      }
    })
    //Text
    fill("Black");
    textAlign(LEFT, TOP);
    textSize(30);
    text("Deaths: " + deaths, 50, 50);
    text("Wins: " + wins, 50, 100);
    text("Highscore:", 50, 150);
    let showscore
    if (highscore == -1){
      showscore = "Not Set"
    } else {
      showscore = highscore
    }
    text(showscore, 50 , 180);
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
    randomMusic()
    fail;
  } else if (currentMenu == "story"){
    setTimeout(function() {storyActive = true;}, 5000);
    if (storyActive){
      image(story_vid,0,0,WIDTH,HEIGHT);
    }
    MainMenuButtons.forEach(t => {
      if (t.menu == currentMenu){
        t.show();
        t.clicked();
      }
    })
    playbackRate -= 0.005;
    playbackRate = constrain(playbackRate, 0, 1);
    updateSound();
    if (!story[0].isPlaying()){
      gameState = 2;
      currentMenu = "start";
      storyActive = false;
      playbackRate = 1;
      updateSound();
      randomMusic();
    }
    //play video
  } 

  if (mouseIsPressed === true) {
    fill(255, 255, 255, 128);
    strokeWeight(1);
    ellipse(mouseX, mouseY, 15, 15);
  }
  blendMode(MULTIPLY);
  texture(staticnoise);
  rect(0,0,W,H);
  blendMode(BLEND);
}

var playbackRate = 1;
function deadscreen(){
  if (currentDeathMenu == "begin"){
    playbackRate -= 0.005;
    playbackRate = constrain(playbackRate, 0, 1);
    if (mouseIsPressed === true || new Date().getTime() - lastdead >= 5000){
      currentDeathMenu = "second";
    }
  } else if (currentDeathMenu == "second"){
    playbackRate += 0.01;
    playbackRate = constrain(playbackRate, 0, 1);
    createcamera.setPosition(W/2,H/2,780);
    image(mainmenu,0,0,WIDTH,HEIGHT);
    DeadscreenButtons.forEach(t => {
      t.show();
      t.clicked();
    })
  }
}

function winscreen() {
  createcamera.setPosition(W/2,H/2,780);
  image(endscreen,0,0,WIDTH,HEIGHT);
  //Reset();
  blendMode(MULTIPLY);
  texture(staticnoise);
  rect(0,0,W,H);
  blendMode(BLEND);
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
  } else if (showFPS){
    fill(51, 204, 51);
    textSize(10);
    text("FPS: " + FPS, ROOMX+5, ROOMY+10);
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
  constructor(x, y, w, h, text, size, img, start) {
    this.x = x - w/2;
    this.y = y - h/2;
    this.w = w;
    this.h = h;
    this.text = text;
    this.size = size;
    this.img = img;
    this.value = start;
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
    }
  }
}

class ScrollingText {
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
  draw(){
    
  }
  update(){
    
  }
}

function makeButton() {
  MainMenuButtons = [];
  SettingsMenuButtons = [];
  DeadscreenButtons = [];
  //Start menu
  MainMenuButtons.push( new Button(WIDTH/2, HEIGHT/2 + 100 , 800, 100, "Play", 50, blackpaint, function(){story[0].play(); story[1].play();storyTimer = 1; currentMenu = "story"; firstClick = true;} ,"start"));
  MainMenuButtons.push( new Button(WIDTH/2, HEIGHT/2 + 220 , 800, 100, "Settings", 50, blackpaint, function(){currentMenu = "settings";} ,"start"));
  MainMenuButtons.push( new Button(WIDTH/2, HEIGHT/2 + 340 , 800, 100, "Quit", 50, blackpaint, function(){currentMenu = "quit";} ,"start"));
  MainMenuButtons.push( new Button(WIDTH/2 + 600, HEIGHT/2 + 350 , 200, 100, "Skip", 50, blackpaint, function(){story[0].stop(); story[1].stop(); storyActive = false;} ,"story"));
  
  
  //Settings

  SettingsMenuButtons.push( new Button(WIDTH/2, HEIGHT/2 + 120 , 800, 100, "Clear LocalStorage", 50, blackpaint, function(){localStorage.clear(); MakeStorage();} ,"settings"));
  SettingsMenuButtons.push( new Button(WIDTH/2, HEIGHT/2 + 240 , 800, 100, "Back", 50, blackpaint, function(){currentMenu = "start";} ,"settings"));
  //Deadscreen
  DeadscreenButtons.push( new Button(WIDTH/2, HEIGHT/2 - 20 , 1000, 100, "Time to Death: " + DeathTime + " sec", 50, blackpaint, function(){} ,""));
  DeadscreenButtons.push( new Button(WIDTH/2, HEIGHT/2 + 100 , 800, 100, "Restart", 50, blackpaint, function(){Reset(); playbackRate = 1;} ,""));
  DeadscreenButtons.push( new Button(WIDTH/2, HEIGHT/2 + 220 , 800, 100, "To Menu", 50, blackpaint, function(){Reset(); gameState = 1;} ,""));
  DeadscreenButtons.push( new Button(WIDTH/2, HEIGHT/2 + 340 , 800, 100, "Quit", 50, blackpaint, function(){gameState = 1; currentMenu = "quit";} ,""));
  //Winscreen
  DeadscreenButtons.push( new Button(WIDTH/2, HEIGHT/2 + 100 , 800, 100, "Restart", 50, blackpaint, function(){Reset();} ,""));
  DeadscreenButtons.push( new Button(WIDTH/2, HEIGHT/2 + 220 , 800, 100, "To Menu", 50, blackpaint, function(){Reset(); gameState = 1;} ,""));
  DeadscreenButtons.push( new Button(WIDTH/2, HEIGHT/2 + 340 , 800, 100, "Quit", 50, blackpaint, function(){gameState = 1; currentMenu = "quit";} ,""));
}

function makeSliders() {
  let SFX = getItem('SFX');
  let Music = getItem('Music');

  
  SettingSliders = [];
  SettingSliders.push( new Slider(WIDTH/2, HEIGHT/2 - 120 , 800, 100, "SFX", 50, blackpaint, SFX));
  SettingSliders.push( new Slider(WIDTH/2, HEIGHT/2 + 0 , 800, 100, "Music", 50, blackpaint, Music));
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
  } else if (currentMenu != "quit" && currentMenu != "story"){
    song[pickone].play();
    prevpick = pickone;
  }
}

function updateSound() {
  let ValueSFX = round(SettingSliders[0].value)/800
  let ValueMusic = round(SettingSliders[1].value)/800
  if (ValueSFX < 0.01){
    ValueMusic = 0;
  } if (ValueMusic < 0.01){
    ValueMusic = 0;
  } 
  storeItem('SFX', SettingSliders[0].value);
  storeItem('Music', SettingSliders[1].value);
  
  //SFX
  for (let i = 0; i < sfx.length; i++) {
    sfx[i].setVolume(ValueSFX);
  }

  //Music
  for (let i = 0; i < song.length; i++) {
    song[i].setVolume(ValueMusic);
    song[i].rate(playbackRate);
  }
}

function MakeStorage(){
  highscore = 0;
  wins = 0;
  deaths = 0;
  storeItem('storage', true);
  storeItem('highscore', -1);
  storeItem('wins', 0);
  storeItem('deaths', 0);
  storeItem('SFX', 400);
  storeItem('Music', 400);
}

function win(){
  let newscore = gameTimer;
  let oldscore = getItem('highscore');
  if (newscore < oldscore || oldscore == -1){
    highscore = newscore;
  } else {
    highscore = oldscore;
  }
  storeItem('highscore', highscore);
  wins += 1;
  storeItem('wins', wins);
}