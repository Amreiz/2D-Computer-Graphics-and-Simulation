class Robot {
    // constructor to be able to change position angle and scale in the main
    constructor(pPosition, pAngle, pScale)
    {
        this.setPosition(pPosition);
        this.setAngle(pAngle);
        this.setScale(pScale);
        
        // initialises new instance of a scene graph every time a robot object is created
        this.initialiseSceneGraph();
    }

    // getters and setters for robot parent node and scale and angle
    
    setPosition(pPosition) 
    {
        this.mPosition = pPosition;
    }

    getPosition() 
    {
        return this.mPosition;
    }

    setRootNode(pRootNode)
    {
        this.mRootNode = pRootNode;
    }

    getRootNode()
    {
        return this.mRootNode;
    }

    setAngle(pAngle)
    {
        this.mAngle = pAngle;
    }

    getAngle()
    {
        return this.mAngle;
    }

    setScale(pScale)
    {
        this.mScale = pScale;
    }

    getScale()
    {
        return this.mScale;
    }

    initialiseSceneGraph()
    {
        // creates a new instance of each feature needed to draw for the robot
        var body = new Body();
        var head = new Head();
        var rightEye = new Eye();
        var leftEye = new Eye();
        var mouth = new Mouth();
        var rightArm = new Arm();
        var leftArm = new Arm();
        var antenna = new Antenna();

        // sets the root node to the position (translation)
        var rootMatrix = Matrix.createTranslation(this.getPosition()); // Assigns instance to a new root matrix
        var rootNode = new SceneGraph(rootMatrix); // assings instance to the root node by initialising scene graph
        this.setRootNode(rootNode);

        // sets rotate node to be a child of the translation matrix (order in heirarchy)
        var rotateMatrix = Matrix.createRotation(this.getAngle()); // assigns 
        var rotateNode = new SceneGraph(rotateMatrix);
        rootNode.addChild(rotateNode);

        // sets scale node to be the child of the rotate matrix (order in heirarchy)
        var scaleMatrix = Matrix.createScale(this.getScale());
        var scaleNode = new SceneGraph(scaleMatrix);
        rotateNode.addChild(scaleNode);

        // moves the body
        var bodyNode = new SceneGraph(Matrix.createTranslation(new Vector(0, 100, 1)));
        // adds the translation for the body node to the body object
        bodyNode.addChild(body);
        // adds the rotate nody to the parent body node
        rotateNode.addChild(bodyNode);
        
        var headNode = new SceneGraph(Matrix.createTranslation(new Vector(0, 0, 1)));
        headNode.addChild(head);
        rotateNode.addChild(headNode);

        var rightEyeNode = new SceneGraph(Matrix.createTranslation(new Vector(62.5, 50, 1)));
        rightEyeNode.addChild(rightEye);
        rotateNode.addChild(rightEyeNode);

        var leftEyeNode = new SceneGraph(Matrix.createTranslation(new Vector(-25, 50, 1)));
        leftEyeNode.addChild(leftEye);
        rotateNode.addChild(leftEyeNode);

        var mouthNode = new SceneGraph(Matrix.createTranslation(new Vector(-12.5, 100, 1)));
        mouthNode.addChild(mouth);
        rotateNode.addChild(mouthNode);

        var rightArmNode = new SceneGraph(Matrix.createTranslation(new Vector(100, 100, 1)));
        rightArmNode.addChild(rightArm);
        rotateNode.addChild(rightArmNode);

        var leftArmNode = new SceneGraph(Matrix.createTranslation(new Vector(-125, 100, 1)));
        leftArmNode.addChild(leftArm);
        rotateNode.addChild(leftArmNode);

        var antennaNode = new SceneGraph(Matrix.createTranslation(new Vector(0, 0, 1)));
        antennaNode.addChild(antenna);
        rotateNode.addChild(antennaNode);

    }

    draw(pContext, worldMatrix)
    {
        this.getRootNode().draw(pContext, worldMatrix);
    }
}

class Head
{
    draw(pContext) 
    {
        pContext.fillStyle = '#b5b5b5';
        pContext.strokeStyle = '#000000';

        var x1 = 0;
        var y1 = 0;
        var x2 = 75;
        var y2 = 100;

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
}

class Body 
{
    draw(pContext)
    {
        pContext.fillStyle = '#666666';
        pContext.strokeStyle = '#000000';
        pContext.beginPath();

        var x1 = 0;
        var y1 = 0;
        var x2 = 100;
        var y2 = 125;

        pContext.moveTo(x1,y1);         
        pContext.lineTo(x2,y1);       
        pContext.lineTo(x2,y2);    
        pContext.lineTo(-x2,y2);    
        pContext.lineTo(-x2,y1);      
        pContext.closePath();
        pContext.fill();
        pContext.stroke();
    }
}

class Eye
{
    draw(pContext)
    {
        pContext.fillStyle = '#a30000';
        pContext.strokeStyle = '#000000';
        
        var x1 = 0;
        var y1 = 0;
        var x2 = -37.5;
        var y2 = 37.5;

        pContext.beginPath();
        pContext.moveTo(x1,y1);
        pContext.lineTo(x2,y1);
        pContext.lineTo(x2,y2);
        pContext.lineTo(x1,y2);
        pContext.closePath();
        pContext.fill();
        pContext.stroke();
    }
}

class Mouth
{
    draw(pContext)
    {
        pContext.fillStyle = '#e0e0e0';
        pContext.strokeStyle = '#000000';

        var x1 = 0;
        var y1 = 0;
        var x2 = 25;
        var y2 = -50;

        pContext.beginPath();
        pContext.moveTo(x1,y1);
        pContext.lineTo(x1,y2);
        pContext.lineTo(x2,y2);
        pContext.lineTo(x2,y1);
        pContext.closePath();
        pContext.fill();
        pContext.stroke();
    }
}

class Arm
{
    draw(pContext)
    {
        pContext.fillStyle = '#b5b5b5';
        pContext.strokeStyle = '#000000';
        
        var x1 = 0;
        var y1 = 0;
        var x2 = 25;
        var y2 = 75;

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
    }
}

class Antenna
{
    draw(pContext)
    {
        pContext.fillStyle = '#b5b5b5';
        pContext.strokeStyle = '#000000';

        var x1 = 0;
        var y1 = 0;
        var x2 = 7.5;
        var y2 = -37.5;

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
        pContext.arc(x1, y2, 17.5, y1, 2 * Math.PI , false);
        pContext.closePath();
        pContext.fill();
        pContext.stroke();
    }
}