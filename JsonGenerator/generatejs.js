"use strict";
var player;
var z = 0.36;
var elem;
var omx,omy;
var init = false;
var index = 0;
var w = 2;
var h = 2;
var throttle = true;
var throttle1 = true;
var throttle2 = true;
var throttle3 = true;
var throttle4 = true;
var x;
var y;
var speed = 15;
var l = 1;
var v = 0;
var npc;
var r = 0,real = 0;
var npx = [];
var world = {};
var npdata = {};
var npy = [];
var shide = true;
var npcs = [];
var worldelements = [];
var playeri;
function setup() {
createCanvas(window.innerWidth,window.innerHeight);
player = createSprite(width / 2,height/2);
x = width / 2;
y = height / 2 - 100;
playeri = loadImage('player.png');
playeri.resize(20,0);
player.addImage(playeri);
}


function draw() {
  background(255);
  if (init){
    creative();
  }else{
worldhandler();
}
camera.zoom = z;
camera.position.x = player.position.x;
camera.position.y = player.position.y;
keyhandler();
drawMap();
}
//////////// KEYS
function keyhandler(){
if (keyDown(OPTION)){
  if (throttle){
throttle = false;
setTimeout(function () {throttle = true},500);
if (shide){
  shide = false;
  document.getElementById("save").style = "display:none";
}else{
  shide = true;
  document.getElementById("save").style = "display:block";
}
}
}
if(keyDown('w')){
player.velocity.y = -1 * speed;
}else{
if(!keyDown('s')){
player.velocity.y = 0;
}
}
if(keyDown('a')){
player.velocity.x = -1 * speed;
}else{
if(!keyDown('d')){
player.velocity.x = 0;
}
}
if(keyDown('s')){
player.velocity.y = speed;
}else{
if(!keyDown('w')){
player.velocity.y = 0;
}
}
if(keyDown('d')){
player.velocity.x = speed;
}else{
if(!keyDown('a')){
player.velocity.x = 0;
}
}
if(!keyDown('o')){
z += 0.01;
}
if(!keyDown('i')){
z -= 0.01;
}
if (keyDown(RETURN)){
  if (throttle){
throttle = false;
setTimeout(function () {throttle = true},500);
    if (init){
    init = false;
    }else{
    init = true;
    }

}
}
if (keyDown("b")){
  if (throttle1){
throttle1 = false;
setTimeout(function () {throttle1 = true},250);
   w += speed * 2.5;
 }
 }
 if (keyDown("h")){
   if (throttle1){
 throttle1 = false;
 setTimeout(function () {throttle1 = true},250);
   if (w > 5){
   w -= speed * 2.5;
 }
   }}
  if (keyDown("v")){
    if (throttle2){
  throttle2 = false;
  setTimeout(function () {throttle2 = true},250);
   h += speed * 2.5;
 }
 }
 if (keyDown("g")){
   if (throttle2){
 throttle2 = false;
 setTimeout(function () {throttle2 = true},250);
   if (h > 5){
   h -= speed * 2.5;
   }
 }
 }
  if (keyDown(RIGHT_ARROW)){
    if (throttle1){
  throttle1 = false;
  setTimeout(function () {throttle1 = true},250);
   x += speed * 2.5;
 }
 }
 if (keyDown(LEFT_ARROW)){
   if (throttle1){
 throttle1 = false;
 setTimeout(function () {throttle1 = true},250);
   x -= speed * 2.5;
 }
 }
  if (keyDown(DOWN_ARROW)){
    if (throttle2){
  throttle2 = false;
  setTimeout(function () {throttle2 = true},250);
   y += speed * 2.5;
 }
 }
 if (keyDown(UP_ARROW)){
   if (throttle2){
 throttle2 = false;
 setTimeout(function () {throttle2 = true},250);
   y -= speed * 2.5;
 }
 }
 if (keyDown("r")){
// elem.setCollider(OrientedBoundingBoxCollider(createVector(x,y),w,h,real));
   r -= 1;
   if (r < 0){
     r = 180;
   }

    if (!snaplock()){
      real = r;
    }
 }
 if (keyDown("t")){
       r += 1;
if (r > 180){
r = 0;

}

    if (!snaplock()){
      real = r;
    }
  }
    if (keyDown("f")){
      speed = 60;
    }else{
      speed = 15;
    }
}
function snaplock() {
  // this decides what angle to rotate R at
 if (r > 80 && r < 100){
   real = 90;
   return true;
 }
 if (r > 170 || r < 10){
   real = 180;
   return true;
 }
}
//////////// COLLISIONS ///////////////
function worldhandler(){
for (var i = 0; i < worldelements.length;i++){
player.collide(worldelements[i]);
worldelements[i].debug = true;
}
}
/////////////// LOAD AND SAVE FUNCTIONALITY //////////////////////////
function load(){
  var input = document.createElement('input');
  input.type = 'file';

  input.onchange = e => {

     // getting a hold of the file reference
     var file = e.target.files[0];

     // setting up the reader
     var reader = new FileReader();
     reader.readAsDataURL(file); // this is reading as data url

     // here we tell the reader what to do when it's done reading...
     reader.onload = readerEvent => {
        var content = readerEvent.target.result; // this is the content!
        world = content;
        var request = new XMLHttpRequest();
        request.open('GET', content);
        request.send();
        request.onload = function() {
        world = JSON.parse(request.responseText);
        for (var i = 0; i < world.len;i++){
elem = createSprite(world[i].pos[0],world[i].pos[1],world[i].size[0],world[i].size[1]);
elem.rotation = world[i].rotation;
elem.shapeColor = color(0);
worldelements.push(elem);
}
for (var i = 0; i < world.NPCS.length;i++){
npc = createSprite(world.NPCS[i].pos[0],world.NPCS[i].pos[1],332,522);
switch (Math.floor(random(0,5))){
   case 0:
   npc.addAnimation("star",'star0001.png','star0002.png');
   break;
   case 1:
     npc.addAnimation("squish",'squish0001.png','squish0013.png');
   break;
   case 2:
   npc.addAnimation("updown",'updown0001.png','updown0004.png');
   break;
   case 3:
   npc.addAnimation("narrow",'narrow0001.png','narrow0009.png');
   break;
   case 4:
   npc.addAnimation("angry",'angry0001.png','angry0006.png');
   break;

}
    npcs.push(npc);
    npc = null;
}
}
     }

  }

  input.click();
}
function gamedatasaver(){
  world = {};
  world.NPCS = {};
  world.NPCS.length = npcs.length;
for (var i = 0; i < npcs.length; i++){
  world.NPCS[i] = {"pos" : [npcs[i].position.x,npcs[i].position.y]};
  world.NPCS[i].dialouge = {"question" : "", "opA": "","opB" : "", "callbackA" : "","callbackB" : "","animation": {"mode" : "static", "image1" : "", "lastimg" : "","animswitchmarkers":[1,2,3,4],"numimgs": 1}};
}
for (var i = 0; i < worldelements.length; i++){
  world.len = worldelements.length;
  world[i] = {"pos" : [worldelements[i].position.x,worldelements[i].position.y], "size" : [worldelements[i].width,worldelements[i].height], "rotation" : worldelements[i].rotation};
}
document.getElementById("gd").innerHTML = world;
download("test.json",JSON.stringify(world));
}
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
/////////////////////////////    WORLD EDITOR ////////////////////////////////
function creative(){
textSize(100);
    text("CREATE MODE",400 + player.position.x,400 + player.position.y);
    if (keyDown(DELETE)){
      alert();
if (npc != null){
  npc.remove();
  npc.unshift();
}
if (elem != null){
  elem.remove();
  elem.unshift();
}
    }

    if (keyDown("p")){
      elem = null;
      if (throttle){
    throttle = false;
    setTimeout(function () {throttle = true},500);
    npc = createSprite(x,y,332,522);
    switch (Math.floor(random(0,5))){
       case 0:
       npc.addAnimation("star",'star0001.png','star0002.png');
       break;
       case 1:
         npc.addAnimation("squish",'squish0001.png','squish0013.png');
       break;
       case 2:
       npc.addAnimation("updown",'updown0001.png','updown0004.png');
       break;
       case 3:
       npc.addAnimation("narrow",'narrow0001.png','narrow0009.png');
       break;
       case 4:
       npc.addAnimation("angry",'angry0001.png','angry0006.png');
       break;

    }
        npcs.push(npc);
      }
    }else{
      if (npc != null){
    npc.position.x = x;
    npc.position.y = y;
    }
    }
    if (keyDown(SHIFT)){
      if (throttle){
    throttle = false;
    setTimeout(function () {throttle = true},500);
elem = createSprite(x,y,w,h);
elem.rotation = real;
elem.shapeColor = color(0);
worldelements.push(elem);
npc = null;
}
    }else{
 if(elem != null){
 elem.position.x = x;
 elem.position.y = y;
 elem.width = w;
 elem._internalWidth = w;
 elem.originalWidth = w;
 elem.height = h;
  elem._internalHeight = h;
 elem.originalHeight = h;
 elem.rotation = real;
 }
}

}
///////////////////////////     DRAWING THE NPCS AND THE WORLD      ///////////////////////////
function drawMap(){
  drawSprites();

}
