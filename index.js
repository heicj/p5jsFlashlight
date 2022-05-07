let width = 500;
let height = 500;
let r = 5;
let vectors = []
let cols = width/r;
let rows = height/r;
let zoff = 0;

function setup(){
  createCanvas(width,height)
  
  for(let i = 0; i < rows; i++){
    for(let j = 0; j < cols; j++){
      let v = createVector(i * r, j * r);
      vectors.push(v);
    }


  }

}

class mouseLight {
 constructor(x, y){
   this.x = x,
   this.y = y,
   this.diameter = 100
 }

 intersect(vector){
    let part1 = (this.x - vector.x) * (this.x - vector.x)
    let part2 = (this.y - vector.y) * (this.y - vector.y)
    let c1c2 =  Math.sqrt(part1 + part2)
    if(c1c2 == (this.diameter/2 + r) || c1c2 < this.diameter/2 + r){
      return true
    }else{
      return false
    }
  }
}

function draw(){
  background(0)

  let light = new mouseLight(mouseX, mouseY);


  for(let i = 0; i < vectors.length; i++){
    let vector = vectors[i];
    if(light.intersect(vector)){
      let n = noise(vector.x, vector.y, zoff)
      let r = floor(map(n, 0, 1, 0, 100))
      let g = floor(map(n, 0, 1, 100, 200))
      let b = floor(map(n, 0, 1, 0, 100))
      fill(r,g,b);
      circle(vector.x, vector.y, 10  * n);
    }
  }

  zoff += .01;
  noLoop()
}



