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
            <TouchableHighlight style={styles.btn} onPress={() => this._cadastraUsuario()}>
                <Text style={styles.btnText}>CADASTRAR</Text>
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
    _onPressDescricao() {
        alert('Este campo e para você informar um breve descrição.')
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
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <View style={styles.containerTextInput}>
                                <TextInput 
                                    value={this.props.nome}
                                    style={styles.textInput}
                                    placeholder='Nome'
                                    placeholderTextColor='#fff'
                                    onChangeText={ texto => this.props.modificaNome(texto)}/>
                                <View style={styles.linha}></View>   
                            </View>

                            <View style={styles.containerTextInput}>
                                <TextInput 
                                    value={this.props.email}
                                    style={styles.textInput}
                                    placeholder='E-mail' 
                                    placeholderTextColor='#fff' 
                                    onChangeText={ texto => this.props.modificaEmail(texto)}/>

                                <View style={styles.linha}></View>   
                            </View>

                            <View style={styles.containerTextInput}>
                                <TextInput 
                                    secureTextEntry
                                    value={this.props.senha} 
                                    style={styles.textInput}
                                    placeholder='Senha'
                                    placeholderTextColor='#fff' 
                                    onChangeText={ texto => this.props.modificaSenha(texto)}/>
                                <View style={styles.linha}></View>   
                            </View>                

                                <Text style={{backgroundColor: 'transparent', color: '#ff0000', fontSize: 18}}>{ this.props.erroCadastro }</Text>

                                <View style={styles.containerTextInput}>
                                    <TextInput
                                                multiline={true}
                                                value={this.props.descricao}
                                                numberOfLines={4}
                                                style={styles.textInput}
                                                placeholderTextColor='#fff'
                                                placeholder='Descrição'
                                                onChangeText={texto => this.props.modificaDescricao(texto)} />
                                                <TouchableOpacity onPress={() => this._onPressDescricao()} style={{ width: 25, height: 25,
                                                    borderWidth: 1,
                                                    borderRadius: 18, 
                                                    position: 'absolute',
                                                    padding: 8, justifyContent: 'center',
                                                    marginTop: 5,
                                                    marginLeft: 220,
                                                    backgroundColor: '#fc5b07'}} >
                                                            <Text style={{backgroundColor: "transparent", fontSize: 12, color: '#fff', fontWeight: 'bold'}}>?</Text>
                                                </TouchableOpacity>
                                    <View style={styles.linha}></View>   
                                </View>
                                <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                                    <View style={{ flexDirection: 'row'}}>
                                            <Text style={{marginTop: 10, marginBottom: 50, backgroundColor: "transparent", fontSize: 13, color: '#fff', fontWeight: 'bold', marginRight: 15}}>Habilitar conta Premium </Text>
                                            <TouchableOpacity onPress={() => this._onPress()} style={{ width: 45, height: 25,
                                            borderWidth: 1,
                                            borderColor: borderBg , borderRadius: 18, 
                                            padding: 8, justifyContent: 'center',
                                            marginTop: 5,
                                            alignItems:'center', backgroundColor: buttonBg}} >
                                                    <Text style={{backgroundColor: "transparent", fontSize: 12, color: textColor, fontWeight: 'bold'}}>{textValue}</Text>
                                            </TouchableOpacity>
                                            
                                    </View>
                                </View>
                                <View style={styles.containerBtn}>
                                    {this.renderBtnCadastro()}
                                </View>
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
        btn: { 
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
        containerTextInput: {
            marginTop: 20
        },
        textInput: { 
            color: '#fff', 
            width: 250, 
            backgroundColor: '#121616',
            opacity: 0.5, 
            fontSize: 20, 
            height: 45
        },
        linha: {
            backgroundColor: '#0096df',
            width: 250,
            height: 2
        },
        uploadImage: {
            borderWidth: 3,
            width: 120,
            height: 120,
            borderColor: '#fc5b07',
            borderRadius: 60  
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
});