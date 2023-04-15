// Tweakable variables
const [WIDTH, W, HEIGHT, H] = [1600, 1600, 900, 900]; //16:9 ratio
const [MOVESPEED, FRICTION] = [8,2];
const [TILEX, TILEY] = [960,540];
const [DOORW, DOORH] = [100, 80];

// Variables
var currentRoom = 1;
var currentMap = 0;
var gameState = 0;
var inventory = ["empty","empty","empty"];
var reload_show_timer = false;
var explored = [1];
var dogActive = false;
var stopwatchActive = false;
var stopwatchTimer = 4;
var currentMenu = "start";
var currentDeathMenu = "begin";
var MouseClicked = false;
var NewscoreTime = -1;
var DeathTime = -1;
var newscore = -1;
var HighscoreTime = -1;
var prevpick = -1;
var firstClick = false;
var playbackRate = 1;
var NewHighscore = false;

// Debug boolean
var showFPS = false;
var showData = false;
var showCollision = false;
var debugColorInteract = 'pink';
var debugColorStatic = 'blue';
var debugColorEnemy = 'red';
var debugColorPlayer = 'green';

// Clear Variables
var ROOMX, ROOMY;
let myCanvas;
var borderleftx, borderrightx, bordertopy, borderbottomy;
var room, player;
var rooms = [];
var upgrades = [];
var items = [];
var placables = [];
var enemies = [];
var bullets = [];
var enemybullets = [];
var dog;
var boss = [];
var MainMenuButtons = [];
var SettingsMenuButtons = [];
var DeadscreenButtons = [];
var WinscreenButtons = [];
var SettingSliders = [];
var lastdead;
var song = [];
var sfx = [];
var story = [];
var pickone;
var highscore, wins, deaths = 0;

//debug
var FPS, BulletCount, EnemyCount, ItemCount, currentplaceables;

var cameraMode = "still";
var cameraFrameCount = 0;

var gameTimer = 0;
var storyActive = false

function updateDebug(){
  FPS = round(getFrameRate());
  BulletCount = bullets.length;
  EnemyCount = enemies.length;
  ItemCount = items.length;
  StaticCount = placables.length;
}

function setup() {
  //Local storage
  if(localStorage.getItem('storage') == null){
    MakeStorage();
  }else {
    highscore = getItem('highscore');
    wins = getItem('wins');
    deaths = getItem('deaths');
  }
  setInterval(updateDebug, 10); 
  //Makes the canvas and adds it to the canvis-wrapper as its child
  myCanvas = createCanvas(W, H, WEBGL);
  myCanvas.parent("canvas-wrapper");
  //Framerate
  frameRate(60);
  //Creates the camera
  createcamera = createCamera();
  updatecamera();
  textFont(pixel_font)
  // Makes the Tiles into a array (so it can be drawn)
  makeRoomTiles(theMaps[currentMap] , 3, TILEX, TILEY); //16:9 (x60)
  makeItemTiles(itemLocation[currentMap][currentRoom], 16, 50,50, currentRoom);
  //Generates the player and spawns it
  player = new Player(TILEX*1.5,TILEY/2,40,35);
  dog = new Dog(TILEX*1.5,TILEY/2, 50,50,200)

  makeButton();
  makeSliders();
  updateSound();
  
  //Makes the screen resize canvis, without changing the actual game render size
  //So settings the style.height to 100% almost everybody has a screen that has less height that witdth
  //And than removing the width so the CSS aspect-ratio takes over the width
  document.getElementById("defaultCanvas0").style.height = "100%";
  document.getElementById("defaultCanvas0").style.removeProperty("width");
}
function preload() {
  //Loading in the images/gifs (later in json)
  rock = loadImage('data/stage1/blocks/rock.png');
  rock1 = loadImage('data/stage1/blocks/rock1.png');
  rock2 = loadImage('data/stage1/blocks/rock2.png');
  rock3 = loadImage('data/stage1/blocks/rock3.png');
  vent = loadImage('data/stage1/vent.png');
  revolver = loadImage('data/stage1/revolver.png');
  shotgun = loadImage('data/stage1/shotgun.png');
  rifle = loadImage('data/stage1/rifle.png');
  wall_img = loadImage('data/stage1/wall.png');
  ghostenemy1_r = loadImage('data/enemy/ghost1_right.gif');
  ghostenemy1_l = loadImage('data/enemy/ghost1_left.gif');
  ghostenemy2_r = loadImage('data/enemy/ghost2_right.gif');
  ghostenemy2_l = loadImage('data/enemy/ghost2_left.gif');
  dog_r = loadImage('data/enemy/dawg_r.gif');
  dog_l = loadImage('data/enemy/dawg_l.gif');
  doorBottom = loadImage('data/doors/door_bottom.png');
  doorLeft = loadImage('data/doors/door_left.png');
  doorRight = loadImage('data/doors/door_right.png');
  doorTop = loadImage('data/doors/door_top.png');
  doorBottomOpen = loadImage('data/doors/door_bottom_open.png');
  doorLeftOpen = loadImage('data/doors/door_left_open.png');
  doorRightOpen = loadImage('data/doors/door_right_open.png');
  doorTopOpen = loadImage('data/doors/door_top_open.png');
  saloon_door = loadImage('data/stage1/saloon_door.png');
  
  chest_open = loadImage('data/stage1/chest-open.png');
  chest_closed = loadImage('data/stage1/chest-closed.png');
  dualshot = loadImage('data/stage1/2_line.png');
  stopwatch = loadImage('data/stage1/stopwatch.png');
  collar = loadImage('data/stage1/collar.jpg');
  healthpack_40 = loadImage('data/stage1/healthpack_40.png');
  healthpack_20 = loadImage('data/stage1/healthpack_20.png');
  healthpack_10 = loadImage('data/stage1/healthpack_10.png');

  chest_animation = loadImage('data/stage1/chest-animation.gif');
  pixel_font = loadFont('data/fonts/font.otf');
  staticnoise = loadImage('data/general/static.gif');
  headLeft = loadImage('data/player/head_left.png');
  headRight = loadImage('data/player/head_right.png');
  body_idle = loadImage('data/player/body.png');
  body_walk = loadImage('data/player/body.gif');
  coppertexture = loadImage('data/general/coppercasing.png');
  blackpaint = loadImage('data/general/blackpaint.png');
  mainmenu = loadImage('data/menu-assets/menu.png');
  exitscreen = loadImage('data/menu-assets/exitscreen.png');
  deathscreen = loadImage('data/menu-assets/death.png');
  explain_bg = loadImage('data/stage1/room1_background.png');
  monstrodash_left = loadImage('data/enemy/boss/monstrodash-left.gif');
  monstrodash_right = loadImage('data/enemy/boss/monstrodash-right.gif');
  monstrodash_up = loadImage('data/enemy/boss/monstrodash-up.gif');
  monstrodash_down = loadImage('data/enemy/boss/monstrodash-down.gif');
  monstrowalk_left = loadImage('data/enemy/boss/monstrowalk-left.gif');
  monstrowalk_right = loadImage('data/enemy/boss/monstrowalk-right.gif');
  slime = loadImage('data/enemy/slime.gif');
  slime_shooting = loadImage('data/enemy/slime_shooting.gif');
  slimeball = loadImage('data/enemy/slimeball.png');
  BackgroundInventory = loadImage('data/stage1/inventory.png');
  story_vid = loadImage('data/sounds/story/story.gif');
  endscreen = loadImage('data/sounds/story/endscreen.gif');
  
  //SFX
  sfx[0] = loadSound('data/sounds/shotgunFire.mp3'); //shotgun_shot
  sfx[1] = loadSound('data/sounds/shotgunReload.mp3'); //shotgun_reload
  sfx[2] = loadSound('data/sounds/pickup.mp3'); //item pickup sound
  sfx[3] = loadSound('data/sounds/gun_fire.mp3'); //gunfire 
  sfx[4] = loadSound('data/sounds/revolverReload.mp3'); //reload
  sfx[5] = loadSound('data/sounds/dog_barking.mp3'); //dog bark
  
  
  //Songs
  song[0] = loadSound("data/sounds/songs/big-iron.mp3");
  song[0].onended(randomMusic);
  song[1] = loadSound("data/sounds/songs/help-me.mp3");
  song[1].onended(randomMusic);
  song[2] = loadSound("data/sounds/songs/its-a-sin.mp3");
  song[2].onended(randomMusic);
  song[3] = loadSound("data/sounds/songs/lone-star.mp3");
  song[3].onended(randomMusic);
  //Story telling
  story[0] = loadSound('data/sounds/story/storytelling.mp3');
  story[1] = loadSound('data/sounds/story/storytellingmusic.mp3');
}