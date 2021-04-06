import SoundCircleActionTypes from './soundCircles.actions.types';

const INITIAL_STATE = {
    soundCircles : [],
    tweakingIdx : null,
}

export const soundCirclesReducer = (state = INITIAL_STATE, action) => {
    // console.log(action);
    switch(action.type){
        case SoundCircleActionTypes.ADD_SOUND_CIRCLE_TO_REDUX :
            console.log(state.soundCircles);
            return {
                ...state,
                soundCircles: state.soundCircles.concat(action.payload.soundCircle)
            }

        case SoundCircleActionTypes.UPDATE_SOUND_CIRCLE :
                //  console.log(action.payload.soundCircle);
                //  console.log(state.soundCircles); // console.log(action);
                const newSoundCircles = state.soundCircles
                                            .filter(soundcircle => soundcircle.idx !== action.payload.idx)
                                            .concat(action.payload.soundCircle);
                    return {
                        ...state,
                        soundCircles : newSoundCircles,
                    }    

        case SoundCircleActionTypes.SET_TWEAKING_IDX :
            console.log('tweaking reducer');
            return {
                ...state,
                tweakingIdx : action.payload.idx
            } 

        case SoundCircleActionTypes.SET_ROTATING_IDX :
            return {
                ...state,
                rotatingIdx : action.payload.idx
            } 
        case SoundCircleActionTypes.SET_VOLUMING_IDX :
                return {
                    ...state,
                    volumingIdx : action.payload.idx
                } 
        case SoundCircleActionTypes.SET_PITCHING_IDX :
            return {
                ...state,
                pitchingIdx : action.payload.idx
            }   
            
            

        case SoundCircleActionTypes.RESET_SOUND_CIRCLE_CONTROL_STATES :
            console.log('resetting');
            const updatedSoundCircleControls = 
                    state.soundCircles.map(soundCircle => {
                        // soundCircle.rotateControl.active = false;
                        // soundCircle.rotateControl.hover = false;
                        soundCircle.volumeControl.active = false;
                        soundCircle.volumeControl.hover = false;
                        soundCircle.pitchControl.active = false;
                        soundCircle.pitchControl.hover = false;
                        return soundCircle
            })   
            console.log('should reset');
            return {
                ...state,
                soundCircles : updatedSoundCircleControls,
                tweakingIdx : null,

            }             
        default :
            return {
                ...state
            }    
    }
}