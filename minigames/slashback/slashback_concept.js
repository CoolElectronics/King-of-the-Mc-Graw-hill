var gravamax = 10;
var images = ["backdrop.png"];
var players = [];
var enemies = [];
var hazards = [];
function preload() {
  for (var i in images) {
images[i] = loadImage(images[i]);
  }
  players.push( new Player(700,400,5,5,100,true));
}
function setup() {
createCanvas(1400,800);
}
function draw() {
  background(0);
  players[0].cam();
    for (i = 1400 * - 40 ;i < 80 * 1400;i += 1400){
    image(images[0],i,0);
  }
  players[0].show();
players[0].update();
strokeWeight(10);
fill(255);
stroke(255,0,0);
strokeWeight(0)
fill(100);
rect(0,height - 50,width * 100,50);
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
  constructor(x,y,power,hp) {
    this.x = x;
    this.y = y;
    this.w = hp;
    this.h = hp;
    this.power = power;
    this.hp = hp;
  }
  collide(other){

  }
}
class Platform {
  constructor(x,y,w,h,r) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = r;
    this.texture = null;
  }
  collide(other){

  }
}
class Boss {
  constructor(x,y,power,hp) {
    this.x = x;
    this.y = y;
    this.w = hp;
    this.h = hp;
    this.power = power;
    this.hp = hp;
    this.texture = null;
  }
  collide(other){

  }
}
class Player {
  constructor(x,y,power,recoil,hp,thisplayer) {
    this.x = x;
    this.y = y;
    this.w = hp / 2;
    this.h = hp / 2;
    this.r = 0;
    this.player = thisplayer;
    this.velocity = [0,0];
    this.gravity = 1;
    this.power = power;
    this.recoil = recoil;
    this.hp = hp;
    this.texture = null;
  }
  show(){

    push();
      translate(this.x,this.y);
      rotate(this.r);
      rect(-20,-20,this.w,this.h);
    pop();
  }
  update(){
    this.x += this.velocity[0] / this.hp * 10;
    this.y += this.velocity[1] / this.hp * 10;
    if (this.velocity[1] < 60){
    this.velocity[1] += this.gravity;
  }
    if (this.player){
    this.r = Math.atan2(mouseX - width / 2, - (mouseY - this.y));
    if (mouseIsPressed){
      let beam = beamR(this.x,this.y,this.x,this.y + -1000,this.r);
        line(this.x,this.y,beam[0],beam[1]);
      let forcevect = beamR(0,0,0,-1,this.r);
      this.velocity[0] -= forcevect[0] * this.recoil;
      this.velocity[1] -= forcevect[1] * this.recoil;
    }
  }
  }
  cam(){
translate(this.x * -1 + 700,0);
  }
}
class Hazards {
  constructor() {
   this.texture = null;
  }
}
class Beam {
  constructor() {
    this.texture = null;
  }
}
function youdied() {
  translate(random(0,50),random(0,50));
  fill(255,0,0);
  textSize(40);
  translate(width / 2,height / 2);
  rotate(random(-0.1,0.1));
  camera.position.x = width / 2;
  text("YOU DIED",-100,0);
  translate(width /- 2,height / -2);
}
