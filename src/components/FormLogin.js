import React, { Component } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Image, TouchableHighlight,  ActivityIndicator, ImageBackground} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaEmail, modificaNome, modificaSenha, autenticarUsuario, modificaFacebookId, modificarIMG, autenticarFacebook } from '../actions/AutenticacaoActions';
import FBSDK, { LoginButton, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk'


const background = require('../imgs/background.png');
const logo = require('../imgs/logo.png');
class formLogin  extends Component {

    _autenticarUsuario() {
        const {email, senha} = this.props;
        this.props.autenticarUsuario({email, senha});
    }
    _fbAuth(){
        
      }

    renderBtnAcessar() {
        if(this.props.loading_login){
            return (
                <ActivityIndicator size='large'/>
            );    
        }
        return (
            <View>
                
                <TouchableHighlight style={{ borderWidth: 1, borderColor: '#9da3a2', borderRadius: 18, backgroundColor: '#fefefe', padding: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => this._autenticarUsuario()}>
                    <Text style={{fontSize: 20, color: '#00319c', fontWeight: 'bold'}}>ENTRAR</Text>
                </TouchableHighlight>

                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15, marginBottom: 15 }}>
                    <Text style={{fontSize: 20, color: '#fff', backgroundColor: 'transparent', fontWeight: '500', justifyContent: 'center', alignItems: 'center' }}>OU</Text>
                </View>
                
                <View>
                <LoginButton
                    style={{ padding: 23, justifyContent: 'center', alignItems: 'center' }}
                    publishPermissions={["publish_actions"]}
                    onLoginFinished={
                        (error, result) => {

                        if (error) {
                            alert("login has error: " + result.error);
                        } else if (result.isCancelled) {
                            alert("login is cancelled.");
                        } else {
                            AccessToken.getCurrentAccessToken().then(
                            (data) => {
                                let accessToken = data.accessToken;
                                //alert(accessToken.toString());

                                const responseInfoCallback = (error, result) => {
                                if (error) {
                                    console.log(error)
                                    alert('Error fetching data: ' + error.toString());
                                } else {
                                    console.log(result)
                                    
                                    this.props.modificaNome(result.name)
                                    this.props.modificaEmail(result.email)
                                    this.props.modificarIMG(result.picture.data.url)
                                    this.props.modificaFacebookId(result.id)

                                    this.props.autenticarFacebook(this.props.nome, this.props.email, this.props.facebookid, this.props.img )
                                    //alert('Success fetching data: ' + result.toString());
                                }
                                }

                                const infoRequest = new GraphRequest(
                                '/me',
                                {
                                    accessToken: accessToken,
                                    parameters: {
                                    fields: {
                                        string: 'email,name,first_name,middle_name,last_name, picture'
                                    }
                                    }
                                },
                                responseInfoCallback
                                );

                                // Start the graph request.
                                new GraphRequestManager().addRequest(infoRequest).start();

                            })
                        }
                        }
                    }
                    onLogoutFinished={() => alert("logout.")}/>
                </View>
                
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15, marginBottom: 15 }}>
                    <Text style={{fontSize: 20, color: '#fff', backgroundColor: 'transparent', fontWeight: '500', justifyContent: 'center', alignItems: 'center' }}>OU</Text>
                </View>
                
                <TouchableHighlight style={{ borderWidth: 1, borderColor: '#9da3a2', borderRadius: 18, backgroundColor: '#fefefe', padding: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => Actions.formCadastro()}>
                    <Text style={{fontSize: 20, color: '#00319c', fontWeight: 'bold'}}>CRIAR CONTA</Text>
                </TouchableHighlight>
            
            </View>
        );
    }
    render() {
        return (
            <ImageBackground style={{flex: 1, width: null}} source={background}>
                <View style={{flex: 1, padding: 10}}>
                    <View style={{flex:2, justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={logo} />
                    </View>
                    <View style={{flex: 2}}>
                        <TextInput value={this.props.email} style={{ color: '#fff', backgroundColor: 'transparent', fontSize: 20, height: 45 }} placeholderTextColor='#fff' placeholder='E-mail' onChangeText={texto => this.props.modificaEmail(texto)}/>
                        <TextInput secureTextEntry value={this.props.senha} style={{ color: '#fff', backgroundColor: 'transparent', fontSize: 20, height: 45}} placeholderTextColor='#fff' placeholder='Senha'  onChangeText={texto => this.props.modificaSenha(texto)}/>
                        <Text style={ { backgroundColor: 'transparent', color: '#ff0000', fontSize: 18} }> {this.props.erroLogin}</Text>
                    </View>
                    <View style={{flex: 4}}>
                        {this.renderBtnAcessar()}
                    </View>
                </View>
            </ImageBackground>
        ); 
    }
  }

const mapStateToProps = state => (
    {
        nome: state.AuthenticacaoReducer.nome,
        email: state.AuthenticacaoReducer.email,
        senha: state.AuthenticacaoReducer.senha,
        erroLogin: state.AuthenticacaoReducer.erroLogin,
        img: state.AuthenticacaoReducer.img,
        facebookid: state.AuthenticacaoReducer.facebookid,
        loading_login: state.AuthenticacaoReducer.loading_login
    }
);

export default connect(mapStateToProps, { modificaNome, modificaEmail, modificarIMG, modificaFacebookId, modificaSenha, autenticarUsuario, autenticarFacebook })(formLogin);