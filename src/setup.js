var [WIDTH, W, HEIGHT, H] = [1600, 1600, 900, 900]; //16:9 ratio
var [MOVESPEED, FRICTION] = [10,2];
var [TILEX, TILEY] = [960,540];
let room, player;

// Variables
var myCanvas;

function setup() {
  myCanvas = createCanvas(W, H, WEBGL);
  myCanvas.parent("canvas-wrapper");
  background(0);
  frameRate(60);
  createcamera = createCamera();
  drawTiles(map, 3, TILEX, TILEY); //16:9 (x60)
  player = new Player(TILEX/2,TILEY/2,40,70);

  DoorFinalBottom = loadImage('data/doors/DoorFinalBottom.png');
  DoorFinalLeft = loadImage('data/doors/DoorFinalLeft.png');
  DoorFinalRight = loadImage('data/doors/DoorFinalRight.png');
  DoorFinalTop = loadImage('data/doors/DoorFinalTop.png');
}
