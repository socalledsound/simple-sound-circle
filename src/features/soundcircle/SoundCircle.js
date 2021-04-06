import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initTimer } from '../../app/masterClock/masterClock.actions';
import { trigSound, stopPlayingSound } from '../../app/audio-middleware/audio.actions';
import { storeMouseRef } from '../../app/mouse/mouse.actions';
import { updateSoundCircle, setTweakingIdx, setRotatingIdx, setVolumingIdx, setPitchingIdx} from '../../app/soundCircle/soundCircles.actions';
import { selectSoundCircle } from '../../app/soundCircle/soundCircle.selectors';
import { mapVal } from '../../utils';
import Slider from './Slider';

class SoundCircle extends Component {
    constructor(props){
        super(props);
        this.state = {
            soundCircle : null,
            lastMousePos : {x : 0, y: 0},
        }
        // this.init();
    }
    
    componentDidMount(){
        const {idx, soundCircle, soundCircleFromRedux } = this.props;
        console.log(this.props);
        console.log(idx, soundCircle, soundCircleFromRedux);
        this.setState({ idx, soundCircle });
    }

    hoverVolumeControl = () => {
        const { idx, soundCircle, updateSoundCircle } = this.props;
        const updatedsoundCircle = {...soundCircle};
        console.log('hovering', idx);
        updatedsoundCircle.volumeControl.hover = !soundCircle.volumeControl.hover;
        // this.setState({ imageButton : updatedImageButton });
        updateSoundCircle(idx, updatedsoundCircle);
    }

    hoverRotateControl = () => {
        const { idx, soundCircle, updateSoundCircle} = this.props;
        const updatedsoundCircle = {...soundCircle};
        updatedsoundCircle.rotateControl.hover = !soundCircle.rotateControl.hover;
        // this.setState({ imageButton : updatedImageButton });
        updateSoundCircle(idx, updatedsoundCircle)
    }

    hoverPitchControl = () => {
        const { idx, soundCircle, updateSoundCircle } = this.props;
        const updatedsoundCircle = {...soundCircle};
        updatedsoundCircle.pitchControl.hover = !soundCircle.pitchControl.hover;
        // this.setState({ imageButton : updatedImageButton });
        updateSoundCircle(idx, updatedsoundCircle);
    }

    setControlActive = (soundCircle, setting) => {
        soundCircle.tweaking = setting;
        setting.active = true;
        return soundCircle
    }


    toggleMain = () => {
        const { trigSound, idx, timerStarted, initTimer, soundCircle, updateSoundCircle} = this.props;
        const updatedsoundCircle = this.toggleMasterControl({ ...soundCircle});
        const audioParameters = {vol: soundCircle.volumeControl.val, rate: soundCircle.pitchControl.val, offset: soundCircle.imageTheta};
        const dir = 1;
        trigSound(idx, audioParameters, dir);
        updateSoundCircle(idx, updatedsoundCircle);
        if(!timerStarted){
            initTimer();
        }
    }
    toggleMasterControl = (imgButton) => {
        imgButton.active = !imgButton.active;
        imgButton.rotating = !imgButton.rotating;
        imgButton.tweaking = !imgButton.tweaking;
        return imgButton
    }

    toggleControl = (e) => {
        const { idx, soundCircle, storeMouseRef, mousePos, timerStarted, initTimer, updateSoundCircle, setTweakingIdx  } = this.props;
        const soundCircleToUpdate = {...soundCircle};
        const setting = e.target.id; 
        const updatedSoundCircle = this.setControlActive(soundCircleToUpdate, soundCircleToUpdate[setting]);
        console.log(soundCircleToUpdate);
        updateSoundCircle(idx, updatedSoundCircle);
        storeMouseRef(mousePos);
        setTweakingIdx(idx);
       
        if(!timerStarted){
            initTimer();
        }
    }



    render(){
        const { idx, soundCircle } = this.props;

        return ( 
            <g>
                        {(soundCircle != null) &&
                    <g transform={`rotate(0,${soundCircle.pos.x}, ${soundCircle.pos.y})`}>
                        <defs>
                            <pattern 
                                id={`image${idx}`} 
                                height="100%" 
                                width="100%" 
                                patternContentUnits = "objectBoundingBox">
        
                                <image 
                                    x="0" 
                                    y="0" 
                                    height="1" 
                                    width="1" 
                                    xlinkHref={soundCircle.images[soundCircle.imageIdx].default} 
                                    preserveAspectRatio = "none" >
        
                                </image>
                            </pattern>
                        </defs>
                        {/* <circle cx={500} cy={500} r={100} fill={'#FF0000'}/> */}
                        <circle  
                            cx={soundCircle.pos.x} 
                            cy={soundCircle.pos.y} 
                            r={mapVal(soundCircle.volumeControl.val,
                                0.0, 2.0, 0.6,1.4) * soundCircle.size} 
                            fill={`url(#image${idx})`} 
                            // fill={'#FF0000'}
                            strokeWidth={soundCircle.strokeWidth}
                            transform={`rotate(
                                    ${soundCircle.imageTheta},
                                    ${soundCircle.pos.x},
                                    ${soundCircle.pos.y}
                                )`}
                            stroke={soundCircle.active ? soundCircle.stroke : ''}
                            onClick={this.toggleMain}
                        />
        
                        {soundCircle.tweaking && 
                        <g>
                         <Slider 
                            name="volumeControl"
                            x={soundCircle.volumeControl.pos.x} y={soundCircle.volumeControl.pos.y} 
                            r={soundCircle.volumeControl.size} 
                            fill={soundCircle.volumeControl.active ? soundCircle.volumeControl.activeFill :
                                soundCircle.volumeControl.hover ? soundCircle.volumeControl.hoverFill : soundCircle.volumeControl.fill} 
                            stroke={soundCircle.volumeControl.stroke} 
                            strokeWidth={soundCircle.volumeControl.strokeWidth}
                            updateParentWithMouseDown={this.toggleControl}
                            // updateParentWithMouseUp={this.mouseUp}
                            updateParentWithHover={this.hoverVolumeControl}
                            
                            // updateParentWithMouseUp={this.resetVolumeControl}
                        />
        
                        <Slider
                            name="pitchControl"
                            x={soundCircle.pitchControl.pos.x} y={soundCircle.pitchControl.pos.y} 
                            r={soundCircle.pitchControl.size} 
                            fill={soundCircle.pitchControl.active ? soundCircle.pitchControl.activeFill :
                                soundCircle.pitchControl.hover ? soundCircle.pitchControl.hoverFill : soundCircle.pitchControl.fill} 
                            stroke={soundCircle.pitchControl.stroke} 
                            strokeWidth={soundCircle.pitchControl.strokeWidth}
                            updateParentWithMouseDown={this.toggleControl}
                            // updateParentWithMouseUp={this.mouseUp}
                            updateParentWithHover={this.hoverPitchControl}
                            // updateParentWithMouseUp={this.resetPitchControl}
                        /> 
                        </g>
                            }
                
                    </g>
                    }
                    </g>
                    
             );
    }
    
}

const mapStateToProps = (state, ownProps) => ({
    // mousePos :  state.mouse.mousePos,
    soundCircle : selectSoundCircle(ownProps.idx)(state),
})
const mapDispatchToProps = dispatch => ({
    trigSound : (idx, audioParameters, dir) => dispatch(trigSound(idx, audioParameters, dir)),
    updateSoundCircle : (idx, soundCircle) => dispatch(updateSoundCircle(idx, soundCircle)),
    storeMouseRef : (mousePos) => dispatch(storeMouseRef(mousePos)),
    setRotatingIdx : (idx) => dispatch(setRotatingIdx(idx)),
    setVolumingIdx: (idx) => dispatch(setVolumingIdx(idx)), 
    setPitchingIdx: (idx) => dispatch(setPitchingIdx(idx)),
    setTweakingIdx: (idx) => dispatch(setTweakingIdx(idx)),
    initTimer : () => dispatch(initTimer()),
})
 
export default connect(mapStateToProps, mapDispatchToProps)(SoundCircle);