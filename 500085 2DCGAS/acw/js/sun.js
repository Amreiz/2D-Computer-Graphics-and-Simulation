class Sun {

    constructor(pPosition)
    {
        this.setPosition(pPosition);

        this.worldMatrix = Matrix.createIdentity();
    }

    getPosition()
    {
        return this.mPosition;
    }

    setPosition(pPosition)
    {
        this.mPosition = pPosition;
    }

    drawBaseSun(pContext)
    {
        // draws the main body of the sun
        pContext.fillStyle = '#ffc57f'
        pContext.strokeStyle = '#ff7200';
        pContext.beginPath();
        pContext.arc(-650, -450, 90, 0, 2 * Math.PI , false);        pContext.fill();
        pContext.stroke();
        pContext.closePath();
    }

    drawRay(pContext) 
    {
        pContext.fillStyle = '#ffc57f';
        pContext.strokeStyle = '#ff7200';
        pContext.beginPath();
        pContext.moveTo(0,0);
        pContext.lineTo(15,0);
        pContext.lineTo(0,-50);
        pContext.lineTo(-15,0);   
        pContext.fill();
        pContext.closePath();
        pContext.stroke();
    }

    animateRays(pContext, pMatrix, pDeltaTime)
    {
        var translate, transform, rayRotation, deltaRotation;

        // sets the speed of the rotation depending on time "ie 4 rotations per second"
        var worldMatrix = Matrix.createRotation((pDeltaTime * Math.PI / 4));

        this.worldMatrix = this.worldMatrix.multiply(worldMatrix);

        // runs through an array that draws through as many triangles as I want

        for(var i = 0; i < 8; i++)
        {
            translate = Matrix.createTranslation(new Vector(125, 0, 1));

            // creates multiply rays to draw in a circle around the base sun 
            deltaRotation = Matrix.createRotation(2 * i * Math.PI / 8);
            deltaRotation = deltaRotation.multiply(this.worldMatrix);

            rayRotation = Matrix.createRotation(Math.PI / 2);

            transform = pMatrix.multiply(deltaRotation);
            transform = transform.multiply(translate);
            transform = transform.multiply(rayRotation);
            transform.setTransform(pContext);
            this.drawRay(pContext);

            pMatrix.setTransform(pContext);

        }
    }

    draw(pContext, pMatrix, pDeltaTime)
    {
        var translate = Matrix.createTranslation(this.mPosition);
        var transform = pMatrix.multiply(translate);
        transform.setTransform(pContext);
        this.drawBaseSun(pContext);
        this.changeSunRays(pContext, transform, pDeltaTime);
        pMatrix.setTransform(pContext);
    }


    // can scale and translate the rays of the sun
    changeSunRays(pContext, worldMatrix, pDeltaTime) 
    {
        var scale = Matrix.createScale(new Vector(0.8,0.8,1));
        var translate = Matrix.createTranslation(new Vector(-650,-450,1));
        var transform = translate.multiply(worldMatrix.multiply(scale));
        transform.setTransform(pContext);
        this.animateRays(pContext, transform, pDeltaTime);
        worldMatrix.setTransform(pContext);
    }
}