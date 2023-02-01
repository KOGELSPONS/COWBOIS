var [WIDTH, W, HEIGHT, H] = [1080, 1080, 720, 720]; //16:9 ratio
var [MOVESPEED, FRICTION] = [10,2];
let room, player;

// Variables
var myCanvas;

function setup() {
  myCanvas = createCanvas(W, H, WEBGL);
  myCanvas.parent("canvas-wrapper");
  background(0);
  frameRate(60);
  createcamera = createCamera();
  drawTiles(map, 3, 700, 500);
  player = new Player(1000,250,40,70);
}
