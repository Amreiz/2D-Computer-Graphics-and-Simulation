class Star {

    constructor(pPosition, pImage, pSrcX, pSrcY, pSrcWidth, pSrcHeight, pXposition, pYposition, pWidth, pHeight) {

        this.setPosition(pPosition);
        this.setSprite(pImage,pSrcX,pSrcY,pSrcWidth,pSrcHeight,pXposition,pYposition,pWidth,pHeight);

        this.index = 0;
        this.count = 0;
        this.frames = 0;
        this.gravity = 0.2;
        this.gravityTime = 0;
        this.xTime = 0;
        this.yTime = 0;
        this.height = 96;
    }

    setPosition(pPosition) {
        this.mPosition = pPosition;
    }
    getPosition() {
        return this.mPosition;
    }

    getImage() {
        return this.mImage;
    }

    getSrcX() {
        return this.mSrcX;
    }

    getSrcY() {
        return this.mSrcY;
    }

    getSrcWidth() {
        return this.mSrcWidth;
    }

    getSrcHeight() {
        return this.mSrcHeight;
    }

    getpXposition() {
        return this.mXposition;
    }

    getpYposition () {
        return this.mYposition;
    }

    getWidth() {
        return this.mWidth;
    }
    
    getHeight() {
        return this.mHeight;
    }

    setSprite(pImage,pSrcX,pSrcY,pSrcWidth,pSrcHeight,pXposition,pYposition,pWidth,pHeight) {
        this.mImage = new Image(200, 40);
        this.mImage.src = pImage;
        this.mSrcX = pSrcX;
        this.mSrcY = pSrcY;
        this.mSrcWidth = pSrcWidth;
        this.mSrcHeight = pSrcHeight;
        this.mXposition = pXposition;
        this.mYposition = pYposition;
        this.mWidth = pWidth;
        this.mHeight = pHeight;
    }

    play(player) {
        this.playing = player;
    }

    animateSprite(pContext) {

        if(this.playing) {
            if(this.index >= 4) {
                this.index = 0;
            }

            this.count += 1;

            if(this.count > this.frames) {
                this.index += 1;
                this.count = 0;
            }
        }

        //this.gravity();
        //this.platform();
        this.mXposition += 5;
        var boundary = 800 - this.mSrcWidth + 6;

        if(this.mXposition >= boundary) {
            this.mXposition = boundary;
        }

        pContext.drawImage(this.mImage,((this.index * this.mSrcWidth) + this.mSrcX), this.mSrcY, this.mSrcWidth, this.mSrcWidth, this.mXposition, this.mYposition, this.mWidth, this.mHeight);
    }

    gravity() {
        this.gravityTime += this.gravity;
        this.mXposition += this.xTime;
        this.mYposition += this.yTime + this.gravityTime;
    }

    platform() {
        var boundary = 600 - this.mSrcHeight;
        if(this.mYposition >= boundary) {
            this.mYposition = boundary;
        }
    }
}