var d;
var tempwall;
function createAllSprites() {
  player = createSprite(width / 2 , height / 2,40,40);
}
function makeWorldFromJson() {
var request = new XMLHttpRequest();
request.open('GET', req);
request.send();
request.onload = function() {
           d = JSON.parse(request.responseText);
           for (var i = 0; i < d.len ;i++){
         tempwall = createSprite(d[i].pos[0],d[i].pos[1],d[i].size[0],d[i].size[1]);
         world.push(tempwall);
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
