// import CrowdSound from './CrowdSound';
import masterClockActionTypes from './masterClock.actions.types';
import { setTickTime, startTimer} from './masterClock.actions';
// import AnimationHQ from './AnimationHQ';

const masterClockMiddleware = store => {
    // const animation = new AnimationHQ();

    return next => action => {

        switch (action.type){
           
            // case masterClockActionTypes.INIT_TIMER : 
            //     animation.init();
            //     store.dispatch(startTimer());
            //     break;

            // case masterClockActionTypes.GET_CURRENT_TICK_TIME : 
            //     store.dispatch(setTickTime(animation.getTime()));
            //     break;

            default :
                break;
        }
        next(action);
    }
}
export default masterClockMiddleware