var tempwall;
var pr = [];
function loadAllWorlds() {
var request = new XMLHttpRequest();
request.open('GET', "levels/levels.json");
request.send();
request.onload = function() {
let d = JSON.parse(request.responseText);
for (let i = 0; i < d.len ;i++){
var lvlq = new XMLHttpRequest();
lvlq.open('GET', d[i]);
lvlq.send();
lvlq.onload = function() {
lvldata.push(lvlq);
lvlload(lvlq);
}
}
}
}
function loadAllPlayers() {
var request = new XMLHttpRequest();
request.open('GET', "players/players.json");
request.send();
request.onload = function() {
let d = JSON.parse(request.responseText);

for (let i = 0; i < d.len ;i++){

pr.push(new XMLHttpRequest());
let playerq = pr[i];
playerq.open('GET',d[i]);
playerq.send();
playerq.onload = function() {

let p = JSON.parse(playerq.responseText);
for (let i in p.animations) {
  if (p.animations[i].length == 1){
for (let img in p.animations[i]) {

  let pathtoimage = p.animations[i][img];
p.animations[i][img] = loadImage(pathtoimage);
}
}
}
playerdata.push(p);
}
}
}
}

function getcontrollers(overload) {
  if(typeof overload !== "undefined") {
    for (let i = 0; i < navigator.getGamepads().length; i++){
    if (navigator.getGamepads()[i] != null){
    if (players[i] == null){
    players[i] = {};
    switch (i) {
      case 0:
      players[i].color = [255,0,0];
      break;
      case 1:
      players[i].color = [0,0,255];
      break;
      case 2:
      players[i].color = [0,255,0];
      break;
      case 3:
      players[i].color = [0,255,255];
      break;
    }
    players[i].gp = navigator.getGamepads()[i];
    players[i].madechoice = false;
    players[i].x = width / 2;
    players[i].y = height / 2;
    }else{
      players[i].gp = navigator.getGamepads()[i];
    }
    }
    }
  }else{
for (let i = 0; i < navigator.getGamepads().length; i++){
if (navigator.getGamepads()[i] != null){
if (players[i] == null){
players[i] = createSprite(700,400,70,70);
loadplayer(i);
playersvar(i);
if (Math.floor(Math.random() * 2) == 0){
players[i].dir = -1;
}else{
  players[i].dir = 1;
}
}else{
  players[i].gp = navigator.getGamepads()[i];
}
}
}
}
}
function lvlload(lvlq) {
let d = JSON.parse(lvlq.responseText);
for (let i = 0; i < d.len ;i++){
tempwall = createSprite(d[i][0],d[i][1],d[i][2],d[i][3]);
let img = loadImage(d[i][4]);
tempwall.img = img;
world.push(tempwall);
}
}
function loadplayer(x) {
  let player = players[x];
    for (let i = 0; i < playerdata.length; i++) {
      for (let o = 0; o < playerdata[i].chosen.length; o++) {
        console.log(playerdata[i].chosen[o] + " " + i);
        if (playerdata[i].chosen[o] == x){
          console.log(playerdata[i].chosen[o] + " " + i);
          if (playerdata[i].animations.idle.length < 2){

          player.addAnimation("idle",playerdata[i].animations.idle[0],playerdata[i].animations.idle[0]);
          }else{

          player.addAnimation("idle",playerdata[i].animations.idle[0],playerdata[i].animations.idle[1]);
        }
      }
    }
  }
}
function playersvar(i) {
  players[i].gp = navigator.getGamepads()[i];
  players[i].charge = 0;
  players[i].cancharge = true;
  players[i].attack = false;
  players[i].damage = 0;
  players[i].punch = false;
  players[i].punchpow = 0;
  players[i].boom = false;
  players[i].jumps = 0;
  players[i].dejump = true;
  players[i].lives = 0;
  players[i].nc = false;
}
