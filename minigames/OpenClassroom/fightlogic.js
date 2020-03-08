// ATTACK
// ATTACK
// ATTACK
// ATTACK
// ATTACK
// ATTACK
// ATTACK
// ATTACK
// ATTACK
// ATTACK
// ATTACK
// ATTACK
// ATTACK
// ATTACK
// ATTACK
// ATTACK
// ATTACK
// ATTACK
// ATTACK
// ATTACK
// ATTACK
function fight() {
  background(0);
  getcontrollers();
  avgzoom = 0;
  drawSprites();
  for (let i = 0; i < world.length; i++){
  world[i].img.resize(world[i].width,world[i].height);
    image(world[i].img,world[i].position.x - world[i].width / 2,world[i].position.y - world[i].height / 2);
  }
  for (let i = 0; i < players.length; i++) {
    if (players[i] != "dead"){
  if (interface(players[i].gp,players[i]) == "dead"){
    players[i] = "dead";
    playersdead ++;
  }else{
    text("P" + (i + 1),players[i].position.x - players[i].width / 2,players[i].position.y - 100);
  avgzoom += players[i].position.x;
  }
  }
  }
  avgzoom = avgzoom / (players.length - playersdead);
  camera.position.x = avgzoom;
  if (playersdead == players.length - 1 && players.length > 0){
    for (let i = 0; i < players.length; i++) {
      if (players[i] != "dead"){
        alert("Player " + (i + 1) + " has won the game!");
        players = [];
        playersdead = 0;
        ofx = 0;
        ofy = 0;
        for (let i = 0; i < playerdata.length; i++) {
            playerdata[i].chosen = [];
        }
        rf = [];
        gstate = "cselect";
        return;
      }
    }
  }
}

function interface(controller,player) {
  if (!player.recodead){
  if (player.position.y < 0){
    fill(255);
    ellipse(player.position.x,50,constrain(100 - abs(player.position.y) / 10,10,100));
  }
    player.mirrorX(player.dir);
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
if (controller.buttons[7].pressed){
player.punch = true;
player.position.x += random(-5,5);
player.punchpow = player.charge + 30;
}
if (controller.buttons[1].pressed && player.cancharge  && player.charge < 140){
  player.charge += 0.3;
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
console.log(controller.axes[1]);
if (controller.axes[1] < -0.5){
setTimeout(() => {
player.attack = false;
player.boom = true;
setTimeout(() => player.boom = false,1000);
},1000);
setTimeout(() => player.cancharge = true,4000);
}else{
  setTimeout(() => player.attack = false,1000);
  setTimeout(() => player.cancharge = true,2000);
}
}
if (player.attack){
  player.position.x += random(5,20) * player.cd;
  player.velocity.y = -0.1;
}
  if (player.boom){
    ellipse(player.position.x,player.position.y,400,400);
  }
if (player.charge > 0 && (player.throw + player.cx > 1500 || player.throw + player.cx < -100)){
  player.charge = 0;
  player.throw = 0;
  player.cancharge = true;
}
if (player.charge < 10|| player.throw > 0 || player.throw < 0){
player.velocity.x += controller.axes[0] * 2;
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
  if (!player.overlap(world[i]) && player.velocity.y < 19){
    player.velocity.y += 0.1;
  }
if (player.overlap(world[i])){
  if (!player.nc){
    if (player.position.y < world[i].position.y - world[i].height / 2){
      player.collide(world[i]);
      player.waybackup = true;
    player.velocity.x -= player.velocity.x / 15;
    player.jumps = 0;
        player.velocity.y = 0;
      }

  }else{
    player.collide(world[i]);
  player.velocity.x = player.velocity.x * -1;
  player.velocity.y = player.velocity.y * -1.08;
  }

}else{
    player.velocity.x -= player.velocity.x / 10;
}
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
if (controller.buttons[2].pressed){
  if (controller.axes[1] < 0.5 && player.waybackup){
    player.waybackup = false;
    player.velocity.y = -30;
  }else if (player.jumps > 1 && !controller.buttons[0].pressed){
  player.velocity.y = 41;
}
}

if (player.position.y < -10000 || player.position.y > 1400 || player.damage > 1000){
if (player.lives > 2){
return "dead";
}else{
  player.recodead = true;
  player.position.x = width / 2;
  player.position.y = 60;
  player.velocity.x = 0;
  player.velocity.y = 0;
  player.lives ++;
  player.damage = 0;
 setTimeout(() => player.recodead = false,5000);
}
}else{
checkdamage(player);
}
this.constrain = (v,cl,cu) => {if (v > cu){return cu;}else if (v < cl){return cl;}else{return v;}}
}
}
}
// CHECK FOR ATTACKS
// CHECK FOR ATTACKS
// CHECK FOR ATTACKS
// CHECK FOR ATTACKS
// CHECK FOR ATTACKS
// CHECK FOR ATTACKS
// CHECK FOR ATTACKS
// CHECK FOR ATTACKS
// CHECK FOR ATTACKS
// CHECK FOR ATTACKS
// CHECK FOR ATTACKS
// CHECK FOR ATTACKS
// CHECK FOR ATTACKS
// CHECK FOR ATTACKS
function checkdamage(thisp) {
  for (let p = 0; p < players.length; p++){
    let enemy = players[p];
    if (enemy != "dead"){
    let player = enemy.position;
    if (dist(thisp.position.x,thisp.position.y,enemy.position.x,enemy.position.y) < 140 && enemy.boom && enemy !=thisp){
      thisp.velocity.x = 40 * enemy.cd;
      thisp.velocity.y = -40 * thisp.damage / 200;
      thisp.nc = true;
      setTimeout(() => thisp.nc = false,6000);
    }
    if (collideRectRect(player.x,player.y,70,70,thisp.position.x,thisp.position.y,70,70) && enemy != thisp){
      if (enemy.punch){
      thisp.damage += 0.5;
      thisp.position.x += 2 * enemy.dir;
    }
      if (enemy.attack){
        thisp.damage += 1.5;
        thisp.position.x = player.x + enemy.dir * 100;
        thisp.velocity.y = 0;
      }else if (enemy.velocity.y > 40){
        thisp.damage += 15;
        thisp.velocity.y = -10 * thisp.damage / 50;
        thisp.velocity.x = enemy.dir * 10 * thisp.damage / 100;
        if (thisp.damage > 100){
        thisp.nc = true;
        setTimeout(() => thisp.nc = false,5000);
      }
      }
    }

    if (enemy.throw != 0 && dist(thisp.position.x,thisp.position.y,enemy.cx  + (100 * enemy.cd) + enemy.throw,enemy.cy) < 35 + enemy.charge && thisp != enemy){
      thisp.damage += enemy.charge / 10;
      thisp.velocity.y = -6 * thisp.damage / 50;
      thisp.velocity.x = enemy.charge / 2 * enemy.cd * thisp.damage / 50;
      if (thisp.velocity.y > 5){
      thisp.nc = true;
      setTimeout(() => thisp.nc = false,5000);
    }
    }
    fill(255);
    textSize(50);
    text("P" + (p + 1) + " : " + (enemy.lives - 3) * -1 + " " + Math.floor(enemy.damage),(((p + 1) * 300) + camera.position.x) - 700,60);
  }
  }
}
