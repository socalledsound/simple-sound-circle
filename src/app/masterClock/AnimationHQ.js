import store from '../store';
import { getDistance, constrainTheta, getCirclePos, degreesToRadians, radiansToDegrees } from '../../utils';
import { crowdCircleRadius, crowdCircleRotationSpeed, centerX, centerY } from '../../globalSettings';
import { updateTickTime } from '../masterClock/masterClock.actions';
import { updateVolume, updatePitch } from '../audio/audio.actions';
import { incrementTheta } from '../gearAnimationReducer/gearAnimation.actions';
import { updateImageButton } from '../imageButtonReducer/imageButtons.actions';

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

            this.animateGears();
            this.tweakImageButtons();
            this.rotateImageButtons();

            this.requestAnimation = window.requestAnimationFrame(ticker);
        }

        if(!this.tickStarted){
            this.tickStarted = true;
            ticker();
        }

    }
    animateGears(){
        const { tweakingIdx } = store.getState().imageButtonsSlice;
        // console.log(tweakingIdx);
        const imageButtons = store.getState().imageButtonsSlice.imageButtons;
        [0,1].forEach(idx => {
                if(store.getState().gearsAnimation.gearsAnimating[idx] && !tweakingIdx){
                // store.dispatch(incrementTheta(idx));
                imageButtons.forEach( imageButton => {
                    const newImageButton = {...imageButton};
                    newImageButton.orientationTheta = imageButton.orientationTheta + (crowdCircleRotationSpeed * store.getState().gearsAnimation.direction[idx]);
                    newImageButton.pos = getCirclePos(centerX + window.innerWidth/4, centerY + window.innerHeight/4, crowdCircleRadius, degreesToRadians(newImageButton.orientationTheta));
                    newImageButton.volumeControl.rotateWithParent(newImageButton.pos, newImageButton.size, newImageButton.orientationTheta);
                    newImageButton.pitchControl.rotateWithParent(newImageButton.pos, newImageButton.size, newImageButton.orientationTheta)
                    store.dispatch(updateImageButton(imageButton.idx, newImageButton));
                })
            }
        })
    }

    getCurrentTime(){
        return this.tickTime
    }

    rotateImageButtons(){
        const imageButtons = store.getState().imageButtonsSlice.imageButtons;

        imageButtons.forEach( imageButton => {

            const newImageButton = {...imageButton};
            if(imageButton.rotating) {
                // console.log(imageButton.rotating);
                newImageButton.imageTheta += imageButton.pitchControl.val * imageButton.rotateDir;
                newImageButton.changeImageCounter++;
                if(newImageButton.changeImageCounter > Math.ceil(6 / imageButton.pitchControl.val)){
                    newImageButton.imageIdx =  newImageButton.imageIdx = (newImageButton.imageIdx + 1)%newImageButton.numImages;
                    newImageButton.changeImageCounter = 0;
                } 
                
                store.dispatch(updateImageButton(imageButton.idx, newImageButton));
            } 
           
        })
    }


    tweakImageButtons(){
        const imageButtons = store.getState().imageButtonsSlice.imageButtons;
        const { tweakingIdx } = store.getState().imageButtonsSlice;
        
        if(tweakingIdx != null){
            // console.log('tweaking');
            const buttonToUpdate = imageButtons.filter(imageButton => imageButton.idx === tweakingIdx)[0];
            const controlToTweak = buttonToUpdate.tweaking;
            // console.log('tweaking', controlToTweak);
            const updatedButton = this.updateTrig(buttonToUpdate, controlToTweak);
            store.dispatch(updateImageButton(tweakingIdx, updatedButton));
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