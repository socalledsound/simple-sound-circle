import SoundCircleActionTypes from './soundCircles.actions.types';

const INITIAL_STATE = {
    soundCircles : [],
}

export const soundCirclesReducer = (state = INITIAL_STATE, action) => {
    console.log(action);
    switch(action.type){
        case SoundCircleActionTypes.ADD_SOUND_CIRCLE_TO_REDUX :
            console.log(state.soundCircles);
            return {
                ...state,
                soundCircles: state.soundCircles.concat(action.payload.soundCircle)
            }

        case SoundCircleActionTypes.UPDATE_SOUND_CIRCLE :
                 console.log(action.payload.soundCircle);
                 console.log(state.soundCircles);
                const newSoundCircles = state.soundCircles
                                            .filter(soundcircle => soundcircle.idx !== action.payload.idx)
                                            .concat(action.payload.soundCircle);
                    return {
                        ...state,
                        soundCircles : newSoundCircles,
                    }    
        default :
            return {
                ...state
            }    
    }
}