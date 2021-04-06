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

export const resetSoundCircleControlStates = () => {
    return {
        type : SoundCircleActionTypes.RESET_SOUND_CIRCLE_CONTROL_STATES,
    }
}

export const setTweakingIdx = (idx) => {
    return {
        type : SoundCircleActionTypes.SET_TWEAKING_IDX,
        payload : {
            idx
        }
    }
}

export const setRotatingIdx = (idx) => {
    return {
        type : SoundCircleActionTypes.SET_ROTATING_IDX,
        payload : {
            idx
        }
    }
}

export const setVolumingIdx = (idx) => {
    return {
        type : SoundCircleActionTypes.SET_VOLUMING_IDX,
        payload : {
            idx
        }
    }
}

export const setPitchingIdx = (idx) => {
    return {
        type : SoundCircleActionTypes.SET_PITCHING_IDX,
        payload : {
            idx
        }
    }
}