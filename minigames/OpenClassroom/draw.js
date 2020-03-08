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
  document.getElementsByClassName('p5Canvas')[0].style = "padding: 0;margin: auto;  display: block;  width: 1400px;height: 800px;position: absolute;  top: 0;  bottom: 0;left: 0;right: 0;";
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
