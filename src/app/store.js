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
import { mouseReducer } from './mouse/mouse.reducer';


const rootReducer = combineReducers({
  soundCircles : soundCirclesReducer,
  mouse : mouseReducer,
})


const store = createStore(rootReducer, applyMiddleware(audioMiddleWare, masterClockMiddleware));

export default store