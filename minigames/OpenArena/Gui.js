var rtf = false;
var rf = [];
var tmout = false;
function title() {
  image(bk,0,0);
  setTimeout(() => gstate = "cselect",5000);
}
function cselect() {
  var ofx = width / 10;
  var ofy = height / 2;
background(0);
for (let p = 0; p < playerdata.length;p++) {
image(playerdata[p].animations.window[0],ofx,ofy);
for (let i = 0; i < players.length; i++){
  if (clicked(players[i].x,players[i].y,ofx,ofy,playerdata[p].animations.window[0].width,playerdata[p].animations.window[0].height) && players[i].gp.buttons[0].pressed){
    if (players[i].madechoice){
      rf.pop(i);
      playerdata[p].chosen.splice(playerdata[p].chosen.find((e) => {return playerdata[p].chosen[e] == i;}),1);
      playerdata[p].chosen.push(i);
      players[i].madechoice = true;
      rf.push(i);
    }
    else {
    playerdata[p].chosen.push(i);
    players[i].madechoice = true;
    rf.push(i);
  }
  }
}
ofx += playerdata[p].animations.window[0].width;
}
function lselect() {

}


getcontrollers(true);
if (rf.length == players.length && players.length > 0){
  setTimeout(() => {tmout = true;},1000);
  rect(0,height / 2 - 100,width,200);
  fill(0);
  textSize(100);
  text("Ready to fight",width / 2 - 100,height / 2);
  if (tmout){
  for (let z = 0; z < players.length; z++){
    if (players[z].gp.buttons[0].pressed){
      gstate = "fight";
    }
  }
  players = [];
}
}


for (let p = 0; p < players.length;p++){
  fill(players[p].color[0],players[p].color[1],players[p].color[2]);
  ellipse(players[p].x,players[p].y,50,50);
  players[p].x += players[p].gp.axes[0] * 2;
  players[p].y += players[p].gp.axes[1] * 2;
}

}
function clicked(x,y,x2,y2,w,h) {
return x > x2 && x < x2 + w && y > y2 && y < y2 + h;
}
