var tempwall;
function loadworldfromjson(req) {
var request = new XMLHttpRequest();
request.open('GET', req);
request.send();
request.onload = function() {
           let d = JSON.parse(request.responseText);
           for (let i = 0; i < d.len ;i++){
         tempwall = createSprite(d[i][0],d[i][1],d[i][2],d[i][3]);
         world.push(tempwall);
       }
}
}
function getcontrollers() {
for (let i = 0; i < navigator.getGamepads().length; i++){
if (navigator.getGamepads()[i] != null){
if (players[i] == null){
players[i] = createSprite(700,400,70,70);
players[i].gp = navigator.getGamepads()[i];
players[i].charge = 0;
players[i].cancharge = true;
players[i].attack = false;
players[i].damage = 0;
players[i].nc = false;
if (Math.floor(Math.random() * 2) == 0){
players[i].dir = -1;
}else{
  players[i].dir = 1;
}
}else{
  players[i].gp = navigator.getGamepads()[i];
}
}else{
  if (players[i] == null){
  players[i] = createSprite(700,400,70,70);
  players[i].gp = {axes : [-0.003921568393707275, -0.003921568393707275, 0, 0],buttons : { 0 : {pressed : false},1 : {pressed : false},2 : {pressed : false},3 : {pressed : false},4 : {pressed : false}}}
  players[i].charge = 0;
  players[i].cancharge = true;
  players[i].attack = false;
  players[i].damage = 0;
  players[i].nc = false;
  if (Math.floor(Math.random() * 2) == 0){
  players[i].dir = -1;
  }else{
    players[i].dir = 1;
  }
}
}
}
}
