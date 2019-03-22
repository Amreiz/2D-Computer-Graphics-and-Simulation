                                                                    // SOURCES FOR ALL REFERENCED CODE
// rotateEarth function line 144 in main.js - https://stackoverflow.com/questions/4422293/rotate-an-image-around-its-center-in-canvas
// squareGravity function line 36 in object.js - https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Collision_detection
// collideBall function line 196 in main.js - https://gist.github.com/christopher4lis/f9ccb589ee8ecf751481f05a8e59b1dc
// rotateCollision line 255 function line 196 in main.js - https://gist.github.com/christopher4lis/f9ccb589ee8ecf751481f05a8e59b1dc
// resolveCollision function line 269 in main.js - https://gist.github.com/christopher4lis/f9ccb589ee8ecf751481f05a8e59b1dc
// collisionSquare function line 116 in main.js - https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detection
function onLoad() {
    var mainCanvas, mainContext, origin, robot, sun, square, square1;

    var timeBefore = Date.now();

    // can translate robots position
    var robotPosition = new Vector(0, 0, 1);

    // sets every instance of the robot to the identity
    var identity = Matrix.createIdentity();

    // this function will initialise our variables
    function initialiseCanvasContext() {
        mainCanvas = document.getElementById('mainCanvas');
        // if it couldn't be found
        if(!mainCanvas)
        {
            // make a message square pop up with the error.
            alert('Error: I cannot find the canvas element!');
            return;
        }
        // Get the 2D canvas context.
        mainContext = mainCanvas.getContext('2d');
        if(!mainContext) {
            alert('Error: failed to get context!');
            return;
        }

        secondaryCanvas = document.getElementById('secondaryCanvas');
        // if it couldn't be found
        if(!secondaryCanvas)
        {
            // make a message square pop up with the error.
            alert('Error: I cannot find the canvas element!');
            return;
        }
        // Get the 2D canvas context.
        secondaryContext = secondaryCanvas.getContext('2d');
        if(!secondaryContext) {
            alert('Error: failed to get context!');
            return;
        }
        
        // first parameter is robot position second parameter is angle 3 parameter is scale
        robot = new Robot(robotPosition, 5 * Math.PI / 3, new Vector(2,2));
        worldMatrix = Matrix.createTranslation(new Vector(mainCanvas.width * 0.5, mainCanvas.height * 0.5, 1));
        worldMatrix.setTransform(mainContext);

        // Sets the origin of the robot object to the center of the mainCanvas
        origin = new Vector(mainCanvas.width * 0.5, mainCanvas.height * 0.5,1);
        originNode = new SceneGraph(identity);
        originNode.addChild(robot.getRootNode());

        sun = [];
        sun.push(new Sun(origin));
        sunmove = Matrix.createTranslation(origin);
        sunmove.setTransform(mainContext);
        
        square = new Object();
        square.square(-350,-200,60,60,'#666666', 0.98, 5, 4, 0.73);
        square1 = new Object();
        square1.square(200,-200,85,85,'#b68eff', 0.98, 5, 4, 0.7);

        // new Circle objects for collission detection
        circle1 = new Circle(250, -240, 25, '#b68eff');
        circle2 = new Circle(mouse.x, mouse.y, 30, 'orange');


        //array to hold elastic collision balls
        collidingBalls = [];

        // part of the resolveCollision function 
        // spawns the amount of balls
        for (let i = 0; i < 100; i++)
        {
            const radius = 10;
            const colour = 'orange';
            let x = randomNumRange(radius, secondaryCanvas.width - radius);
            let y = randomNumRange(radius, secondaryCanvas.height - radius);
            if(i !== 0)
            {
                for(j = 0; j < collidingBalls.length; j++) 
                {
                    // uses distance function to make sure balls are not overlapping
                    if(Distance(x, y, collidingBalls[j].x,collidingBalls[j].y) - radius * 2 < 0)
                    {
                        x = randomNumRange(radius, secondaryCanvas.width - radius);
                        y = randomNumRange(radius, secondaryCanvas.height - radius);

                        j = -1;
                    }
                }
            }
            // pushes balls that do not overlap and spawn outside of canvas into the array
            collidingBalls.push(new collideBall(x, y, radius, colour));
        }

        // just to check if the balls are colliding
        //console.log(collidingBalls);
    }


    // generates a random number based on parameter range
    function randomNumRange(min, max) 
    {
        return Math.random() * (max - min) + min;
    }

    // generates a response when both squares declared collide
    function collisionSquare()
    {
        var dX = square1.directionX - square.directionX;
        var dY = square1.directionY - square.directionY;
        var angle = Math.atan2(dY, dX) * 180 / Math.PI;
        
        if(angle < 0) angle += 360;
        
        if (square.x < square1.x + square1.width &&
            square.x + square.width > square1.x &&
            square.y < square1.y + square1.height &&
            square.height + square.y > square1.y) 
            {
            // Collision Detected
            square.setColour('#ff00f6');
            
            // flips squares in the x and y axis if collision in axis alligned bounding box is detected
            square.directionX = - square.directionX;
            square.directionY = - square.directionY;
            
            square1.directionX = - square1.directionX;
            square1.directionY = - square1.directionY;
        }
        else
        {
            square.setColour('#666666');
        }
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

    // function to draw circles "ONLY MOUSE FOLLOWING CIRCLE"
    function Circle(x, y, radius, colour) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.colour = colour;

        // update function calls draw function ---- to be used later at bottom of page
        this.update = function() {
            this.draw();
        };

        this.draw = function() {
            mainContext.beginPath();
            mainContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            mainContext.fillStyle = this.colour;
            mainContext.fill();
            mainContext.closePath();
        };
    }

    // use pythagoras thereom to detect distance before collision of 2 circles
    function Distance(x1, y1, x2, y2) 
    {
        let distanceX = x2 - x1;
        let distanceY = y2 - y1;

        return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
    }

    let circle1;
    let circle2;
    let collidingBalls;

    let mouse = 
    {
        x: 0,
        y: 0
    };

    // centers the circle on the mouse
    addEventListener("mousemove", function(event)
    {
        // take into account the centered origin to prevent off mouse bug
        mouse.x = event.clientX - 400;
        mouse.y = event.clientY - 380;
    });

    // draws the ball and determines collision response depending on distance between two balls
    function collideBall(x, y, radius, colour)
    {
        this.x = x;
        this.y = y;
        this.velocity = 
        {
            x: Math.random() - 0.25 * 5,
            y: Math.random() - 0.25 * 5
        };


        this.radius = radius;
        this.colour = colour;


        this.mass = 1;

        this.update = collidingBalls => 
        {
            this.draw();

            for(let i = 0; i < collidingBalls.length; i++)
            {
                if(this === collidingBalls[i]) continue;

                if(Distance(this.x, this.y, collidingBalls[i].x,collidingBalls[i].y) - this.radius * 2 < 0)
                {
                    resolveCollision(this, collidingBalls[i]);
                }
            }

            if(this.x - this.radius <= 0 || this.x + this.radius >= secondaryCanvas.width)
            {
                this.velocity.x = -this.velocity.x;
            }

            if(this.y - this.radius <= 0 || this.y + this.radius >= secondaryCanvas.height)
            {
                this.velocity.y = -this.velocity.y;
            }

            this.x += this.velocity.x;
            this.y += this.velocity.y;
        }

        this.draw = () => 
        {
            secondaryContext.beginPath();
            secondaryContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            secondaryContext.strokeStyle = this.colour;
            secondaryContext.stroke();
            secondaryContext.closePath();
        };
    }

    // rotates coordinates for subsequent velocities by using angle of collision between 2 circles 

    function rotateCollision(velocity, angle) 
    {
        const rotatedVelocities = 
        {
            x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
            y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
        };
    
        return rotatedVelocities;
    }

    // changes x and y velocities of the colliding balls after running through the elastic and inelastic collisions

    function resolveCollision(collidingBalls, othercollidingBalls) {

        // difference in velocity in the x axis between the 2 balls in question
        const xVelocity = collidingBalls.velocity.x - othercollidingBalls.velocity.x;

        //difference in velocity in the y axis between the 2 balls in question
        const yVelocity = collidingBalls.velocity.y - othercollidingBalls.velocity.y;
        
        //difference in distance in the x axis between the 2 balls in question
        const xDistance = othercollidingBalls.x - collidingBalls.x;

        //difference in distance in the y axis between the 2 balls in question
        const yDistance = othercollidingBalls.y - collidingBalls.y;
    
        // Prevents colliding balls from overlapping
        if (xVelocity * xDistance + yVelocity * yDistance >= 0) {
    
            // Grab angle between the two colliding collidingBalls to use in 1D equation
            const angle = -Math.atan2(othercollidingBalls.y - collidingBalls.y, othercollidingBalls.x - collidingBalls.x);
    
            // Store mass in var for better readability in collision equation
            const m1 = collidingBalls.mass;
            const m2 = othercollidingBalls.mass;
    
            // Velocity before the 1D equation
            const u1 = rotateCollision(collidingBalls.velocity, angle);
            const u2 = rotateCollision(othercollidingBalls.velocity, angle);
    
            // Velocity after 1D collision equation using mass, set different numbers to alter collision speed
            const v1 = 
            { 
                x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), 
                y: u1.y 
            };
            const v2 = 
            { 
                x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2),
                y: u2.y 
            };
    
            // Final velocity after rotating axis back to original location
            const vFinal1 = rotateCollision(v1, -angle);
            const vFinal2 = rotateCollision(v2, -angle);
    
            // Swap collidingBalls velocities for realistic bounce effect
            collidingBalls.velocity.x = vFinal1.x;
            collidingBalls.velocity.y = vFinal1.y;
    
            othercollidingBalls.velocity.x = vFinal2.x;
            othercollidingBalls.velocity.y = vFinal2.y;
        }
    }

    // this function will actually draw on the canvas
    function draw()
    {
        collisionSquare();

        // time now is ahead of timebefore everytime its refreshed 
        var timeNow = Date.now();
        var deltaTime = (timeNow - timeBefore) / 800;
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

        // clears the secondary canvas to fix trailing bug
        secondaryContext.clearRect(0, 0, secondaryCanvas.width, secondaryCanvas.height);
        
        secondaryContext.fillStyle = "#222323";
        // fill the canvas with black
        secondaryContext.fillRect(0,0,secondaryCanvas.width, secondaryCanvas.height);
        // choose your line width
        secondaryContext.lineWidth = 5;
        // set the line join
        secondaryContext.lineJoin = 'round';
        
        
        // functions in main called to draw on the canvas

        rotateEarth();

        // this for loop will draw as many instances as there are stored in the array
        for(i = 0; i < sun.length; i+=1)
        {
            //robot[i].draw(mainContext,worldMatrix);
            sun[i].draw(mainContext,worldMatrix, deltaTime);
        }

        // draws circle collision detection
        circle1.update();
        circle2.x = mouse.x;
        circle2.y = mouse.y;
        circle2.update();

        // if the distance between the mouse circle and the antenna circle overlap, collision detected
        if(Distance(circle1.x, circle1.y, circle2.x, circle2.y) < circle1.radius + circle2.radius)
        {
            circle1.colour = '#ffce84';
        }

        // revert back to original colour
        else
        {
            circle1.colour = '#b68eff';
        }

        //console.log(Distance(circle1.x, circle1.y, circle2.x, circle2.y));        

        // calls all balls from the array and draws them using the update function
        collidingBalls.forEach(collideBall => { collideBall.update(collidingBalls)

        });

        //draws based on origin
        originNode.draw(mainContext, worldMatrix);

        //draws the axis alligned squares
        square.drawSquare(mainContext);
        square1.drawSquare(mainContext);

        // draws the animations
        requestAnimationFrame(draw);
        // sets the last time before previous frame to current frame to 
        timeBefore = timeNow;
    }

    initialiseCanvasContext();

    draw();
}
window.addEventListener('load',onLoad, false);