class Matrix {

    constructor(m00, m01, m02, m10, m11, m12, m20, m21, m22)
    {
        this.set_m00(m00);
        this.set_m01(m01);
        this.set_m02(m02);
        this.set_m10(m10);
        this.set_m11(m11);
        this.set_m12(m12);
        this.set_m20(m20);
        this.set_m21(m21);
        this.set_m22(m22);
    }

    get_m00 () {
        return this.m_m00;
    }

    set_m00(m00) {

        this.m_m00 = m00;
    }

    get_m01() {

        return this.m_m01;
    }

    set_m01(m01) {

        this.m_m01 = m01;
    }

    get_m02() {

        return this.m_m02;
    }

    set_m02(m02) {

        this.m_m02 = m02;
    }

    get_m10() {

        return this.m_m10;
    }

    set_m10(m10) {

        this.m_m10 = m10;
    }

    get_m11() {

        return this.m_m11;
    }

    set_m11(m11) {

        this.m_m11 = m11;
    }

    get_m12() {

        return this.m_m12;
    }

    set_m12(m12) {

        this.m_m12 = m12;
    }

    get_m20() {

        return this.m_m20;
    }

    set_m20(m20) {

        this.m_m20 = m20;
    }

    get_m21() {

        return this.m_m21;
    }

    set_m21(m21) {

        this.m_m21 = m21;
    }

    get_m22() {

        return this.m_m22;
    }

    set_m22(m22) {

        this.m_m22 = m22;
    }

    getElement(row, column) {

        if(row == 0 && column == 0)
        {
            return this.get_m00();
        }

        else if(row == 0 && column == 1)
        {
            return this.get_m01();
        }

        else if(row == 0 && column == 2)
        {
            return this.get_m02();
        }

        else if(row == 1 && column == 0)
        {
            return this.get_m10();
        }

        else if(row == 1 && column == 1)
        {
            return this.get_m11();
        }

        else if(row == 1 && column == 2)
        {
            return this.get_m12();
        }

        else if(row == 2 && column == 0)
        {
            return this.get_m20();
        }

        else if(row == 2 && column == 1)
        {
            return this.get_m21();
        }

        else if(row == 2 && column == 2)
        {
            return this.get_m22();
        }
    }

    static createIdentity() {

        return new Matrix(1, 0, 0, 0, 1, 0, 0, 0, 1);
    }

    static createTranslation(pVector) {

        var x = pVector.getX();
        var y = pVector.getY();
        var z = pVector.getZ();

        var matrix = new Matrix(1,0,x,0,1,y,0,0,z);
        
        return matrix;
    }

    static createScale(pVector) {

        var x = pVector.getX();
        var y = pVector.getY();
        var z = pVector.getZ();

        var matrix = new Matrix(x,0,0,0,y,0,0,0,z);
        return matrix;

    }

    static createRotation(pScalar) {

        var matrix = new Matrix(Math.cos(pScalar),-Math.sin(pScalar),0,Math.sin(pScalar),Math.cos(pScalar),0,0,0,1);

        return matrix;
    }

    multiply(pMatrix) {

        return new Matrix(
        this.getElement(0,0) * pMatrix.getElement(0,0) + this.getElement(0,1) * pMatrix.getElement(1,0) + this.getElement(0,2) * pMatrix.getElement(2,0),
        this.getElement(0,0) * pMatrix.getElement(0,1) + this.getElement(0,1) * pMatrix.getElement(1,1) + this.getElement(0,2) * pMatrix.getElement(2,1),
        this.getElement(0,0) * pMatrix.getElement(0,2) + this.getElement(0,1) * pMatrix.getElement(1,2) + this.getElement(0,2) * pMatrix.getElement(2,2),
        this.getElement(1,0) * pMatrix.getElement(0,0) + this.getElement(1,1) * pMatrix.getElement(1,0) + this.getElement(1,2) * pMatrix.getElement(2,0),
        this.getElement(1,0) * pMatrix.getElement(0,1) + this.getElement(1,1) * pMatrix.getElement(1,1) + this.getElement(1,2) * pMatrix.getElement(2,1),
        this.getElement(1,0) * pMatrix.getElement(0,2) + this.getElement(1,1) * pMatrix.getElement(1,2) + this.getElement(1,2) * pMatrix.getElement(2,2),
        this.getElement(2,0) * pMatrix.getElement(0,0) + this.getElement(2,1) * pMatrix.getElement(1,0) + this.getElement(2,2) * pMatrix.getElement(2,0),
        this.getElement(2,0) * pMatrix.getElement(0,1) + this.getElement(2,1) * pMatrix.getElement(1,1) + this.getElement(2,2) * pMatrix.getElement(2,1),
        this.getElement(2,0) * pMatrix.getElement(0,2) + this.getElement(2,1) * pMatrix.getElement(1,2) + this.getElement(2,2) * pMatrix.getElement(2,2),
        );
        
    }

    multiplyVector(pVector) {

        return new Vector(
        this.getElement(0,0) * pVector.getX() + this.getElement(0,1) * pVector.getY() + this.getElement(0,2) * pVector.getZ(),
        this.getElement(1,0) * pVector.getX() + this.getElement(1,1) * pVector.getY() + this.getElement(1,2) * pVector.getZ(),
        this.getElement(2,0) * pVector.getX() + this.getElement(2,1) * pVector.getY() + this.getElement(2,2) * pVector.getZ()
        );
    }
    
    setTransform(pContext) {

    pContext.setTransform(this.getElement(0,0),this.getElement(1,0),this.getElement(0,1),this.getElement(1,1),this.getElement(0,2),this.getElement(1,2));
    
    }

    transform(pContext) {
        
    pContext.transform(this.getElement(0,0),this.getElement(1,0),this.getElement(0,1),this.getElement(1,1),this.getElement(0,2),this.getElement(1,2));
    
    }
}