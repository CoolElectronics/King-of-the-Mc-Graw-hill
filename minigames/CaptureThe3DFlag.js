var objects = {};
var tree;
var flags = {"Red":{"x":400,"y":400,"stolen":false},"Blue":{"x":3000,"y":0,"stolen":false},"Green":{"x":0,"y":3000,"stolen":false},"Yellow":{"x":3000,"y":3000,"stolen":false}}
var zoom = 500;
var players = {"Red": {"0":{"x": 0,"y":0,"r":0,"speed":40}},"Blue":{},"Green":{},"Yellow":{}}
function preload(){
tree = loadModel("models/Tree1.obj");
}
function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
  for (var i = 0; i < 10 ; i++){
    objects[i] = {};
    objects[i].x = Math.floor(Math.random() * 2000) - 1000;
    objects[i].y = Math.floor(Math.random() * 2000) - 1000;
    objects[i].z = 0;
  }
	strokeWeight(0);
for (var t in players) {
if (t == "Red"){
	for (let p = 1; p < 5; p++){
		players[t][p] = AIplayer(t);
	}
}else{
	for (let p = 0; p < 5; p++){
		players[t][p] = AIplayer(t);
	}
}
}
}

function draw() {
	background(0);
	let cvector = vectrotate(players.Red[0].x,players.Red[0].y,players.Red[0].x,players.Red[0].y + zoom,players.Red[0].r);
	camera(cvector[0],cvector[1],zoom,players.Red[0].x,players.Red[0].y,0,0,0,-1);

/// red's territory
	fill(100,0,0);
	plane(2000);
	fill(255);
  push();
	translate(1500,0,0);
	plane(1000,500);
	pop();
	push();
	translate(0,1500,0);
	plane(500,1000);
	pop();
/// blue's territory
fill(0,0,100);
push();
translate(3000,0,0);
plane(2000);
pop();
//green territory
fill(0,100,0);
push();
translate(0,3000,0);
plane(2000);
pop();
//yellow territory
fill(100,100,0);
push();
translate(3000,3000,0);
plane(2000);
pop();
push();
fill(255);
translate(3000,3000,0);
translate(-1500,0,0);
plane(1000,500);
pop();
push();
fill(255);
translate(3000,3000,0);
translate(0,-1500,0);
plane(500,1000);
pop();
// Players:
for (var team in players) {
	switch (team) {
			case "Red":
			fill(255,0,0);
			break;
			case "Blue":
			fill(0,0,255);
			break;
			case "Green":
			fill(0,255,0);
			break;
			default:
			fill(255,255,0);
			break;
	}
	for (var p in players[team]) {
		push();
			translate(players[team][p].x,players[team][p].y,2.5);
			rotateZ(players[team][p].r);
			sphere(20);
		pop();
	}
}
//flags
for (var f in flags) {
	push();
		translate(flags[f].x,flags[f].y,2.5);
		switch (f) {
				case "Red":
				fill(255,0,0);
				break;
				case "Blue":
				fill(0,0,255);
				break;
				case "Green":
				fill(0,255,0);
				break;
				default:
				fill(255,255,0);
				break;
		}

		box(20);
	pop();
}
	// #teamtrees
	for (var t = 0; t < 4; t++){
  for (var i = 0; i < 5; i++){
		push();
		switch (t) {
			case 1:
			translate(3000,0,0);
			break;
			case 2:
			translate(0,3000,0);
			break;
			case 3:
			translate(3000,3000,0);
			break;
			default:
			break;
		}
    translate(objects[i].x,objects[i].y,objects[i].z);
    normalMaterial();
    model(tree);
    pop();
  }
}
	push();
  translate(0,600,1);
  fill(0,0,255);
  plane(2000,100);
	pop();
	if (keyIsDown(87)){
let x = Math.cos(players.Red[0].r + HALF_PI);
let y = Math.sin(players.Red[0].r + HALF_PI * -1);
players.Red[0].x -= players.Red[0].speed * x;
players.Red[0].y += players.Red[0].speed * y;
  }
  if (keyIsDown(65)){
  players.Red[0].r -= 0.1;
  }
  if (keyIsDown(83)){
		let x = Math.cos(players.Red[0].r + HALF_PI);
 	 let y = Math.sin(players.Red[0].r + -1 * HALF_PI);
 	 players.Red[0].x += players.Red[0].speed * x;
 	 players.Red[0].y -= players.Red[0].speed * y;
  }
  if (keyIsDown(68)){
players.Red[0].r += 0.1;
}
if (keyIsDown(73)){
  zoom -= 30;
}
if (keyIsDown(79)){
  zoom += 30;
}
/// COLLISION LOGICCCC
for (var f in flags) {
for (var t in players) {
for (var p in players[t]) {
if (intersect(players[t][p].x,players[t][p].y,flags[f].x,flags[f].y)){
if (f == "Red" && t != "Red"){
flags[f].stolen = true;
console.log(flags[f].stolen);
}
if (f == "Blue" && t != "Blue"){
flags[f].stolen = true;
console.log(flags[f].stolen);
}
if (f == "Green" && t != "Green"){
flags[f].stolen = true;
console.log(flags[f].stolen);
}
if (f == "Yellow" && t != "Yellow"){
flags[f].stolen = true;
console.log(flags[f].stolen);
}
}
}
}
}
}
function vectrotate(cx, cy, x, y, angle) {
    var radians = angle * -1,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}
function AIplayer(team) {
	var player = {};
	player.speed = 40;
	player.r = 0;
	switch (team) {
		case "Red":
		player.x = 400;
		player.y = 0;
		break;
		case "Blue":
		player.x = 3400;
		player.y = 0;
		break;
		case "Yellow":
		player.x = 3400;
		player.y = 3400;
		break;
		case "Green":
		player.x = 0;
		player.y = 3400;
		break;
	}
	setInterval(() => think(team,player),1000);
	return player;
}
function think(team,player) {
	let action = 0;
	act(team,player,action);
}
function act(team,player,action) {
	let x = 0;
	let y = 0;
switch (action) {
	case 1:
	 x = Math.cos(player.r + HALF_PI);
	 y = Math.sin(player.r + HALF_PI * -1);
	player.x -= player.speed * x;
	player.y += player.speed * y;
	break;
	case 2:
	 x = Math.cos(player.r + HALF_PI);
	 y = Math.sin(player.r + HALF_PI * -1);
	player.x += player.speed * x;
	player.y -= player.speed * y;
	break;
	case 3:
	player.r += 0.1;
	break;
	case 4:
	player.r -= 0.1;
	break;
}
}
function intersect(s1x,s1y,s2x,s2y) {
return Math.sqrt((s1x - s2x) * (s1x - s2x) + (s1y - s2y) * (s1y - s2y)) < 40;
}
