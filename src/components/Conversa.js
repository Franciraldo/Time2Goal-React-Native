import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { View, Text, TextInput, Image, TouchableHighlight, ListView, StyleSheet} from 'react-native';
import { modificaMensagem, enviarMensagem, conversaUsuarioFetch } from '../actions/AppActions';
const botaoEnviar = require('../imgs/enviar_mensagem.png');
const ON = require('../imgs/ON.png');
const OFF = require('../imgs/OFF.png');
class Conversa extends Component {
    componentDidMount(){
        console.log('Conversa componentDidMount: ', this.props)
      }      
    componentWillMount() {
        console.log('Conversa componentWillMount: ', this.props);
        this.props.conversaUsuarioFetch(this.props.contatoEmail);
        this.criaFonteDeDados(this.props.conversa);
    }
    componentWillReceiveProps(nextProps) {
        console.log('Conversa componentWillReceiveProps: ', nextProps);
        /*
        
        // Não funcionou deu o Erro MAximun update depth exceeded. This can happen when a component
        //repeatedly calls setSate inside componentWillUpdate or componentDidUpdade.
        //React limits the number of nested updates to prevent infinite loops

        if(this.props.contatoEmail != nextProps.contatoEmail){
            this.props.conversaUsuarioFetch(nextProps.contatoEmail)
        
        }*/
        this.criaFonteDeDados(nextProps.conversa);
    }
    criaFonteDeDados ( conversa ) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.dataSource = ds.cloneWithRows( conversa );
    }
    _enviarMensagem() {
        const { mensagem, contatoNome, contatoEmail, contatoImg, usuario } = this.props;
        let now = new Date
        let hora = `${now.getHours()}`
        let minuto = `${now.getMinutes()}`
        let dia = `${now.getUTCDay()}`
        let mes = `${now.getUTCMonth()}`

        if(hora <= 9){
            hora = hora.replace(hora.substring(-1, 0), '0');
        }
        if(minuto <= 9){
            minuto = minuto.replace(minuto.substring(-1, 0), '0');
        }
        if(dia <= 9){
            dia = dia.replace(dia.substring(-1, 0), '0');
        }
        if(mes <= 9){
            mes = mes.replace(mes.substring(-1, 0), '0');
        }

        
        let hora_atual = `${hora}:${minuto}`
        let data_atual = `${dia}/${mes}/${now.getUTCFullYear()}`
        //console.log('_enviarMensagem', {mensagem, contatoNome, contatoEmail, contatoImg, usuario, hora_atual, data_atual})
        this.props.enviarMensagem(mensagem, contatoNome, contatoEmail, contatoImg, usuario, hora_atual, data_atual);
    }
    renderRow(texto) {
        console.log('texto: ', texto)
        if(texto.tipo === 'e') {
            return (
                <View style={{ backgroundColor: '#0b96c8', borderRadius: 5,  marginTop: 15}}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 18, color: '#fff', marginRight: 10, marginTop: 10, marginBottom: 5}}>{texto.mensagem}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 14, color: '#fff', marginLeft: 10 , marginBottom: 5}}>{texto.hora_atual}</Text>
                    </View>
                </View>
            );    
        }
        return (
            <View style={{ backgroundColor: '#f7f7f7', borderRadius: 5, marginTop: 15}}>
                    <View style={{ alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 18, color: '#000', marginLeft: 10, marginBottom: 5, marginTop: 10}}>{texto.mensagem}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 14, color: '#000', marginRight: 10, marginBottom: 5}}>{texto.hora_atual}</Text>
                    </View>
                </View>
        );
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
                        <TouchableHighlight style={{marginRight: 10}} underlayColor="#fff" onPress={false}>
                            <Image style={styles.btn} source={ON}/>
                        </TouchableHighlight>

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
        mensagem: state.AppReducer.mensagem
    })
}

export default connect(mapStateToProps, { modificaMensagem, enviarMensagem, conversaUsuarioFetch })(Conversa);
