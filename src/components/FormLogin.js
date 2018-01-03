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
        if (email != undefined && senha != undefined){
            this.props.autenticarUsuario(email, senha, this.props.navigation);
        }else{
            alert('Por favor insira Senha e Usuário')
        }
        
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
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                
                <TouchableHighlight style={styles.btn} onPress={() => this._autenticarUsuario()}>
                    <Text style={styles.btnText}>ENTRAR</Text>
                </TouchableHighlight>

                <View style={{marginTop: 15, marginBottom: 15 }}>
                    <Text style={styles.textOu}>ou</Text>
                </View>
                
                <TouchableHighlight style={styles.btn} onPress={() => Actions.formCadastro()}>
                    <Text style={styles.btnText}>CRIAR CONTA</Text>
                </TouchableHighlight>
                
                
                <View style={{flexDirection: 'row', marginTop: 15, marginBottom: 15 }}>
                    <Text style={styles.textOu}>ou</Text>
                </View>
                
                <View>
                <LoginButton
                    style={styles.btnFacebook}
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

                                    this.props.autenticarFacebook(this.props.nome, this.props.email, this.props.facebookid, this.props.img, this.props.navigation )
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
            
            </View>
        );
    }
    render() {
        return (
            <ImageBackground style={{flex: 1, width: null}} source={background}>
                <View style={{flex: 1, padding: 10}}>
                    <View style={{flex:2, justifyContent: 'center', alignItems: 'center'}}>
                        <Image  source={logo} />
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <View>
                            <TextInput value={this.props.email} style={styles.textInput} placeholderTextColor='#fff' placeholder='usuário' onChangeText={texto => this.props.modificaEmail(texto)}/>
                            <View style={styles.linha}></View>
                        </View>
                        
                        <View style={styles.containerTextInput}>
                            <TextInput secureTextEntry value={this.props.senha} style={styles.textInput} placeholderTextColor='#fff' placeholder='senha'  onChangeText={texto => this.props.modificaSenha(texto)}/> 
                            <View style={styles.linha}></View>   
                        </View>
                        
                        
                        

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

  const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    containerTextInput: {
        marginTop: 20
    },
    textInput: { 
        color: '#fff', 
        width: 200, 
        backgroundColor: 'black',
        opacity: 0.5, 
        fontSize: 20, 
        height: 45
    },
    linha: {
        backgroundColor: 'white',
        width: 200,
        height: 2
    },
    btn: { 
        borderWidth: 1,
        borderColor: '#9da3a2',
        borderRadius: 18,
        backgroundColor: '#fefefe',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: 250
    },
    textOu: {
        fontSize: 15,
        color: '#fff',
        backgroundColor: 'transparent',
        fontWeight: '500',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnFacebook: {
        borderColor: '#9da3a2',
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: 200,
        height: 40,
    },
    btnText: {
        fontSize: 13,
        color: '#00319c',
        fontWeight: 'bold'
    },
    item: {
      padding: 10,
      fontSize: 18,
      backgroundColor: 'transparent',
      color: '#fff',
      height: 44,
    },
  });

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