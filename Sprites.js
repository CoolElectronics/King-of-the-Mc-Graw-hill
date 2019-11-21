var tempwall;
function createAllSprites() {
  player = createSprite(width / 2 , height / 2,40,40);
}
function makeWorldFromJson() {
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
           d = JSON.parse(data);
         tempwall = createSprite(d[i.toString()["pos"][0]],d[i.toString()["pos"][1]],d[i.toString()["size"][0]],d[i.toString()["size"][1]]);
         world.push(tempwall);
         return tempwall;
}
}
}
function drawWorld() {
  drawSprites();
}
function worldProcess() {
  for (var i = 0; i < world.length; i++){
   player.collide(world[i]);
  }
}
