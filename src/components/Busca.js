import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { modificaAdicionaContatoEmail, adicionaContato } from '../actions/AppActions';
import {modificarTextoPesquisa, modificarFiltrosPesquisa} from '../actions/BuscaActions';
import { Icon, Button } from "native-base";


class Busca  extends Component {

    componentDidMount(){
        console.log('Busca componentDidMount: ', this.props)
        
    }

    componentWillMount() {
        console.log('Busca componentWillMount: ', this.props)
        
    }
    componentWillReceiveProps(nextProps) {
        console.log('Busca componentWillReceiveProps: ', nextProps)

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 3}}>
                    <View zIndex={1} style={{height: 45, flexDirection: 'row'}}>
                        <View style={{flex: 2, flexDirection: 'column'}}>
                            <TextInput 
                                    style={styles.textInput}
                                    placeholderTextColor='#fff' placeholder='Digite algo após selecionar o filtro'
                                    onChangeText={(texto) => this.props.modificarTextoPesquisa(texto, this.props.tipo_pesquisa)}
                                    value = {this.props.texto_pesquisa}
                                    />
                            <View style={styles.linha}></View>
                        </View> 
                    </View>
                    <View zIndex={0} style={{marginTop: 65, height: 45, flexDirection: 'row', backgroundColor: 'black'}}>
                        <Button transparent
                            onPress={() => this.props.modificarFiltrosPesquisa('mentor') }  underlayColor="transparent">
                            <Text style={{padding: 10, color: '#fff', fontSize: 12}}>Mentores</Text>
                        </Button>
                        <Button transparent
                            onPress={() => this.props.modificarFiltrosPesquisa('videos_free') }  underlayColor="transparent">
                            <Text style={{padding: 10, color: '#fff', fontSize: 12}}>Videos Free</Text>
                        </Button>
                        <Button transparent
                            onPress={() => this.props.modificarFiltrosPesquisa('videos_premium') }  underlayColor="transparent">
                            <Text style={{padding: 10, color: '#fff', fontSize: 12}}>Videos Premium</Text>
                        </Button>
                        <Button transparent
                            onPress={() => this.props.modificarFiltrosPesquisa('categorias') }  underlayColor="transparent">
                            <Text style={{padding: 10, color: '#fff', fontSize: 12}}>Categorias</Text>
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 5,
        backgroundColor: '#2b2a29',
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
    }
);

export default connect(mapStateToProps, {modificaAdicionaContatoEmail, adicionaContato, modificarTextoPesquisa, modificarFiltrosPesquisa})(Busca);
