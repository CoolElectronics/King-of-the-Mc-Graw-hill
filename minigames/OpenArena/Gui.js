function interface(controller,player) {
  if (player.position.y < 0){
    fill(255);
    ellipse(player.position.x,50,constrain(100 - abs(player.position.y) / 10,10,100));
  }
  if (controller != null){
  for (let b = 0; b < controller.buttons.length;b++) {
      if (controller.buttons[b].pressed){
console.log(b);
}
}
if (player.cancharge){
  player.cd = player.dir;
}
player.punch = false;
if (controller.buttons[5].pressed){
player.punch = true;
player.position.x += random(-5,5);
player.punchpow = player.charge + 10;
}
if (controller.buttons[7].pressed){
player.punch = true;
player.position.x += random(-15,15);
player.punchpow = player.charge + 30;
}
if (controller.buttons[1].pressed && player.cancharge  && player.charge < 140){
  player.charge ++;
  player.throw = 0;
  player.cx = player.position.x;
  player.cy = player.position.y;
}else if (player.charge > 0) {
player.cancharge = false;
  player.throw += 10 * player.cd * player.charge / 10;
}
if (controller.buttons[3].pressed && player.cancharge){
player.attack = true;
player.cancharge = false;
player.cd = player.dir;
setTimeout(() => player.attack = false,1000);
setTimeout(() => player.cancharge = true,2000);
}
if (player.attack){
  player.position.x += random(5,20) * player.cd;
  player.velocity.y = 0;
}
if (player.charge > 0 && (player.throw + player.cx > 1500 || player.throw + player.cx < -100)){
  player.charge = 0;
  player.throw = 0;
  player.cancharge = true;
}
if (player.charge < 10|| player.throw > 0 || player.throw < 0){
player.velocity.x += controller.axes[0];
}
if (controller.axes[0] < -0.9){
  player.dir = -1;
}
if (controller.axes[0] > 0.9){
  player.dir = 1;
}

if (player.charge > 0){
  fill(255);
  ellipse(player.cx + (100 * player.cd) + player.throw,player.cy,player.charge,player.charge);
}
for (let i = 0; i < world.length;i++) {
  if (!player.overlap(world[i])){
    player.velocity.y += 0.1;
  }
  if (!player.nc){
  if (!player.collide(world[i])){
    player.velocity.x -= player.velocity.x / 15;
  }else{
    player.jumps = 0;
    player.dejump = true;
        player.velocity.y = 0;
    player.velocity.x -= player.velocity.x / 10;
  }
  if (controller.buttons[0].pressed && player.position.y < -500){
  player.jumps ++;
}
  if (controller.buttons[0].pressed && player.jumps < 4 && player.dejump && player.position.y > -500){
  player.jumps ++;

    player.velocity.y -= 10 * sqrt(player.jumps);
  player.dejump = false;
  setTimeout(() => player.dejump = true,200);
  }
}
}
}
if (controller.buttons[2].pressed && player.jumps > 1){
  player.velocity.y = 100;
}

if (player.position.y < -2000 || player.position.x > 2400 || player.position.x < -1400 || player.position.y > 1400 || player.damage > 10000){
return "dead";
}else{
checkdamage(player);
}
this.constrain = (v,cl,cu) => {if (v > cu){return cu;}else if (v < cl){return cl;}else{return v;}}
}
function checkdamage(thisp) {
  for (let p = 0; p < players.length; p++){
    if (players[p] != "dead"){
    let player = players[p].position;
    if (collideRectRect(player.x,player.y,70,70,thisp.position.x,thisp.position.y,70,70) && players[p] != thisp){
      if (players[p].attack){
        thisp.damage += 10;
        thisp.position.x = player.x + players[p].dir * 100;
        thisp.velocity.y = 0;
      }else if (players[p].velocity.y > 90){
        thisp.damage += 1000;
        thisp.velocity.y = -54;
        thisp.velocity.x = players[p].dir * 10;
        thisp.nc = true;
        setTimeout(() => thisp.nc = false,1000);
      }
    }
    if (players[p].punch && dist(player.x,player.y,thisp.position.x,thisp.position.y) < 80 && players[p] != thisp){
      thisp.damage += players[p].punchpow;
      thisp.position.x += 5 * players[p].dir;
        }
    if (players[p].throw != 0 && dist(thisp.position.x,thisp.position.y,players[p].cx  + (100 * players[p].cd) + players[p].throw,players[p].cy) < 70 + players[p].charge && thisp != players[p]){
      thisp.damage += 10;
      thisp.velocity.y = -6;
      thisp.velocity.x = players[p].charge / 2 * players[p].cd;
      thisp.nc = true;
      setTimeout(() => thisp.nc = false,500);
    }
    fill(255);
    textSize(50);
    text(players[p].damage,(((p + 1) * 300) + camera.position.x) - 700,60);
  }
  }
}
function title() {
  image(bk,0,0);
  setTimeout(() => gstate = "fight",5000);
}
function cselect() {
image(bk,0,0);
getcontrollers();
for (let p = 0; p < players.length;p++){
  fill(0,0,p * 100);
  ellipse(p * 100,100,50,50);
}
}
