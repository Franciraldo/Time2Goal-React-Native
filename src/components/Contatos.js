import React, { Component } from 'react';
import { View, Text, ListView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import { contatosUsuarioFetch } from '../actions/AppActions';


class Contatos extends Component {
    componentDidMount(){
        //console.log('Contatos componentDidMount: ', this.props)
        //console.log('Contatos componentDidMount email: ', this.props.email)
        
    }

    componentWillMount(){
        this.props.contatosUsuarioFetch(this.props.usuario.email)
        if(this.props.contatos !== null){
            //console.log('componentWillMount: ', this.criaFonteDeDados(this.props.contatos))
            this.criaFonteDeDados(this.props.contatos);
        }
        
        //console.log('Contatos componentWillMount: ', this.props)
        //console.log('recuperado via props: ', this.props.contatos);
    }

    componentWillReceiveProps(nextProps){
        //console.log('recuperado via props após update: ', nextProps.contatos);
        //console.log('Contatos componentWillReceiveProps: ', nextProps)
        //console.log('Contatos componentWillReceiveProps: ', nextProps)
        
    }

    criaFonteDeDados( contatos ) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2})
        this.fonteDeDados = ds.cloneWithRows(contatos);
    }

    renderRow(contato){
        return (
            <TouchableHighlight onPress={() => Actions.conversa({ title: contato.nome, contatoNome: contato.nome , contatoEmail:contato.email})}>
                <View style={{flex: 1, padding: 20, borderBottomWidth: 1, borderColor: "#CCC"}}>
                    <Text style={{ fontSize: 25, color: "#fff", backgroundColor: 'transparent'}}>{contato.nome}</Text>
                    <Text style={{ fontSize: 18, color: "#fff", backgroundColor: 'transparent'}}>{contato.email}</Text>
                </View>
            </TouchableHighlight>
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

const mapStateToProps = state => {
    //console.log('Contatos mapStateToProps state: ', state);
    const contatos = _.map(state.ListaContatosReducer, (val, uid) => {
        return { ...val, uid }
    })
    const usuario = state.HomeReducer
    return { contatos , usuario, email: state.AuthenticacaoReducer.email };
}

export default connect(mapStateToProps, {contatosUsuarioFetch})(Contatos)