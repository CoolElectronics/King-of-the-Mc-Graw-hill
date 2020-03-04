var players = [];
var world = [];
var avgzoom = 0;
var gstate = "title";
var playersdead = 0;
var bk = 0;
var lvldata = [];
var playerdata = [];
function preload() {
  document.body.innerHTML = "<h1 style = 'color:blue;font-size:100px'>LOADING...</h1>"
  bk = loadImage("title.png");
  loadAllWorlds();
  loadAllPlayers();
}
function setup() {
  document.body.innerHTML = "";
  createCanvas(1400,800);
}
function draw() {
 if (gstate == "fight"){
   fight();
 }
 if (gstate == "title"){
   title();
 }
 if (gstate == "cselect"){
   cselect();
 }
}
function fight() {
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
    text("P" + (i + 1),players[i].position.x - players[i].width / 2,players[i].position.y - 100);
  avgzoom += players[i].position.x;
  }
  }
  }
  avgzoom = avgzoom / (players.length - playersdead);
  camera.position.x = avgzoom;
  if (playersdead == players.length - 1 && players.length > 0){
    for (let i = 0; i < players.length; i++) {
      if (players[i] != "dead"){
        alert("Player " + (i + 1) + " has won the game!");
        players = [];
        playersdead = 0;
        ofx = 0;
        ofy = 0;
        for (let i = 0; i < playerdata.length; i++) {
            playerdata[i].chosen = [];
        }
        rf = [];
        gstate = "cselect";
        return;
      }
    }
  }
}
