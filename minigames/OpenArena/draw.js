var players = [];
var world = [];
var avgzoom = 0;
var  playersdead = 0;
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
drawSprites();
for (let i = 0; i < world.length; i++){
world[i].img.resize(world[i].width,world[i].height);
  image(world[i].img,world[i].position.x - world[i].width / 2,world[i].position.y - world[i].height / 2);
}
for (let i = 0; i < players.length; i++) {
  if (players[i] != "dead"){
if (interface(players[i].gp,players[i]) == "dead"){
  players[i] = "dead";
  playersdead ++;
}else{
// players[i].img = players[i].img.resize(players[i].img,players[i].width,players[i].height);
// image(players[i].img,players[i].position.x,players[i].position.y);
avgzoom += players[i].position.x;
}
}
}
avgzoom = avgzoom / (players.length - playersdead);
camera.position.x = avgzoom;
}
