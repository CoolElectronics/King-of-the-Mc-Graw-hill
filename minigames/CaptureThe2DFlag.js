var p1x = 200;
var p1y = 350;
var p2x = 1200;
var p2y = 350;
var flagstolen1;
var flagstolen2;
var flag1x = 50;
var flag1y = 350;
var flag2x = 1320;
var flag2y = 350;
var thought;
var score1 = 0,score2 = 0;
function setup() {
createCanvas(1400,700);
strokeWeight(10);
}
function draw() {
  background(0);
  fill(255,0,0);
  rect(0,0,700,700);
  fill(0,0,255);
  rect(700,0,700,700);
  fill(0, 153, 0);
  rect(675,0,50,700);
  fill(150, 153, 0);
  rect(flag1x,flag1y,30,30);
  fill(0, 153, 150);
  rect(flag2x,flag2y,30,30);
  fill(255,0,0);
  rect(p1x,p1y,40,40);
  fill(0,0,255);
  rect(p2x,p2y,40,40);
  fill(0,0,0);
  rect(0,0,1400,10);
  rect(0,0,10,1400);
  rect(0,690,1400,10);
  rect(1390,0,10,1400);
  rect(550,0,300,100);
  fill(255);
  rect(690,0,20,100);
  textSize(40);
  text(score1,580,60);
  text(score2,820,60);
think();

  if (keyIsDown(87)){
    if (p2y > 9){
    p2y -=3;
  }
  }
  if (keyIsDown(65)){
    if (p2x > 10){
    p2x -=3;
  }
  }
  if (keyIsDown(83)){
      if (p2y < 650){
    p2y +=3;
  }
  }
  if (keyIsDown(68)){
    if (p2x < 1350){
    p2x +=3;
  }
  }
  if (collide(p1x,p1y,40,40,p2x,p2y,40,40)){
    if (p1x > 700){
      p1x = 200;
      p1y = 350;
      flag2x = 1320;
      flag2y = 350;
      flagstolen1 = false;
    }else{
      p2x = 1200;
      p2y = 350;
      flag1x = 50;
      flag1y = 350;
      flagstolen2 = false;
    }
  }
  if (collide(p1x,p1y,40,40,flag2x,flag2y,30,30)){
    flagstolen1 = true;
  }
  if (collide(p2x,p2y,40,40,flag1x,flag1y,30,30)){
    flagstolen2 = true;
  }
if (flagstolen1){
flag2x = p1x;
flag2y = p1y;
}
if (flagstolen2){
flag1x = p2x;
flag1y = p2y;
}
if (flagstolen1 && p1x < 700){
  flagstolen1 = false;
  flag2x = 1320;
  flag2y = 350;
  score1 ++;
}
if (flagstolen2 && p2x > 700){
  flagstolen2 = false;
  flag1x = 50;
  flag1y = 350;
  score2 ++;
}
}
function collide(x1,y1,w1,h1,x2,y2,w2,h2) {
  return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}
function think(){
  thought = null;
  if (p2x > 700){
  if (flagstolen1){
  if (dist(p1x,p1y,p2x,p2y) < 100){
document.getElementById("mood").innerHTML = "self preservation";
if (p1y > 150){
thought = "ru";
}else{
  if (p1y < height - 100){
thought = "ul";
}
document.getElementById("mood").innerHTML = "AAAAH IM TRAPPED!";
}
  }else{
    if (dist(p1x,p1y,p2x,p2y) < 30){
      document.getElementById("mood").innerHTML = "AAAAH WHATS GOING ON I GOTTA GO! I GOTTA GO!";
      if (p1x < width - 150){
    thought = "right";
  }else{
    thought = "rd";
  }
    if (p1y > p2y){
      thought = "rd"
    }else{
      thought = "ru"
    }
  }else{
    if (p1y > p2y){
      if (p1y < height - 100){
      thought = "dl";
    }else{
      thought = "left";
    }
    }else{
      if (p1y > 70){
      thought = "ul";
    }else{
      thought = "left";
    }
    }
    document.getElementById("mood").innerHTML = "getting outa here!";
  }
  }
  }else{
  if (p1x < p2x + 100){
    if(p1x < 650){
      document.getElementById("mood").innerHTML = "going to the other side";
      if (p1x < width - 150){
    thought = "right";
  }else{
    thought = "rd";
  }
    }else{
      document.getElementById("mood").innerHTML = "self preservation";
      if (dist(p1x,p1y,p2x,p2y) < 100){
        if (p1y < p2y){
           if (p1y > 50){
          thought = "up";
        }else{
          if (p1y < height - 100){
          thought = "dl";
        }else{
          thought = "left";
        }
          document.getElementById("mood").innerHTML = "AAAAH IM TRAPPED!";
        }
        }else {
           if (p1y < height - 100){
          thought = "down";
        }else{
          thought = "rd";
        }
        }
        if (dist(p1x,p1y,p2x,p2y) < 90){
          document.getElementById("mood").innerHTML = "AAAAH WHATS GOING ON I GOTTA GO! I GOTTA GO!";
          if (p1x < p2x){
            if (p1y > p2y){
              thought = "dl";
            }else{
              thought = "ul";
            }
      }else{
        if (p1y > p2y){
          thought = "rd";
        }else{
          thought = "ru";
        }
      }
      }
      }else{
        if (p1x < width - 150){
      thought = "right";
    }else{
      thought = "rd";
    }
      }
    }
}else{
  document.getElementById("mood").innerHTML = "flag collection";
  if (abs(p1y - flag2y) > 20){
  if (p1y > flag2y){
  thought = "up";
}else if (p1y < flag2y){
  thought = "down";
  }
}else{
  if (p1x < width - 150){
thought = "right";
}else{
thought = "rd";
}
}
}
}
}else{
  document.getElementById("mood").innerHTML = "defending myself";
  if (abs(p1y - p2y) > 30){
  if (p1y > p2y){
  thought = "ul";
}else if (p1y < p2y){
  thought = "dl";
  }
}else{
  if (p1x < p2x){
    if (p1x < width - 150){
  thought = "right";
}else{
  thought = "rd";
}
  }else{
  thought = "left";
}
}
}
if (p1x > width - 50){
  if (p1y > p2y){
    thought = "dl";
  }else{
    thought = "rd";
  }
}
if (thought == "dl"){
  if (p1y < 650){
  p1y +=3;
}
  if (p1x > 10){
  p1x -=3;
}
}
  if (thought == "up"){
    if (p1y > 9){
    p1y -=3;
  }
  }
  if (thought == "down"){
    if (p1y < 650){
    p1y +=3;
  }
  }
  if (thought == "left"){
    if (p1x > 10){
    p1x -=3;
  }
  }
  if (thought == "right"){
    if (p1x < 1350){
    p1x +=3;
  }
  }
  if (thought == "ul"){
    if (p1y > 9){
    p1y -=3;
  }
    if (p1x > 10){
    p1x -=3;
  }
  }
  if (thought == "rd"){
    if (p1x < 1350){
    p1x +=3;
  }
  if (p1y < 650){
  p1y +=3;
}
  }
  if (thought == "ru"){
    if (p1x < 1350){
    p1x +=3;
  }
  if (p1y > 9){
  p1y -=3;
}
}
}
