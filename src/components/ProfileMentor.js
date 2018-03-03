import React, { Component } from 'react';
import { View, Text, ListView, TouchableHighlight, StyleSheet, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import { getDados } from '../actions/ProfileMentorActions';
import { marcarMentoria } from '../actions/AppActions';

const calendario = require('../imgs/calendar_icon.png');
const chat = require('../imgs/chat-icon.png');

class ProfileMentor extends Component {
    componentDidMount(){
        console.log('ProfileMentor componentDidMount: ', this.props)
        
    }

    componentWillMount(){
        console.log('ProfileMentor componentWillMount: ', this.props)
    }

    componentWillReceiveProps(nextProps){
        console.log('ProfileMentor componentWillReceiveProps: ', nextProps)
        
        
    }
    
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{ marginTop: 100, justifyContent: 'center', alignItems:'center'}}>
                        <Image
                            style={styles.uploadImage}
                            source={{ uri: this.props.img}}
                            />
                    </View>
                    <View style={{ marginTop: 20, flex: 1, flexDirection: 'row'}}>
                        <View style={{ borderBottomWidth: 1, borderColor: "#CCC", width: 380}}>
                        </View> 
                    </View>
                    <View style={{ marginTop: 20, justifyContent: 'center', alignItems:'center'}}>
                        <Text style={{ fontSize: 18, color: "#fff", backgroundColor: 'transparent'}}>{this.props.nome}</Text>
                        <Text style={{ fontSize: 14, color: "#fff", backgroundColor: 'transparent'}}>Trabalha: {this.props.categoria_mentoria}</Text>
                        <Text style={{ fontSize: 14, color: "#fff", backgroundColor: 'transparent'}}>Total alunos: {this.props.qtd_alunos}</Text>
                    </View>
                    <View style={{ marginTop: 20, flex: 1, flexDirection: 'row'}}>
                        <View style={{ borderBottomWidth: 1, borderColor: "#CCC", width: 380}}>
                        </View> 
                    </View>

                    <View style={{ marginTop: 50, flex: 1, flexDirection: 'row'}}>
                        <View style={{ borderBottomWidth: 1, borderColor: "#CCC", width: 380}}>
                        </View> 
                    </View>

                    <View style={{ marginTop: 20, justifyContent: 'flex-start', alignItems:'flex-start'}}>
                        <Text style={{ fontSize: 18, color: "#fff", backgroundColor: 'transparent'}}>Descrição:</Text>
                        <Text style={{ marginTop: 15, fontSize: 14, color: "#fff", backgroundColor: 'transparent'}}>{this.props.descricao_profissional}</Text>
                    </View>

                    <View style={{ marginTop: 100, flex: 1, flexDirection: 'row'}}>
                        <View style={{ borderBottomWidth: 1, borderColor: "#CCC", width: 380}}>
                        </View> 
                    </View>
                    <View style={{ marginTop: 20, justifyContent: 'flex-start', alignItems:'flex-start'}}>
                        <Text style={{ fontSize: 18, color: "#fff", backgroundColor: 'transparent'}}>Videos</Text>
                    </View>

                    <View style={{ marginTop: 100, flex: 1, flexDirection: 'row'}}>
                        <TouchableHighlight onPress={() => { this.props.marcarMentoria(this.props.email) }}>
                            <Image
                                style={styles.button}
                                source={calendario}
                            />
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => { Actions.conversa({ title: this.props.nome, contatoNome: this.props.nome , contatoEmail: this.props.email, contatoImg: this.props.img }) }}>
                            <Image
                                style={styles.button}
                                source={chat}
                            />
                        </TouchableHighlight>
                        <View style={{ marginLeft: 20, marginTop: 10, flex: 1, flexDirection: 'column'}}>
                            <Text style={{ fontSize: 14, color: "#fff", backgroundColor: 'transparent'}}>Hora de mentoria</Text>
                            <Text style={{ fontSize: 14, color: "#fff", backgroundColor: 'transparent'}}>R$ {this.props.valor_hora}</Text>
                        </View>

                    </View>
                    



                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#2b2a29'
    },
    button: {
        marginLeft: 30,
        width: 60,
        height:60,
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
    btnText: {
        fontSize: 13,
        color: '#fff',
        fontWeight: 'bold'
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
    textInputFirst: { 
        color: '#fff', 
        width: 250, 
        backgroundColor: '#121616',
        opacity: 0.5, 
        fontSize: 20, 
        height: 45
    },
    textInput: { 
        marginTop: 15,
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
    linha_cvv: {
        backgroundColor: '#0096df',
        marginLeft: 30,
        width: 110,
        height: 2
    },
    linha_validade: { 
        backgroundColor: '#0096df',
        width: 110,
        height: 2
    },
    validade: {
        marginTop: 15,
        color: '#fff', 
        width: 110, 
        backgroundColor: '#121616',
        opacity: 0.5, 
        fontSize: 20, 
        height: 45
    },
    cvv: {
        marginTop: 15,
        marginLeft: 30,
        color: '#fff', 
        width: 110, 
        backgroundColor: '#121616',
        opacity: 0.5, 
        fontSize: 20, 
        height: 45
    },
    containerBtn: {
        flex: 1
    },
    containerForm: {
        flex: 11,
        justifyContent: 'center'
    },
    text: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 15,
        color: '#fff',
    },
    pais: {
        color: '#fff',
    },
});

const mapStateToProps = state => (
    {
        nome: state.ProfileMentorReducer.nome,
        email: state.ProfileMentorReducer.email,
        descricao_profissional: state.ProfileMentorReducer.descricao_profissional,
        categoria_mentoria: state.ProfileMentorReducer.categoria_mentoria, 
        idioma: state.ProfileMentorReducer.idioma,
        img: state.ProfileMentorReducer.img,
        qtd_alunos: state.ProfileMentorReducer.qtd_alunos,
        valor_hora: state.ProfileMentorReducer.valor_hora,
        
    }
  );

export default connect(mapStateToProps, {marcarMentoria})(ProfileMentor)