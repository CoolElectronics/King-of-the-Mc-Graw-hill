var player;
var req = "world.json";
var gamesprites = {};
var world = [];
function setup() {
	document.body.style.padding = (windowWidth - 1400) / 4 + (windowHeight - 700) / 8;
	createCanvas(1400, 700);
	createAllSprites();// Yes, I know. It's a lot of work. You can take your time, Gideon. :D
	makeWorldFromJson();
  }
  function draw(){
background(70);
updatekeys();
drawWorld();
worldProcess();
drawGui();
  }
