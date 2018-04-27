import React from "react";
import { AppRegistry, Alert, StyleSheet, View, TouchableHighlight, Picker, ActivityIndicator } from "react-native";
import { Container, Header, Left, Body, Title, Card, CardItem, Content, Right, Icon, Button, Text } from "native-base";
import { StackNavigator } from "react-navigation";
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import {connect} from 'react-redux';
import { checkpopup, modificarTypeVideo, uploadVideos, getVideosMentorFree } from '../actions/GerenciarVideosActions';
import RNFetchBlob from 'react-native-fetch-blob'
var ImagePicker = require('react-native-image-picker');
// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Select Avatar',
  mediaType: 'video',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

class GerenciarVideosScreen extends React.Component {
  componentDidMount() {
    this.props.navigation.setParams({ popupDialog: this.popupDialog });
    console.log('GerenciarVideosScreen componentDidMount: ', this.props) 
    const { email } = this.props.usuario;
    this.props.getVideosMentorFree(email);
    
  }
  componentWillMount() {
    console.log('GerenciarVideosScreen componentWillMount: ', this.props)
        
  }
  componentWillReceiveProps(nextProps){
    console.log('GerenciarVideosScreen componentWillReceiveProps: ', nextProps)
  }
  renderVideos() {
    if(this.props.loadin_upload){
        return (
            <ActivityIndicator size='large'/>
        );    
    }else{
      return(
        <View>
          <Text style={{color: '#fff'}}>Videos</Text>
        </View>
      );  
    }
  }
  render() {
    return (
      <Container>
        <Content padder style={styles.container}>
              <PopupDialog height= {250} dialogTitle={<DialogTitle titleStyle={styles.DialogTitle} titleTextStyle={{color: 'white'}} title="Tipo de Video" />} dialogAnimation={this.slideAnimation}  dialogStyle={{backgroundColor: '#2b2a29'}} ref={(popupDialog) => { this.popupDialog = popupDialog; }}>          
                          <View zIndex={1} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', bottom: 10, top: 5}}>
                              <View style={{ flex: 1, flexDirection: 'column' }}>
                                  <Picker
                                    selectedValue={ this.props.select_type_video }
                                    onValueChange={ type => this.props.modificarTypeVideo(type) }>
                                    <Picker.Item color='#fff' label='' value=''/>
                                    <Picker.Item color='#fff' label="free" value="free" />
                                    <Picker.Item color='#fff' label="premium" value="premium" />
                                  </Picker>
                              </View>
                          </View>
                          <View zIndex={2} style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                              <TouchableHighlight style={styles.btn} onPress={() => {
                                console.log('select_type_video: ', this.props.select_type_video);
                                if(this.props.select_type_video != ''){
                                  ImagePicker.showImagePicker(options, (response) => {
                                    if (response.didCancel) {
                                      console.log('User cancelled image picker');
                                    }
                                    else if (response.error) {
                                      console.log('ImagePicker Error: ', response.error);
                                    }
                                    else if (response.customButton) {
                                      console.log('User tapped custom button: ', response.customButton);
                                    }
                                    else {
                                      let source = { uri: response.uri };
                                  
                                      // You can also display the image using data:
                                      // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                                      console.log('Response = ', response);
                                      
                                      
                                        this.props.uploadVideos(response.origURL, this.props.usuario, this.props.select_type_video)
                                    
                                      
                                      
                                    }
                                  });
                                }else{
                                  alert('por favor selecione um tipo')
                                }                                
                                this.popupDialog.dismiss()
                              } }>
                                  <Text style={styles.btnText}>Confirmar</Text>
                              </TouchableHighlight>
                          </View>
                  </PopupDialog>

                  {this.renderVideos()}

        </Content>
      </Container>
    );
  }
}

GerenciarVideosScreen.navigationOptions = ({ navigation }) => ({
  header: (
    <Header style={{ backgroundColor: '#fc5b07'}} titleStyle={{backgroundColor: 'transparent', color: '#fff'}}>
      <Left>
        <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
          <Icon name="menu"  style={{backgroundColor: 'transparent', color: '#fff'}}/>
        </Button>
      </Left>
      <Body>
        <Title style={{backgroundColor: 'transparent', color: '#fff'}}> Meus Videos </Title>
      </Body>
      <Right>
        <Button transparent
          onPress={() => {
            navigation.state.params.popupDialog.show()
          } }  underlayColor="transparent">
          <Icon style={styles.icon} name="ios-add" />
        </Button>
      </Right>
    </Header>
  )
});

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  DialogTitle: {
    backgroundColor: '#fc5b07',
    borderColor: '#fc5b07',
  },
  btn: { 
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#532e1c',
    borderRadius: 18,
    backgroundColor: '#fc5b07',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 250
},
btnText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: 'bold'
},
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#2b2a29'

},
uploadImage: {
  justifyContent: 'flex-end',
  marginLeft: 200,
  width: 30,
  height: 30,
  borderRadius: 15  
},
item: {
  padding: 10,
  fontSize: 18,
  backgroundColor: 'transparent',
  color: '#fff',
  height: 44,
},
icon: {
  fontSize: 35,
  color: '#fff',
  
},
text: {
  marginTop: 30,
  marginBottom: 10,
  fontSize: 15,
  color: '#fff',
},
});

const mapStateToProps = state => {

  const usuario = state.HomeReducer;

  //console.log('mapStateToProps SideBar', usuario)
 //console.log('Conversas mapStateToProps state: ', state);

    return ({
      usuario,
      abrirPopUp: state.GerenciarVideosReducer.abrirPopUp,
      select_type_video: state.GerenciarVideosReducer.select_type_video,
      loadin_upload: state.GerenciarVideosReducer.loadin_upload,
      lista_videos: state.GerenciarVideosReducer.lista_videos
    })
  }

export default connect(mapStateToProps, {checkpopup, modificarTypeVideo, uploadVideos, getVideosMentorFree})(GerenciarVideosScreen)