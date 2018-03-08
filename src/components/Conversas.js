import React, { Component } from 'react';
import { View, Text, ListView, FlatList, TouchableHighlight, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import { conversasUsuarioFetch } from '../actions/AppActions';
import _ from 'lodash';

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
            this.props.conversasUsuarioFetch(this.props.usuario.email)
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
        return (
            <TouchableHighlight onPress={
                () => Actions.conversa({title: conversa.nome, contatoNome: conversa.nome, contatoEmail: conversa.email, contatoImg: conversa.img})
            }>
                <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: "#ccc"}}>
                    <Text style={{ fontSize: 25, color: "#fff", backgroundColor: 'transparent'}}>{conversa.nome}</Text>
                </View>
            </TouchableHighlight>
        )
    }
    render() {
        if(this.props.conversas !== null){
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

    const usuario = state.HomeReducer

    //console.log('Conversas mapStateToProps conversas: ', state);

    return ({
        conversas,
        usuario,
        email: state.AuthenticacaoReducer.email,
    })
}

export default connect(mapStateToProps, { conversasUsuarioFetch })(Conversas);