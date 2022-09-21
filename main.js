
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");




class Ellipse{
  constructor(x, y, z, w, h, d, verticieDensity){ // verticieDensity defined the number of points along each circle and how manny circles there are
    
    this.vertices = [[x, y, z ], [x, y, z+d], [x, y+h, z ], [x, y+h, z+d], [x+w, y, z ], [x+w, y, z+d], [x+w, y+h, z ], [x+w, y+h, z+d]];
    this.edges = [[0, 1], [1, 3], [3, 2], [2, 0], [4, 5], [5, 7], [7, 6], [6, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
  }



  draw(vertices = false){
    // Draws lines in between the vertices
    for(let j = 0; j < this.edges.length; j++){
      let vertex1 = this.vertices[this.edges[j][0]];
      let vertex2 = this.vertices[this.edges[j][1]];
      ctx.beginPath();
      ctx.moveTo(vertex1[0], vertex1[1]);
      ctx.lineTo(vertex2[0], vertex2[1]);
      ctx.stroke();
    }
}

}
class Cuboid{
// some things taken from https://www.khanacademy.org/computing/computer-programming/programming-games-visualizations/programming-3d-shapes/a/generating-3d-shapes
  constructor(x, y, z, w, h, d){
      this.vertices = [[x, y, z ], [x, y, z+d], [x, y+h, z ], [x, y+h, z+d], [x+w, y, z ], [x+w, y, z+d], [x+w, y+h, z ], [x+w, y+h, z+d]];
      // defines the 2 verticies that make up an edge using the index vaule
      this.edges = [[0, 1], [1, 3], [3, 2], [2, 0], [4, 5], [5, 7], [7, 6], [6, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
      this.rotation = [0,0,0];
      // Set the rotation center to the objects center
      this.rotationCenter = [x + w/2, y + h/2, z + d/2];
   }



  draw(vertices = false){
    // Draws lines in between the vertices
    for(let j = 0; j < this.edges.length; j++){
      let vertex1 = this.vertices[this.edges[j][0]];
      let vertex2 = this.vertices[this.edges[j][1]];
      ctx.beginPath();
      ctx.moveTo(vertex1[0], vertex1[1]);
      ctx.lineTo(vertex2[0], vertex2[1]);
      ctx.stroke();
    }

    if (vertices) {
      // draw vertices
      for (var i = 0; i < this.vertices.length; i++) {
        let vertex = this.vertices[i];
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.arc(vertex[0], vertex[1], 3, 0, 2 * Math.PI);
        ctx.fill();
      }


    }
  }
    rotate(axis, theta){
      var sin = Math.sin(convertAngle("radians", theta));
      var cos = Math.cos(convertAngle("radians", theta));

      // Rotation coordinates
      let cx = this.rotationCenter[0];
      let cy = this.rotationCenter[1];
      let cz = this.rotationCenter[2];


      for (var i = 0; i < this.vertices.length; i++) {
        let vertex = this.vertices[i];
        // Realations between center for formula of rotation around a point later
        /*
        x1 = (x0 – xc)cos(θ) – (y0 – yc)sin(θ) + xc
        y1 = (x0 – xc)sin(θ) + (y0 – yc)cos(θ) + yc
        */
        var x = vertex[0] - cx;
        var y = vertex[1] - cy;
        var z = vertex[2] - cz;


        //console.log(vertex);

        if (axis === "x") {
          vertex[1] = y * cos - z * sin + cy;
          vertex[2] = z * cos + y * sin + cz;

          this.rotation[0] += theta / this.vertices.length; // Counter the loop
        }else if(axis === "y"){
          vertex[0] = x * cos + z * sin + cx;
          vertex[2] = z * cos - x * sin + cz;
          this.rotation[1] += theta / this.vertices.length;
        }else if(axis === "z"){
          vertex[0] = x * cos - y * sin + cx;
          vertex[1] = y * cos + x * sin + cy;
          this.rotation[2] += theta / this.vertices.length;
        }
        //console.log(vertex);
        this.vertices[i] = vertex;
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


var sphere = new Ellipse(100,100,100,100,100,100);
sphere.draw(true);




var box = new Cuboid(230,230,230,100,100,100);


box.draw(true);




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
  let theta = value - box.rotation[number];
  box.rotate(axis, theta);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  box.draw(true);

}

function convertAngle(returnType, input){
  if (returnType === "radians") {
    return input * (Math.PI / 180);
  }else{
    return input * (180 / Math.PI);
  }
}
