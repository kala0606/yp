const rand_seed = (size) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
var tempHash = "0x" + rand_seed(64);
// var tempHash = "0x9aD4747f383DB19d8240Fc9871b1b36fD02A95f1";

tokenData = {
  hash: tempHash,
  tokenId: "123000456",
};

let hash = tokenData.hash;
// let projectNumber = Math.floor(parseInt(tokenData.tokenId) / 1000000);
// let mintNumber = parseInt(tokenData.tokenId) % (projectNumber * 1000000);

let seed = parseInt(tokenData.hash.slice(0, 16), 16);

class Random {
  constructor() {
    this.useA = false;
    let sfc32 = function (uint128Hex) {
      let a = parseInt(uint128Hex.substr(0, 8, 16));
      let b = parseInt(uint128Hex.substr(8, 8, 16));
      let c = parseInt(uint128Hex.substr(16, 8, 16));
      let d = parseInt(uint128Hex.substr(24, 8, 16));
      return function () {
        a |= 0; b |= 0; c |= 0; d |= 0;
        let t = (((a + b) | 0) + d) | 0;
        d = (d + 1) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
      };
    };
    // seed prngA with first half of tokenData.hash
    this.prngA = new sfc32(tokenData.hash.substr(2, 32));
    // seed prngB with second half of tokenData.hash
    this.prngB = new sfc32(tokenData.hash.substr(34, 32));
    for (let i = 0; i < 1e6; i += 2) {
      this.prngA();
      this.prngB();
    }
  }
  // random number between 0 (inclusive) and 1 (exclusive)
  random_dec() {
    this.useA = !this.useA;
    return this.useA ? this.prngA() : this.prngB();
  }
  // random number between a (inclusive) and b (exclusive)
  random_num(a, b) {
    return a + (b - a) * this.random_dec();
  }
  // random integer between a (inclusive) and b (inclusive)
  // requires a < b for proper probability distribution
  random_int(a, b) {
    return Math.floor(this.random_num(a, b + 1));
  }
  // random boolean with p as percent liklihood of true
  random_bool(p) {
    return this.random_dec() < p;
  }
  // random value in an array of items
  random_choice(list) {
    return list[this.random_int(0, list.length - 1)];
  }
}
let R = new Random(seed);


// let radius = 300;
// // let s = 0;
//   let s2 = 0;
//   let t = 0;
//   let t2 = 0;
//   let lastx = 0;
//   let lasty = 0;
//   let lastz = 0;
//   let noiseval = 0;
let rans = [];
// var DIM, M;

var res=360;
let stp=1.0;
let f=0.0;
let rd=200;
let mX,mY;
let ry,rx,rz, sf, atp, rr;

const flock = [];
let alignSlider, cohesionSlider, separationSlider;

// ************************************************************************************************************
let clrLen;
let whichClr;

let clr0         = [ [81,45,109],[248,72,94],[238,238,238],[0,193,212] ];
let clr1         = [ [23,23,23],[68,68,68],[218,0,55],[237,237,237] ];
let clr2         = [ [243,244,237],[83,97,98],[66,70,66],[192,96,20] ];
let clr3 =         [[0, 0, 0],[255, 255, 255]];
let clr4         = [ [12,236,221],[255,243,56],[255,103,231],[196,0,255] ];
let clr5         = [ [0,234,211],[255,245,183],[255,68,159],[0,95,153] ];
let clr6         = [ [38,0,27],[129,0,52],[255,0,92],[255,246,0] ];
let clr7         = [ [235,168,58],[187,55,26],[255,248,217],[213,219,179] ];
let clr8         = [ [75,119,141],[40,181,181],[143,217,168],[210,230,156] ];
let clr9         = [ [240,217,231],[255,148,204],[162,57,234],[92,51,246] ];


let clr1Num      = 200;
let clr1Cnt      = -1;
let clr1Blk;
let clrA         = [];

let whichColor;

// ************************************************************************************************************

var DEFAULT_SIZE = 1000
var WIDTH = window.innerWidth
var HEIGHT = window.innerHeight
// var WIDTH = HEIGHT*0.707
var DIM = Math.min(WIDTH, HEIGHT)
var M = DIM / DEFAULT_SIZE;
let c;
let V;


function setup() {
  
  // c = createCanvas(59187,45997,WEBGL);
  DIM = Math.min(WIDTH, HEIGHT);
  createCanvas(WIDTH, HEIGHT, WEBGL);
  noiseSeed(seed);
  // DIM = 45997;
  M = DIM / 1000;
  V = R.random_int(0, 50);
  
  // alignSlider = createSlider(0, 20, R.random_num(0, 2), 0.1);
  // cohesionSlider = createSlider(0, 1, 0.1, 0.1);
  // separationSlider = createSlider(0, 20, R.random_num(0, 2), 0.1);

  if(V<10) //Drinkers and Smokers
  {
    sf = R.random_int(20, 100);
    bs = R.random_int(15, 100);
    
    cpr = 24
    spr = 25
    apr = 30;

    av = 3;
    cv = 0.1;
    sv = 0.1;

    mf = 0.2
  }

  if(V>=10 && V < 20) //Forbidden Sectors
  {
    sf = R.random_int(20, 100);
    bs = R.random_int(15, 20);
    
    cpr = 24
    spr = 25
    apr = 30;

    av = R.random_num(0,1);
    cv = 0.1;
    sv = 0.1;

    mf = 0.2
  }

  if(V>=20 && V < 30) //Armageddon
  {
    sf = R.random_int(80, 100);
    bs = R.random_int(85, 100);
    
    cpr = 24
    spr = 25
    apr = 30;

    av = R.random_num(0,1);
    cv = 0.1;
    sv = 0.1;

    mf = 0.2
  }

  if(V>=30 && V < 40) //Chase Sequence
  {
    sf = R.random_int(20, 100);
    bs = R.random_int(25, 40);
    
    cpr = 24
    spr = 25
    apr = R.random_int(30,200);

    av = R.random_num(0,1);
    cv = 2;
    sv = 10;

    mf = 0.2
  }

  if(V>=40 && V <= 50) //Family Business
  {
    sf = R.random_int(80, 100);
    bs = R.random_int(85, 100);
    
    cpr = 100
    spr = 25
    apr = 50;

    av = R.random_num(0,1);
    cv = 1;
    sv = 0.1;

    mf = 0.2
  }

  for(let i = 0; i <= sf; i++){
    if(i%2==0){
    rans[i] = R.random_int(1, bs);
    }
    else rans[i] = R.random_int(10, bs);
  }

  for (let i = 0; i < sf; i++) {
    let br = rans[i]//map(i, 1, 200, rans[i]*M, 0*M);
    flock.push(new Boid(br));
  }

  
  
  whichColor = R.random_int(0, 10);

if(whichColor==0)      whichClr = clr0;
else if(whichColor==1) whichClr = clr1;
else if(whichColor==2) whichClr = clr2;
else if(whichColor==3) whichClr = clr3;
else if(whichColor==4) whichClr = clr4;
else if(whichColor==5) whichClr = clr5;
else if(whichColor==6) whichClr = clr6;
else if(whichColor==7) whichClr = clr7;
else if(whichColor==8) whichClr = clr8;
else                   whichClr = clr9;
  
  // whichClr = clr5;

setColorTables();
  
  rx = R.random_num(0, 1);
  ry = R.random_num(0, 1);
  rz = R.random_num(0, 1);
  
  rr = R.random_num(0,TWO_PI)
  ss = R.random_num(0,10) // small cube
  bs = R.random_num(50,100) // big cube

  // console.log("rx ",rx);
  // console.log("ry ",ry);
  // console.log("rz ",rz);
  // console.log("sf ",sf);
  console.log("V ",V);
  
  

background(clrA[ floor( R.random_int(0,3)*50 ) ])
  // background(0);

  
  
}

function draw() {
  scale(0.75)
  
  ambientLight(100);
  directionalLight(255, 255, 255, 0, 0, -DIM*M);

  // rotateY((noise(frameCount/100) * ry));
  // rotateX((noise(frameCount/100) * rx));
  // rotateZ((noise(frameCount/100) * rz));
  
  
  smooth();
  translate(-WIDTH/2, -HEIGHT/2)
    
  for (let boid of flock) {
    boid.edges();
    boid.flock(flock);
    boid.update();
    boid.show();
  }  

  
  
  if(frameCount >= 190*2){
    noLoop();
    // saveForPrint("sketch.jpg", "A3", 300);

    print("done")

    // stop();
    
  }
  
}

function keyPressed(){
  if (keyCode === 55) {
      saveCanvas(c, 'myCanvas', 'jpg');  } 
}
  

function linger(as, at, s){
  radius = 100*M;
  while (at<=600) {
    noiseval += 0.00001 * rx;
    s += as;
    at += 1;
    let radianS = radians(s);
    let radianT = radians(at);
    let br = map(frameCount, 1, 400, rans[at]*M, 0*M);
    
    radius = map(radius, 0, radius, DIM/8, DIM)
            //  + map(rans[at]*M, 10, 100, 0, DIM/8);
    let thisx = 0 + (radius * cos(radianS) * sin(radianT));
    let thisy = 0 + (radius * sin(radianS) * sin(radianT));
    let thisz = 0 + (radius * cos(radianT));
    

      stroke(clrA[ floor( (frameCount) % clrA.length ) ]);
      // stroke(0)
      strokeWeight(0.1*M);
      
      push();
      translate(thisx, thisy , thisz );
      rotateX(sin(noiseval));
      rotateY(sin(noiseval));
      rotateZ(sin(noiseval));
      ambientMaterial(clrA[ floor( at % clrA.length ) ]);
      if(at % 3 == 0){
        box(br);
      }
      else if (at % 2 == 0 ){
        box(br, br);
      }
      else if (at%5 == 0){
        box(br/2, br/2);
      }
      else{
        box(br/10, br/10)
      }
      
          box(br/5
                )

      pop();
      
    
    lastx = thisx;
    lasty = thisy;
    lastz = thisz;
    
  }
  
}


function setColorTables() {
  clrLen = whichClr.length;
  clr1Blk = floor(clr1Num/clrLen);
  for (let i = 0; i < clr1Num; ++i) {
    if( i%clr1Blk==0 ) clr1Cnt = (clr1Cnt+1)%clrLen;
    let _c1 = color( whichClr[(clr1Cnt)][0], whichClr[(clr1Cnt)][1], whichClr[(clr1Cnt)][2] );
    let _c2 = color(whichClr[(clr1Cnt+1)%clrLen][0], whichClr[(clr1Cnt+1)%clrLen][1], whichClr[(clr1Cnt+1)%clrLen][2]);
    clrA.push(  lerpColor( _c1, _c2, map(i, (clr1Cnt*clr1Blk), (((clr1Cnt+1))*clr1Blk), 0.0, 1.0) ) );
  }
}

class Boid {
  constructor(br) {
    this.position = createVector(map(R.random_num(0,1), 0,1, 0, WIDTH), map(R.random_num(0,1), 0,1, 0, HEIGHT));
    // this.velocity = p5.Vector.random2D();
    this.velocity = createVector();
    let angle = R.random_num(0,1) * TWO_PI;
    let length = 1*M;
    this.velocity.x = length * Math.cos(angle); 
    this.velocity.y = length * Math.sin(angle);
    this.velocity.z = length * Math.sin(angle);
    this.velocity.setMag(R.random_num(2, 4) * M);
    this.acceleration = createVector();
    this.maxForce = mf * M;
    this.maxSpeed = 5 * M;
    this.size = br * M;
  }

  edges() {
    if (this.position.x > WIDTH) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = WIDTH;
    }
    if (this.position.y > HEIGHT) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = HEIGHT;
    }
  }

  align(boids) {
    let perceptionRadius = apr*M;
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other != this && d < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  separation(boids) {
    let perceptionRadius = spr*M;
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other != this && d < perceptionRadius) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(d * d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  cohesion(boids) {
    let perceptionRadius = cpr*M;
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other != this && d < perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  flock(boids) {
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let separation = this.separation(boids);

    alignment.mult(av);
    cohesion.mult(cv);
    separation.mult(sv);

    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
    // this.size = map(this.size, 1, 200, this.size, 0);;
  }

  show() {
    strokeWeight(0);
    stroke(0);
    push();
    fill(clrA[ floor( (frameCount) % clrA.length ) ])
    translate(this.position.x, this.position.y);
    rotate(frameCount/50);
    // sphere(sin(frameCount/60)*this.size*2);
    box(sin(frameCount/120)*this.size);
    pop();
  }
}


