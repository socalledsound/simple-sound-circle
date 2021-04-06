import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { addSoundCircleToRedux } from './features/soundcircle/soundCirclesSlice';
import { addSoundCircleToRedux } from './app/soundCircle/soundCircles.actions';
import SoundCircleObject from './app/soundCircle/SoundCircleObject';
import globalSettings from './globalSettings';
import MainContainer from './features/MainContainer/MainContainer';


const appContainer = {
  backgroundColor : '#333',
  height: '100vh',
  width: '100vw',
  position : 'absolute',
}

class App extends Component {
    state = {
      started : false,
    }

  initSoundCircles = () => {
      

    const data = Array.from({ length: globalSettings.numSoundCircles}, (e,i) => {
      return {
          x: i * globalSettings.soundCircle.size * 2 + 50 + globalSettings.soundCircle.leftOffset * (i + 1),
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
   
    const { started } = this.state;
    
   
    return ( 
      <div style={appContainer}>
          {started ?  


          <MainContainer />
          : 
          <button style={{position:'absolute', top: '300px', left: '300px'}} onClick={this.initSoundCircles}>click me</button>
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