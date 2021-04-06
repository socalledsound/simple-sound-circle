import { images0, images1, images2, images3, images4, images5 } from './assets/img';
const numSounds = 10;
const numSoundCircles = 6;
const numImagesPerCircle = 10;
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

const images = [images0, images1, images2, images3, images4, images5];


const globalSettings = {
    numSounds,
    canvasWidth,
    canvasHeight,
    numSoundCircles,
    numImagesPerCircle,
    images,
    soundCircle : {
        outlineColor : '#FF00FF',
        rotateSpeed : 0.5,
        numImages : numImagesPerCircle,
        imgTransitionSpeed : 3,
        size : (canvasWidth/numSoundCircles/4),
        leftOffset : (canvasWidth/numSoundCircles/6), 
    },

    volumeControl : {
        type: 'volume control',
        fill : '#555',
        hoverFill : '#FF00FF33',
        activeFill : '#FF00FF',
        stroke : '#000',
        strokeWidth : '2',
        scaler : 3,
        size : (canvasWidth/numSoundCircles)/3,
        positionScaler : 1.4,
    },
    pitchControl : {
        type: 'pitch control',
        fill : '#666',
        hoverFill : '#FFFF0077',
        activeFill : '#FFFF00',
        stroke : '#000',
        strokeWidth : '2',
        scaler : 3,
        size : (canvasWidth/numSoundCircles)/3,
        positionScaler : 2.2,
    }


} 

export default globalSettings


