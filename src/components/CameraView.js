import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  RefreshControl } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificarIMG } from '../actions/AutenticacaoActions';
import Camera from 'react-native-camera';
import { modificaImg1, modificaImg2 } from '../actions/FormMentoringActions';
import { NavigationActions } from 'react-navigation'

class CameraView extends Component {

  componentDidMount(){
      console.log('CameraView componentDidMount: ', this.props)      
  }

  componentWillMount(){
      console.log('CameraView componentWillMount: ', this.props)
  }

  componentWillReceiveProps(nextProps){
      console.log('CameraView componentWillReceiveProps: ', nextProps)

  }

  render() {
      
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          captureTarget={Camera.constants.CaptureTarget.disk}
          aspect={Camera.constants.Aspect.fill}>
          <TouchableHighlight style={styles.capture} onPress={this.takePicture.bind(this)}>
              <Text>[CAPTURE]</Text>
          </TouchableHighlight>
        </Camera>
      </View>
    );
  }

  takePicture() {

    const options = {};

    switch(this.props.screen_request) { 
      case "form_mentoring_screen_img1":
      
        this.camera.capture({metadata: options})
          .then((data) => {
            console.log('img1:', data)
            this.props.modificaImg1(data.path)          
            this.props.navigation.navigate('FormMentoring') 
          })
          .catch(err => console.error(err));
          break;
           

      case "form_mentoring_screen_img2":

          this.camera.capture({metadata: options})
          .then((data) => {
            //console.log('img2:', data)
            this.props.modificaImg2(data.path)
            this.props.navigation.navigate('FormMentoring')            
            
          })
          .catch(err => console.error(err));
          break;

      default:

          this.camera.capture({metadata: options})
          .then((data) => {
            //console.log(data)
            this.props.modificarIMG(data.path)
            Actions.pop()
            
            
          })
          .catch(err => console.error(err));
          break;
  }
    
    
  }
}

const mapStateToProps = state => (
  {
      screen_request: state.AuthenticacaoReducer.screen_request,
      imgData: state.AuthenticacaoReducer.img
      
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
   capture: {
     flex: 0,
     backgroundColor: '#fff',
     borderRadius: 5,
     //color: '#000',
     padding: 10,
     margin: 40
   }
});

export default connect(mapStateToProps, {modificarIMG, modificaImg1, modificaImg2})(CameraView);