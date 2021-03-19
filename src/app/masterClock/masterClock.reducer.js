import MasterClockActionTypes from './masterClock.actions.types';


const INITIAL_MASTER_CLOCK_STATE = {
    timerStarted : false,
    tickerRunning: false,
    tickTime: 0,
}

export const masterClockReducer = (state = INITIAL_MASTER_CLOCK_STATE, action) => {
    switch(action.type){
        case MasterClockActionTypes.TIMER_STARTED :
            return {
                ...state,
                timerStarted : true,
            }

        case MasterClockActionTypes.UPDATE_TICK_TIME :
                const newTime = action.payload.time;
    
                return {
                    ...state,
                    tickTime : newTime,
                }      
        default :
            return {
                ...state
            }    
    }
}