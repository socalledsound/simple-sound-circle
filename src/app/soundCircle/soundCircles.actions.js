import  SoundCircleActionTypes  from './soundCircles.actions.types';


export const addSoundCircleToRedux = (soundCircle) => {
    console.log('running');
    return {
        type : SoundCircleActionTypes.ADD_SOUND_CIRCLE_TO_REDUX,
        payload : {
            soundCircle
        }
    }
}

export const updateSoundCircle = (idx, soundCircle) => {
    return {
        type : SoundCircleActionTypes.UPDATE_SOUND_CIRCLE,
        payload : {
            idx,
            soundCircle,
        }
    }
}