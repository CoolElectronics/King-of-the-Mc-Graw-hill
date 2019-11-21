var tempwall;
function createAllSprites() {
  player = createSprite(width / 2 , height / 2,40,40);
}
function makeWorldFromJson() {
  $.getJSON("world.json", function(json) {
for (i = 0; i < json.responseText["length"]; i++){
tempwall = createSprite(json.responseText[i.toString()["pos"][0]],json.responseText[i.toString()["pos"][1]],json.responseText[i.toString()["size"][0]],json.responseText[i.toString()["size"][1]]);
world.push(tempwall);
return tempwall;
}
});
}
function drawWorld() {
  drawSprites();
}
function worldProcess() {
  for (var i = 0; i < world.length; i++){
   player.collide(world[i]);
  }
}
