import React from "react";
import { AppRegistry, Alert, StyleSheet, TextInput, View, TouchableHighlight, Picker, ActivityIndicator, Image, FlatList, Dimensions } from "react-native";
import { Container, Header, Left, Body, Title, Card, CardItem, Content, Right, Icon, Button, Text } from "native-base";
import { StackNavigator } from "react-navigation";
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import {connect} from 'react-redux';
import { checkpopup, modificarTypeVideo, uploadVideos, getVideosMentorFree, getVideosMentorPremium, modificarTitulo } from '../actions/GerenciarVideosActions';
import RNFetchBlob from 'react-native-fetch-blob'
import VideoPlayer from 'react-native-video-player';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
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

let {width} = Dimensions.get('window')
let numberGrid = 3
let itemWidth = width / numberGrid

class GerenciarVideosScreen extends React.Component {
  componentDidMount() {
    this.props.navigation.setParams({ popupDialog: this.popupDialog });
    console.log('GerenciarVideosScreen componentDidMount: ', this.props); 
    const { email } = this.props.usuario;
    this.props.getVideosMentorFree(email);
    this.props.getVideosMentorPremium(email);
    
  }
  componentWillMount() {
    console.log('GerenciarVideosScreen componentWillMount: ', this.props)
        
  }
  componentWillReceiveProps(nextProps){
    console.log('GerenciarVideosScreen componentWillReceiveProps: ', nextProps)
  }
  renderItem = ({item}) => {
    //console.log('renderItem: ', item);
    return (
      <TouchableHighlight onPress={() => {      
        Actions.playerVideo({uri: item.uri, thumbnail: item.thumbnail})
      }}>
          <Image source={{uri: item.thumbnail}} style={styles.itemImage} />
        </TouchableHighlight>
    );
   }
  renderVideos() {
    const {lista_videos_free, lista_videos_premium} = this.props;
    if(this.props.loadin_upload){
        return (
          <View style={{
            flex: 1,
            marginTop: 250,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <ActivityIndicator size='large'/>
            <Text style={styles.mensagem_text}>carregando...</Text>
          </View>
        );    
    }else{
      //Quando não possuir videos
      if(lista_videos_free.length === 0 && lista_videos_premium.length === 0){
        return(
          <View>
            <Text style={styles.mensagem_text}>Você não possui videos</Text>          
          </View>
        );
      }
      //Quando so possuir videos premium
      if(lista_videos_free.length === 0 && lista_videos_premium.length !== 0){
        return(
          <View>
            <Text style={styles.text}>Videos Free</Text>
            <Text style={styles.mensagem_text}>Você não possui videos free</Text>
            <Text style={styles.text}>Videos Premium</Text>
            <FlatList  
                        keyExtractor={(_, index) => index} 
                        numColumns={numberGrid} data={lista_videos_premium} 
                        renderItem={this.renderItem} />
          </View>
        );
      }
      //Quando so possuir videos free
      if(lista_videos_free.length !== 0 && lista_videos_premium.length === 0){
        return(
        <View>
            <Text style={styles.text}>Videos Free</Text>
            <FlatList  
                        keyExtractor={(_, index) => index} 
                        numColumns={numberGrid} data={lista_videos_free} 
                        renderItem={this.renderItem} />
            <Text style={styles.text}>Videos Premium</Text>
            <Text style={styles.mensagem_text}>Você não possui videos Premium</Text>
          </View>
        );
      }
      //Quando so possuir videos free e premium
      if(lista_videos_free.length !== 0 && lista_videos_premium.length !== 0){
        return(
          <View>
            <Text style={styles.text}>Videos Free</Text>
            <FlatList  
                        keyExtractor={(_, index) => index} 
                        numColumns={numberGrid} data={lista_videos_free} 
                        renderItem={this.renderItem} />
            <Text style={styles.text}>Videos Premium</Text>
            <FlatList  
                        keyExtractor={(_, index) => index} 
                        numColumns={numberGrid} data={lista_videos_premium} 
                        renderItem={this.renderItem} />
          </View>
        );
      }
    }
  }
  render() {
    return (
      <Container>
        <Content padder style={styles.container}>
              <PopupDialog height= {350} dialogTitle={<DialogTitle titleStyle={styles.DialogTitle} titleTextStyle={{color: 'white'}} title="Upload de Video" />} dialogAnimation={this.slideAnimation}  dialogStyle={{backgroundColor: '#2b2a29'}} ref={(popupDialog) => { this.popupDialog = popupDialog; }}>          
                          <View zIndex={1} style={{ flex: 2, flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                                <TextInput value={this.props.titulo} style={styles.textInput} placeholderTextColor='#fff' placeholder='Título do Video' onChangeText={texto => this.props.modificarTitulo(texto)}/>
                                <View style={styles.linha}></View>
                          </View>
                          <View zIndex={0} style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginBottom: 50}}>
                                  <Picker
                                    selectedValue={ this.props.select_type_video }
                                    onValueChange={ type => this.props.modificarTypeVideo(type) }>
                                    <Picker.Item color='#fff' label='' value=''/>
                                    <Picker.Item color='#fff' label="free" value="free" />
                                    <Picker.Item color='#fff' label="premium" value="premium" />
                                  </Picker>
                            </View>

                          <View zIndex={2} style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                              <TouchableHighlight style={styles.btn} onPress={() => {
                                let {select_type_video, titulo} = this.props;
                                console.log('select_type_video: ', { select_type_video, titulo});
                                if(select_type_video != '' && titulo != '' && titulo != undefined){
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
                                      
                                      
                                        this.props.uploadVideos(response, this.props.usuario, select_type_video, titulo)
                                    }
                                  });
                                }else{
                                  Alert.alert(
                                    'Atenção',
                                    'Os campos Titulo e Tipo de Video são obrigatorios. Por Favor informe os campos!',
                                    [
                                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                                    ],
                                    { cancelable: false }
                                  )
                                }                                
                                this.popupDialog.dismiss()
                              } }>
                                  <Text style={styles.btnText}>Confirmar</Text>
                              </TouchableHighlight>
                          </View>
                  </PopupDialog>
                  <View style={{flex: 1, justifyContent: "space-between"}}>
                    {this.renderVideos()}
                  </View>
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
linha: {
  backgroundColor: 'white',
  width: 300,
  height: 2
},
textInput: { 
  color: '#fff', 
  width: 300, 
  backgroundColor: 'black',
  opacity: 0.5, 
  fontSize: 20, 
  height: 45,
},
itemImage:{
  width: itemWidth,
  height: itemWidth
},
btnText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: 'bold'
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
mensagem_text:{
  textAlign: 'center',
  marginTop: 10,
  marginBottom: 10,
  fontSize: 12,
  color: '#fff',
}
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
      lista_videos_free: state.GerenciarVideosReducer.lista_videos_free,
      lista_videos_premium: state.GerenciarVideosReducer.lista_videos_premium,
      titulo: state.GerenciarVideosReducer.titulo,
    })
  }

export default connect(mapStateToProps, {checkpopup, modificarTypeVideo, uploadVideos, getVideosMentorFree, getVideosMentorPremium, modificarTitulo})(GerenciarVideosScreen)