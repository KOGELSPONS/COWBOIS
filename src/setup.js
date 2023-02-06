// Tweakable variables
var [WIDTH, W, HEIGHT, H] = [1600, 1600, 900, 900]; //16:9 ratio
var [MOVESPEED, FRICTION] = [10,2];
var [TILEX, TILEY] = [960,540];
var [DOORW, DOORH] = [100, 80];


// Clear Variables
var myCanvas;
var borderleftx, borderrightx, bordertopy, borderbottomy;
var room, player;
var rooms = [];
var inventory = [];
var items = [];
var explored = [1];
var enemies = [];

//for(let i = 0; i < 5; i++){
//  maps[i].rooms;
//  maps[i].objects;
//}

// Variables
var currentRoom = 1;
var currentMap = 0;

function setup() {
  console.log(itemLocation);
  console.log(theMaps);
  console.log(enemies);
  //Makes the canvas and adds it to the canvis-wrapper as its child
  myCanvas = createCanvas(W, H, WEBGL);
  myCanvas.parent("canvas-wrapper");
  frameRate(60);
  //Creates the camera
  createcamera = createCamera();
  // Makes the Tiles into a array (so it can be drawn)
  makeRoomTiles(theMaps[currentMap] , 3, TILEX, TILEY); //16:9 (x60)
  makeItemTiles(itemLocation[currentRoom], 16, 50,50, currentRoom);
  //Generates the player and spawns it
  player = new Player(TILEX*1.5,TILEY/2,40,35);
  //spawn(); 
  //Loading in the images (later in json)
  DoorFinalBottom = loadImage('data/doors/DoorFinalBottom.png');
  DoorFinalLeft = loadImage('data/doors/DoorFinalLeft.png');
  DoorFinalRight = loadImage('data/doors/DoorFinalRight.png');
  DoorFinalTop = loadImage('data/doors/DoorFinalTop.png');
  //Makes the screen resize canvis, without changing the actual game render size
  //So settings the style.height to 100% almost everybody has a screen that has less height that witdth
  //And than removing the width so the CSS aspect-ratio takes over the width
  document.getElementById("defaultCanvas0").style.height = "100%";
  document.getElementById("defaultCanvas0").style.removeProperty("width");
}
