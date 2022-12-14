var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var objects = [];


class Ellipse extends Object{
  constructor(x, y, z, r, verticeDensity){ // verticieDensity defined the number of points along each circle and how manny circles there are
    // x^2 + y^2 = 20
    // +/-√20 - x^2 = y
    //this.vertices = [[x, y, z ], [x, y, z+d], [x, y+h, z ], [x, y+h, z+d], [x+w, y, z ], [x+w, y, z+d], [x+w, y+h, z ], [x+w, y+h, z+d]];
    let vertices = [];
    let edges = [];
    let angleSeperation = (360/verticeDensity); // calculates how much each point is to be seperated to be equally distributed
    super(x, y, z);

    // Establishes the main circle for rotation
    for (var i = 0; i < verticeDensity; i++) {
      var rot = angleSeperation * i;
      var point = rotatePoint2dSpace(x, y, x, y - r, rot);
      point.push(0); // z value
      vertices.push(point);

      if (i === verticeDensity - 1) {
        edges.push([0, i])
      }else{
        edges.push([i, i + 1]);
      }
    }

    // Estblished a second circle on the z axis for each
    var dimCircle = [];
    for (var j = 0; j < verticeDensity; j++) {
      // z is the new x and x is the new y in this dimension
      // take one half of the circle and rotate it
      if (j < verticeDensity / 2 + 1) {
        var opIndex = verticeDensity - j;
        if(opIndex % verticeDensity >= 0){  // Reset opIndex to the overflow if it's greater than the number of verticies
          opIndex = opIndex % verticeDensity;
        }

        for (var i = 0; i < verticeDensity; i++) {
          var rot = angleSeperation * i;
          var radius = (vertices[j][0] - vertices[opIndex][0]) / 2;

          var y = vertices[j][1];


          let center = [z, x];
          //console.log(radius);
          let rotPoint = [vertices[j][2], vertices[0][0] + radius]
          //console.log(j+ ", " + opIndex + ":   rotNumber: " + i + ", rot: " + rot + ", ||" + radius);
          //console.log("center : ("+center[0] + " , " +center[1] + ") , rotpoint: ("  + rotPoint[0] + " , "  +(rotPoint[1]) + ")");

          var point = rotatePoint2dSpace(center[0], center[1], rotPoint[0], rotPoint[1], rot);
          //console.log(point);
          var dPoint = [point[1], y, point[0]]; // x, y, z
          //console.log(dPoint);
          vertices.push(dPoint);

          // Appends the edges for each circle   i === verticeDensity - 1

          let currentIndex = j * (verticeDensity) + i;
          // Horizontal edges
          if (currentIndex === verticeDensity * (j + 1) - 1) {
            edges.push([j * (verticeDensity), currentIndex])
          }else{
            edges.push([currentIndex, currentIndex + 1]);
          }

          // Vertical edges
          if (j !== 0 ) {
            edges.push([currentIndex, currentIndex + verticeDensity]);
          }
        }


      }
    }


    for (var i = 0; i < vertices.length; i++) {
      vertices[i].push(false); // keeps track of verticie selection status
    }

    this.vertices = vertices;
    this.edges = edges;




  }


}








class Cuboid extends Object{
// some things taken from https://www.khanacademy.org/computing/computer-programming/programming-games-visualizations/programming-3d-shapes/a/generating-3d-shapes
  constructor(x, y, z, w, h, d){
      super(x + w / 2, y + h / 2, z + d / 2);
      this.vertices = [[x, y, z, false ], [x, y, z+d, false], [x, y+h, z, false], [x, y+h, z+d, false], [x+w, y, z, false], [x+w, y, z+d, false], [x+w, y+h, z, false], [x+w, y+h, z+d, false]];
      // defines the 2 verticies that make up an edge using the index vaule
      this.edges = [[0, 1], [1, 3], [3, 2], [2, 0], [4, 5], [5, 7], [7, 6], [6, 4], [0, 4], [1, 5], [2, 6], [3, 7]]; // edges are defined with 2 verticies
      this.faces = [[0,1,2,3], [4,5,6,7], [9, 0, 8, 0], [11,0,10,0], [9, 0, 11, 0], [8, 0, 10,0]]; // faces are defined with 4 edges
   }
}



//x, y, z, r, verticeDensity
var sphere = new Ellipse(200,200,0, 150,20);
console.log(sphere);
sphere.draw("frame");
objects.push(sphere);




var box = new Cuboid(230,230,0,100,100,100);
box.rotationCenter = sphere.rotationCenter;

box.draw("frame");
objects.push(box);



// Slider Handling
document.getElementById("x").oninput = function() {
    handleSliders("x", 0);

};
document.getElementById("y").oninput = function() {
    handleSliders("y", 1);
};
document.getElementById("z").oninput = function() {
    handleSliders("z", 2);
};

function handleSliders(axis, number){
  let value = document.getElementById(axis).value;
  let theta = value - sphere.rotation[number];
  sphere.rotate(axis, theta);

  let theta2 = value - box.rotation[number];
  box.rotate(axis, theta2);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //sphere.draw("solid");
  box.draw("solid");
  box.draw("frame");


}

function convertAngle(returnType, input){
  if (returnType === "radians") {
    return input * (Math.PI / 180);
  }else{
    return input * (180 / Math.PI);
  }
}
function rotatePoint2dSpace(cx, cy, x, y, degrees){
  let cos = Math.cos(convertAngle("radians", degrees));
  let sin = Math.sin(convertAngle("radians", degrees));
  let point = [0, 0];
  point[0] = (x - cx) * cos - (y - cy) * sin + cx;
  point[1] = (y - cy) * cos + (x - cx) * sin + cy;
  return point;
}
function drawQuadrilateral(points, fillStyle){ // where points is an array of 4 points

  let point1 = points[0];
  let point2 = points[1];
  let point3 = points[2];
  let point4 = points[3];

  ctx.beginPath();
  ctx.moveTo(point1[0], point1[1]);
  ctx.lineTo(point2[0], point2[1]);
  ctx.lineTo(point3[0], point3[1]);
  ctx.lineTo(point4[0], point4[1]);
  ctx.lineTo(point1[0], point1[1]);
  ctx.fillStyle = fillStyle;
  ctx.fill();
}

function sortPoints(a, b){


}
