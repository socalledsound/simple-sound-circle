// import { configureStore } from '@reduxjs/toolkit';
// import soundCirclesReducer from '../features/soundcircle/soundCirclesSlice';

// export default configureStore({
//   reducer: {
//     soundCircles: soundCirclesReducer,
//   },
// });


import { applyMiddleware, createStore } from 'redux';
import { combineReducers } from 'redux';
import audioMiddleWare from './audio-middleware/audio.middleware';
import masterClockMiddleware from './masterClock/masterClock.middleware';
import { soundCirclesReducer } from './soundCircle/soundCirclesReducer';

const rootReducer = combineReducers({
  soundCircles : soundCirclesReducer,
})


const store = createStore(rootReducer, applyMiddleware(audioMiddleWare, masterClockMiddleware));

export default store