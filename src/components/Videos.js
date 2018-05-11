import React, { Component } from 'react';
import { AppRegistry, Alert, StyleSheet, View, TouchableHighlight, Picker, ActivityIndicator, Image, FlatList, Dimensions } from "react-native";
import { Container, Header, Left, Body, Title, Card, CardItem, Content, Right, Icon, Button, Text } from "native-base";
import { connect } from 'react-redux';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import { getAllVideos } from '../actions/AppActions';

let {width} = Dimensions.get('window')
let numberGrid = 3
let itemWidth = width / numberGrid
class Videos extends Component {

    componentDidMount() {
        console.log('Videos componentDidMount: ', this.props);       
      }
      componentWillMount() {
        console.log('Videos componentWillMount: ', this.props)
        const {email} = this.props.usuario 
        const { lista_videos_free_all, lista_videos_premium_all } = this.props;
        if(lista_videos_free_all.length === 0 && lista_videos_premium_all.length === 0){
            this.props.getAllVideos(email); 
        }
        
            
      }
      componentWillReceiveProps(nextProps){
        console.log('Videos componentWillReceiveProps: ', nextProps)
      }

      renderItem = ({item}) => {
        //console.log('renderItem: ', item);
        return (
          <TouchableHighlight onPress={() => {      
            Actions.playerVideo({uri: item.uri, thumbnail: item.thumbnail})
          }}>
              <Image source={{uri: item.thumbnail}} style={styles.itemImage} />
            </TouchableHighlight>
        );
       }
    
    render() {
        const {lista_videos_free_all, lista_videos_premium_all, loading_video_all} = this.props;
    if(loading_video_all){
        return (
          <View style={{
            flex: 1,
            marginTop: 150,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <ActivityIndicator size='large'/>
            <Text style={styles.mensagem_text}>carregando...</Text>
          </View>
        );    
    }else{
      //Quando não possuir videos
      if(lista_videos_free_all.length === 0 && lista_videos_premium_all.length === 0){
        return(
          <View>
            <Text style={styles.mensagem_text}>Você não possui videos</Text>          
          </View>
        );
      }
      //Quando so possuir videos premium
      if(lista_videos_free_all.length === 0 && lista_videos_premium_all.length !== 0){
        return(
          <View>
            <Text style={styles.text}>Videos Free</Text>
            <Text style={styles.mensagem_text}>Você não possui videos free</Text>
            <Text style={styles.text}>Videos Premium</Text>
            <FlatList  
                        keyExtractor={(_, index) => index} 
                        numColumns={numberGrid} data={lista_videos_premium_all} 
                        renderItem={this.renderItem} />
          </View>
        );
      }
      //Quando so possuir videos free
      if(lista_videos_free_all.length !== 0 && lista_videos_premium_all.length === 0){
        return(
        <View>
            <Text style={styles.text}>Videos Free</Text>
            <FlatList  
                        keyExtractor={(_, index) => index} 
                        numColumns={numberGrid} data={lista_videos_free_all} 
                        renderItem={this.renderItem} />
            <Text style={styles.text}>Videos Premium</Text>
            <Text style={styles.mensagem_text}>Você não possui videos Premium</Text>
          </View>
        );
      }
      //Quando so possuir videos free e premium
      if(lista_videos_free_all.length !== 0 && lista_videos_premium_all.length !== 0){
        return(
          <View>
            <Text style={styles.text}>Videos Free</Text>
            <FlatList  
                        keyExtractor={(_, index) => index} 
                        numColumns={numberGrid} data={lista_videos_free_all} 
                        renderItem={this.renderItem} />
            <Text style={styles.text}>Videos Premium</Text>
            <FlatList  
                        keyExtractor={(_, index) => index} 
                        numColumns={numberGrid} data={lista_videos_premium_all} 
                        renderItem={this.renderItem} />
          </View>
        );
      }
    }
    }
}

const mapStateToProps = state => {
    const usuario = state.HomeReducer;
    return ({
        usuario, 
        loading_video_all: state.AppReducer.loading_video_all,
        lista_videos_free_all: state.AppReducer.lista_videos_free_all,
        lista_videos_premium_all: state.AppReducer.lista_videos_premium_all,

      });
}

const styles = StyleSheet.create({
  itemImage:{
    width: itemWidth,
    height: itemWidth,
    padding: 10,
  },
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#2b2a29'
  
  },
  item: {
    padding: 10,
    fontSize: 18,
    backgroundColor: 'transparent',
    color: '#fff',
    height: 44,
  },
  icon: {
    fontSize: 35,
    color: '#fff',
    
  },
  text: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 15,
    color: '#fff',
  },
  mensagem_text:{
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
    color: '#fff',
  }
  });

export default connect(mapStateToProps, {getAllVideos})(Videos)