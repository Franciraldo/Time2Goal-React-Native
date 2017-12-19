import React, { Component } from 'react';
import { View, TextInput, Text, Button, StyleSheet, ScrollView, Image, ActivityIndicator, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaEmail, modificarBool,modificaScreenRequest, modificaSenha, modificaNome, modificaDescricao,  cadastraUsuario } from '../actions/AutenticacaoActions';

class formCadastro extends Component { 
    componentDidMount(){
        //console.log('formCadastro componentDidMount')
        this.props.modificaScreenRequest('formCadastro')
        this.refreshBool()
    }
    refreshBool(){
        if(this.props.bool){
            this.props.modificarBool(!this.props.bool)
        }
    }
    componentWillMount() {
        //console.log('formCadastro componentWillMount')
    }

    componentWillReceiveProps(nextProps) {
        //console.log('formCadastro componentWillReceiveProps', nextProps)
    }

    _cadastraUsuario() {
        const { nome, email, senha, descricao, img} = this.props;
        //console.log({nome, email, senha, descricao, bool});
        this.props.cadastraUsuario({nome, email, senha, descricao, img});
    }
    _uploadImage() {
        Actions.camera()
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
        if(this.props.email !== undefined && this.props.senha !== undefined){
            console.log('form Cadastro init bool: ', this.props.bool)
            this.props.modificarBool(!this.props.bool)
            console.log('form Cadastro bool: ', this.props.bool)
            this.props.modificaScreenRequest('formCadastro')
            Actions.formComplement()
        }else{
            alert('Por Favor, informe o email e a senha antes de selecionar este botão.')
        }
               
        
    }

    renderImage(){
        if (this.props.img !== undefined) {
            return (
                <Image
                style={styles.uploadImage}
                source={{ uri: this.props.img}}
                />
            );
        }else{
            return (
                <Image
                style={styles.uploadImage}
                source={require('../imgs/anonymous.jpg')}
                />
            );
        }
    }


    render() {
        const {bool} = this.props;

        const textValue = bool ? "ON": "OFF";
        const buttonBg = bool ? "whitesmoke" : "#e42125";
        const borderBg = bool ? "whitesmoke":"#e42125";
        const textColor = bool ? "black":"whitesmoke";        
        
        return(
        
        <View style={styles.container}>
            <View style={styles.containerForm}>
                <TouchableHighlight style={styles.uploadBtn} onPress={() => this._uploadImage()}>
                    {this.renderImage()}
                </TouchableHighlight>
                <ScrollView>
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
                </ScrollView>
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
        bool: state.AuthenticacaoReducer.bool,
        img: state.AuthenticacaoReducer.img,
        cpf: state.AuthenticacaoReducer.cpf,
        titularCartao: state.AuthenticacaoReducer.titularCard,
        numeroCartao: state.AuthenticacaoReducer.numeroCard,
        validade: state.AuthenticacaoReducer.validadeCard,
        cvv: state.AuthenticacaoReducer.cvv,
        dataNascimento: state.AuthenticacaoReducer.dataNascimento,
        cep: state.AuthenticacaoReducer.cep,
        endereco: state.AuthenticacaoReducer.endereco,
        pais: state.AuthenticacaoReducer.pais,
        premium: state.AuthenticacaoReducer.bool,
        screen_request: state.AuthenticacaoReducer.screen_request,
        erroCadastro: state.AuthenticacaoReducer.erroCadastro,
        loading_cadastro: state.AuthenticacaoReducer.loading_cadastro
    }
);

export default connect(mapStateToProps, {modificaEmail, modificaScreenRequest, modificarBool, modificaSenha, modificaDescricao, modificaNome, cadastraUsuario})(formCadastro);

const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 10,
            backgroundColor: '#2b2a29'

        },
        uploadImage: {
            width: 90,
            height: 90  
        },
        uploadBtn: {
            marginTop: 90,
            justifyContent: 'center',
            alignItems:'center',
        },
        containerBtn: {
            flex: 1
        },
        containerForm: {
            flex: 15,
            justifyContent: 'center'
        },
        form: {
            fontSize: 20,
            height: 45,
            marginTop: 20,
            color: '#fff'
        },
});