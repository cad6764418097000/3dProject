
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

class Cube{
// some things taken from https://www.khanacademy.org/computing/computer-programming/programming-games-visualizations/programming-3d-shapes/a/generating-3d-shapes
  constructor(x, y, z, w, h, d){
    this.vertecies = [[x, y, z ], [x, y, z+d], [x, y+h, z ], [x, y+h, z+d], [x+w, y, z ], [x+w, y, z+d], [x+w, y+h, z ], [x+w, y+h, z+d]];
    // defines the 2 verticies that make up an edge using the index vaule
    this.edges = [[0, 1], [1, 3], [3, 2], [2, 0], [4, 5], [5, 7], [7, 6], [6, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
   }



  draw(){
    for(let i = 0; i < this.edges.length; i++;){
      let vertex1 = this.vertices[this.edges[i][0]];
      let vertex2 = this.vertices[this.edges[i][1]];
      ctx.beginPath();
      ctx.moveTo(vertex, topY);
      ctx.lineTo(rightX, topY);
      ctx.stroke();
    }
  }

/*
  ctx.beginPath();
  ctx.moveTo(leftX, topY);
  ctx.lineTo(rightX, topY);
  ctx.moveTo(leftX, topY);
  ctx.lineTo(leftX, bottomY);

  ctx.stroke();



  ctx.beginPath();
  ctx.rect(leftX, topY, size, size);
  ctx.stroke();

  drawSide(200, 200, 20);
  */
}
var cube = new Cube(100,100,100, 100, 100,100);
cube.draw();
