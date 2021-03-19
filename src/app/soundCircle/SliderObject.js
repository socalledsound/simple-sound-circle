import { degreesToRadians, radiansToDegrees, getControlPos, getMarkCoords, mapVal, constrainTheta } from '../../utils';

class SliderObject {
    constructor (id, initTheta, x, y, imageButtonSize, settings ){
        this.idx = id;
        this.type = settings.type;
        this.rotationCenterPos = {x: x, y: y};
        this.originalTheta = initTheta;
        this.orientationTheta = 0;
        this.currentTheta = this.originalTheta;
        this.currentThetaOffset = 0;
        this.parentSize = imageButtonSize; 
        this.settings = settings;
        this.pos = getControlPos(x, y, imageButtonSize * settings.positionScaler, degreesToRadians(this.originalTheta + this.orientationTheta));
        this.originalPos = this.pos;
        this.plusMarkPositions = getMarkCoords(1, 10, 10);
        this.size = imageButtonSize/settings.scaler;
        this.fill = settings.fill;
        this.hoverFill = settings.hoverFill;
        this.activeFill = settings.activeFill;
        this.stroke = settings.stroke;
        this.strokeWidth = settings.strokeWidth;
        this.clicked = false;
        this.hover = false;
        this.dragging = false;
        // this.volScaler = 1.0;
        this.val = 1.0

        // console.log(this.rotationCenterPos);
        // console.log(this.pos);
       
    }

    rotateWithParent(pos, radius, theta){
        this.pos = getControlPos(pos.x, pos.y, radius * this.settings.positionScaler, degreesToRadians(theta));
        this.orientationTheta = theta;
        this.rotationCenterPos = pos;
    }



    updatePos = (theta) => {
        // console.log(this.rotationCenterPos);
        this.pos = getControlPos(
                        this.rotationCenterPos.x, 
                        this.rotationCenterPos.y, 
                        this.parentSize * this.settings.positionScaler, 
                         degreesToRadians(theta + this.orientationTheta)
                        
                        );
    }

    updateSetting = (mousePos, mouseRef) => {
        // const mouseDist = mousePos.y - mouseRef.y;
        //const constrainedTheta = constrainTheta(mouseDist/3);
        // console.log(mousePos.x + window.innerWidth/4, this.rotationCenterPos, this.pos);
        const y = (mousePos.y + window.innerHeight/4) - this.rotationCenterPos.y;
        const x = (mousePos.x + window.innerWidth/4) - this.rotationCenterPos.x; 
       
        const theta = Math.atan2(y, x);
        // const theta = Math.atan2(0, -100);
         console.log(theta);
        //const updatedTheta = theta >= 0 ? theta : (theta + (Math.PI * 2));
        // const updatedTheta = this.idx > 0 ? theta >=0 ? theta : ((2*Math.PI) + theta) : theta;
        const updatedTheta = theta;
        let convertedTheta;
        if(theta === 0){
            convertedTheta = 360;
        } else {
            convertedTheta = radiansToDegrees(updatedTheta);
        } 
        // console.log(this.originalTheta);
        
        const normalizedTheta = convertedTheta === 0 ? 360 : convertedTheta - this.orientationTheta;

        // console.log(normalizedTheta);
         const constrainedTheta = constrainTheta(normalizedTheta, this.orientationTheta);
        // const constrainedTheta = normalizedTheta;
        // console.log(constrainedTheta);
        this.updateTheta(constrainedTheta);
        this.updateVal(constrainedTheta);
        this.updatePos(constrainedTheta);
    }


    updateTheta = (theta)=> {
        this.currentThetaOffset = this.originalTheta + theta;
    }

    updateVal = (theta) => {

        this.val = mapVal(theta, 0, 360, 0.0, 2.0);

    }


}
export default SliderObject
