import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { View, Text, TextInput, Image, TouchableHighlight, ListView, StyleSheet, Linking} from 'react-native';
import { modificaMensagem, enviarMensagem, conversaUsuarioFetch, setHora, setData, check_call } from '../actions/AppActions';
const botaoEnviar = require('../imgs/enviar_mensagem.png');
const ON = require('../imgs/ON.png');
const OFF = require('../imgs/OFF.png');
class Conversa extends Component {
    componentDidMount(){
        console.log('Conversa componentDidMount: ', this.props)
        let now = new Date
        this.props.setHora(now);
        this.props.setData(now);
      }      
    componentWillMount() {
        
        console.log('Conversa componentWillMount: ', this.props);
        this.props.conversaUsuarioFetch(this.props.contatoEmail);
        this.criaFonteDeDados(this.props.conversa);
    }
    componentWillReceiveProps(nextProps) {
        console.log('Conversa componentWillReceiveProps: ', nextProps);
        this.criaFonteDeDados(nextProps.conversa);
    }
    criaFonteDeDados ( conversa ) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.dataSource = ds.cloneWithRows( conversa );
    }
    _startCall(){
        const { contatoNome, contatoEmail, contatoImg, usuario, data, hora, check_call } = this.props;
        if(usuario.mentoring){
            let link = "https://api-project-494074651441.appspot.com/r/call-" + new Date().getTime();
            let mensagem = "Segue o link para a nossa mentoria:";
            this.props.enviarMensagem(mensagem, contatoNome, contatoEmail, contatoImg, usuario, hora, data, link);
            this.props.check_call(usuario, contatoEmail, true, false, data, hora, '', '' );
            Linking.openURL(link);
        }else{
            alert('você precisa ser um mentor para usar essa funcionalidade.')
        }


    }
    _stopCall(){
        const { mensagem, contatoNome, contatoEmail, contatoImg, usuario, data, hora, check_call } = this.props;
        this.props.check_call(false);
    }
    _enviarMensagem() {
        const { mensagem, contatoNome, contatoEmail, contatoImg, usuario, data, hora } = this.props;
        
        if(mensagem.trim() !== ""){
            this.props.enviarMensagem(mensagem, contatoNome, contatoEmail, contatoImg, usuario, hora, data, '');
        }        
    }
    renderLink(link){
        if(link != ""){
            return (
                <TouchableHighlight style={{marginRight: 10}} underlayColor="transparent" onPress={() => { Linking.openURL(link); }}>
                    <Text style={{ fontSize: 18, color: '#fff', marginTop: 10, padding: 10, elevation: 1 }}>{link}</Text>
                </ TouchableHighlight>
            );
        }
    }
    renderRow(texto) {
        if(texto.tipo === 'e') {
            return (
                <View style={{ alignItems: 'flex-end', marginTop: 10, marginBottom: 5, marginLeft: 40, backgroundColor: '#0b96c8', borderRadius: 15  }}>
                        <Text style={{ fontSize: 18, color: '#fff', marginTop: 10, padding: 10, elevation: 1 }}>{texto.mensagem}</Text>
                        {this.renderLink(texto.link)}
                        <Text style={{ fontSize: 14, color: '#fff', marginRight: 10, marginBottom: 5}}>{texto.hora_atual}</Text>
                </View>                
            );    
        }
        return (
            <View style={{ alignItems: 'flex-start', marginTop: 10, marginBottom: 5, marginRight: 40, backgroundColor: '#f7f7f7', borderRadius: 15 }}>
                <Text style={{ fontSize: 18, marginTop: 10, color: '#000', padding: 10, elevation: 1 }}>{texto.mensagem}</Text>
                {this.renderLink(texto.link)}
                <Text style={{ fontSize: 14, color: '#000', marginLeft: 10, marginBottom: 5}}>{texto.hora_atual}</Text>
            </View>
        );
    }
    renderToogleBtn(){
        if(this.props.check_call){
            return(
                <TouchableHighlight style={{marginRight: 10}} underlayColor="transparent" onPress={this._startCall.bind(this)}>
                    <Image style={styles.btn} source={OFF}/>
                </TouchableHighlight>
            );
        }else{
            <TouchableHighlight style={{marginRight: 10}} underlayColor="transparent" onPress={this._stopCall.bind(this)}>
                    <Image style={styles.btn} source={ON}/>
                </TouchableHighlight>
        }
    }
    render (){
        //console.log('render: ', this.props.contatoEmail);
        return (
            <View style={{ flex: 1, marginTop: 50, backgroundColor: '#2b2a29', padding: 10 }}>
                <View style={{flex: 1, paddingBottom: 20}}>
                        <ListView
                            enableEmptySections
                            dataSource={ this.dataSource }
                            renderRow={data => this.renderRow(data)}
                        />
                </View>
                <View style={{flexDirection: 'row', height: 60, paddingBottom: 20}}>
                        {this.renderToogleBtn()}
                        

                        <TextInput style={{flex: 4, borderRadius: 25, backgroundColor: "#fff", fontSize: 18}}
                            value = { this.props.mensagem }
                            onChangeText = {texto => this.props.modificaMensagem(texto)} 
                         />

                        <TouchableHighlight style={{marginLeft: 10}} underlayColor="#fff" onPress={this._enviarMensagem.bind(this)}>
                            <Image style={styles.btn} source={botaoEnviar}/>
                        </TouchableHighlight>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#2b2a29'
    
    },
    btn:{
        width: 40,
        height: 40,
    }
});
mapStateToProps = state => {
    const conversa = _.map(state.ListaConversaReducer,(val, uid) => {
        return { ...val, uid};
    });
    const usuario = state.HomeReducer;

    return ({
        conversa,
        usuario,
        data: state.AppReducer.data,
        hora: state.AppReducer.hora, 
        mensagem: state.AppReducer.mensagem,
        check_call: state.AppReducer.check_call
    })
}

export default connect(mapStateToProps, { modificaMensagem, enviarMensagem, conversaUsuarioFetch, setHora, setData, check_call })(Conversa);
