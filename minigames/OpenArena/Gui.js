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
if (controller.buttons[1].pressed && player.cancharge){
  player.charge ++;
  player.throw = 0;
  player.cx = player.position.x;
  player.cy = player.position.y;
  player.cd = player.dir;
}else if (player.charge > 0) {
player.cancharge = false;
  player.throw += 10 * player.cd;
}
if (player.charge > 0 && (player.throw + player.cx > 1500 || player.throw + player.cx < -100)){
  player.charge = 0;
  player.throw = 0;
  player.cancharge = true;
}
if (player.charge < 10|| player.throw > 0 || player.throw < 0){
player.velocity.x += controller.axes[0];
if (Math.floor(controller.axes[0]) > 0){
  player.dir = 1;
}
if (Math.floor(controller.axes[0]) < 0){
  player.dir = -1;
}
}
if (player.charge > 0){
  fill(255);
  ellipse(player.cx + (100 * player.cd) + player.throw,player.cy,player.charge,player.charge);
}
for (let i = 0; i < world.length;i++) {
  if (!player.collide(world[i])){
    player.velocity.y += 0.1;
    player.velocity.x -= player.velocity.x / 15;
  }else{
    player.jumps = 0;
    player.dejump = true;
        player.velocity.y = 0;
    player.velocity.x -= player.velocity.x / 10;
  }
  if (controller.buttons[0].pressed && player.jumps < 4 && player.dejump){
  player.jumps ++;
    player.velocity.y -= 10 * sqrt(player.jumps);
  player.dejump = false;
  setTimeout(() => player.dejump = true,200);
  }
}
}
if (controller.buttons[2].pressed && player.jumps > 1){
  player.velocity.y = 100;
}
this.constrain = (v,cl,cu) => {if (v > cu){return cu;}else if (v < cl){return cl;}else{return v;}}
}
