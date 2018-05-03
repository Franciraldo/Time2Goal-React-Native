import React, { Component } from 'react';
import { View, Text, ListView, FlatList, TouchableHighlight, StyleSheet, Image} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { conversasUsuarioFetch } from '../actions/AppActions';
import _ from 'lodash';
import firebase from 'firebase';

const imgAnonimo = require('../imgs/anonymous.jpg');
class Conversas extends Component {
    componentDidMount(){
        console.log('Conversas componentDidMount: ', this.props)
        //console.log('Conversas componentDidMount email: ', this.props.email)
        
    }

    componentWillMount() {
        console.log('Conversas componentWillMount: ', this.props)

        if(this.props.email !== undefined){
            this.props.conversasUsuarioFetch(this.props.email)
            this.criaFonteDeDados(this.props.conversas);
        }else{
            var user = firebase.auth().currentUser;
            this.props.conversasUsuarioFetch(user.email)
            this.criaFonteDeDados(this.props.conversas);
        }
        
    }
    componentWillReceiveProps(nextProps) {
        console.log('Conversas componentWillReceiveProps: ', nextProps)
        //console.log('Conversas componentWillReceiveProps email: ', nextProps.usuario.email)
        //nextProps.conversasUsuarioFetch(nextProps.usuario.email);    
        this.criaFonteDeDados(nextProps.conversas);
    }
    criaFonteDeDados( conversas ) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2});
        this.dataSource = ds.cloneWithRows( conversas )
    }
    renderRow(conversa) {
        
        console.log('conversa: ', { conversa});
        if(conversa.img === ""){
            return (
                <View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View>
                        <Image
                            style={styles.uploadImage}
                            source={imgAnonimo}
                        />
                    </View>
                    <View style={{marginLeft: 10, marginTop: 15, width: 230 , height: 60}}>
                        <TouchableHighlight onPress={
                            () => Actions.conversa({title: conversa.nome, contatoNome: conversa.nome, contatoEmail: conversa.email, contatoImg: conversa.img})
                        }>
                            <Text style={{ fontSize: 25, color: "#fff", backgroundColor: 'transparent'}}>{conversa.nome}</Text>
                        </TouchableHighlight>
                        <Text style={{ marginTop: 10, fontSize: 14, color: "#fff", backgroundColor: 'transparent'}}>{conversa.shortText}</Text>                                 
                    </View>
                    <View>
                        <Text style={{ marginTop: 25, fontSize: 14, color: "#fff", backgroundColor: 'transparent'}}>{conversa.hora_atual}</Text>
                    </View>                                
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{ borderBottomWidth: 1, borderColor: "#CCC", width: 290, marginLeft: 80, marginTop: 10}}>
                    </View> 
                </View> 
           </View>                
            )
        }else{
            return (
                <View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View>
                            <Image
                            style={styles.uploadImage}
                            source={{ uri: conversa.img}}
                            />
                        </View>
                        <View style={{marginLeft: 10, marginTop: 15, width: 230 , height: 60}}>
                            <TouchableHighlight onPress={
                                () => Actions.conversa({title: conversa.nome, contatoNome: conversa.nome, contatoEmail: conversa.email, contatoImg: conversa.img})
                            }>
                                <Text style={{ fontSize: 25, color: "#fff", backgroundColor: 'transparent'}}>{conversa.nome}</Text>
                            </TouchableHighlight>
                            <Text style={{ marginTop: 10, fontSize: 14, color: "#fff", backgroundColor: 'transparent'}}>{conversa.shortText}</Text>                                 
                        </View>
                        <View>
                            <Text style={{ marginTop: 25, fontSize: 14, color: "#fff", backgroundColor: 'transparent'}}>{conversa.hora_atual}</Text>
                        </View>                                
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{ borderBottomWidth: 1, borderColor: "#CCC", width: 290, marginLeft: 80, marginTop: 10}}>
                        </View> 
                    </View> 
               </View>       
            )
        }
    }
    render() {
        if(this.props.conversas !== undefined){
            return (
                <ListView 
                    enableEmptySections
                    dataSource={ this.dataSource }
                    renderRow={ this.renderRow }
                />
            );
        }else{
            return (
                <View style={styles.container}>
                  <FlatList
                    data={[
                      {key: 'Não existe Conversas'}
                    ]}
                    renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
                  />
                </View>
              );
        }
            
        
    }
}
const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    uploadImage: {
        marginLeft: 15,
        marginTop: 15,
        width: 60,
        height: 60,
        borderRadius: 30  
    },
    item: {
      padding: 10,
      fontSize: 18,
      backgroundColor: 'transparent',
      color: '#fff',
      height: 44,
    },
  });

mapStateToProps = state => {
    
    const conversas = _.map(state.ListaConversasReducer, (val, uid) => {
        return { ...val, uid }
    })

    const usuario = state.SideBarReducer

    //console.log('Conversas mapStateToProps conversas: ', state);

    return ({
        conversas,
        usuario,
        email: state.AuthenticacaoReducer.email,
    })
}

export default connect(mapStateToProps, { conversasUsuarioFetch })(Conversas);