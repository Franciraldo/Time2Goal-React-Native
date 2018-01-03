import React, { Component } from 'react';
import { View, ScrollView, Picker, TouchableOpacity, TextInput, Text, StyleSheet, Image, TouchableHighlight,  ActivityIndicator, ImageBackground, Keyboard} from 'react-native';
import { AppRegistry, Alert } from "react-native";
import { Container, Header, Left, Body,Button, Title, Card, CardItem, Content, Right, Icon } from "native-base";
import { StackNavigator } from "react-navigation";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { modificarTitlePopup, modificaDescrricaoProfissional, modificaAgencia, modificaConta, modificaBanco, modificaImg1, modificaImg2, modificaIdioma, modificaCategoriaMentoria } from '../actions/FormMentoringActions';
import { modificaScreenRequest } from '../actions/AutenticacaoActions';
import { enviarFormMentoring } from '../actions/FormMentoringActions';
import PopupDialog from 'react-native-popup-dialog';


class FormMentoring extends React.Component {
  
    componentDidMount(){
        console.log('FormMentoring componentDidMount: ', this.props)
      }

      componentWillMount(){
        console.log('FormMentoring componentWillMount: ', this.props)
        
    }

    componentWillReceiveProps(nextProps){
      console.log('FormMentoring componentWillReceiveProps: ', nextProps)
      
        
    }

  _cadastraUsuario() {
      const { descricao_profissional, agencia, conta, banco, img1, img2, idioma, categoria_mentoria } = this.props;
      const nome = this.props.usuario.nome
      const email = this.props.usuario.email

      console.log('enviarDados Mentoring', { nome, email, descricao_profissional, agencia, conta, banco, img1, img2, idioma, categoria_mentoria }) 
      if(nome != undefined && email != undefined, descricao_profissional != undefined, agencia != undefined, conta != undefined, banco != undefined, img1 != undefined, img2 != undefined, idioma != undefined, categoria_mentoria != undefined ){
        this.props.enviarFormMentoring(nome, email, descricao_profissional, agencia, conta, banco, img1, img2, idioma, categoria_mentoria, this.props.navigation)
        
       
      }else{
          alert('Por favor preencha todos os campos antes de enviar o formulario')
      }
      
  }

  renderButton(){   
    if(this.props.enviando_dados){
        return (
            <ActivityIndicator size='large'/>
        );    
    } 
        return(
            <TouchableHighlight style={styles.btn} onPress={() =>  this._cadastraUsuario()}>
                <Text style={styles.btnText}>ENVIAR</Text>
            </TouchableHighlight>
        )
}
_uploadImage1() {
  this.props.modificaScreenRequest('form_mentoring_screen_img1')
  this.props.navigation.navigate('CameraView')
}

_uploadImage2() {
    this.props.modificaScreenRequest('form_mentoring_screen_img2')
    this.props.navigation.navigate('CameraView')
  }


  renderImage1(){
    if (this.props.img1 !== undefined) {
        return (
            <Image
            style={styles.uploadImage}
            source={{ uri: this.props.img1}}
            />
        );
    }else{
        return (
            <Image
            style={styles.uploadImage}
            source={require('../imgs/anonymous.jpg')}
            />
        );
    }
}
renderImage2(){
    //console.log('FormMentoring img2:', this.props.img2)
  if (this.props.img2 !== undefined) {
      return (
          <Image
          style={styles.uploadImage}
          source={{ uri: this.props.img2}}
          />
      );
  }else{
      return (
          <Image
          style={styles.uploadImage}
          source={require('../imgs/anonymous.jpg')}
          />
      );
  }
}

renderPopupView(){
    switch(this.props.PopupTitle) {
        case 'Banco':
                return(
                    <Picker  selectedValue={ this.props.banco } onValueChange={ banco => this.props.modificaBanco(banco)}>
                        <Picker.Item color='#fff'label='Selecione o Banco' value=''/>
                        <Picker.Item color='#fff'label='Banco do Brasil' value='BB'/>
                        <Picker.Item color='#fff'label='BRB' value='BRB'/>
                        <Picker.Item color='#fff'label='Caixa economica' value='Caixa economica'/>
                        <Picker.Item color='#fff'label='Santander' value='Santander'/>
                        <Picker.Item color='#fff'label='Bradesco' value='Bradesco'/>
                    </Picker>
                )
            break;
        case 'Idioma':
            return (
                <Picker  selectedValue={ this.props.idioma } onValueChange={ idioma => this.props.modificaIdioma(idioma)}>
                    <Picker.Item color='#fff'label='Selecione Idioma' value=''/>
                    <Picker.Item color='#fff'label='Inglês' value='Inglês'/>
                    <Picker.Item color='#fff'label='Português' value='Português'/>
                    <Picker.Item color='#fff'label='Francês' value='Francês'/>
                    <Picker.Item color='#fff'label='Espanhol' value='Espanhol'/>
                </Picker> 
            )
            break; 
        case 'Categoria':
            return (
                <Picker  selectedValue={ this.props.categoria_mentoria } onValueChange={ categoria_mentoria => this.props.modificaCategoriaMentoria(categoria_mentoria)}>
                    <Picker.Item color='#fff'label='Selecione categoria' value=''/>
                    <Picker.Item color='#fff'label='Coach esportivo' value='Coach esportivo'/>
                    <Picker.Item color='#fff'label='Fisioterapia' value='Fisioterapia'/>
                    <Picker.Item color='#fff'label='Nutrição' value='Nutrição'/>
                    <Picker.Item color='#fff'label='Preparação física' value='Preparação física'/>
                    <Picker.Item color='#fff'label='Psicologia do esporte' value='Psicologia do esporte'/>
                    <Picker.Item color='#fff'label='Técnica esportiva' value='Técnica esportiva'/>
                </Picker>
            )
            break;       
        default: 
            return
            break;
    }
    

    
}

  render() {
    return (
        <View style={styles.container}>
            <PopupDialog  dialogStyle={{backgroundColor: '#2b2a29'}} ref={(popupDialog) => { this.popupDialog = popupDialog; }}>
                {this.renderPopupView()}
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableHighlight style={styles.btn} onPress={() => this.popupDialog.dismiss()}>
                        <Text style={styles.btnText}>Confirmar</Text>
                    </TouchableHighlight>
                </View>
            </PopupDialog>
            <ScrollView>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.conteinerText}>
                    <Text style={styles.text}>
                        Descrição Profissional:
                    </Text>
                </View>
                <View style={styles.containerTextInput}>
                    <TextInput
                            multiline={true}
                            value={this.props.descricao_proficional}
                            numberOfLines={4}
                            style={styles.textInput}
                            placeholderTextColor='#fff'
                            placeholder='Descrição'
                            onChangeText={ texto => this.props.modificaDescrricaoProfissional(texto) } />
                        <View style={styles.linha}></View>   
                </View>

                <View style={styles.conteinerText}>
                    <Text style={styles.text}>
                        Dados Bancarios:
                    </Text>
                </View>

                <View style={styles.containerTextInput}>
                        <TextInput 
                            value={this.props.agencia} 
                            style={styles.textInput}
                            placeholder='Agência'
                            keyboardType='numbers-and-punctuation'
                            placeholderTextColor='#fff' 
                            onChangeText={ texto => this.props.modificaAgencia(texto)}/>
                        <View style={styles.linha}></View>   
                </View>
                <View style={styles.containerTextInput}>
                    <TextInput 
                        value={this.props.conta} 
                        style={styles.textInput}
                        placeholder='Conta'
                        keyboardType='numbers-and-punctuation'
                        placeholderTextColor='#fff' 
                        onChangeText={ texto => this.props.modificaConta(texto)}/>
                    <View style={styles.linha}></View>   
                </View>

                <View style={styles.conteinerText}>
                    <Text style={styles.text}>
                        Informe o Banco:
                    </Text>
                </View>

                <View style={styles.containerTextInput}>
                    <TextInput
                            multiline={true}
                            value={this.props.banco}
                            style={styles.textInput}
                            placeholderTextColor='#fff'
                            placeholder='Banco'
                            onEndEditing={this.clearFocus}
                            onFocus={() => {
                                this.props.modificarTitlePopup('Banco')
                                Keyboard.dismiss()
                                this.popupDialog.show()}}/>        
                    <View style={styles.linha}></View>   
                </View>

                <View style={styles.conteinerText}>
                    <Text style={styles.textDocuments}>
                        Por Favor, precisamos que você capture uma imagem de sua Identidade!  
                    </Text>
                </View>

                {this.renderImage1()}

                <TouchableHighlight style={styles.btn} onPress={() => this._uploadImage1()}>
                  <Text style={styles.btnText}>CAPTURAR IMAGEM</Text>
                </TouchableHighlight>

                <View style={styles.conteinerText}>
                    <Text style={styles.textDocuments}>
                        Precisamos que você capture uma imagem sua com a Identidade!
                    </Text>
                </View>

                {this.renderImage2()}

                <TouchableHighlight style={styles.btn} onPress={() => this._uploadImage2()}>
                  <Text style={styles.btnText}>CAPTURAR IMAGEM</Text>
                </TouchableHighlight>

                <View style={styles.conteinerText}>
                    <Text style={styles.text}>
                        Informe o idioma de origem:
                    </Text>
                </View>

                <View style={styles.containerTextInput}>
                    <TextInput
                            multiline={true}
                            value={this.props.idioma}
                            style={styles.textInput}
                            placeholderTextColor='#fff'
                            placeholder='Idioma'
                            onEndEditing={this.clearFocus}
                            onFocus={() => {
                                this.props.modificarTitlePopup('Idioma')
                                Keyboard.dismiss()
                                this.popupDialog.show()}}/>      

                    <View style={styles.linha}></View>   
                </View>

                <View style={styles.conteinerText}>
                    <Text style={styles.text}>
                        Informe o categoria de mentoria:  
                    </Text>
                </View>

                <View style={styles.containerTextInput}>
                    <TextInput
                            multiline={true}
                            value={this.props.categoria_mentoria}
                            style={styles.textInput}
                            placeholderTextColor='#fff'
                            placeholder='categoria'
                            onEndEditing={this.clearFocus}
                            onFocus={() => {
                                Keyboard.dismiss()
                                this.props.modificarTitlePopup('Categoria')
                                this.popupDialog.show()}}/>        
                    <View style={styles.linha}></View>   
                </View>

                {this.renderButton()}
            </View> 
            </ScrollView>
        </View>
    );
  }
}
FormMentoring.navigationOptions = ({ navigation }) => ({
  header: (
        <Header style={{ backgroundColor: '#fc5b07'}} titleStyle={{backgroundColor: 'transparent', color: '#fff'}}>
          <Left>
            <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
              <Icon name="menu"  style={{backgroundColor: 'transparent', color: '#fff'}}/>
            </Button>
          </Left>
          <Body>
            <Title style={{backgroundColor: 'transparent', color: '#fff'}}> Dados Mentor</Title>
          </Body>
          <Right />
        </Header>
  )
});

const mapStateToProps = state => {
    const usuario = state.FormMentoringReducer;

  //console.log('mapStateToProps SideBar', usuario)
 //console.log('Conversas mapStateToProps state: ', state);

    return ({
        usuario,
        descricao_profissional: state.FormMentoringReducer.descricao_profissional,
        agencia: state.FormMentoringReducer.agencia,
        conta: state.FormMentoringReducer.conta,
        banco: state.FormMentoringReducer.banco,
        img1: state.FormMentoringReducer.img1,
        img2: state.FormMentoringReducer.img2,
        idioma: state.FormMentoringReducer.idioma,
        categoria_mentoria: state.FormMentoringReducer.categoria_mentoria,
        enviando_dados: state.FormMentoringReducer.enviando_dados,
        PopupTitle: state.FormMentoringReducer.titlePopup
    })
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        width: 250
    },
    btnText: {
        fontSize: 13,
        color: '#fff',
        fontWeight: 'bold'
    },
    uploadImage: {
        borderWidth: 3,
        width: 120,
        height: 120,
        borderColor: '#fc5b07',
        borderRadius: 60  
    },
    uploadBtn: {
        marginTop: 90,
        justifyContent: 'center',
        alignItems:'center',
    },
    textInputFirst: { 
        color: '#fff', 
        width: 250, 
        backgroundColor: '#121616',
        opacity: 0.5, 
        fontSize: 20, 
        height: 45
    },
    textInput: { 
        marginTop: 15,
        color: '#fff', 
        width: 250, 
        backgroundColor: '#121616',
        opacity: 0.5, 
        fontSize: 20, 
        height: 45
    },
    linha: {
        backgroundColor: '#0096df',
        width: 250,
        height: 2
    },
    linha_cvv: {
        backgroundColor: '#0096df',
        marginLeft: 30,
        width: 110,
        height: 2
    },
    linha_validade: { 
        backgroundColor: '#0096df',
        width: 110,
        height: 2
    },
    validade: {
        marginTop: 15,
        color: '#fff', 
        width: 110, 
        backgroundColor: '#121616',
        opacity: 0.5, 
        fontSize: 20, 
        height: 45
    },
    cvv: {
        marginTop: 15,
        marginLeft: 30,
        color: '#fff', 
        width: 110, 
        backgroundColor: '#121616',
        opacity: 0.5, 
        fontSize: 20, 
        height: 45
    },
    containerBtn: {
        flex: 1
    },
    containerForm: {
        flex: 11,
        justifyContent: 'center'
    },
    text: {
        marginTop: 30,
        marginBottom: 10,
        fontSize: 15,
        color: '#fff',
    },
    textDocuments: {
        marginTop: 30,
        marginBottom: 30,
        fontSize: 15,
        color: '#fff',
    },
    pais: {
        color: '#fff',
    },
});

export default connect(mapStateToProps, { modificarTitlePopup, enviarFormMentoring, modificaScreenRequest, modificaDescrricaoProfissional, modificaAgencia, modificaConta, modificaBanco, modificaImg1, modificaImg2, modificaIdioma, modificaCategoriaMentoria})(FormMentoring)
