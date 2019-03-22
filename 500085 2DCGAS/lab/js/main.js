// the window load event handler
function onLoad() {
    var mainCanvas, mainContext, origin, robot, sun, starSprite;
    // this function will initialise our variables
    function initialiseCanvasContext() {
        mainCanvas = document.getElementById('mainCanvas');
        // if it couldn't be found
        if(!mainCanvas)
        {
            // make a message box pop up with the error.
            alert('Error: I cannot find the canvas element!');
            return;
        }
        // Get the 2D canvas context.
        mainContext = mainCanvas.getContext('2d');
        if(!mainContext) {
            alert('Error: failed to get context!');
            return;
        }
        // Sets the origin of the robot object to the center of the canvas
        origin = new Vector(mainCanvas.width * 0.5, mainCanvas.height * 0.5,1);
        robot = [];
        robot.push(new Robot(origin));
        worldMatrix = Matrix.createTranslation(origin);
        worldMatrix.setTransform(mainContext);
        
        sun = [];
        sun.push(new Sun(origin));
        sunmove = Matrix.createTranslation(origin);
        sunmove.setTransform(mainContext);

        starSprite = new Star(worldMatrix, 'images/star.png', 0 , 0 , 40, 40, 0, 0, 40, 40);
    }

    var friction = 0.8;
    var speedX = 5;
    var speedY = 2;
    var planetBody = {x:-300 , y:-200 };

    function planet() {
        
    // main body of the planet
        
    mainContext.fillStyle = "#b72c2c";
    mainContext.strokeStyle = "#b72c2c";
    mainContext.beginPath();
    mainContext.moveTo(planetBody.x,planetBody.y);
    mainContext.lineTo(planetBody.x + 60,planetBody.y);
    mainContext.lineTo(planetBody.x - 60, planetBody.y);
    mainContext.closePath();
    mainContext.stroke();
    mainContext.fill();
    
    // the rings of the planet

    mainContext.fillStyle = "#2a79f9";
    mainContext.beginPath();
    mainContext.arc(planetBody.x,planetBody.y,15,0,Math.PI*2,true);
    mainContext.closePath();
    mainContext.fill();

    if (planetBody.x + 15 >= mainCanvas.width - 400){
        speedX = -(speedX) * friction;
    }

    else if (planetBody.x - 15 <= - 400){
        speedX = -speedX;
    }

    if (planetBody.y + 30 > mainCanvas.height - 300){
        speedY = -speedY  ;
    }

    else if (planetBody.y - 30 < - 300){
        speedY = -speedY;
    }
           
    planetBody.x += speedX;
    planetBody.y += speedY;

    }

    // This will load in the image and rotate it on its center point

    function rotateEarth() {
        var image = new Image();
        image.src = 'images/earth.png';
        var time = new Date();
        mainContext.save();
        mainContext.translate(0, 500);
        mainContext.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds());
        mainContext.drawImage(image, -429.83, -427.17, image.width / 3, image.height / 3);
        mainContext.restore();
    }

    // this function will actually draw on the canvas
    function draw() {
        // this variable is for the for loop
        var i;
        // set the draw fill style colour to black
        mainContext.fillStyle = "#222323";
        // fill the canvas with black
        mainContext.fillRect(-400,-300,mainCanvas.width, mainCanvas.height);
        // choose your line width
        mainContext.lineWidth = 5;
        // set the line join
        mainContext.lineJoin = 'round';
        planet();
        rotateEarth();

        // this for loop will draw as many robot as there are stored in the array
        for(i = 0; i < robot.length; i+=1) {
            robot[i].draw(mainContext,worldMatrix);
            sun[i].draw(mainContext,worldMatrix);
        }
        
        // draws the animations by each frame
        requestAnimationFrame(draw);
    }

    initialiseCanvasContext();

    //sets the framerate of the satellite to 30 fps
    setInterval(planet, 30);
    draw();
}
window.addEventListener('load',onLoad, false);


