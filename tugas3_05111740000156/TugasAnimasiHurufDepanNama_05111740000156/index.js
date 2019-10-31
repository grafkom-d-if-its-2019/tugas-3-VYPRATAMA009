(function() {

  glUtils.SL.init({ callback: function() { main(); }});
  function main() {
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);
    
    

    // Mendefinisikan verteks-verteks
    
    var vertices = [
      // x, y       r, g, b
      //0.0, 0.5,     1.0, 1.0, 0.0,  // kuning
      //0.5, -0.5,    0.0, 1.0, 1.0,  // cyan
      //-0.5, -0.5,   1.0, 0.0, 1.0   // magenta

      //x   //y
      -0.8, +0.3,                                     1.0, 0.0, 0.0,
      -0.7, +0.3,                                     1.0, 0.0, 0.0,
      -0.7, +0.3,                                     1.0, 0.0, 0.0,
      -0.6, -0.2,                                     1.0, 0.0, 0.0,
      -0.6, -0.2,                                     1.0, 0.0, 0.0,
      -0.5, +0.3,                                     1.0, 0.0, 0.0, 
      -0.5, +0.3,                                     1.0, 0.0, 0.0,   
      -0.4, +0.3,                                     1.0, 0.0, 0.0,
      -0.4, +0.3,                                     1.0, 0.0, 0.0, 
      -0.53,-0.3,                                     1.0, 0.0, 0.0,
      -0.53,-0.3,                                     1.0, 0.0, 0.0,
      -0.6, -0.3,                                     1.0, 0.0, 0.0,
      -0.6, -0.3,                                     1.0, 0.0, 0.0,
      -0.67,-0.3,                                     1.0, 0.0, 0.0,
      -0.67, -0.3,                                    1.0, 0.0, 0.0,
      -0.8, +0.3,                                     1.0, 0.0, 0.0,
//
      -0.2, +0.3,                1.0, 1.0, 1.0,
      -0.1, +0.3,                1.0, 1.0, 1.0,
      -0.07, -0.3,               1.0, 1.0, 1.0,
      0.0, -0.2,                 1.0, 1.0, 1.0,
      -0.1, +0.3,                1.0, 1.0, 1.0,
      -0.07, -0.3,               1.0, 1.0, 1.0,
        0.0, -0.2,               1.0, 1.0, 1.0,
       -0.07, -0.3,              1.0, 1.0, 1.0,
       +0.07, -0.3,              1.0, 1.0, 1.0,
       0.0, -0.2,                1.0, 1.0, 1.0,
       +0.1,+0.3,                1.0, 1.0, 1.0,
       +0.07, -0.3,              1.0, 1.0, 1.0,
       +0.2,+0.3,                1.0, 1.0, 1.0,
       +0.1,+0.3,                1.0, 1.0, 1.0,
       +0.07, -0.3,              1.0, 1.0, 1.0
    ];

    // Membuat vertex buffer object (CPU Memory <==> GPU Memory)
    var vertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Membuat sambungan untuk attribute
    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vColor = gl.getAttribLocation(program, 'vColor');
    gl.vertexAttribPointer(
      vPosition,    // variabel yang memegang posisi attribute di shader
      2,            // jumlah elemen per atribut
      gl.FLOAT,     // tipe data atribut
      gl.FALSE, 
      5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks (overall) 
      0                                   // offset dari posisi elemen di array
    );
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE,
      5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);

    //membuat sambungan untuk uniform
    var thetaUniformLocation = gl.getUniformLocation(program, 'theta');
    var theta = 0; 
    var scaleXUniformLocation = gl.getUniformLocation(program, 'scaleX');
    var scaleX = 1.0; 
    var scaleYUniformLocation = gl.getUniformLocation(program, 'scaleY');
  
    var translationLoc = gl.getUniformLocation(program, 'translasi');   
    var melebar=1.0;

    function render()
    {
      
      if(scaleX >= 1.0) melebar = -1.0;
      else if(scaleX <= -1.0) melebar = 1.0;
      scaleX += 0.0156 * melebar;
      theta += 0.0156;
      
      gl.uniform1f(translationLoc,0.0);
      gl.uniform1f(thetaUniformLocation,0.0);
      gl.uniform1f(scaleXUniformLocation,scaleX);
      gl.uniform1f(scaleYUniformLocation,1.0);
      
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 16, 15);
      
      gl.uniform1f(thetaUniformLocation,theta);
      gl.uniform1f(scaleXUniformLocation,1.0);
      gl.uniform1f(scaleYUniformLocation,1.0);
      gl.uniform1f(translationLoc,0.5);
      gl.drawArrays(gl.LINES, 0, 16);

      
      
      
      
      requestAnimationFrame(render);
    }
    render();
  }
})();