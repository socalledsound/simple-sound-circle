import React, { Component } from 'react';
import { connect } from 'react-redux';
import SoundCircle from '../soundcircle/SoundCircle';
import globalSettings from '../../globalSettings';
import { updateMousePos, storeMouseRef } from '../../app/mouse/mouse.actions';
import { resetSoundCircleControlStates } from '../../app/soundCircle/soundCircles.actions';
const  { canvasWidth, canvasHeight } = globalSettings;

class MainContainer extends Component {
    constructor(props){
      super(props)
      this.svgRef = React.createRef();
    }


    mouseUp = (x, y) => {
      const { resetSoundCircleControlStates, storeMouseRef } = this.props;
      console.log('up');
      resetSoundCircleControlStates();
      storeMouseRef({x : x, y: y});
  }


    render(){
      const { updateMousePos } = this.props
        const { soundCircles } = this.props.soundCircles;
        return (
          <div
          onMouseMove={(e) => updateMousePos(e.clientX, e.clientY)}
          onMouseUp={(e) => this.mouseUp(e.clientX, e.clientY)}
          style={{ overflow: "hidden" }}
          ref={this.svgRef}
      >
            <svg
          viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
          width={canvasWidth}
          height={canvasHeight}
          style={{backgroundColor: "#aaaaaa11" }}
          
          >
          {/* <rect width="100%" height="100%" fill="#aaFFaa"/> */}
        {
          soundCircles.map((soundCircle, idx) => 

                                        <SoundCircle 
                                          key={`soundCircle_${idx}`} 
                                          idx={idx} 
                                         
                                          
                                      />
                          

                          )                              
        }
             </svg> 
             </div>
        )
    }


}


const mapStateToProps = state => ({
    soundCircles : state.soundCircles,
  })
  const mapDispatchToProps = dispatch => ({
    updateMousePos : (x, y) => dispatch(updateMousePos(x, y)),
    storeMouseRef : (mousePos) => dispatch(storeMouseRef(mousePos)),
    resetSoundCircleControlStates : () => dispatch(resetSoundCircleControlStates()),
})
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)