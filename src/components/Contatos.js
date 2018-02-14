import React, { Component } from 'react';
import { View, Text, ListView, TouchableHighlight, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import { contatosUsuarioFetch, marcarMentoria, abrirPerfil } from '../actions/AppActions';

const calendario = require('../imgs/calendar_icon.png');
class Contatos extends Component {
    componentDidMount(){
        console.log('Contatos componentDidMount: ', this.props)
        //console.log('Contatos componentDidMount email: ', this.props.email)
        
    }

    componentWillMount(){
        this.props.contatosUsuarioFetch()
        if(this.props.contatos !== null){
            //console.log('componentWillMount: ', this.criaFonteDeDados(this.props.contatos))
            this.criaFonteDeDados(this.props.contatos);
        }
        console.log('Contatos componentWillMount: ', this.props)
        //console.log('recuperado via props: ', this.props.contatos);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.contatos !== null){
            //console.log('componentWillMount: ', this.criaFonteDeDados(this.props.contatos))
            this.criaFonteDeDados(nextProps.contatos);
        }
        //console.log('recuperado via props após update: ', nextProps.contatos);
        console.log('Contatos componentWillReceiveProps: ', nextProps)
        //console.log('Contatos componentWillReceiveProps: ', nextProps)
        
    }

    criaFonteDeDados( contatos ) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2})
        this.fonteDeDados = ds.cloneWithRows(contatos);
    }

    renderImageContato(contato){
        if (contato.img !== undefined) {
            return (
                <Image
                style={styles.uploadImage}
                source={{ uri: contato.img}}
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

    renderRow(contato){
        console.log('conato: ', contato)
        return (
            
        <View>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View>
                {this.renderImageContato(contato)}
                </View>
                <View style={{marginLeft: 10, marginTop: 15}}>
                <TouchableHighlight onPress={() => { this.props.abrirPerfil(contato)}}>
                    <Text style={{ fontSize: 18, color: "#fff", backgroundColor: 'transparent'}}>{contato.nome}</Text>
                </TouchableHighlight>
                    <Text style={{ fontSize: 14, color: "#fff", backgroundColor: 'transparent'}}>Trabalha: {contato.categoria_mentoria}</Text>
                    <Text style={{ fontSize: 14, color: "#fff", backgroundColor: 'transparent'}}>Total alunos: {contato.qtd_alunos}</Text>
                </View>
                <View style={{ marginLeft: 20, marginTop: 15 }}>
                    <TouchableHighlight onPress={() => { this.props.marcarMentoria(contato.email)}}>
                        <Image
                            style={styles.button}
                            source={calendario}
                        />
                    </TouchableHighlight>
                </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{ borderBottomWidth: 1, borderColor: "#CCC", width: 280, marginLeft: 100}}>
                </View> 
            </View>
        </View>
        )
    }
    
    render() {
        return (
            <ListView
                enableEmptySections
                dataSource={ this.fonteDeDados }
                renderRow={data => this.renderRow(data) }
                // ou renderRow={this.renderRow(data) }
            />
        );
    }
}

const styles = StyleSheet.create({
    uploadImage: {
        marginLeft: 15,
        marginTop: 15,
        width: 80,
        height: 80,
        borderRadius: 40  
    },
    button: {
        width: 50,
        height:50,
    }
});

const mapStateToProps = state => {
    
    const contatos = _.map(state.ListaContatosReducer, (val, uid) => {
        return { ...val, uid }
    })
    //console.log('Contatos: ', contatos);

    const usuario = state.HomeReducer
    return { contatos , usuario, email: state.AuthenticacaoReducer.email };
}

export default connect(mapStateToProps, {contatosUsuarioFetch, marcarMentoria, abrirPerfil})(Contatos)