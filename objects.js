const vertexSize = 4;



// Main parent class for all subclass objects
class Object{

  constructor(rx, ry, rz) {
    this.rotationCenter = [rx, ry, rz];
    this.rotation = [0,0,0];

  }







  draw(type){ // can be "frame" or "solid"
    if (type == "frame") {
      // Draws lines in between the vertices
      for(let j = 0; j < this.edges.length; j++){
        let vertex1 = this.vertices[this.edges[j][0]];
        let vertex2 = this.vertices[this.edges[j][1]];
        ctx.beginPath();
        ctx.moveTo(vertex1[0], vertex1[1]);
        ctx.lineTo(vertex2[0], vertex2[1]);
        ctx.stroke();
      }


        // draw vertices
        for (var i = 0; i < this.vertices.length; i++) {
          let vertex = this.vertices[i];
          ctx.beginPath();
          ctx.fillStyle = "blue";
          ctx.arc(vertex[0], vertex[1], vertexSize, 0, 2 * Math.PI);
          ctx.fill();
        }
      }else if(type == "solid"){
        console.log(this.vertices);
        for (var i = 0; i < this.faces.length; i++) {
          let eindex = this.faces[i]; // indexs of the edges invloved in the face
          let edge1 = this.edges[eindex[0]]; // only need 2 edges to really draw the quad
          let edge2 = this.edges[eindex[2]];
          let points = [this.vertices[edge1[0]], this.vertices[edge1[1]], this.vertices[edge2[0]], this.vertices[edge2[1]]];
          drawQuadrilateral(points, "gray");
        }
    }else{
      console.log("error");
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

  highlightVertice(x, y){
    // take the click point and establish the search radius based on the radius of the vertex drawn
    //uses a square around the point with a length of the vertex size
    let rbound = x - vertexSize;
    let lbound = x + vertexSize;
    let bbound = y - vertexSize;
    let ubound = y + vertexSize;

    console.log([x,y]);
    for (var i = 0; i < this.vertices.length; i++) {
      let vx = this.vertices[i][0];
      let vy = this.vertices[i][1];
      console.log([vx,vy]);
      if(x === vx && y === vy){
        this.verticies[i][3] = true;
        console.log(this.verticies[i][3]);
      }
    }
  }



}
