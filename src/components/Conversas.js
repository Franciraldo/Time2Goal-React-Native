import React, { Component } from 'react';
import { View, Text, ListView, FlatList, TouchableHighlight, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import { conversasUsuarioFetch } from '../actions/AppActions';
import firebase from 'firebase';

class Conversas extends Component {

    componentWillMount() {
        
        this.props.conversasUsuarioFetch(this.props.email);
        if(this.props.conversas !== null){
            console.log('componentWillReceiveProps: ', this.criaFonteDeDados(this.props.conversas))
            this.criaFonteDeDados(this.props.conversas);
        }
        
        
    }
    componentWillReceiveProps(nextProps) {
        
        
        if(nextProps.conversas !== null){
            console.log('componentWillReceiveProps: ', nextProps.conversas)
            this.criaFonteDeDados(nextProps.conversas);
        }
            
        
    }
    criaFonteDeDados( conversas ) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2});
        this.dataSource = ds.cloneWithRows( conversas )
    }
    renderRow(conversa) {
        //console.log(conversa);
        return (
            <TouchableHighlight onPress={
                () => Actions.conversa({title: conversa.nome, contatoNome: conversa.nome, contatoEmail: conversa.email})
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
    const conversas = state.ListaConvetsasReducer;

    //console.log('mapStateToProps: ', conversas);

    return ({
        conversas,
        email: state.AuthenticacaoReducer.email,
    })
}

export default connect(mapStateToProps, { conversasUsuarioFetch })(Conversas);