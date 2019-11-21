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
      if (trigger1 !== null){
			this.trigger1();
    }
  }
		if (Guibutton(1080, 620, 150, 40)) {
      if (trigger2 !== null){
			this.trigger2();
		 }
    }
	 }
}
function drawGui() {
	textSize(15);
	mp = false;
	rect(85, 75, 100, 40);
	stroke(40, 40, 255);
	strokeWeight(3);
	fill(233, 40, 40);
	text(mouseX + " " + mouseY, 100, 100);
	stroke(140, 170, 100);
	fill(190, 190, 190);
	strokeWeight(10);
	rect(100, 550, 1200, 140);
	rect(170, 620, 150, 40);
	rect(1080, 620, 150, 40);
	strokeWeight(3);
	fill(0, 0, 0);
	text(Opt1, 190, 645);
	text(Opt2, 1110, 645);
	text(roleText, 520, 600);
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
	}
