var tempwall;
var pr = [];
var questions = {};
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
function loadAllQuestions() {
var request = new XMLHttpRequest();
request.open('GET', "questions/AllQuestions.json");
request.send();
request.onload = function() {
let d = JSON.parse(request.responseText);
for (let lvl in d){
let table = loadTable(d[lvl], 'csv',function () {
    questions[lvl] = [];
  for (var i = 0; i < table.rows.length; i++) {
    console.log(table.rows[i]);

    questions[lvl][i] = table.rows[i].arr;
  }
});
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
  if (!(navigator.getGamepads()[0] == null && navigator.getGamepads()[1] == null && navigator.getGamepads()[2] == null)) {
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
    for (let i = 0; i < 2; i++) {
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
      players[i].gp = getPseudoGamepads()[i];
      players[i].madechoice = false;
      players[i].x = width / 2;
      players[i].y = height / 2;
    }else{
      players[i].gp = getPseudoGamepads()[i];
    }
  }
}
}else{
  if (!(navigator.getGamepads()[0] == null && navigator.getGamepads()[1] == null && navigator.getGamepads()[2] == null)){
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
}else{
  for (let i = 0; i < 2; i++){
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
    players[i].gp = getPseudoGamepads()[i];
  }
  }
}
  }
}
function getPseudoGamepads() {
  var a11 = 0;
  var a12 = 0;
  var a01 = 0;
  var a02 = 0;
  if (keyIsDown(LEFT_ARROW)){
    a11 = -1;
  }else if (keyIsDown(RIGHT_ARROW)){
    a11 = 1;
  }
  if (keyIsDown(UP_ARROW)){
    a12 = -1;
  }else if (keyIsDown(DOWN_ARROW)){
    a12 = 1;
  }


  if (keyIsDown(65)){
    a01 = -1;
  }else if (keyIsDown(68)){
    a01 = 1;
  }
  if (keyIsDown(87)){
    a02 = -1;
  }else if (keyIsDown(83)){
    a02 = 1;
  }
  return [{axes:[a01,a02],buttons:[{pressed:keyIsDown(87)},{pressed:keyIsDown(72)},{pressed:keyIsDown(71)},{pressed:keyIsDown(70)},0,0,0,{pressed:keyIsDown(84)}]},{axes:[a11,a12],buttons:[{pressed:keyIsDown(38)},{pressed:keyIsDown(76)},{pressed:keyIsDown(75)},{pressed:keyIsDown(74)},0,0,0,{pressed:keyIsDown(73)}]}];
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
          player.width = playerdata[i].animations.idle[0].width;
          player.height = playerdata[i].animations.idle[0].height;
          }else{
            player.width = playerdata[i].animations.idle[0].width;
            player.height = playerdata[i].animations.idle[0].height;
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
  players[i].recodead = false;
  players[i].waybackup = false;
  players[i].groundpound = false;
}
