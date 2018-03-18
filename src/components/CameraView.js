import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificarIMG } from '../actions/AutenticacaoActions';
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
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }

  takePicture = async function() {

    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      switch(this.props.screen_request) { 
        case "form_mentoring_screen_img1":
              console.log('img1:', data)
              this.props.modificaImg1(data.uri)          
              this.props.navigation.navigate('FormMentoring') 
            break;
        case "form_mentoring_screen_img2":
              //console.log('img2:', data)
              this.props.modificaImg2(data.uri)
              this.props.navigation.navigate('FormMentoring')            
            break;
        default:
              console.log(data)
              this.props.modificarIMG(data.uri)
              Actions.pop()
            break;
    }
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
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});

export default connect(mapStateToProps, {modificarIMG, modificaImg1, modificaImg2})(CameraView);