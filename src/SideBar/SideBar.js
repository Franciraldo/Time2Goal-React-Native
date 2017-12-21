import React from "react";
import { AppRegistry, Image, StatusBar, View, Text, StyleSheet, TouchableHighlight, TouchableOpacity } from "react-native";
import { Container, Content, List, ListItem, Icon, Button} from "native-base";
import { Actions } from 'react-native-router-flux'; 
import firebase from 'firebase';
import { connect } from 'react-redux';
import _ from 'lodash';
const routes = ["Home", "GerenciarAgendaScreen","GerenciarVideosScreen", "Profile"];
import { setEmail } from '../actions/AutenticacaoActions';

class SideBar extends React.Component {

  componentWillMount(){
    console.log('SideBar componentWillMount email: ', this.props.email)
    this.props.setEmail(this.props.email)  
    
}

componentWillReceiveProps(nextProps){
  console.log('SideBar componentWillReceiveProps email: ', nextProps.email)
    
}

  state = {
    toogle: true
  }
  _onPress() {
    const newState = !this.state.toogle;
    this.setState({ toogle: newState })
  }

  render() {
    
    const {toogle} = this.state;
    const textValue = toogle ? "ON": "OFF";
    const buttonBg = toogle ? "whitesmoke" : "#e42125";
    const borderBg = toogle ? "whitesmoke":"#e42125";
    const textColor = toogle ? "black":"whitesmoke";

    return (
      <Container style={styles.container}>
        <Content>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>  
                <Button
                  transparent
                  onPress={() => this.props.navigation.navigate("Home")}>
                  <Icon style={styles.icon} name="menu" />
                </Button>

                <View>
                    <Text style={styles.title}>Menu</Text>
                </View>
          </View>
          <View style={{ flex: 2, flexDirection: 'row', marginTop: 15 }}>  
                <View>
                    <Text style={styles.NomeUser}>Nome do Usuario</Text>
                </View>
          </View>
          <View style={{ flex: 5, marginTop: 50, marginBottom: 50 }}>
              <View style={{ flexDirection: 'row', marginTop: 15 }}>  
                    <TouchableHighlight style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate("Profile")}>
                        <Text style={{fontSize: 20, color: '#fff'}}>Alterar perfil</Text>
                    </TouchableHighlight>      
              </View>

              <View style={{ flexDirection: 'row', marginTop: 15 }}>  
                    <TouchableHighlight style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate("GerenciarAgendaScreen")}>
                        <Text style={{fontSize: 20, color: '#fff'}}>Gerenciar Agenda</Text>
                    </TouchableHighlight>      
              </View>

              <View style={{ flexDirection: 'row', marginTop: 15 }}>  
                    <TouchableHighlight style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate("GerenciarVideosScreen")}>
                        <Text style={{fontSize: 20, color: '#fff'}}>Gerenciar Videos</Text>
                    </TouchableHighlight>      
              </View>

              <View style={{ flexDirection: 'row', marginTop: 15 }}>  
                    <TouchableHighlight style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate("GerenciarVideosScreen")}>
                        <Text style={{fontSize: 20, color: '#fff'}}>Torna-se mentor</Text>
                    </TouchableHighlight>      
              </View>
          </View>
          


          <View style={{ flex: 1,  marginTop: 10, flexDirection: 'row'}}>
                    <Text style={{marginTop: 10, marginBottom: 30, backgroundColor: "transparent", fontSize: 16, color: '#fff', fontWeight: 'bold', marginRight: 15}}>Habilitar conta Premium </Text>
                    <TouchableOpacity onPress={() => this._onPress()} style={{ width: 55, height: 25,
                    borderWidth: 1, marginTop: 10,
                    borderColor: borderBg , borderRadius: 18, 
                    padding: 10, justifyContent: 'center',
                    alignItems:'center', backgroundColor: buttonBg}} >
                            <Text style={{backgroundColor: "transparent", fontSize: 16, color: textColor, fontWeight: 'bold'}}>{textValue}</Text>
                    </TouchableOpacity>
                    
            </View>

            <View style={{ flex: 1,  marginTop: 10, flexDirection: 'row'}}>
              <TouchableHighlight style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }} onPress={() => firebase.auth().signOut().then(() => Actions.formLogin())}>
                        <Text style={{fontSize: 20, color: '#fff'}}>Logout</Text>
                    </TouchableHighlight>
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

const mapStateToProps = state => (
  {
      nome: state.AuthenticacaoReducer.nome,
      email: state.AuthenticacaoReducer.email,
      img: state.AuthenticacaoReducer.img,
      facebookid: state.AuthenticacaoReducer.facebookid,
      bool: state.AuthenticacaoReducer.bool
  }
);

export default connect(mapStateToProps, {setEmail})(SideBar)
