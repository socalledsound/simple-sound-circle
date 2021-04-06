import store from '../store';
//import { getDistance, constrainTheta, getCirclePos, degreesToRadians, radiansToDegrees } from '../../utils';
//import { crowdCircleRadius, crowdCircleRotationSpeed, centerX, centerY } from '../../globalSettings';
import { updateTickTime } from '../masterClock/masterClock.actions';
import { updateVolume, updatePitch } from '../audio-middleware/audio.actions';
// import { incrementTheta } from '../gearAnimationReducer/gearAnimation.actions';
import { updateSoundCircle } from '../soundCircle/soundCircles.actions';

class AnimationHQ  {
    constructor(){
        // this.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        // window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        this.tickTime = 0;
        this.tickStarted = false;
        
    }

    init(){
        const ticker = () => {
            
            this.tickTime = this.tickTime + 1;
            // console.log(this.tickTime);
            store.dispatch(updateTickTime(this.tickTime));

            // this.animateGears();
            this.tweakSoundCircles();
            this.rotateSoundCircles();

            this.requestAnimation = window.requestAnimationFrame(ticker);
        }

        if(!this.tickStarted){
            this.tickStarted = true;
            ticker();
        }

    }
    // animateGears(){
    //     const { tweakingIdx } = store.getState().imageButtonsSlice;
    //     // console.log(tweakingIdx);
    //     const imageButtons = store.getState().imageButtonsSlice.imageButtons;
    //     [0,1].forEach(idx => {
    //             if(store.getState().gearsAnimation.gearsAnimating[idx] && !tweakingIdx){
    //             // store.dispatch(incrementTheta(idx));
    //             imageButtons.forEach( imageButton => {
    //                 const newImageButton = {...imageButton};
    //                 newImageButton.orientationTheta = imageButton.orientationTheta + (crowdCircleRotationSpeed * store.getState().gearsAnimation.direction[idx]);
    //                 newImageButton.pos = getCirclePos(centerX + window.innerWidth/4, centerY + window.innerHeight/4, crowdCircleRadius, degreesToRadians(newImageButton.orientationTheta));
    //                 newImageButton.volumeControl.rotateWithParent(newImageButton.pos, newImageButton.size, newImageButton.orientationTheta);
    //                 newImageButton.pitchControl.rotateWithParent(newImageButton.pos, newImageButton.size, newImageButton.orientationTheta)
    //         if(!timerStarted){
    //         initTimer();
    //     }

    getCurrentTime(){
        return this.tickTime
    }

    rotateSoundCircles(){
        const soundCircles = store.getState().soundCircles.soundCircles;
        // console.log(soundCircles);
        soundCircles.forEach( soundCircle => {

            const newSoundCircle = {...soundCircle};
            if(soundCircle.rotating) {
                // console.log(imageButton.rotating);
                newSoundCircle.imageTheta += soundCircle.pitchControl.val * soundCircle.rotateDir;
                newSoundCircle.changeImageCounter++;
                if(newSoundCircle.changeImageCounter > Math.ceil(6 / soundCircle.pitchControl.val)){
                    newSoundCircle.imageIdx =  newSoundCircle.imageIdx = (newSoundCircle.imageIdx + 1)%newSoundCircle.numImages;
                    newSoundCircle.changeImageCounter = 0;
                } 
                
                store.dispatch(updateSoundCircle(soundCircle.idx, newSoundCircle));
            } 
           
        })
    }


    tweakSoundCircles(){
        const { soundCircles, tweakingIdx}  = store.getState().soundCircles;
        // console.log(soundCircles);
        // console.log(soundCircles.soundCircles);
        //const tweakingIdx  = store.getState().soundCircles.tweakingIdx;
        
        if(tweakingIdx != null){
            // console.log('tweaking');
            const buttonToUpdate = soundCircles.filter(soundCircle => soundCircle.idx === tweakingIdx)[0];
            const controlToTweak = buttonToUpdate.tweaking;
             console.log('tweaking', controlToTweak);
            const updatedButton = this.updateTrig(buttonToUpdate, controlToTweak);
            store.dispatch(updateSoundCircle(tweakingIdx, updatedButton));
            this.updateAudio(tweakingIdx, controlToTweak.type, controlToTweak.val);
            
        }
    }

    updateAudio(idx, type, val){
        switch(type){
            case 'volume control' :
                store.dispatch(updateVolume(idx, val))
                break;
            case 'pitch control' :
                store.dispatch(updatePitch(idx, val))
                break;
            default :
                break;
        }
    }



        updateTrig(trigObject, setting){
            const { mousePos, mouseRef } = store.getState().mouse;
            setting.updateSetting(mousePos, mouseRef);
            trigObject.setting = setting;
            return trigObject
        }

}
export default AnimationHQ