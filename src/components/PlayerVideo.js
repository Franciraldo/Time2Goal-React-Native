import React, {
    Component
  } from 'react';
  
  import {
    AlertIOS,
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  
import Video from 'react-native-video';
import { connect } from 'react-redux';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import VideoPlayer, {}from 'react-native-video-controls';



class PlayerVideo extends Component {

  componentDidMount() {
    console.log('PlayerVideo componentDidMount: ', this.props);       
  }
  componentWillMount() {
    console.log('PlayerVideo componentWillMount: ', this.props)    
  }
  componentWillReceiveProps(nextProps){
    console.log('PlayerVideo componentWillReceiveProps: ', nextProps)
  }
    
      render() {
        return(
          <VideoPlayer
              source={{ uri: this.props.uri }}
              onBack={ () => {Actions.pop()}}
              rate={1.0}                              // 0 is paused, 1 is normal.
              volume={1.0}                            // 0 is muted, 1 is normal.
              muted={false}                           // Mutes the audio entirely.
              paused={true}                          // Pauses playback entirely.
              resizeMode="contain"                      // Fill the whole screen at aspect ratio.*
              repeat={false}                           // Repeat forever.
              playInBackground={false}                // Audio continues to play when app entering background.
              playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
              ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
              progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
              onLoadStart={this.loadStart}            // Callback when video starts to load
              onLoad={this.setDuration}               // Callback when video loads
              onProgress={this.setTime}               // Callback every ~250ms with currentTime
              onEnd={this.onEnd}                      // Callback when playback finishes
              onError={this.videoError}               // Callback when video cannot be loaded
              onBuffer={this.onBuffer}                // Callback when remote video is buffering
              onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
              controlTimeout={1000}     // hide controls after ms of inactivity. 
              navigator={navigator}      // prop from React Native <Navigator> component 
              seekColor={'#FFF'}         // fill/handle colour of the seekbar 
          />
        );
      }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      },
      fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
      controls: {
        backgroundColor: "transparent",
        borderRadius: 5,
        position: 'absolute',
        bottom: 44,
        left: 4,
        right: 4,
      },
      progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
      },
      innerProgressCompleted: {
        height: 20,
        backgroundColor: '#cccccc',
      },
      innerProgressRemaining: {
        height: 20,
        backgroundColor: '#2C2C2C',
      },
      generalControls: {
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden',
        paddingBottom: 10,
      },
      skinControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
      },
      rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
      },
      volumeControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
      },
      resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      },
      ignoreSilentSwitchControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      },
      controlOption: {
        alignSelf: 'center',
        fontSize: 11,
        color: "white",
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12,
      },
      nativeVideoControls: {
        top: 184,
        height: 300
      }    
  });

const mapStateToProps = state => {
    return {  };
}

export default connect(mapStateToProps, {})(PlayerVideo)