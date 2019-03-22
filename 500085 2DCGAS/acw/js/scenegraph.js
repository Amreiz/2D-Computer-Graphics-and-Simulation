class SceneGraph {
     
    constructor(pMatrix) 
    {
        this.setLocalMatrix(pMatrix);

        this.mChildren = [];        
    }

    setLocalMatrix(pMatrix)
    {
        this.mMatrix = pMatrix;
    }

    getLocalMatrix()
    {
        return this.mMatrix;
    }       
    
    getNumberOfChildren()
    {
        return this.mChildren.length;
    } 

    getChildAt(pIndex)
    {
    return this.mChildren[pIndex];
    } 

    addChild(pChildren)
    {
        this.mChildren.push(pChildren);
    }


    // runs through
    draw(pContext, matrix)
    {
       var newTransformMatrix = matrix.multiply(this.getLocalMatrix());
       newTransformMatrix.setTransform(pContext);
    
       for(var i = 0; i < this.getNumberOfChildren(); i++)
       {
           this.getChildAt([i]).draw(pContext, newTransformMatrix);
       }

       matrix.setTransform(pContext);       
    }
}