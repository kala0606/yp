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

// ************************************************************************************************************

var DEFAULT_SIZE = 1000;

// var HEIGHT = 2400;
var HEIGHT = window.innerHeight;
// var WIDTH = HEIGHT * 3508 / 4961;
var WIDTH = window.innerWidth;

var DIM = Math.min(WIDTH, HEIGHT);
// var DIM = HEIGHT;
var M = DIM / DEFAULT_SIZE;

// var tc = R.random_int(1,80);
// var nin = R.random_int(1,200); // noine inverse
// var zoffi = R.random_num(0.0001, 0.01); // inc noise
// var es = R.random_int(1*M,20*M); // ellipse size
// var nd = R.random_int(0,200); //noise disrupt
// var ai = R.random_num(0.05, 0.01); //angle inc
// var em = R.random_num(0.5*M, 2*M); //ellipse mid
// var sw = R.random_num(10, 100); //strokw weight
// var ip = R.random_num(1, 20); //iplusplus
// var sf = R.random_num(0.1, 2); //iplusplus
// var esp = R.random_num(0.3*M, 10*M); //iplusplus
// var cv = R.random_int(100, 200); //iplusplus
// var ls = R.random_int(300, 200); //iplusplus

tc = 0//1R.random_int(1,80);
// nin = 1//R.random_int(1,200); // noine inverse


//VARTIATIONS

let V = R.random_int(0,100);

// V = 89;


if(V < 5){
// n1 - No Symmetry
  nin = R.random_int(1,200); // noine inverse
  zoffi = R.random_num(0.1, 0.01); // inc noise
  es = 1*M//R.random_int(1*M,20*M); // ellipse size
  nd = 10//R.random_int(0,200); //noise disrupt
  ai = 0.01//R.random_num(0.05, 0.01); //angle inc
  em = 0.3//R.random_num(0.5*M, 2*M); //line length
  sw = R.random_num(1, 3); //line length
  ip = 20//R.random_num(1, 20); //iplusplus
  sf = R.random_num(6, 8); //iplusplus
  esp = 0.5*M//R.random_num(0.3*M, 10*M); //iplusplus
  cv = R.random_int(1000, 200); //iplusplus
  ls = 0//R.random_int(3, 2); //iplusplus
  zoffi2 = R.random_num(0.5, 0.001);
}

if(V >= 5 && V < 15){
// n2 -big circle
  nin = 2//R.random_int(1,200); // noine inverse
  zoffi = R.random_num(0.001, 0.001); // inc noise
  es = 1*M//R.random_int(1*M,20*M); // ellipse size
  nd = 100//R.random_int(0,200); //noise disrupt
  ai = 0.01//R.random_num(0.05, 0.01); //angle inc
  em = 0.3//R.random_num(0.5*M, 2*M); //line length
  sw = R.random_num(10, 100); //line length
  ip = 20//R.random_num(1, 20); //iplusplus
  sf = R.random_num(2, 4); //iplusplus
  esp = 0.5*M//R.random_num(0.3*M, 10*M); //iplusplus
  cv = R.random_int(1000, 200); //iplusplus
  ls = R.random_int(30, 20); //iplusplus
  zoffi2 = R.random_num(0.05, 0.001);
}

if(V >= 15 && V < 20){
// n3 - No Symmetry
  nin = 2//R.random_int(1,200); // noine inverse
  zoffi = R.random_num(0.01, 0.01); // inc noise
  es = 1*M//R.random_int(1*M,20*M); // ellipse size
  nd = 100//R.random_int(0,200); //noise disrupt
  ai = 0.01//R.random_num(0.05, 0.01); //angle inc
  em = 3//R.random_num(0.5*M, 2*M); //line length
  sw = R.random_num(10, 50); //line length
  ip = 20//R.random_num(1, 20); //iplusplus
  sf = R.random_num(1, 2); //iplusplus
  esp = 30*M//R.random_num(0.3*M, 10*M); //iplusplus
  cv = R.random_int(1000, 200); //iplusplus
  ls = R.random_int(100, 200); //iplusplus
  zoffi2 = R.random_num(0.5, 0.001);
}

if(V >= 20 && V < 25){
//2 - Propah Symmetry Condensed
nin = 200//R.random_int(1,200); // noine inverse
zoffi = R.random_num(0.0001, 0.01); // inc noise
es = 1*M//R.random_int(1*M,20*M); // ellipse size
nd = 0//R.random_int(0,200); //noise disrupt
ai = 0.01//R.random_num(0.05, 0.01); //angle inc
em = 0.3//R.random_num(0.5*M, 2*M); //line length
sw = R.random_num(10, 20); //line length
ip = 2//R.random_num(1, 20); //iplusplus
sf = R.random_num(3, 4); //iplusplus
esp = R.random_num(1*M, 6*M); //iplusplus
cv = R.random_int(50, 100); //iplusplus
ls = R.random_int(3, 2); //iplusplus
zoffi2 = R.random_num(0.5, 0.001);
}

if(V >= 25 && V < 35){
//3 - Propah Symmetry Condensed Stroke Black
  nin = 500//R.random_int(1,200); // noine inverse
  zoffi = R.random_num(0.0001, 0.005); // inc noise
  es = 10*M//R.random_int(1*M,20*M); // ellipse size
  nd = 0//R.random_int(0,200); //noise disrupt
  ai = 0.01//R.random_num(0.05, 0.01); //angle inc
  em = 20//R.random_num(0.5*M, 20*M); //line length
  sw = 50//R.random_num(10, 100); //line length
  ip = 20//R.random_num(1, 20); //iplusplus
  sf = R.random_num(4, 8); //iplusplus
  esp = R.random_num(1*M, 3*M); //iplusplus
  cv = R.random_int(100, 200); //iplusplus
  ls = 30//200//R.random_int(30, 200); //iplusplus
  zoffi2 = R.random_num(0.5, 0.001);
}

if(V >= 35 && V < 40){
  //4 - Propah Symmetry Wide Stroke Black
  nin = 500//R.random_int(1,200); // noine inverse
  zoffi = R.random_num(0.0001, 0.005); // inc noise
  es = 10*M//R.random_int(1*M,20*M); // ellipse size
  nd = 0//R.random_int(0,200); //noise disrupt
  ai = 0.01//R.random_num(0.05, 0.01); //angle inc
  em = 10//R.random_num(0.5*M, 20*M); //line length
  sw = 20//R.random_num(10, 100); //line length
  ip = 20//R.random_num(1, 20); //iplusplus
  sf = R.random_num(8, 10); //iplusplus
  esp = 5.5*M//R.random_num(0.3*M, 10*M); //iplusplus
  cv = R.random_int(100, 200); //iplusplus
  ls = 10//200//R.random_int(30, 200); //iplusplus
  zoffi2 = R.random_num(0.5, 0.001);
}

if(V >= 40 && V < 50){
  // 4 - ASymmetry Wide Stroke Black Zoom
  nin = 500//R.random_int(1,200); // noine inverse
  zoffi = R.random_num(0.01, 0.0001); // inc noise
  es = 10*M//R.random_int(1*M,20*M); // ellipse size
  nd = 50//R.random_int(0,200); //noise disrupt
  ai = 0.01//R.random_num(0.05, 0.01); //angle inc
  em = 1//R.random_num(0.5*M, 20*M); //line length
  sw = 10//R.random_num(10, 100); //line length
  ip = 1//R.random_num(1, 20); //iplusplus
  sf = R.random_num(3, 5); //iplusplus
  esp = 10*M//R.random_num(0.3*M, 10*M); //iplusplus
  cv = R.random_int(100, 500); //iplusplus
  ls = 30//200//R.random_int(30, 200); //iplusplus
  zoffi2 = R.random_num(0.5, 0.001);
}

if(V >= 50 && V < 70){
  // 6 - Semi Symmetry Wide Stroke Black Zoom - Bulk Lifter 1
  nin = 1//R.random_int(1,200); // noine inverse
  zoffi = R.random_num(0.003, 0.001); // inc noise
  es = 10*M//R.random_int(1*M,20*M); // ellipse size
  nd = 5//R.random_int(0,200); //noise disrupt
  ai = 0.01//R.random_num(0.05, 0.01); //angle inc
  em = R.random_num(0.2, 0.6); //line length
  sw = 10//R.random_num(10, 100); //line length
  ip = 1//R.random_num(1, 20); //iplusplus
  sf = R.random_num(2, 4); //iplusplus
  esp = 1*M//R.random_num(0.3*M, 10*M); //iplusplus
  cv = R.random_int(40, 300); //iplusplus
  ls = R.random_int(3, 2); //iplusplus
  zoffi2 = R.random_num(0.5, 0.001);
}

if(V >= 80 && V < 90){
  // 7- Semi Symmetry Wide NoStroke - Bulk Lifter 2
  nin = 1//R.random_int(1,200); // noine inverse
  zoffi = R.random_num(0.0001, 0.001); // inc noise
  es = 1*M//R.random_int(1*M,20*M); // ellipse size
  nd = R.random_int(0,10); //noise disrupt
  ai = 0.01//R.random_num(0.05, 0.01); //angle inc
  em = 0//R.random_num(0.2*M, 0.6*M); //line length
  sw = R.random_num(1, 10); //line length
  ip = 1//R.random_num(1, 20); //iplusplus
  sf = R.random_num(1, 4); //iplusplus
  esp = 1*M//R.random_num(0.3*M, 10*M); //iplusplus
  cv = R.random_int(100, 300); //iplusplus
  ls = R.random_int(3, 2); //iplusplus
  zoffi2 = R.random_num(0.5, 0.001);
}

if(V >= 90 && V <= 100){
  // 8- Asymmetry Wide Stroke Black- 
  nin = 1//R.random_int(1,200); // noine inverse
  zoffi = R.random_num(0.01, 0.005); // inc noise
  es = 10*M//R.random_int(1*M,20*M); // ellipse size
  nd = R.random_int(0,100); //noise disrupt
  ai = 0.01//R.random_num(0.05, 0.01); //angle inc
  em = 1//R.random_num(0.2*M, 0.6*M); //line length
  sw = 1//R.random_num(10, 100); //line length
  ip = 1//R.random_num(1, 20); //iplusplus
  sf = R.random_num(1, 4); //iplusplus
  esp = R.random_num(5*M, 10*M); //iplusplus
  cv = R.random_int(100, 300); //iplusplus
  ls = R.random_int(50, 10); //iplusplus
  zoffi2 = R.random_num(0.5, 0.001);
}


//

console.log("V :" + V);
console.log("zoffi :" + zoffi);
console.log( "es :" + es);
console.log( "nd :" + nd);
console.log( "em :" + em);
console.log( "sw :" + sw);
console.log( "ip :" + ip);
console.log( "sf :" + sf);
console.log( "esp :" + esp);
console.log( "cv :" + cv);
console.log( "ls :" + ls);

var zoff = 0;
let zoff2 = 0;
let es0 = es;


// ************************************************************************************************************
let clrLen;
let whichClr;

let clr0         = [ [240, 19, 77],[255, 111, 94],[245, 240, 227],[64, 191, 193] ];
let clr1         = [ [51, 48, 228],[246, 55, 236],[251, 180, 84],[250, 234, 72] ];
let clr2         = [ [71, 0, 216],[153, 0, 240],[249, 0, 191],[255, 133, 179] ];
let clr3         = [ [255, 225, 98],[255, 100, 100],[145, 196, 131],[238, 238, 238] ];
let clr4         = [ [238, 238, 238],[56,56,56],[150,150,150],[200,200,200] ];
let clr5         = [ [255, 0, 117],[23, 39, 116],[119, 217, 112],[238, 238, 238] ];
let clr6         = [ [77, 119, 255],[86, 187, 241],[94, 230, 235],[242, 250, 90] ];
let clr7         = [ [59, 0, 0],[255, 0, 0],[255, 149, 197],[255, 246, 205] ];
let clr8         = [ [140, 0, 0],[189, 32, 0],[250, 30, 14],[255, 190, 15] ];
let clr9         = [ [47, 196, 178],[18, 148, 127],[231, 20, 20],[241, 120, 8] ];


let clr1Num      = 100;
let clr1Cnt      = -1;
let clr1Blk;
let clrA         = [];

let whichColor;

// ************************************************************************************************************



// ************************************************************************************************************

function setup() {
  createCanvas(WIDTH, HEIGHT);
  noiseSeed(seed);

  // background(RISOCOLORS[R.random_int(1,10)].color);
  // background(cp1[2].color);
  // background(230, 195, 0)
  // background(250,231,218);
  // background(255);
  // strokeWeight(sw*M);
  // blendMode(OVERLAY)

  // let filter1 = new makeFilter();

  // tc = R.random_int(1, 20);

  whichColor = R.random_int(0, 9);

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

// whichClr = clr7;

setColorTables();

background(clrA[ floor( ((R.random_int(1,clr1Num)))%clrA.length ) ])


  // noStroke();
  // blendMode(OVERLAY);

  // tc = random(100,400);
  // tc = 200;
  // strokeWeight(sw*M)
  // ellipse(0,0,100)
  
}

function draw() {

 

  push();


  translate(WIDTH/2 , HEIGHT/2);
  rotate(PI/2);
  scale(sf*1.4)
  translate(tc*M, 0);
  
  rotate(PI/2);

  
  
  // var zoff = 0;

  noFill()
  

  
  for(let i = 1; i < 10; i+=ip){
    // stroke(RISOCOLORS[int(random(10))].color);
    // fill(cp1[int(random(4))].color);
    beginShape()
    // let c = clrA[ floor( ((frameCount)*cv)%clrA.length ) ]; 
    // let ca = map(es, 0, esp*200, 20, 255);
    // c.setAlpha(ca)
    // stroke(c);
    // strokeWeight(map(es, 0, esp*200, 0*M, sw*M));
  
  // zoff = 0;
    for(let a = 0; a < PI; a+=ai){
  
        const h = map(a, 0, PI, 0, 1);
        const r =
        map(1 / sin(a), -1, 1, 0, es * (i)) +
        (noise(zoff)*es)/(nin*M) +
        (noise(zoff)*(nd*M));
  
        let x = r * cos(a);
        let y = r * sin(a);
  
        let vw = map(x, r*cos(0), r*cos(PI), 0, PI); // variable WIDTH
        const lw = sin((h))*cos(vw)*ls*M; // line WIDTH
  
        zoff+=zoffi;
        // stroke(RISOCOLORS[int(random(10))].color);
        // line(WIDTH/2-lw,a, WIDTH/2+lw,a);
        // strokeWeight(1)
        // ellipse(x,y,es/i*M)
        // strokeWeight(map(es*a, 0, esp*200, 0*M, sw*M));
        let c = clrA[ floor( (noise(zoff)*cv)%clrA.length ) ]; 
        let ca = map(es, es0, esp*200, 20, 255);
        c.setAlpha(ca)
        stroke(c);
        strokeWeight(noise(zoff)*sw*M)
  
        vertex(x,y);
  
        // if((a*1000)%(5)==0){
        line(x,y, x, y+noise(zoff)*ls*M);
        // }
        
  
        push()
        fill(0);
        noStroke();
        // square(x,y, em/i);
        ellipse(x,y,(em*M)/i)
        pop()
        // noFill();
        // fill(0)
        // ellipse(x,y,5*M);
        // noFill();
        // ellipse(x,y,es/i*M)
        // strokeWeight(es/i*M);
        // line(x,y,x , y+ ll); 
  
  
        
  
        // point(x,y);
    }
    // zoff -= zoffi*PI/ai- zoffi2;

    endShape();
    }
  
    
    // vertex(WIDTH/2, 0);
    // vertex(-WIDTH/2, -HEIGHT/2);
    
  pop()
  


push()



  translate(WIDTH/2, HEIGHT/2);
  rotate(PI/2);
  scale(sf*1.4)
  translate(-tc*M, 0);
  
  rotate(-PI/2);

  noFill()
  

  // zoff = 0;
  for(let i = 1; i < 10; i+=ip){
  // stroke(RISOCOLORS[int(random(10))].color);
  // fill(cp1[int(random(4))].color);
  beginShape()
  // let c = clrA[ floor( ((frameCount)*cv)%clrA.length ) ]; 
  // let ca = map(es, 0, esp*200, 20, 255);
  // c.setAlpha(ca)
  // stroke(c);
  // strokeWeight(map(es, 0, esp*200, 0*M, sw*M));

  

  for(let a = 0; a < PI; a+=ai){

      const h = map(a, 0, PI, 0, 1);
      const r =
      map(1 / sin(a), -1, 1, 0, es * (i)) +
      (noise(zoff)*es)/(nin*M) +
      (noise(zoff)*(nd*M));

      let x = r * cos(a);
      let y = r * sin(a);

      let vw = map(x, r*cos(0), r*cos(PI), 0, PI); // variable WIDTH
      const lw = sin((h))*cos(vw)*ls*M; // line WIDTH

      zoff+=zoffi;
      // stroke(RISOCOLORS[int(random(10))].color);
      // line(WIDTH/2-lw,a, WIDTH/2+lw,a);
      // strokeWeight(1)
      // ellipse(x,y,es/i*M)
      // strokeWeight(map(es*a, 0, esp*200, 0*M, sw*M));
      let c = clrA[ floor( (noise(zoff)*cv)%clrA.length ) ]; 
      let ca = map(es, es0, esp*200, 20, 255);
      c.setAlpha(ca)
      stroke(c);
      strokeWeight(noise(zoff)*sw*M)

      vertex(x,y);

      // if((a*1000)%(5)==0){
      line(x,y, x, y+noise(zoff)*ls*M);
      // }
      

      push()
      fill(0);
      noStroke();
      // square(x,y, em/i);
      ellipse(x,y,(em*M)/i)
      pop()
      // noFill();
      // fill(0)
      // ellipse(x,y,5*M);
      // noFill();
      // ellipse(x,y,es/i*M)
      // strokeWeight(es/i*M);
      // line(x,y,x , y+ ll); 


      

      // point(x,y);
  }
  // zoff -= zoffi*PI/ai- zoffi2;
  endShape();
  }

  
  // vertex(WIDTH/2, 0);
  // vertex(-WIDTH/2, -HEIGHT/2);
  
pop()


  


  
  
  // tc+=1
  es+=(esp);

  if(frameCount == 200){
    // image(overAllTexture, 0, 0);
    //  noFill();
    //  stroke("#FFFFFF");
    //  strokeWeight(0);
    //  rect(0, 0, width, height);
     noLoop();
    //  redraw();
  }
  // noLoop();
}

// ************************************************************************************************************

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

function makeFilter() {
  randomSeed(seed);
  // noiseのフィルターをつくる\
  push()
  colorMode(HSB, 360, 100, 100, 100);
  drawingContext.shadowColor = color(0, 0, 5, 5);
  overAllTexture = createGraphics(windowWidth, windowHeight);
  overAllTexture.loadPixels();
  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
      overAllTexture.set(
        i,
        j,
        color(0, 0, 100, noise(i , j , (i * j) / 50) * random(10, 25))
      );
    }
  }
  overAllTexture.updatePixels();
  pop()
}

function nline(x, y, x1, y1){
  
  for(let i = y; i < y1; i+=10){
    let c = clrA[ floor( (noise(zoff)*cv)%clrA.length ) ];
    let ca = map(es, 0, esp*200, 20, 255);
    c.setAlpha(ca)
    fill(c);
    ellipse(x, i, noise(zoff2)*10);
    zoff2+=0.1;
  }
}

function customNoise(value) {
  let count = int((value % 12));
  let retValue = pow(sin(value), (1));
  return retValue;
}
