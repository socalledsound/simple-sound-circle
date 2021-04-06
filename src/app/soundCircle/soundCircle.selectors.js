import { createSelector } from 'reselect';

const selectSoundCircles = state => state.soundCircles.soundCircles;
// console.log(selectImageButtons);
export const selectSoundCircle = idx => 
    createSelector(
        [selectSoundCircles],
        soundCircles => {
            //  console.log(soundCircles);
            // console.log(idx);
            // console.log(imageButtons[idx]);
           return  (soundCircles ? soundCircles.filter(soundCircle => soundCircle.idx === idx)[0] : null)
        }
        )

