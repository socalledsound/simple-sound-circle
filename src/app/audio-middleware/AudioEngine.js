import { sounds } from '../../assets/sounds';
import { reverseBuffers } from './audio.utils';
import globalSettings from '../../globalSettings';

const { numSounds } = globalSettings;

class AudioEngine {
    constructor(){
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.masterVolume = this.audioContext.createGain();
        this.buffers = [];
        this.reversedBuffers = [];
        this.indexes = Array.from({ length : numSounds}, (el, i) => i);
        this.sources = Array.from({ length: numSounds});
        this.gainNodes = Array.from({ length : numSounds}, () => this.audioContext.createGain());
        this.playingSounds = Array.from({length : numSounds}, () => false);
        this.init();
    }

    init(){
        this.initSoundBuffers().then((buffers) => {
            this.buffers = buffers;
            this.reversedBuffers = reverseBuffers(buffers);
            // updateBuffers(buffers)
        });

    }

    initBuffer = async(url) => {
        const response = await fetch(url);
        const ab = await response.arrayBuffer();
        const buffer = await this.audioContext.decodeAudioData(ab);
        return buffer
    }

    initSoundBuffers = async () => {
        //this.initSoundBuffers().then( (buffers) => console.log(buffers)); 
        return Promise.all(sounds.map(soundFile => this.initBuffer(soundFile)));   
     }

    play(idx, audioParameters, dir){
        this.gainNodes[idx].gain.value = audioParameters.vol;
        const buf = dir > 0 ? this.buffers[idx] : this.reversedBuffers[idx]; 
        const offset = Math.abs(0)%buf.duration;
        this.sources[idx] = this.audioContext.createBufferSource();
        this.sources[idx].buffer = buf;
        this.gainNodes[idx].connect(this.audioContext.destination);
        this.sources[idx].connect(this.gainNodes[idx]);
        this.sources[idx].loop = true;
        this.sources[idx].playbackRate.value = audioParameters.rate;
        this.sources[idx].start(0, offset);
        this.playingSounds[idx] = true;
    }


    
    stop = (idx) => {
        this.sources[idx].stop(0);
        this.playingSounds[idx] = false;
    }

    trig(idx, audioParameters, dir){
        // console.log(idx, 'in trig');
        if(this.playingSounds[idx]){
            this.stop(idx);
        }
        else {
            this.play(idx, audioParameters, dir);
        }
    }

    trigAll(dir){
        // console.log(dir);
        this.indexes.forEach(idx => {   
            this.trig(idx, {vol : 1.0, rate: 1.0, offset: 0}, dir);
        })
    }

    updatePitch = (idx, val) => {
        // console.log(idx, 'updating pitch', val);
        // console.log(this.sources);
        this.sources[idx].playbackRate.value = val;
    }
    

    updateVolume = (idx, val) => {
        // console.log('updating volume', val);
        this.gainNodes[idx].gain.value = val;
    }
}

export default AudioEngine