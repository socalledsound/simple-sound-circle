import { createSlice } from '@reduxjs/toolkit';


// const initSoundCircle = (idx, ) => 

const initialState = [];


const soundCirclesSlice = createSlice({
    name: 'sound-circles',
    initialState,
    reducers: {
        soundCircles : {
            reducer(state, action){
                state.push(action.payload.soundCircle)
            },
            addSoundCircleToRedux(soundCircle){
                 console.log(soundCircle);
                return {
                    payload: {
                        soundCircle
                    }
                }
            }
        }
    }
})

export const { addSoundCircleToRedux } = soundCirclesSlice.actions;

export default soundCirclesSlice.reducer
