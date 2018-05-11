import React, { Component } from 'react';
import { View, Text, ListView, TouchableHighlight, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import StarRating from 'react-native-star-rating';
import { modificarRating, getDadosMentor, setAvaliacao } from '../actions/AvaliacaoActions';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
const logo = require('../imgs/logo.png');
const imgAnonymo = require('../imgs/anonymous.jpg');

class Avaliacao extends Component {

    

      onStarRatingPress(rating) {
        this.props.modificarRating(rating);
      }
    
    componentDidMount(){
        console.log('Avaliacao componentDidMount: ', this.props)
        
    }

    componentWillMount() {
        console.log('Avaliacao componentWillMount: ', this.props)
        const { contatoEmail } = this.props;
        this.props.getDadosMentor(contatoEmail);
        
    }
    componentWillReceiveProps(nextProps) {
        console.log('Avaliacao componentWillReceiveProps: ', nextProps)

    }

    renderImage(){
    
        if (this.props.contatoImg !== "") {
            return (
                <Image
                style={styles.uploadImage}
                source={{ uri: this.props.contatoImg}}
                />
            );
        }else{
            return (
                <Image
                style={styles.uploadImage}
                source={imgAnonymo}
                />
            );
        }  
      }

    render() {
        return (
            <View style={styles.container}>
            <PopupDialog width={300} height= {500} dialogAnimation={this.slideAnimation}  dialogStyle={{backgroundColor: '#2b2a29'}} ref={(popupDialog) => { this.popupDialog = popupDialog; }}>          
                <View style={styles.container}>
                    
                    {this.renderImage()}
                    <Text style={styles.h2}>{this.props.contatoNome}</Text>
                    <Text style={styles.h1}>Obrigado pela avaliação!</Text>
                    <TouchableHighlight style={styles.btn} onPress={() => {
                        this.popupDialog.dismiss()
                        Actions.pop();
                        this.props.modificarRating(0);
                    }}>
                        <Text style={styles.btnText}>ok</Text>
                    </TouchableHighlight>
                </View>              
            </PopupDialog>
                <Image style={{ marginTop: 30 }}  source={logo} />

                {this.renderImage()}

                <View style={styles.boxInfoMentor}>
                    <Text style={styles.h2}>{this.props.contatoNome}</Text>
                    <Text style={styles.h4}>Trabalha: {this.props.trabalho}</Text>
                    <Text style={styles.h4}>Total alunos: {this.props.total_alunos}</Text>            
                </View>

                <View style={styles.boxAvaliacao}>
                    <Text style={styles.h1}>Sua avaliação</Text>
                    <StarRating
                        disabled={false}
                        emptyStar={'ios-star-outline'}
                        fullStar={'ios-star'}
                        halfStar={'ios-star-half'}
                        iconSet={'Ionicons'}
                        maxStars={5}            
                        rating={this.props.starCount}
                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                        fullStarColor={'#fc5b07'}
                    />
                </View>

                
                
                <TouchableHighlight style={styles.btn} onPress={() => {
                    const { starCount, contatoEmail, contatoNome, uidConversa } = this.props;
                    const { nome, email } = this.props.usuario;
                    if(starCount === 0){
                        alert('Por favor, selecione o pelomenos 1 estrela')
                    }else{
                        this.popupDialog.show()                                            
                        this.props.setAvaliacao(contatoEmail, contatoNome, nome, email, starCount, uidConversa)
                    }
                }}>
                      <Text style={styles.btnText}>ENVIAR AVALIAÇÃO</Text>
                  </TouchableHighlight>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
    
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#2b2a29'
        
    
    },
    btn: { 
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#532e1c',
        borderRadius: 18,
        backgroundColor: '#fc5b07',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        width: 250
    },
    btnText: {
        fontSize: 13,
        color: '#fff',
        fontWeight: 'bold',
    },
    uploadImage: {
        width: 190,
        height: 190,
        borderRadius: 95,
        marginTop: 25,
        borderWidth: 4, 
        borderColor: '#fc5b03'  
    },
    boxInfoMentor: {
        width: 390,
        height: 120,
        borderTopWidth: 1,
        borderTopColor: '#fff',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    h1:{
        color: '#fff',
        fontSize: 28,
    },
    h2:{
        color: '#fff',
        fontSize: 24,
    },
    h4:{
        color: '#fff',
        fontSize: 18,
    },
    boxAvaliacao: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },


})

const mapStateToProps = state => {
    const usuario = state.HomeReducer;
    return { 
        usuario,
        starCount: state.AvaliacaoReducer.starCount,
        trabalho: state.AvaliacaoReducer.trabalho,
        total_alunos: state.AvaliacaoReducer.total_alunos
     };
}

export default connect(mapStateToProps, {modificarRating, getDadosMentor, setAvaliacao})(Avaliacao)