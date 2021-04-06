import MasterClockActionTypes from './masterClock.actions.types';



export const initTimer = () => {
    return {
        type : MasterClockActionTypes.INIT_TIMER,
    }
}

export const startTimer = () => {
    return {
        type: MasterClockActionTypes.TIMER_STARTED,
    }
}


export const updateTickTime = (time) => {
    return {
        type : MasterClockActionTypes.UPDATE_TICK_TIME,
        payload : {
            time,
        }
    }
}


export const setTickTime = (tick) => {
    return {
        type : MasterClockActionTypes.SET_TICK_TIME,
        payload : {
            tick
        } 
        
    }
}

export const getCurrentTickTime = (tick) => {
    return {
        type : MasterClockActionTypes.GET_CURRENT_TICK_TIME,
        tick
    }
}

