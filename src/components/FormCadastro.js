import React, { Component } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Image, ActivityIndicator, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, modificaNome, modificaDescricao,  cadastraUsuario } from '../actions/AutenticacaoActions';

class formCadastro extends Component { 
    state = {
        toogle: false
    }
    _cadastraUsuario() {
        const { nome, email, senha, descricao } = this.props;
        const bool = this.state.toogle;
        console.log({nome, email, senha, descricao, bool});
        this.props.cadastraUsuario({nome, email, senha, descricao, bool});
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
            <View style={{ flex: 1}}>
                <TextInput
                        multiline={true}
                        value={this.props.descricao}
                        numberOfLines={4}
                        style={styles.form}
                        placeholderTextColor='#fff'
                        placeholder='Descrição'
                        onChangeText={texto => this.props.modificaDescricao(texto)} />
            </View>
            <View style={{ marginTop: 10, flexDirection: 'row'}}>
                    <Text style={{marginTop: 10, marginBottom: 30, backgroundColor: "transparent", fontSize: 16, color: '#fff', fontWeight: 'bold', marginRight: 15}}>Habilitar conta Premium </Text>
                    <TouchableOpacity onPress={() => this._onPress()} style={{ width: 75, height: 35,
                    borderWidth: 1,
                    borderColor: borderBg , borderRadius: 18, 
                    padding: 10, justifyContent: 'center',
                    alignItems:'center', backgroundColor: buttonBg}} >
                            <Text style={{backgroundColor: "transparent", fontSize: 16, color: textColor, fontWeight: 'bold'}}>{textValue}</Text>
                    </TouchableOpacity>
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
        descricao: state.AuthenticacaoReducer.descricao,
        erroCadastro: state.AuthenticacaoReducer.erroCadastro,
        loading_cadastro: state.AuthenticacaoReducer.loading_cadastro
    }
);

export default connect(mapStateToProps, {modificaEmail, modificaSenha, modificaDescricao, modificaNome, cadastraUsuario})(formCadastro);

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
            flex: 3,
            justifyContent: 'center'
        },
        form: {
            fontSize: 20,
            height: 45,
            marginTop: 20,
            color: '#fff'
        },
});