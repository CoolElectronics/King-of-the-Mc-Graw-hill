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
