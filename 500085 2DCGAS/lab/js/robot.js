class Robot {
    constructor(pPosition) {
        this.setPosition(pPosition);
    }
    getPosition() {
        return this.mPosition;
    }

    setPosition(pPosition) {
        this.mPosition = pPosition;
    }


    drawAntenna(pContext) {
        pContext.fillStyle = '#b5b5b5';
        pContext.strokeStyle = '#000000';

        var x1 = 0;
        var y1 = 0;
        var x2 = 15;
        var y2 = -75;

        pContext.beginPath();
        pContext.moveTo(x1,y1);
        pContext.lineTo(x2,y1);
        pContext.lineTo(x2,y2);
        pContext.lineTo(-x2,y2);
        pContext.lineTo(-x2,y1);
        pContext.closePath();
        pContext.fill();
        pContext.stroke();
        
        // the circle for the antenna

        pContext.beginPath();
        pContext.fillStyle = '#b5b5b5'
        pContext.strokeStyle = '#000000';
        pContext.arc(x1, y2, 35, y1, 2 * Math.PI , false);
        pContext.closePath();
        pContext.fill();
        pContext.stroke();

    }

    moveAntenna(pContext, worldMatrix) {
        var translate = Matrix.createTranslation(new Vector(0,0,1));
        var transform = worldMatrix.multiply(translate);
        transform.setTransform(pContext);
        this.drawAntenna(pContext);
        worldMatrix.setTransform(pContext);
    }

    drawMouth(pContext) {
        pContext.fillStyle = '#e0e0e0';
        pContext.strokeStyle = '#000000';

        var x1 = 0;
        var y1 = 0;
        var x2 = 50;
        var y2 = -100;

        pContext.beginPath();
        pContext.moveTo(x1,y1);
        pContext.lineTo(x1,y2);
        pContext.lineTo(x2,y2);
        pContext.lineTo(x2,y1);
        pContext.closePath();
        pContext.fill();
        pContext.stroke();
        
    }

    moveMouth(pContext, worldMatrix) {
        var translate = Matrix.createTranslation(new Vector(-25,200,1));
        var transform = worldMatrix.multiply(translate);
        transform.setTransform(pContext);
        this.drawMouth(pContext);
        worldMatrix.setTransform(pContext);
    }

    drawEyes(pContext) {
        pContext.fillStyle = '#a30000';
        pContext.strokeStyle = '#000000';
        
        var x1 = 0;
        var y1 = 0;
        var x2 = -75;
        var y2 = 75;

        pContext.beginPath();
        pContext.moveTo(x1,y1);
        pContext.lineTo(x2,y1);
        pContext.lineTo(x2,y2);
        pContext.lineTo(x1,y2);
        pContext.closePath();
        pContext.fill();
        pContext.stroke();
    }

    // This is the eye to the left
    moveEyes(pContext, worldMatrix) {
        var translate = Matrix.createTranslation(new Vector(-50,100,1));
        var transform = worldMatrix.multiply(translate);
        transform.setTransform(pContext);
        this.drawEyes(pContext);
        worldMatrix.setTransform(pContext);
    }

    moveEyes2(pContext, worldMatrix) {
        var translate = Matrix.createTranslation(new Vector(125,100,1));
        var transform = worldMatrix.multiply(translate);
        transform.setTransform(pContext);
        this.drawEyes(pContext);
        worldMatrix.setTransform(pContext);
    }

    drawArms(pContext) {
        pContext.fillStyle = '#b5b5b5';
        pContext.strokeStyle = '#000000';
        
        var x1 = 0;
        var y1 = 0;
        var x2 = 50;
        var y2 = 150;

        pContext.beginPath();
        pContext.moveTo(x1,y1);
        pContext.lineTo(x2,y1);
        pContext.lineTo(x2,y2);
        pContext.lineTo(x1,y2);
        pContext.closePath();
        pContext.fill();
        pContext.stroke();

        pContext.fillStyle = '#b5b5b5';
        pContext.strokeStyle = '#000000';
        
        var x1 = 0;
        var y1 = 0;
        var x2 = 50;
        var y2 = 150;

        pContext.beginPath();
        pContext.moveTo(x1,y1);
        pContext.lineTo(x2,y1);
        pContext.lineTo(x2,y2);
        pContext.lineTo(x1,y2);
        pContext.closePath();
        pContext.fill();
        pContext.stroke();
    }

    // This is the eye to the left
    moveArms(pContext, worldMatrix) {
        var translate = Matrix.createTranslation(new Vector(200,200,1));
        var transform = worldMatrix.multiply(translate);
        transform.setTransform(pContext);
        this.drawArms(pContext);
        worldMatrix.setTransform(pContext);
    }

    moveArms2(pContext, worldMatrix) {
        var translate = Matrix.createTranslation(new Vector(-250,200,1));
        var transform = worldMatrix.multiply(translate);
        transform.setTransform(pContext);
        this.drawArms(pContext);
        worldMatrix.setTransform(pContext);
    }

    drawHead(pContext) {
        pContext.fillStyle = '#b5b5b5';
        pContext.strokeStyle = '#000000';

        var x1 = 0;
        var y1 = 0;
        var x2 = 150;
        var y2 = 200;

        pContext.beginPath();
        pContext.moveTo(x1,y1);         // Center of the top line on the head.
        pContext.lineTo(x2,y1);       // draw the line to the right
        pContext.lineTo(x2,y2);     // draw the line to the bottom
        pContext.lineTo(-x2,y2);    // draw the line to the left
        pContext.lineTo(-x2,y1);      // draw the line to the top
        pContext.closePath();
        pContext.fill();
        pContext.stroke();

    }

    moveHead(pContext, worldMatrix) {
        var translate = Matrix.createTranslation(new Vector(0,0,1));
        var transform = worldMatrix.multiply(translate);
        transform.setTransform(pContext);
        this.drawHead(pContext);
        worldMatrix.setTransform(pContext);
    }

    drawBody(pContext) {
        pContext.fillStyle = '#666666';
        pContext.strokeStyle = '#000000';
        pContext.beginPath();

        var x1 = 0;
        var y1 = 0;
        var x2 = 200;
        var y2 = 250;

        pContext.moveTo(x1,y1);         
        pContext.lineTo(x2,y1);       
        pContext.lineTo(x2,y2);    
        pContext.lineTo(-x2,y2);    
        pContext.lineTo(-x2,y1);      
        
        pContext.closePath();
        pContext.fill();
        pContext.stroke();

    }

    moveBody(pContext, worldMatrix) {
        var translate = Matrix.createTranslation(new Vector(0,200,1));
        var transform = worldMatrix.multiply(translate);
        transform.setTransform(pContext);
        this.drawBody(pContext);
        worldMatrix.setTransform(pContext);
    }

    // this draws the robot and all of the components that fully make it

    drawRobot(pContext, worldMatrix) {
        this.moveHead(pContext, worldMatrix);
        this.moveAntenna(pContext, worldMatrix);
        this.moveMouth(pContext, worldMatrix);
        this.moveEyes(pContext, worldMatrix);
        this.moveEyes2(pContext, worldMatrix);
        this.moveBody(pContext, worldMatrix);
        this.moveArms(pContext, worldMatrix);
        this.moveArms2(pContext, worldMatrix);
    }

    moveRobot(pContext, worldMatrix) {
        var translate = Matrix.createTranslation(new Vector(0,0,1));
        var transform = worldMatrix.multiply(translate);
        transform.setTransform(pContext);
        this.drawRobot(pContext, transform);
        worldMatrix.setTransform(pContext);
    }

    scaleRobot(pContext, worldMatrix) {
        var scale = Matrix.createScale(new Vector(0.5,0.5,1));
        var transform = worldMatrix.multiply(scale);
        worldMatrix.setTransform(pContext);
        transform.setTransform(pContext);
        this.moveRobot(pContext, transform);
    }

    draw(pContext, worldMatrix) {
        this.scaleRobot(pContext, worldMatrix);
    }
}