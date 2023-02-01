var [WIDTH, W, HEIGHT, H] = [1600, 1600, 900, 900]; //16:9 ratio
var [MOVESPEED, FRICTION] = [10,2];
let room, player;

//items
testitem = new Item(1000, 750, 'revolver');

//list
let items = [testitem];


// Variables
var myCanvas;

function setup() {
  myCanvas = createCanvas(W, H, WEBGL);
  myCanvas.parent("canvas-wrapper");
  background(0);
  frameRate(60);
  createcamera = createCamera();
  drawTiles(map, 3, 900, 510);
  player = new Player(1000,250,40,70);
}
