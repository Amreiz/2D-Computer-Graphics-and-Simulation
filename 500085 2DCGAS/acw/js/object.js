class Object {

    square(x,y,width,height,colour,gravity,directionX,directionY,friction)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.colour = colour;
        this.gravity = gravity;
        this.directionX = directionX;
        this.directionY = directionY;
        this.friction = friction;
    }

    drawSquare(pContext)
    {
        pContext.fillStyle = this.colour;
        pContext.beginPath();
        pContext.rect(this.x, this.y, this.width, this.height);
        pContext.closePath();
        pContext.fill();
        this.squareGravity();
    }

    setColour(pColour)
    {
        this.colour = pColour;
    }
    
    squareGravity() {

        // square flips direction after 
        if(this.x + this.width >= 400)
        {
            this.directionX = -this.directionX;
        }

        else if(this.x <= -400)
        {
            this.directionX = - this.directionX;
        }

        if(this.y + this.height > 300)
        {
            this.directionY = - this.directionY * this.friction;

            this.directionX *= this.friction;
        }
        
        else
        {
            this.directionY += this.gravity;
        }

        this.x += this.directionX;
        this.y += this.directionY;
    }
}