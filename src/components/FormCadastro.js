import React, { Component } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Image, ActivityIndicator, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, modificaNome, cadastraUsuario } from '../actions/AutenticacaoActions';

class formCadastro extends Component { 
    _cadastraUsuario() {
        const { nome, email, senha } = this.props;
        this.props.cadastraUsuario({nome, email, senha});
    }
    renderBtnCadastro(){
        if (this.props.loading_cadastro) {
            return (
                <ActivityIndicator size="large" />
            );
        }
        return (
            <TouchableHighlight style={{ borderWidth: 1, borderColor: '#532e1c', borderRadius: 18, backgroundColor: '#fc5b07', padding: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => this._cadastraUsuario()}>
                <Text style={{fontSize: 20, color: '#ffffff', fontWeight: 'bold'}}>CADASTRAR</Text>
            </TouchableHighlight>
        );
    }
    render() {
        return(
        
        <View style={styles.container}>
            <View style={styles.containerForm}>
                <TextInput 
                    value={this.props.nome}
                    style={styles.form}
                    placeholder='Nome'
                    placeholderTextColor='#fff'
                    onChangeText={ texto => this.props.modificaNome(texto)}/>
                <TextInput 
                    value={this.props.email}
                    style={styles.form}
                    placeholder='E-mail' 
                    placeholderTextColor='#fff' 
                    onChangeText={ texto => this.props.modificaEmail(texto)}/>
                <TextInput 
                    secureTextEntry
                    value={this.props.senha} 
                    style={styles.form} 
                    placeholder='Senha'
                    placeholderTextColor='#fff' 
                    onChangeText={ texto => this.props.modificaSenha(texto)}/>

                    <Text style={{backgroundColor: 'transparent', color: '#ff0000', fontSize: 18}}>{ this.props.erroCadastro }</Text>
            </View>
            <View style={styles.containerBtn}>
                {this.renderBtnCadastro()}
            </View>
        </View> 
      );
    }
}

const mapStateToProps = state => (
    {
        nome: state.AuthenticacaoReducer.nome,
        email: state.AuthenticacaoReducer.email,
        senha: state.AuthenticacaoReducer.senha,
        erroCadastro: state.AuthenticacaoReducer.erroCadastro,
        loading_cadastro: state.AuthenticacaoReducer.loading_cadastro
    }
);

export default connect(mapStateToProps, {modificaEmail, modificaSenha, modificaNome, cadastraUsuario})(formCadastro);

const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 10,
            backgroundColor: '#2b2a29'

        },
        containerBtn: {
            flex: 1
        },
        containerForm: {
            flex: 4,
            justifyContent: 'center',
        },
        form: {
            fontSize: 20,
            height: 45
        }
});