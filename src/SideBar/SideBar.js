import React from "react";
import { Alert, AppRegistry, Image, StatusBar, View, Text, StyleSheet, TouchableHighlight, TouchableOpacity } from "react-native";
import { Container, Content, List, ListItem, Icon, Button} from "native-base";
import { Actions } from 'react-native-router-flux'; 
import firebase from 'firebase';
import { connect } from 'react-redux';
import _ from 'lodash';
const routes = ["Home", "GerenciarAgendaScreen","GerenciarVideosScreen", "Profile"];
import { signOut } from '../actions/AppActions';
import { habilitarPremiumSideBar, getUsuarioLogado } from '../actions/AutenticacaoActions';

const imgAnonimo = require('../imgs/anonymous.jpg');
const on = require('../imgs/TOOGLEON.png');
const off = require('../imgs/TOOGLEOFF.png');
class SideBar extends React.Component {

  componentDidMount(){
    console.log('SideBar componentDidMount: ', this.props)
    var user = firebase.auth().currentUser;
    this.props.getUsuarioLogado(user.email)
  }

  componentWillMount(){
    console.log('SideBar componentWillMount: ', this.props)
    
}

componentWillReceiveProps(nextProps){
  console.log('SideBar componentWillReceiveProps: ', nextProps)
    
}
_uploadImage() {
  Actions.camera()
}

  state = {
    toogle: true
  }
  _onPress() {
    const { email, titularCartao, numeroCartao, validade, cvv, premium } = this.props.usuario
   console.log('Clocou aqui: ', { email, titularCartao, numeroCartao, validade, cvv, premium })
    if( titularCartao != '' && numeroCartao != '' && validade != '' && cvv != ''){
      this.props.habilitarPremiumSideBar(!premium, email.toString())
    }else{
      Alert.alert(
        'Atenção!',
        'Por Favor, Verifique no seu perfil se seus seus dados de cartão estão preenchidos!',
        [
          {text: 'OK', onPress: () => false},
        ],
        { cancelable: false }
      )
    }

  }

  renderImage(){
    
    if (this.props.usuario.img !== "") {
        return (
            <Image
            style={styles.uploadImage}
            source={{ uri: this.props.usuario.img}}
            />
        );
    }else{
        return (
            <Image
            style={styles.uploadImage}
            source={imgAnonimo}
            />
        );
    }  
  }

  render() {
    
    const premium = this.props.usuario.premium !== null ? this.props.usuario.premium : false  
    const textValue = premium ? "ON": "OFF";
    const buttonBg = premium ? "whitesmoke" : "#e42125";
    const borderBg = premium ? "whitesmoke":"#e42125";
    const textColor = premium ? "black":"whitesmoke";
    const imgToogle = premium ? on: off;

    return (
      <Container style={styles.container}>
        <Content>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>  
                <Button
                  transparent
                  onPress={() => { this.props.navigation.navigate("Home")}}>
                  <Icon style={styles.icon} name="menu" />
                </Button>

                <View>
                    <Text style={styles.title}>Menu</Text>
                </View>
          </View>
          <View style={styles.containerImage}>
            {this.renderImage()}
          </View>
          <View style={styles.containerDadosUser}>  
              <Text style={styles.NomeUser}>{this.props.usuario.nome}</Text>       
          </View>

          <View style={{ flex: 5, marginTop: 10, marginLeft: 10, marginBottom: 50, }}>
              <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 10 }}>  
                    <TouchableHighlight style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate("Profile")}>
                        <Text style={{fontSize: 20, color: '#fff'}}>Alterar perfil</Text>
                    </TouchableHighlight>      
              </View>

              <View style={{ flexDirection: 'row', marginTop: 60, marginLeft: 10 }}>  
                    <TouchableHighlight style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                      if(this.props.usuario.mentoring){
                        this.props.navigation.navigate("GerenciarAgendaScreen")
                      }else{
                        return false
                      }
                    }}>
                        <Text style={{fontSize: 20, color: '#fff'}}>Gerenciar Agenda (mentor)</Text>
                    </TouchableHighlight>      
              </View>

              <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 10 }}>  
                    <TouchableHighlight style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                      if(this.props.usuario.mentoring){
                        this.props.navigation.navigate("GerenciarVideosScreen")
                      }else{
                        return false
                      }
                  }}>
                        <Text style={{fontSize: 20, color: '#fff'}}>Gerenciar Videos (mentor)</Text>
                    </TouchableHighlight>      
              </View>

              <View style={{ flexDirection: 'row', marginTop: 50, marginLeft: 10 }}>  
                    <TouchableHighlight style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate("Home")}>
                        <Text style={{fontSize: 20, color: '#fff'}}>Tela Principal</Text>
                    </TouchableHighlight>      
              </View>

              <View style={{ flexDirection: 'row', marginTop: 50, marginLeft: 10 }}>  
                    <TouchableHighlight style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                      if(this.props.usuario.mentoring){
                        return false
                      }else{
                        this.props.navigation.navigate("FormMentoring")
                      }
                  }}>
                        <Text style={{fontSize: 20, color: '#fff'}}>Torna-se mentor</Text>
                    </TouchableHighlight>      
              </View>

              <View style={{ marginTop: 10, marginLeft: 10, flexDirection: 'row'}}>
                    <Text style={{marginTop: 10, marginBottom: 30, backgroundColor: "transparent", fontSize: 16, color: '#fff', fontWeight: 'bold', marginRight: 15}}>Habilitar conta Premium </Text>
                    <TouchableOpacity onPress={() => this._onPress()} style={{
                    justifyContent: 'center',
                    marginBottom: 15,
                    alignItems:'center'}} >
                             <Image
                                style={{width: 45, height: 15}}
                                source={imgToogle}
                                />
                    </TouchableOpacity>
                    
            </View>
            <View style={{ marginTop: 5, marginLeft: 10, flexDirection: 'row'}}>
              <TouchableHighlight style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.props.navigation.navigate("DrawerClose"); this.props.signOut()}}>
                        <Text style={{fontSize: 20, color: '#fff'}}>Logout</Text>
                    </TouchableHighlight>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2a29'
  },
  containerImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerDadosUser: {
      flexDirection: 'row',
      marginTop: 15,
      justifyContent: 'center',
      alignItems: 'center', 
  },
  uploadImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginTop: 25,  
},
  header: {
    backgroundColor: '#fc5b0b'
  },
  title: {
    backgroundColor: 'transparent',
    fontSize: 20,
    marginTop: 10,
    color: '#fff',
  },
  NomeUser: {
    backgroundColor: 'transparent',
    fontSize: 20,
    marginTop: 10,
    color: '#fff',
    fontWeight: 'bold'
  },
  icon: {
    fontSize: 35,
    color: '#fff',
    
  },
});

const mapStateToProps = state => {

  const usuario = state.SideBarReducer;

  //console.log('mapStateToProps SideBar', usuario)
 //console.log('Conversas mapStateToProps state: ', state);

    return ({
      usuario,
      email: state.AuthenticacaoReducer.email,
    })
  }

export default connect(mapStateToProps, {signOut, habilitarPremiumSideBar, getUsuarioLogado})(SideBar)
