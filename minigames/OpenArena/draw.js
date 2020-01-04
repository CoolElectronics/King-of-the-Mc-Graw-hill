var players = [];
var world = [];
var avgzoom = 0;
function preload() {
  loadworldfromjson("levels/classic1.json");
}
function setup() {
  createCanvas(1400,800);
}
function draw() {
background(0);
getcontrollers();
avgzoom = 0;
for (let i = 0; i < players.length; i++) {
interface(players[i].gp,players[i]);
avgzoom += players[i].position.x;
}
avgzoom = avgzoom / players.length;
camera.position.x = avgzoom;
drawSprites();
}
