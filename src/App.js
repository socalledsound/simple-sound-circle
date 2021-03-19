import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { addSoundCircleToRedux } from './features/soundcircle/soundCirclesSlice';
import { addSoundCircleToRedux } from './app/soundCircle/soundCircles.actions';
import SoundCircleObject from './app/soundCircle/SoundCircleObject';
import SoundCircle from './features/soundcircle/SoundCircle';
import globalSettings from './globalSettings';

const  { canvasWidth, canvasHeight } = globalSettings;
class App extends Component {
    state = {
      started : false,
    }


  componentDidMount(){
      // const { addSoundCircleToRedux } = this.props;

      


    // console.log(soundCircles);
    // this.setState({soundCircles});
  }


  initSoundCircles = () => {
      

    const data = Array.from({ length: globalSettings.numSoundCircles}, (e,i) => {
      return {
          x: i * globalSettings.soundCircle.size * 2 + globalSettings.soundCircle.leftOffset * (i + 1),
          y: globalSettings.canvasHeight/2,
          angle: 0,
      }
    });

    data.forEach((datum, i) => {
      const { addSoundCircleToRedux } = this.props;
      const soundCircle = new SoundCircleObject(i, datum.x, datum.y, datum.angle, globalSettings.images[i]);
      addSoundCircleToRedux(soundCircle);
    })

    this.setState({started : true});
  }



  render(){
    const { soundCircles } = this.props.soundCircles;
    const { started } = this.state;
   
    return ( 
        <div>
          <svg
          viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
          width={canvasWidth}
          height={canvasHeight}
          style={{backgroundColor: "#aaaaaa11"}}
          >
          <rect width="100%" height="100%" fill="#aaaaaa"/>
        {started  && 
          soundCircles.map((soundCircle, idx) => 

                                        <SoundCircle 
                                          key={`soundCircle_${idx}`} 
                                          idx={idx} 
                                         
                                          
                                      />
                          

                          )                              
        }
             </svg> 

             { !started &&
          <button style={{position:'absolute', top: '0px'}} onClick={this.initSoundCircles}>click me</button>
             }
        
                        
       
        </div>
     )
  }
  
  
}
 
const mapStateToProps = state => ({
  soundCircles : state.soundCircles,
})

const mapDispatchToProps = dispatch => ({
  addSoundCircleToRedux : (soundCircle) => dispatch(addSoundCircleToRedux(soundCircle)),
})


export default connect(mapStateToProps, mapDispatchToProps)(App);