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
function interface(controller,player) {
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
setTimeout(() => {
player.attack = false;
player.boom = true;
setTimeout(() => player.boom = false,100);
},1000);
setTimeout(() => player.cancharge = true,2000);
}
if (player.attack){
  player.position.x += random(5,20) * player.cd;
  player.velocity.y = -0.1;


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
  console.log(player.jumps);
if (player.overlap(world[i])){
  if (!player.nc){
  player.collide(world[i]);
    player.velocity.x -= player.velocity.x / 15;
    player.jumps = 0;
        player.velocity.y = 0;

  }else{
  player.velocity.x = player.velocity.x * -1.1;
  player.velocity.x = player.velocity.y * -2;
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
if (controller.buttons[2].pressed && player.jumps > 1 && !controller.buttons[0].pressed){
  player.velocity.y = 41;
}

if (player.position.y < -10000 || player.position.y > 1400 || player.damage > 1000){
if (player.lives > 2){
return "dead";
}else{
  player.position.x = width / 2;
  player.position.y = 100;
  player.lives ++;
  player.damage = 0;
}
}else{
checkdamage(player);
}
this.constrain = (v,cl,cu) => {if (v > cu){return cu;}else if (v < cl){return cl;}else{return v;}}
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
    if (dist(thisp.position.x,thisp.position.y,enemy.position.x,enemy.position.y) < 140 && enemy.boom){
      thisp.velocity.x = 10 * thisp.damage * thisp.dir / 100;
      thisp.velocity.y = 10 * thisp.damage / 100;
    }
    if (collideRectRect(player.x,player.y,70,70,thisp.position.x,thisp.position.y,70,70) && enemy != thisp){
      if (enemy.punch){
      thisp.damage += 0.5;
      thisp.position.x += 2 * enemy.dir;
    }
      if (enemy.attack){
        thisp.damage += 1;
        thisp.position.x = player.x + enemy.dir * 100;
        thisp.velocity.y = 0;
      }else if (enemy.velocity.y > 40){
        thisp.damage += 15;
        thisp.velocity.y = -10 * thisp.damage / 50;
        thisp.velocity.x = enemy.dir * 10 * thisp.damage / 100;
        if (thisp.damage > 100){
        thisp.nc = true;
        setTimeout(() => thisp.nc = false,500);
      }
      }
    }

    if (enemy.throw != 0 && dist(thisp.position.x,thisp.position.y,enemy.cx  + (100 * enemy.cd) + enemy.throw,enemy.cy) < 35 + enemy.charge && thisp != enemy){
      thisp.damage += enemy.charge / 10;
      thisp.velocity.y = -6 * thisp.damage / 50;
      thisp.velocity.x = enemy.charge / 2 * enemy.cd * thisp.damage / 50;
      if (thisp.velocity.y > 5){
      thisp.nc = true;
      setTimeout(() => thisp.nc = false,500);
    }
    }
    fill(255);
    textSize(50);
    text("P" + (p + 1) + " : " + (enemy.lives - 3) * -1 + " " + Math.floor(enemy.damage),(((p + 1) * 300) + camera.position.x) - 700,60);
  }
  }
}
