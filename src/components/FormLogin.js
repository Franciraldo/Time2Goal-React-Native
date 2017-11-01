import React, { Component } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Image, TouchableHighlight,  ActivityIndicator} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, autenticarUsuario } from '../actions/AutenticacaoActions';

class formLogin  extends Component {
    _autenticarUsuario() {
        const {email, senha} = this.props;
        this.props.autenticarUsuario({email, senha});
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
                
                <TouchableHighlight style={{ borderWidth: 1, borderColor: '#9da3a2', borderRadius: 18, backgroundColor: '#fefefe', padding: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() =>  false}>
                    <Text style={{fontSize: 20, color: '#00319c', fontWeight: 'bold'}}>LOGIN FACEBOOK</Text>
                </TouchableHighlight>
                
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
            <Image style={{flex: 1, width: null}} source={require('../imgs/background.png')}>
                <View style={{flex: 1, padding: 10}}>
                    <View style={{flex:2, justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={require('../imgs/logo.png')} />
                    </View>
                    <View style={{flex: 2}}>
                        <TextInput value={this.props.email} style={{ fontSize: 20, height: 45 }} placeholderTextColor='#fff' placeholder='E-mail' onChangeText={texto => this.props.modificaEmail(texto)}/>
                        <TextInput secureTextEntry value={this.props.senha} style={{fontSize: 20, height: 45}} placeholderTextColor='#fff' placeholder='Senha'  onChangeText={texto => this.props.modificaSenha(texto)}/>
                        <Text style={ { backgroundColor: 'transparent', color: '#ff0000', fontSize: 18} }> {this.props.erroLogin}</Text>
                    </View>
                    <View style={{flex: 4}}>
                        {this.renderBtnAcessar()}
                    </View>
                </View>
            </Image>
        ); 
    }
  }

const mapStateToProps = state => (
    {
        email: state.AuthenticacaoReducer.email,
        senha: state.AuthenticacaoReducer.senha,
        erroLogin: state.AuthenticacaoReducer.erroLogin,
        loading_login: state.AuthenticacaoReducer.loading_login
    }
);

export default connect(mapStateToProps, { modificaEmail, modificaSenha, autenticarUsuario })(formLogin);