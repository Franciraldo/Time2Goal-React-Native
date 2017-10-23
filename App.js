/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';


const styles = StyleSheet.create({
    principal: {
        flex: 1
    },
    logo: {
        height:90,
        width:325,
    },
    textoBotao:{
        fontSize: 16,
        fontWeight:'bold'
    },
    botao: {
        backgroundColor:'#fefefe',
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 10,
        marginTop: 20
    },
    texto: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 16,
        marginTop: 20
    },
    conteudo: {
        flex:8,
        justifyContent:'flex-start',
        alignItems:'center'
    },
    header:{
        flex:2,
    },
    footer: {
        flex: 1,
    },
    container: {
        flex: 1,
        // remove width and height to override fixed static size
        width: null,
        height: null,
    }
});

export default class App extends Component<{}> {
  render() {
    return (

          <Image source={ require('./imgs/background.png') }  style={ styles.container }>
              <View style={ styles.header }></View>
              <View style={ styles.conteudo }>
                    <Image source={ require('./imgs/logo.png') } style={ styles.logo } />
                  <TouchableOpacity style={ styles.botao }>
                      <Text style={ styles.textoBotao}>ENTRAR</Text>
                  </TouchableOpacity>
                    <Text style={ styles.texto}>ou</Text>
                  <TouchableOpacity style={ styles.botao }>
                      <Text style={ styles.textoBotao}>LOGIN FACEBOOK</Text>
                  </TouchableOpacity>
                    <Text style={ styles.texto} >ou</Text>
                  <TouchableOpacity style={ styles.botao }>
                      <Text style={ styles.textoBotao}>CRIAR CONTA</Text>
                  </TouchableOpacity>
              </View>
              <View style={ styles.footer }></View>
          </Image>
    );
  }
}


