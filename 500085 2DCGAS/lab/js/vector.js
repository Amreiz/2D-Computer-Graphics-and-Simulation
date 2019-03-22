class Vector {
    
    constructor(pX,pY,pZ) {
        this.setX(pX);
        this.setY(pY);
        this.setZ(pZ);
    }

    getX() {
        return this.mX;
    }

    setX(pX) {
        this.mX = pX;
    }

    getY() {
        return this.mY;
    }

    setY(pY) {
        this.mY = pY;
    }

    getZ() {
        return this.mZ;
    }
    
    setZ(pZ) {
        this.mZ = pZ;
    }
    
    add(pVector) {
        var x = this.getX() + pVector.getX();
        var y = this.getY() + pVector.getY();
        var z = this.getZ() + pVector.getZ();

        var vectorNew = new Vector(x,y,z);

        return vectorNew;
    }

    subtract(pVector) {
        var x = this.getX() - pVector.getX();
        var y = this.getY() - pVector.getY();
        var z = this.getZ() - pVector.getZ();

        var vectorNew = new Vector(x,y,z);

        return vectorNew;
    }

    multiply(pScalar) {
        var x = this.getX() * pScalar;
        var y = this.getY() * pScalar;
        var z = this.getZ() * pScalar;

        var vectorNew = new Vector(x,y,z);

        return vectorNew;
    }

    divide(pScalar) {
        var x = this.getX() / pScalar;
        var y = this.getY() / pScalar;
        var z = this.getZ() / pScalar;
    
        var vectorNew = new Vector(x,y,z);

        return vectorNew;
    }

    magnitude() {
        var x = this.getX();
        var y = this.getY();
        var z = this.getZ();

        var magnitudeStepOne = (x*x) + (y*y) + (z*z);

        var magnitude = Math.sqrt(magnitudeStepOne);

        return magnitude;
    }

    normalise() {
        var x = this.getX();
        var y = this.getY();
        var z = this.getZ();

        var magnitudeStepOne = (x*x) + (y*y) + (z*z);

        var magnitude = Math.sqrt(magnitudeStepOne);
        
        var v1 = x / magnitude;
        var v2 = y / magnitude;

        var normalise = new Vector(v1,v2,z);

        return normalise;
        
    }

    limitTo(pScalar) {
        var x = this.getX();
        var y = this.getY();
        var z = this.getZ();

        var thisMag = this.magnitude();

        var magnitudeStepOne = (x*x) + (y*y) + (z*z);

        var magnitude = Math.sqrt(magnitudeStepOne);
        
        if(pScalar > thisMag)
        {
            pScalar = thisMag;
        }

        var v1 = x / magnitude;
        var v2 = y / magnitude;

        var normalise = new Vector(v1,v2,z);
        
        var normal = normalise.getX() * pScalar;
        var normal2 = normalise.getY() * pScalar;

        var limit = new Vector(normal,normal2,z);

        return limit;
        
    }

    dotProduct(pVector) {
        var v1 = this.getX() * pVector.getX();
        var v2 = this.getY() * pVector.getY();
        var z = this.getZ();
        var dotProduct = v1 + v2;

        return dotProduct;
    }

    angleBetween(pVector) {
        var x = this.getX();
        var y = this.getY();
        var z = this.getZ();

        var x1 = pVector.getX();
        var y1 = pVector.getY();
        var z1 = pVector.getZ();

        var magnitudeAStepOne = (x*x) + (y*y) + (z*z);

        var magnitudeA = Math.sqrt(magnitudeAStepOne);

        var magnitudeBStepOne = (x1*x1) + (y1*y1) + (z1*z1);

        var magnitudeB = Math.sqrt(magnitudeBStepOne);

        var v1 = this.getX() * pVector.getX();
        var v2 = this.getY() * pVector.getY();
        var dotProduct = v1 + v2;

        var angle = dotProduct / magnitudeA * magnitudeB;

        var result = Math.acos(angle);
        
        return result;
    }

    interpolate(pVector, pScalar) {
        var one = this.multiply(1-pScalar);
        var two = pVector.multiply(pScalar);

        var final = one.add(two);

        return final;
    }

    rotate(pScalar) {
        var x1 = Math.cos(pScalar) * this.getX();
        var x2 = Math.sin(pScalar) * this.getX();
        
        var y1 = Math.sin(pScalar) * this.getY();
        var y2 = Math.cos(pScalar) * this.getY();

        var vector = new Vector(x1 - y1, x2 + y2, this.getZ());

        return vector;
    }
}