import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ListView, Image, TouchableHighlight, FlatList, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import { abrirPerfil } from '../actions/AppActions';
import {modificarTextoPesquisa, modificarFiltrosPesquisa} from '../actions/BuscaActions';
import { Icon, Button } from "native-base";
import {Actions} from 'react-native-router-flux';

let {width} = Dimensions.get('window')
let numberGrid = 3
let itemWidth = width / numberGrid
const imgAnonimo = require('../imgs/anonymous.jpg');
class Busca  extends Component {

    componentDidMount(){
        console.log('Busca componentDidMount: ', this.props)
        
    }

    componentWillMount() {
        console.log('Busca componentWillMount: ', this.props)
        const {lista_busca} = this.props;
        if(lista_busca !== '' && lista_busca !== null && lista_busca !== undefined){
            //console.log('componentWillMount: ', this.criaFonteDeDados(this.props.contatos))
            this.criaFonteDeDados(lista_busca);
        }
        
    }
    componentWillReceiveProps(nextProps) {
        console.log('Busca componentWillReceiveProps: ', nextProps)
        const {lista_busca } = nextProps;
        if(lista_busca !== '' && lista_busca !== null && lista_busca !== undefined){
            //console.log('componentWillMount: ', this.criaFonteDeDados(this.props.contatos))
            this.criaFonteDeDados(nextProps.lista_busca);
        }
        

    }

    criaFonteDeDados( contatos ) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2})
        this.fonteDeDados = ds.cloneWithRows(contatos);
    }

    renderImageContato(contato){
        if (contato.img !== "") {
            //console.log('renderImageContato: ', contato)
            return (
                <Image
                style={styles.uploadImage}
                source={{ uri: contato.img}}
                ></Image>
            );
        }else{
            return (
                <Image
                    style={styles.uploadImage}
                    source={imgAnonimo}
                ></Image>
            );
        }
    }

    renderRow(contato){
        //console.log('conato: ', contato)
        const {tipo_pesquisa} = this.props;
        if(tipo_pesquisa === 'videos_free' || tipo_pesquisa === 'videos_premium'){
            return(
                <TouchableHighlight onPress={() => {      
                    Actions.playerVideo({uri: contato.uri, thumbnail: contato.thumbnail})
                  }}>
                      <Image source={{uri: contato.thumbnail}} style={styles.itemImage} />
                    </TouchableHighlight>
              );
        }else{
            return (
            
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <View>
                        {this.renderImageContato(contato)}
                        </View>
                        <View style={{marginLeft: 10, marginTop: 15, width: 190}}>
                        <TouchableHighlight onPress={() => { this.props.abrirPerfil(contato)}}>
                            <Text style={{ fontSize: 18, color: "#fff", backgroundColor: 'transparent'}}>{contato.nome}</Text>
                        </TouchableHighlight>
                            <Text style={{ fontSize: 14, color: "#fff", backgroundColor: 'transparent'}}>Trabalha: {contato.categoria_mentoria}</Text>
                            <Text style={{ fontSize: 14, color: "#fff", backgroundColor: 'transparent'}}>Total alunos: {contato.qtd_alunos}</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{ borderBottomWidth: 1, borderColor: "#CCC", width: 280, marginLeft: 100}}>
                        </View> 
                    </View>
                </View>
                )
        }
    }

    renderListViewOrFlatList(){
        
        const {lista_busca, tipo_pesquisa} = this.props;
        if(lista_busca !== null && lista_busca !== ''){
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

    render() {
        const {backgroundColorMentores, backgroundColorFreeVideos, backgroundColorPremiumVideos, backgroundColorCategoria } = this.props;
        return (
            <View style={styles.container}>
                <View style={{flex: 2}}>
                    <View zIndex={1} style={{height: 45, flexDirection: 'row'}}>
                        <View style={{flex: 2, flexDirection: 'column'}}>
                            <TextInput 
                                    style={styles.textInput}
                                    placeholderTextColor='#fff' placeholder='Busca'
                                    onChangeText={(texto) => this.props.modificarTextoPesquisa(texto, this.props.tipo_pesquisa)}
                                    value = {this.props.texto_pesquisa}
                                    />
                            <View style={styles.linha}></View>
                        </View> 
                    </View>
                    <View zIndex={0} style={{marginTop: 65, height: 45, flexDirection: 'row', backgroundColor: 'black'}}>
                        <Button transparent 
                            onPress={() => this.props.modificarFiltrosPesquisa('mentor') }  underlayColor="transparent">
                            <Text style={{padding: 10, color: '#fff', fontSize: 12, backgroundColor: backgroundColorMentores}}>Mentores</Text>
                        </Button>
                        <Button transparent
                            onPress={() => this.props.modificarFiltrosPesquisa('videos_free') }  underlayColor="transparent">
                            <Text style={{padding: 10, color: '#fff', fontSize: 12, backgroundColor: backgroundColorFreeVideos}}>Videos Free</Text>
                        </Button>
                        <Button transparent
                            onPress={() => this.props.modificarFiltrosPesquisa('videos_premium') }  underlayColor="transparent">
                            <Text style={{padding: 10, color: '#fff', fontSize: 12, backgroundColor: backgroundColorPremiumVideos}}>Videos Premium</Text>
                        </Button>
                        <Button transparent
                            onPress={() => this.props.modificarFiltrosPesquisa('categorias') }  underlayColor="transparent">
                            <Text style={{padding: 10, color: '#fff', fontSize: 12, backgroundColor: backgroundColorCategoria}}>Categorias</Text>
                        </Button>
                    </View>
                    {this.renderListViewOrFlatList()}
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    itemImage:{
        width: itemWidth,
        height: itemWidth,
        padding: 10,
      },
    container: {
        flex: 1,
        backgroundColor: '#2b2a29',
    },
    itemImage:{
        width: itemWidth,
        height: itemWidth,
        padding: 10,
    },
    icon: {
        fontSize: 35,
        color: '#fff',
      },
    textInput: { 
        color: '#fff', 
        width: 380, 
        backgroundColor: 'black',
        opacity: 0.5, 
        fontSize: 20, 
        marginTop: 65,
        height: 45
    },
    linha: {
        backgroundColor: 'white',
        width: 380,
        height: 2,
    },
    uploadImage: {
        marginLeft: 15,
        marginTop: 15,
        width: 80,
        height: 80,
        borderRadius: 40  
    },
    btn_select: {
        padding: 10, color: '#fff', fontSize: 12, backgroundColor: '#fc7220'
    },
    btn_deselect: {
        padding: 10, color: '#fff', fontSize: 12, backgroundColor: 'transparent'
    },
    btn:{
        width: 40,
        height: 40,
    }
});

const mapStateToProps = state => (
    {
        adiciona_contato_email: state.AppReducer.adiciona_contato_email,
        cadastro_resultado_txt_erro: state.AppReducer.cadastro_resultado_txt_erro,
        cadastro_resultado_inclusao: state.AppReducer.cadastro_resultado_inclusao,
        texto_pesquisa: state.BuscaReducer.texto_pesquisa,
        tipo_pesquisa: state.BuscaReducer.tipo_pesquisa,
        lista_busca: state.BuscaReducer.lista_busca,
        backgroundColorMentores: state.BuscaReducer.backgroundColorMentores,
        backgroundColorFreeVideos: state.BuscaReducer.backgroundColorFreeVideos,
        backgroundColorPremiumVideos: state.BuscaReducer.backgroundColorPremiumVideos,
        backgroundColorCategoria: state.BuscaReducer.backgroundColorCategoria
    }
);

export default connect(mapStateToProps, {modificarTextoPesquisa, modificarFiltrosPesquisa, abrirPerfil})(Busca);
