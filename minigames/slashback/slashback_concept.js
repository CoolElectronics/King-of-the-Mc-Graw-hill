var images = ["backdrop.png","logo.png","classic.png","story.png"];
var players = {};
var enemies = {};
var boundaries = [];
var universe = {players,enemies};
var mpid;
var game = "title";
var offset = 0;
var debounce = true;
function preload() {
  for (var i in images) {
images[i] = loadImage(images[i]);
  }
}
function setup() {
createCanvas(1400,800);
}
function draw() {
  if (game == "title"){
  for (i = 1400 * - 100 ;i < 100 * 1400;i += 1400){
  image(images[0],i + offset,0);
  }
image(images[1],100,50);
image(images[2],100,450);
image(images[3],800,450);
if (clickGui(100,450,500,167) && mouseIsPressed){
if (debounce){
classicstart();
debounce = false;
setTimeout(() => debounce = true,500);
}
}
offset++;
}else if (game == "classic") {
classicupdate();
}else if (game == "dead"){
youdied();
if (debounce){
debounce = false;
setTimeout(() => {game = "title";debounce = true;},1000);
}
}else if (game = "adventure") {
  adventure();
}
}
function beamR(cx, cy, x, y, angle) {
  var radians = -1 * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
    ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
  return [nx, ny];
}
class Enemy {
  constructor(x,y,power,hp,protection,id) {
  this.x = x;
  this.y = y;
  this.w = hp;
  this.h = hp;
  this.power = power;
  this.hp = hp;
  this.health = hp;
  this.protection = protection;
  this.id = id;
  this.beam = {};
  this.beam.on = false;
  this.beam.targets = [];
  }
  collide(other){

  }
  show(){
  push();
  translate(this.x,this.y);
  fill(map(this.health,0,100,255,0),map(this.health,0,100,0,255),0);
  rect(-50, this.hp * -1,this.health,10);
  fill(255,0,0);
  rect(this.hp / -2,this.hp / -2,this.w,this.h);
  pop();
  }
  update(){
  this.beam.on = false;
  this.beam.targets = [];
  for (var i in players) {
  if (dist(this.x,this.y,players[i].x,players[i].y) < 700){
    strokeWeight(this.power);
    stroke(204, 0, 255);
    this.beam.targets.push(i);
    line(this.x,this.y,players[i].x,players[i].y);
    this.beam.on = true;
    strokeWeight(0);
  }
  if (collideLineRect(players[i].x,players[i].y,players[i].beam[0],players[i].beam[1],this.x - this.hp / 2,this.y - this.hp / 2,this.w,this.h) && players[i].beam[3]){
  if (players[i].beam[2] < 0){
    players[i].health -= players[i].beam[2];
    strokeWeight(100);
    stroke(255);
    line(this.x,this.y,players[i].x,players[i].y);
    strokeWeight(0);
  }else{
   this.health -= players[i].beam[2] / this.protection;
 }
  }
  }
  if (this.health < 0){
  delete enemies[this.id];
  }
  }
}
class Player {
  constructor(x,y,power,recoil,power2,recoil2,hp,protection,thisplayer,id) {
  this.x = x;
  this.y = y;
  this.w = hp / 2;
  this.h = hp / 2;
  this.r = 0;
  this.player = thisplayer;
  this.velocity = [0,0];
  this.gravity = 1;
  this.power = power;
  this.power2 = power2;
  this.recoil2 = recoil2;
  this.recoil = recoil;
  this.hp = hp;
  this.texture = null;
  this.health = hp;
  this.beam = [];
  this.id = id;
  this.protection = protection;
  }
  show(){

  push();
  translate(this.x,this.y);
  fill(map(this.health,0,100,255,0),map(this.health,0,100,0,255),0);
  rect(-50,-50,this.health,10);
  rotate(this.r);
  fill(0,0,255);
  rect(this.hp / -4,this.hp / -4,this.w,this.h);
  pop();
  }
  update(){
  this.x += this.velocity[0] / this.hp * 10;
  this.y += this.velocity[1] / this.hp * 10;
  if (this.velocity[0] > 200 || this.velocity[0] < -200) {
  this.velocity[0] -= this.velocity[0] / 100;
  }
  this.velocity[1] -= this.velocity[1] / 200;
  if (this.velocity[1] < 160){
  this.velocity[1] += this.gravity;
  }
  if (this.player){
  this.r = Math.atan2(mouseX - width / 2, - (mouseY - this.y));
  }
  for (var e in enemies) {
   if (enemies[e] != null){
  for (var t in enemies[e].beam.targets) {
   if (enemies[e].beam.targets[t] == this.id){
    if (enemies[e].beam.on){
   this.health -= enemies[e].power / this.protection;
    }
   }
  }
   }
  }
  for (var p in players) {
  if (collideLineRect(players[p].x,players[p].y,players[p].beam[0],players[p].beam[1],this.x - this.hp / 2,this.y - this.hp / 2,this.w,this.h) && players[p].beam[3] && players[p] != this){
  if (players[p].beam[2] < 0){
    players[p].health -= players[p].beam[2];
    strokeWeight(100);
    stroke(255);
    line(this.x,this.y,players[p].x,players[p].y);
    strokeWeight(0);
  }else{
   this.health -= players[p].beam[2] / this.protection;
 }
 }
 }
 if (this.player){
 this.beam[3] = false;
 if (mouseIsPressed && !keyIsDown(16) && !keyIsDown(32)){
 this.shoot(this.power,this.recoil);
 }
 if (keyIsDown(32) && !keyIsDown(16) && !mouseIsPressed){
 this.shoot(this.power2,this.recoil2);
 }
 if (keyIsDown(16) && !mouseIsPressed && !keyIsDown(32)){
 this.shoot(-10,0);
 }
 }
 if (this.health < 0 || this.y > height){
 delete players[this.id];
  if (this.player){
  game = "dead";
  debounce = true;
  }
 }
}
  cam(){
translate(this.x * -1 + 700,0);
  }
  shoot(power,recoil){
  this.beam = beamR(this.x,this.y,this.x,this.y + -100000,this.r);
  this.beam[2] = power;
  this.beam[3] = true;
  if (power > 0){
  strokeWeight(power);
  stroke(255,0,0);
  line(this.x,this.y,this.beam[0],this.beam[1]);
  let forcevect = beamR(0,0,0,-1,this.r);
  this.velocity[0] -= forcevect[0] * recoil;
  this.velocity[1] -= forcevect[1] * recoil;
  }else{
  strokeWeight(10);
  stroke(0,255,0);
  line(this.x,this.y,this.beam[0],this.beam[1]);
  }

  strokeWeight(0);

  }
}
class Hazards {
  constructor() {
 this.texture = null;
  }
}
function youdied() {
  background(0);
  translate(noise(random(0,50)) * 100,noise(random(0,50)) * 100);
  fill(255,0,0);
  textSize(40);
  translate(width / 2,height / 2);
  rotate(random(-0.3,0.3));
  text("YOU DIED",-100,0);
  translate(noise(random(0,50)) * 100,noise(random(0,50)) * 100);
  fill(255,0,0);
  textSize(40);
  rotate(random(-0.3,0.3));
  text("YOU DIED",-100,0);
  translate(noise(random(0,50)) * 100,noise(random(0,50)) * 100);
  fill(255,0,0);
  textSize(40);
  rotate(random(-0.3,0.3));
  text("YOU DIED",-100,0);
  translate(width /- 2,height / -2);
}
function clickGui(x,y,w,h) {
return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}
function classicstart() {
  game = "classic";
  enemies = {};
  boundaries = [];
  switch (1) {
    case 1:
    ennum = Math.random();
    enemies[ennum] = new Enemy(1400,700,20,100,10,ennum);
    ennum = Math.random();
    enemies[ennum] = new Enemy(-1400,700,20,100,10,ennum);
    boundaries.push(new Boundary(-1400,0,2800,100));
    break;
    default:
    ennum = Math.random();
    enemies[ennum] = new Enemy(0,700,20,100,10,ennum);
    break;

  }
  mpid = Math.random();
  players[mpid] = new Player(700,400,5,10,40,2,100,100,true,mpid);
}
function classicupdate() {
  background(0);
if (players[mpid] != null){
  players[mpid].cam();
}
for (i = 1400 * - 40 ;i < 80 * 1400;i += 1400){
image(images[0],i,0);
}
for (var b in boundaries) {
if (boundaries[b] != null){
boundaries[b].update();
}
}
  for (var e in enemies) {
  if (enemies[e] != null){
  enemies[e].show();
  enemies[e].update();
}
  }
  for (var e in players) {
  players[e].update();
  if (players[e] != null){
  players[e].show();
}
}
strokeWeight(0);
fill(100);
rect(-28000,height - 50,width * 200,50);
}
class Boundary {
  constructor(x,y,w,h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  }
  collide(other){
    if (collideRectRect(this.x,this.y,this.w,this.h,other.x,other.y,other.w,other.h)){
      console.log("collide");
      other.velocity[0] = -other.velocity[0];
      other.velocity[1] = -other.velocity[1];
  }
}
  update(){
    rect(this.x,this.y,this.w,this.h);
    for (let i in players){
      this.collide(players[i]);
    }
  }
}
