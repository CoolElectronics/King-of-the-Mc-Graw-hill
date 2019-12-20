"use strict";
var Opt1 = " ";
var Opt2 = " ";
var roleText = " ";
class RP {
	constructor(prompt, o1, o2, trigger1, trigger2) {
		this.trigger1 = trigger1;
		this.trigger2 = trigger2;
		roleText = prompt;
		Opt1 = o1;
		Opt2 = o2;
	}
	ask() {
		if (Guibutton(170, 620, 150, 40)) {
      if (this.trigger1 !== null){
			return this.trigger1();
    }
  }
		if (Guibutton(1080, 620, 150, 40)) {
      if (this.trigger2 !== null){
			return this.trigger2();
		 }
    }
	 }
}
function drawGui() {
	textSize(15);
	rect(85 + camera.position.x - width / 2, 75 + camera.position.y - height / 2, 100, 40);
	stroke(40, 40, 255);
	strokeWeight(3);
	fill(233, 40, 40);
	text(mouseX + " " + mouseY, 100 + camera.position.x - width / 2, 100 + camera.position.y - height / 2);
	stroke(140, 170, 100);
	fill(190, 190, 190);
	strokeWeight(10);
	rect(100 + camera.position.x - width / 2, 550 + camera.position.y - height / 2, 1200, 140);
	rect(170 + camera.position.x - width / 2, 620 + camera.position.y - height / 2, 150, 40);
	rect(1080 + camera.position.x - width / 2, 620 + camera.position.y - height / 2, 150, 40);
	strokeWeight(3);
	fill(0, 0, 0);
	text(Opt1, 190 + camera.position.x - width / 2, 645 + camera.position.y - height / 2);
	text(Opt2, 1110 + camera.position.x - width / 2, 645 + camera.position.y - height / 2);
	text(roleText, 520 + camera.position.x - width / 2, 600 + camera.position.y - height / 2);
}
function updatekeys() {

	if (keyIsDown(LEFT_ARROW) || keyDown("a")) {

			player.position.x -= 5;

		}

		if (keyIsDown(RIGHT_ARROW) || keyDown("d")) {
			player.position.x += 5;
		}

		if (keyIsDown(UP_ARROW) || keyDown("w")) {
			player.position.y -= 5;
		}

		if (keyIsDown(DOWN_ARROW) || keyDown("s")) {
			player.position.y += 5;
		}
		camera.position.x = player.position.x;
	camera.position.y = player.position.y;
	}
	function Guibutton(x,y,w,h) {
		if (mouseIsPressed){
		return mouseX >= x && mouseX <= x+w && mouseY >= y && mouseY <= y+h;
	}else{
		return false;
	}
	}
