let bird;
let birds;
let des = 15;
let tam = 30;
let aDist = 80;
let cDist = 80;
let sDist = 80;
let MAXSPEED = 2;

function setup() {
  createCanvas(600, 450);
  angleMode(DEGREES);
  bird = new Bird(width, height, 0);
  birds = [];
  for(let i = 0; i < tam; i++) {
    let x = random(0, width);
    let y = random(0, height);
    birds[i] = new Bird(x, y, 1, 1);
  }
  MAXSPEED = createSlider(0, 15, 3, 0);
  aDist = createSlider(0, 150, 60, 0);
  cDist = createSlider(0, 150, 60, 0);
  sDist = createSlider(0, 150, 60, 0);
  
  aDist.size(100);
  cDist.size(100);
  sDist.size(100);
}

function draw() {
  background(220);
  for(let i = 0; i < tam; i++){
    birds[i].create();
  }
  
  birds = verify(birds);
  
  // bird.create();
  // bird.move(0.8 , 0);
}

function verify(birds) {
  let newBirds = [];
  for(let i = 0; i < tam; i++){
    let move = [0, 0];
    let aDif = [0, 0];
    let cDif = [0, 0];
    let sDif = [0, 0];
    let aCount = 0;
    let cCount = 0;
    for(let j = 0; j < tam; j++) {
      if(birds[i] !== birds[j]) {
        distance = dist(birds[i].x, birds[i].y, birds[j].x, birds[j].y);
        if(distance < aDist.value()) {
          aDif[0] += birds[j].vx;
          aDif[1] += birds[j].vy;
          aCount++;
        }
        if(distance < cDist.value()) {
          cDif[0] += birds[j].x;
          cDif[1] += birds[j].y;
          cCount++;
        }
        if(distance < sDist.value()) {
          sDif[0] -= (birds[j].x - birds[i].x);
          sDif[1] -= (birds[j].y - birds[i].y);
        }
      }
    
    }
    if(aCount > 0) {
      aDif[0] /= aCount;
      aDif[1] /= aCount;
    }
    if(cCount > 0) {
      cDif[0] /= cCount;
      cDif[1] /= cCount;
      // cDif[0] -= birds[i].x;
      // cDif[1] -= birds[i].y;
    }
    
    let result = [0, 0];
    result[0] = aDif[0] + cDif[0] + sDif[0];
    result[1] = aDif[1] + cDif[1] + sDif[1];
    newBirds[i] = new Bird(birds[i].x, birds[i].y, birds[i].vx, birds[i].vy);
    newBirds[i].move(result[0], result[1]);
    //print(result[0], result[1]);
    
  }
    
  return newBirds;
}

class Bird {
  constructor(x, y, vx, vy) {
    this.angle = 30;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.rot = 0;
  }
  
  create() {
    let x2, x3;
    let y2, y3;
    let x1 = this.x;
    let y1 = this.y;
    let angle = this.angle;
    
    x2 = x1 - cos(angle) * des;
    x3 = x1 - cos(angle) * des;
    y2 = y1 - sin(angle) * des;
    y3 = y1 + sin(angle) * des;
    
    let t;
    if(this.vx === 0){
      t = 0;
    }
    else {
      t = this.vy / this.vx; 
    }
    
    this.rot = atan(t);
    this.rot = atan2(this.vy, this.vx)
    push();
    translate(this.x, this.y);
    rotate(this.rot);
    
    triangle(0, 0, x2 - this.x, y2 - this.y, x3 - this.x, y3 - this.y);
    stroke('purple');
    strokeWeight(5);
    point(0, 0);
    pop();
  }
  
  move(x, y) {
    this.vx += x;
    this.vy += y;
    
    let speed = sqrt(this.vx*this.vx + this.vy*this.vy);
    
    
    if(speed > MAXSPEED.value()){
      let s = MAXSPEED.value() / speed;
      this.vx *= s;
      this.vy *= s;
    }
    
    // print(this.vx, this.vy);
    
    this.x += this.vx;
    this.y += this.vy;
    
    if(this.x > width + des){
      this.x = 0;
    }
    else if(this.x <= -des){
      this.x = width;
    }
    if(this.y > height + des){
      this.y = 0;
    }
    else if(this.y <= -des){
      this.y = height;
    }
  }
}