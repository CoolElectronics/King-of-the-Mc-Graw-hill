var player;
var z = 0.4;
var elem;
var omx,omy;
var init = false;
var index = 0;
var w = 2;
var h = 2;
var x = 2;
var y = 2;
var speed = 15;
var l = 1;
var v = 0;
var npc;
var npx = [];
var world = {}
var npy = [];
var npcs = [];
var worldelements = [];
function setup() {
createCanvas(window.innerWidth,window.innerHeight);
player = createSprite(width / 2,height/2);
player.addImage(loadImage('player.png'));
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
if (keyDown(SHIFT)){
speed = 40;
}else{
speed = 15;
}
if (keyDown(RETURN)){
if (init){
init = false;
}else{
init = true;
}
}
if (keyDown("b")){
   w += 10;
 }
 if (keyDown("h")){
   if (w > 5){
   w -= 10;
   }}
  if (keyDown("v")){
   h += 10;
 }
 if (keyDown("g")){
   if (h > 5){
   h -= 10;
   }
 }
  if (keyDown("l")){
   x += speed;
 }
 if (keyDown("k")){
   x -= speed;
 }
  if (keyDown("m")){
   y += speed;
 }
 if (keyDown("n")){
   y -= speed;
 }
}
//////////// COLLISIONS ///////////////
function worldhandler(){
for (var i = 0; i < worldelements.length;i++){
player.collide(worldelements[i]);
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
elem.shapeColor = color(0);
worldelements.push(elem);
}
}
     }

  }

  input.click();
}
function gamedatasaver(){
  world = {};
for (var i = 0; i < worldelements.length; i++){
  world.len = worldelements.length;
  world[i] = {"pos" : [worldelements[i].position.x,worldelements[i].position.y], "size" : [worldelements[i].width,worldelements[i].height]};
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
    if (keyDown("p")){
    npc = createSprite(x,y,332,522);
    npc.addAnimation("star",'star0001.png','star0002.png');
    npc.addAnimation("squish",'squish0001.png','squish0013.png');
    npc.addAnimation("updown",'updown0001.png','updown0004.png');
    npc.addAnimation("narrow",'narrow0001.png','narrow0009.png');
    npc.addAnimation("angry",'angry0001.png','angry0006.png');

    npcs.push(npc);
    }else{
      if (npc == null){}else{
    npc.position.x = x;
    npc.position.y = y;
    }
    }
    if (keyDown(SHIFT)){
elem = createSprite(x,y,w,h);
elem.shapeColor = color(0);
worldelements.push(elem);
    }else{
 if(elem == null){
 }else{
 elem.position.x = x;
 elem.position.y = y;
 elem.width = w;
 elem._internalWidth = w;
 elem.originalWidth = w;
 elem.height = h;
  elem._internalHeight = h;
 elem.originalHeight = h;
 }
}
}
///////////////////////////     DRAWING THE NPCS AND THE WORLD      ///////////////////////////
function drawMap(){
  drawSprites();

}
