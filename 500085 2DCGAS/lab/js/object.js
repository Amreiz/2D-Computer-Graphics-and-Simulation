class Object {

    circle(x,y,radius,sAngle,eAngle,colour,gravity,dx,dy,drag){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.sAngle = sAngle;
        this.eAngle = eAngle;
        this.colour = colour;
        this.gravity = gravity;
        this.dx = dx;
        this.dy = dy;
        this.drag = drag;
    }

    square(bx,by,bwidth,bheight,bcolour,bgravity,dx,dy,bdrag){
        this.bx = bx;
        this.by = by;
        this.bwidth = bwidth;
        this.bheight = bheight;
        this.bcolour = bcolour;
        this.bgravity = bgravity;
        this.dx = dx;
        this.dy = dy;
        this.bdrag = bdrag;
    }

    drawCircle(pContext){
        pContext.fillStyle = this.colour;
        pContext.beginPath();
        pContext.arc(this.x, this.y, this.radius, this.sAngle, this.eAngle);
        pContext.closePath();
        pContext.fill();
        this.circlePhysics();
    }

    drawSquare(pContext) {
        pContext.fillStyle = this.bcolour;
        pContext.beginPath();
        pContext.rect(this.bx, this.by, this.bwidth, this.bheight);
        pContext.closePath();
        pContext.fill();
        this.boxPhysics();
    }

    setColour(nColour) {
        this.colour = nColour;
    }

    setSquareColour(sColour) {
        this.bcolour = sColour;
    }

    circlePhysics(){
        if(this.x + this.radius >= 400) {
            this.dx = - this.dx;
        }

        else if(this.x - this.radius <= - 400) {
            this.dx = - this.dx;
        }

        if(this.y + this.radius > 300) {
            this.dy = - this.dy * this.drag;

            this.dx *= this.drag;
        }

        else{
            this.dy += this.gravity;
        }

        this.x += this.dx;
        this.y += this.dy;

    }

    boxPhysics() {
        if(this.bx + this.bwidth >= 400) {
            this.dx = -this.dx;
        }
        else if(this.bx <= -400) {
            this.dx = - this.dx;
        }

        if(this.by + this.bheight > 300) {
            this.dy = - this.dy * this.bdrag;

            this.dx *= this.bdrag;
        }
        else if(this.by + this.bheight <= - 300) {
            this.dy = - this.dy * this.bdrag;
        }
        else{
            this.dy += this.bgravity;
        }

        this.bx += this.dx;
        this.by += this.dy;
    }
}