var gravamax = 10;
var images = ["backdrop.png"];
var players = [];
var enemies = [];
var hazards = [];
function preload() {
  for (var i in images) {
images[i] = loadImage(images[i]);
  }
}
function setup() {
createCanvas(1400,800);
}
function draw() {
  background(0);
  if (y > height - 50 || y < 0){
    translate(random(0,50),random(0,50));
    fill(255,0,0);
    textSize(40);
    translate(width / 2,height / 2);
    rotate(random(-0.1,0.1));
    camera.position.x = width / 2;
    text("YOU DIED",-100,0);
    translate(width /- 2,height / -2);
  }else{
    for (i = 1400 * - 40 ;i < 80 * 1400;i += 1400){
    image(images[0],i,0);
  }
    camera.position.x = x;
  if (velocity[1] < 15){
velocity[1] += gravity;
}
y += velocity[1];
x += velocity[0];
 r = Math.atan2(mouseX - width / 2, - (mouseY - y));
push();
  translate(x,y);
  rotate(r);
  strokeWeight(0);
  rect(-20,-20,40,40);
pop();
strokeWeight(10);
fill(255);

stroke(255,0,0);
if (mouseIsPressed){
  let beam = beamR(x,y,x,y + -1000,r);
    line(x,y,beam[0],beam[1]);
  let forcevect = beamR(0,0,0,-1,r);
  console.log(forcevect);
  velocity[0] -= forcevect[0];
  velocity[1] -= forcevect[1];
}
strokeWeight(0)
fill(100);
rect(0,height - 50,width * 100,50);
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
  constructor(x,y,power,recoil,thisplayer) {
    this.x = x;
    this.y = y;
    this.w = hp / 2;
    this.h = hp / 2;
    this.r = 0;
    this.thisplayer = thisplayer;
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
    this.x += this.velocity[0];
    this.y += this.velocity[1];
    this.velocity[1] += gravity;
    if (thisplayer){
    this.r =
  }
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
