class Sun {
    constructor(pPosition) {
        this.setPosition(pPosition);
    }
    getPosition() {
        return this.mPosition;
    }

    setPosition(pPosition) {
        this.mPosition = pPosition;
    }

    drawSun(pContext) {
        // draws the main body of the sun


        pContext.fillStyle = '#ffc57f'
        pContext.strokeStyle = '#ff7200';
        pContext.beginPath();
        
        
        var x1 = 0;
        var y1 = 0;
        var x2 = 0;
        var y2 = 2 * Math.PI;

        pContext.arc(x1, y1, 75, x2, y2 , false);
        
        pContext.fill();
        pContext.stroke();
        pContext.closePath();
    }

    moveBaseSun(pContext, worldMatrix) {
        var translate = Matrix.createTranslation(new Vector(-275,-175,1));
        var transform = worldMatrix.multiply(translate);
        transform.setTransform(pContext);
        this.drawSun(pContext);
        worldMatrix.setTransform(pContext);
    }

    drawRay(pContext) {

        pContext.fillStyle = '#ffc57f';
        pContext.strokeStyle = '#ff7200';
        pContext.beginPath();
        

        var x1 = 0;
        var y1 = 0;
        var x2 = 15;
        var y2 = -50;

        pContext.moveTo(x1,y1);
        pContext.lineTo(x2,y1);
        pContext.lineTo(x1,y2);
        pContext.lineTo(-x2,y1);
        
        pContext.fill();
        pContext.closePath();
        pContext.stroke();
    }

    moveRayN(pContext, worldMatrix) {
        var translate = Matrix.createTranslation(new Vector(0,-100,1));
        var rotate = Matrix.createRotation(8 * Math.PI / 4);
        var transform = translate.multiply(worldMatrix.multiply(rotate));
        transform.setTransform(pContext);
        this.drawRay(pContext, transform);
        worldMatrix.setTransform(pContext);
    }

    moveRayNE(pContext, worldMatrix) {
        var translate = Matrix.createTranslation(new Vector(75, -75, 1));
        var rotate = Matrix.createRotation(Math.PI / 4);
        var transform = translate.multiply(worldMatrix.multiply(rotate));
        transform.setTransform(pContext);
        this.drawRay(pContext, transform);
        worldMatrix.setTransform(pContext);
    }

    moveRayE(pContext, worldMatrix) {
        var translate = Matrix.createTranslation(new Vector(100, 0, 1));
        var rotate = Matrix.createRotation(Math.PI /2);
        var transform = translate.multiply(worldMatrix.multiply(rotate));
        transform.setTransform(pContext);
        this.drawRay(pContext, transform);
        worldMatrix.setTransform(pContext);
    }

    moveRaySE(pContext, worldMatrix) {
        var translate = Matrix.createTranslation(new Vector(75, 75, 1));
        var rotate = Matrix.createRotation(3 * Math.PI / 4);
        var transform = translate.multiply(worldMatrix.multiply(rotate));
        transform.setTransform(pContext);
        this.drawRay(pContext, transform);
        worldMatrix.setTransform(pContext);
    }

    moveRayS(pContext, worldMatrix) {
        var translate = Matrix.createTranslation(new Vector(0, 100, 1));
        var rotate = Matrix.createRotation(Math.PI);
        var transform = translate.multiply(worldMatrix.multiply(rotate));
        transform.setTransform(pContext);
        this.drawRay(pContext, transform);
        worldMatrix.setTransform(pContext);
    }

    moveRaySW(pContext, worldMatrix) {
        var translate = Matrix.createTranslation(new Vector(-75, 75, 1));
        var rotate = Matrix.createRotation(5 * Math.PI / 4);
        var transform = translate.multiply(worldMatrix.multiply(rotate));
        transform.setTransform(pContext);
        this.drawRay(pContext, transform);
        worldMatrix.setTransform(pContext);
    }

    moveRayW(pContext, worldMatrix) {
        var translate = Matrix.createTranslation(new Vector(-100, 0, 1));
        var rotate = Matrix.createRotation(-Math.PI / 2);
        var transform = translate.multiply(worldMatrix.multiply(rotate));
        transform.setTransform(pContext);
        this.drawRay(pContext, transform);
        worldMatrix.setTransform(pContext);
    }

    moveRayNW(pContext, worldMatrix) {
        var translate = Matrix.createTranslation(new Vector(-75, -75, 1));
        var rotate = Matrix.createRotation(7 * Math.PI / 4);
        var transform = translate.multiply(worldMatrix.multiply(rotate));
        transform.setTransform(pContext);
        this.drawRay(pContext, transform);
        worldMatrix.setTransform(pContext);
    }

    // this function draws all the rays in their desired positions
    moveRay(pContext,worldMatrix) {
        this.moveRayN(pContext,worldMatrix);
        this.moveRayE(pContext, worldMatrix);
        this.moveRayNE(pContext, worldMatrix);
        this.moveRaySE(pContext, worldMatrix);
        this.moveRayS(pContext, worldMatrix);
        this.moveRaySW(pContext, worldMatrix);
        this.moveRayW(pContext, worldMatrix);
        this.moveRayNW(pContext, worldMatrix);
    }

    // This function allows the scaling of the sun entity itself
    changeFullSun(pContext, worldMatrix) {
        var scale = Matrix.createScale(new Vector(0.5,0.5,1));
        var translate = Matrix.createTranslation(new Vector(-275,-175,1));
        var transform = translate.multiply(worldMatrix.multiply(scale));
        worldMatrix.setTransform(pContext);
        transform.setTransform(pContext);
        this.moveRay(pContext, transform);

    }

    draw(pContext, worldMatrix) {
        this.changeFullSun(pContext, worldMatrix);
        this.moveBaseSun(pContext,worldMatrix);
    }
}