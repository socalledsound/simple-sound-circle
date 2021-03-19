// import { degreesToRadians, radiansToDegrees } from '../../utils';
import globalSettings from '../../globalSettings';
import SliderObject from './SliderObject';

const { soundCircle, volumeControl, pitchControl  } = globalSettings;


class SoundCircleObject {
    constructor(id, x, y, angle, images ){
        // console.log(x, y);
        this.idx = id;
        this.images = images;
        this.imageIdx = 0;
        this.numImages = soundCircle.numImages;
        this.changeImageCounter = 0;
        this.changeImageCounterRest = soundCircle.imgTransitionSpeed;
        this.pos = {x: x, y: y};
        this.originalTheta = angle;
        this.size = soundCircle.size;
        this.active = false;
        this.tweaking = false;
        this.rotating = false;
        this.rotateDir = 1;
        this.imageTheta = 0;
        this.sizeScaler = soundCircle.sizeScaler;
        this.stroke = soundCircle.outlineColor;
        this.strokeWidth = soundCircle.strokeWidth;
        this.volumeControl = new SliderObject(id, 0, x, y, this.size, volumeControl);
        this.pitchControl = new SliderObject(id, 0, x, y, this.size, pitchControl);
        
        // this.rotateControl = new RotateControl(idx, inc, x, y, imageButtonSize);
                // this.theta = theta;
        // this.inc = inc; 
        // this.orientationTheta = radiansToDegrees(Math.atan2(this.pos.y - centerY, this.pos.x - centerX));
        // this.orientationTheta = idx * inc;
        // this.volumeControl = new VolumeControl(idx, inc, x, y, imageButtonSize);

        // this.pitchControl = new PitchControl(idx, inc, x, y, imageButtonSize);  

        // if I bring back rectangular controls will need
        //this.controlRotateTheta = idx * inc
    }

    updateControls(){

    }




    // incrementImageIdx = () => {
    //     this.imageIdx = (this.imageIdx + 1)%this.numImages;
    //     console.log(this.imageIdx);
    // }
}

export default SoundCircleObject
