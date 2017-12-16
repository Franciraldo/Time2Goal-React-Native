import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  RefreshControl
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificarIMG } from '../actions/AutenticacaoActions';
import Camera from 'react-native-camera';

class CameraView extends Component {
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
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }

  takePicture() {
    const options = {};
    
    this.camera.capture({metadata: options})
      .then((data) => {
        //console.log(data)
        this.props.modificarIMG(data.path)
        Actions.pop()
        
        
      })
      .catch(err => console.error(err));
  }
}

const mapStateToProps = state => (
  {
      imgData: state.AuthenticacaoReducer.img
  }
);

export default connect(mapStateToProps, {modificarIMG})(CameraView);

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
     color: '#000',
     padding: 10,
     margin: 40
   }
});