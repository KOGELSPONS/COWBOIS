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
var currentMenu = "start";
var currentDeathMenu = "begin";
var MouseClicked = false;

// Debug boolean
var showData = true;
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
var lastdead;

//debug
var FPS, BulletCount, EnemyCount, ItemCount, currentplaceables;

var cameraMode = "still";
var cameraFrameCount = 0;

var gameTimer = 0;

function updateDebug(){
  FPS = round(getFrameRate());
  BulletCount = bullets.length;
  EnemyCount = enemies.length;
  ItemCount = items.length;
  StaticCount = placables.length;
}

function setup() {
  console.log(itemLocation);
  console.log(theMaps);
  console.log(enemies);
  //framerate 
  setInterval(updateDebug, 10); 
  //Makes the canvas and adds it to the canvis-wrapper as its child
  myCanvas = createCanvas(W, H, WEBGL);
  myCanvas.parent("canvas-wrapper");
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

  //Makes the screen resize canvis, without changing the actual game render size
  //So settings the style.height to 100% almost everybody has a screen that has less height that witdth
  //And than removing the width so the CSS aspect-ratio takes over the width
  document.getElementById("defaultCanvas0").style.height = "100%";
  document.getElementById("defaultCanvas0").style.removeProperty("width");
}
function preload() {
  //Loading in the images/gifs (later in json)
  rock = loadImage('data/stage1/rock.png');
  vent = loadImage('data/stage1/vent.png');
  revolver = loadImage('data/stage1/revolver.png');
  shotgun = loadImage('data/stage1/shotgun.png');
  rifle = loadImage('data/stage1/rifle.png');
  wall_img = loadImage('data/stage1/wall.png');
  ghostenemy1_r = loadImage('data/enemy/ghost1_right.gif');
  ghostenemy1_l = loadImage('data/enemy/ghost1_left.gif');
  dog_r = loadImage('data/enemy/dawg_r.gif');
  dog_l = loadImage('data/enemy/dawg_l.gif');
  DoorFinalBottom = loadImage('data/doors/DoorFinalBottom.png');
  DoorFinalLeft = loadImage('data/doors/DoorFinalLeft.png');
  DoorFinalRight = loadImage('data/doors/DoorFinalRight.png');
  DoorFinalTop = loadImage('data/doors/DoorFinalTop.png');
  chest_open = loadImage('data/stage1/chest-open.png');
  chest_closed = loadImage('data/stage1/chest-closed.png');
  dualshot = loadImage('data/stage1/2_line.png');
  collar = loadImage('data/stage1/collar.jpg');
  chest_animation = loadImage('data/stage1/chest-animation.gif');
  pixel_font = loadFont('data/fonts/font.otf');
  staticnoise = loadImage('data/general/static.gif');
  RockRight = loadImage('data/player/RockRight.png');
  RockLeft = loadImage('data/player/RockLeft.png');
  body = loadImage('data/player/body.png');
  coppertexture = loadImage('data/general/coppercasing.png');
  blackpaint = loadImage('data/general/blackpaint.png');
  mainmenu = loadImage('data/menu-assets/menu.png');
  exitscreen = loadImage('data/menu-assets/exitscreen.png');
  deathscreen = loadImage('data/menu-assets/death.png');
  explain_bg = loadImage('data/stage1/room1_background.png');
  monstrodash_left = loadImage('data/enemy/boss/monstrodash-left.png');
  monstrodash_right = loadImage('data/enemy/boss/monstrodash-right.png');
  monstrodash_vert = loadImage('data/enemy/boss/monstrodash-vert.png');
  monstrowalk_left = loadImage('data/enemy/boss/monstrowalk-left.png');
  monstrowalk_right = loadImage('data/enemy/boss/monstrowalk-right.png');
  slime = loadImage('data/enemy/slime.gif');
  //Loading the sounds (later in json)\

  shotgun_shot = loadSound('data/sounds/shotgunFire.mp3')
  shotgun_reload = loadSound('data/sounds/shotgunReload.mp3')
  hey = loadSound('data/sounds/hey.mp3');
}
