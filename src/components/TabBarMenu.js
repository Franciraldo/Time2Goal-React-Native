import React from 'react';
import { View, Text, StatusBar, Image, TouchableHighlight, StyleSheet } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux'; 
import { connect } from 'react-redux';
import firebase from 'firebase';
import { habilitaInclusaoContato } from '../actions/AppActions'; 


const TabBarMenu = props => (
    <View style={styles.container}>
        <StatusBar height="50"/>
        
         
        <TabBar indicatorStyle={styles.ativo} {...props} style={ styles.tabBar}/>
    </View>
);
/*<View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={ styles.conteinerTitulo}>
                <Text style={styles.titulo}> Principal </Text>
            </View> 
            
            <View style={{ flexDirection: 'row', marginRight: 20}}>
                <View style={{ justifyContent: 'center', width: 50, alignItems: 'center'}}>
                    <TouchableHighlight onPress={() => { Actions.adicionarContato(); props.habilitaInclusaoContato() }}  underlayColor="transparent">
                        <Image source={require('../imgs/adicionar-contato.png')}/>
                    </TouchableHighlight>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <TouchableHighlight onPress={
                        () => firebase.auth().signOut().then(() => Actions.formLogin())
                    }>
                        <Text style={{ fontSize: 20, color: '#fff'}}>Sair</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>*/

const styles = StyleSheet.create({
    ativo: {
        backgroundColor: "#fc5b03",
    },
    conteinerTitulo: {
      height: 100,
      justifyContent: 'center'
    },
    titulo: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 20
    },
    tabBar: {
        backgroundColor: "#1c1b17",
        elevation: 0
    },
    container: {
        elevation: 4,
        marginBottom: 6
    },
  });

  export default connect(null, {habilitaInclusaoContato})(TabBarMenu);