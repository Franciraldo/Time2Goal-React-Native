import React, { Component } from 'react';
import { View, ScrollView, Picker, TouchableOpacity, TextInput, Text, StyleSheet, Image, TouchableHighlight,  ActivityIndicator, ImageBackground} from 'react-native';
import { AppRegistry, Alert } from "react-native";
import { Container, Header, Left, Body,Button, Title, Card, CardItem, Content, Right, Icon } from "native-base";
import { StackNavigator } from "react-navigation";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { modificaDescrricaoProfissional, modificaAgencia, modificaConta, modificaBanco, modificaImg1, modificaImg2, modificaIdioma, modificaCategoriaMentoria } from '../actions/FormMentoringActions';
import { modificaScreenRequest } from '../actions/AutenticacaoActions';

class FormMentoring extends React.Component {
  componentDidMount() {
    //alert("No Users Found", "Oops, Looks like you are not signed in");
  }

  renderButton(){    
        return(
            <TouchableHighlight style={{ marginTop: 20, borderWidth: 1, borderColor: '#532e1c', borderRadius: 18, backgroundColor: '#fc5b07', padding: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => this._cadastraUsuario()}>
                <Text style={{fontSize: 20, color: '#ffffff', fontWeight: 'bold'}}>ENVIAR</Text>
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
    console.log('FormMentoring img2:', this.props.img2)
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

  render() {
    return (
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.conteinerText}>
                    <Text style={styles.text}>
                        Descrição Profissional:   
                    </Text>
            </View>    
                <TextInput
                        multiline={true}
                        value={this.props.descricao_proficional}
                        numberOfLines={4}
                        style={styles.form}
                        placeholderTextColor='#fff'
                        placeholder='Descrição'
                        onChangeText={ texto => this.props.modificaDescrricaoProfissional(texto) } />
            
            
            <View style={styles.conteinerText}>
                    <Text style={styles.text}>
                        Dados Bancarios:   
                    </Text>
            </View>    

            <TextInput 
                    value={this.props.agencia} 
                    style={styles.form}
                    placeholder='Agência'
                    placeholderTextColor='#fff' 
                    onChangeText={ texto => this.props.modificaAgencia(texto)}/>
                <TextInput 
                    value={this.props.conta} 
                    style={styles.form}
                    placeholder='Conta'
                    placeholderTextColor='#fff' 
                    onChangeText={ texto => this.props.modificaConta(texto)}/>

                <View style={styles.conteinerText}>
                    <Text style={styles.text}>
                        Informe o Banco:  
                    </Text>
                </View>

                <Picker  selectedValue={ this.props.banco } onValueChange={ banco => this.props.modificaBanco(banco)}>
                    <Picker.Item color='#fff'label='Banco do Brasil' value='BB'/>
                    <Picker.Item color='#fff'label='BRB' value='BRB'/>
                    <Picker.Item color='#fff'label='Caixa economica' value='Caixa economica'/>
                    <Picker.Item color='#fff'label='Santander' value='Santander'/>
                    <Picker.Item color='#fff'label='Bradesco' value='Bradesco'/>
                </Picker>

                <View style={styles.conteinerTextImg}>
                    <Text style={styles.text}>
                        Por Favor, precisamos que você capture uma imagem de sua Identidade!  
                    </Text>
                </View>    
                
                {this.renderImage1()}
                

                <TouchableHighlight style={styles.btn} onPress={() => this._uploadImage1()}>
                  <Text style={{fontSize: 20, color: '#ffffff', fontWeight: 'bold'}}>CAPTURAR IMAGEM</Text>
                </TouchableHighlight>

                <View style={styles.conteinerTextImg}>
                    <Text style={styles.text}>
                        Precisamos que você capture uma imagem sua com a Identidade!  
                    </Text>
                </View>    
                
                {this.renderImage2()}

                <TouchableHighlight style={styles.btn} onPress={() => this._uploadImage2()}>
                  <Text style={{fontSize: 20, color: '#ffffff', fontWeight: 'bold'}}>CAPTURAR IMAGEM</Text>
                </TouchableHighlight>

                <View style={styles.conteinerText}>
                    <Text style={styles.text}>
                        Informe o idioma de origem:  
                    </Text>
                </View>
                
                <Picker  selectedValue={ this.props.idioma } onValueChange={ idioma => this.props.modificaIdioma(idioma)}>
                    <Picker.Item color='#fff'label='Inglês' value='Inglês'/>
                    <Picker.Item color='#fff'label='Português' value='Português'/>
                    <Picker.Item color='#fff'label='Francês' value='Francês'/>
                    <Picker.Item color='#fff'label='Espanhol' value='Espanhol'/>
                </Picker>  
                <View style={styles.conteinerText}>
                    <Text style={styles.text}>
                        Informe o categoria de mentoria:  
                    </Text>
                </View>
                
                <Picker  selectedValue={ this.props.categoria_mentoria } onValueChange={ categoria_mentoria => this.props.modificaCategoriaMentoria(categoria_mentoria)}>
                    <Picker.Item color='#fff'label='Coach esportivo' value='Coach esportivo'/>
                    <Picker.Item color='#fff'label='Fisioterapia' value='Fisioterapia'/>
                    <Picker.Item color='#fff'label='Nutrição' value='Nutrição'/>
                    <Picker.Item color='#fff'label='Preparação física' value='Preparação física'/>
                    <Picker.Item color='#fff'label='Psicologia do esporte' value='Psicologia do esporte'/>
                    <Picker.Item color='#fff'label='Técnica esportiva' value='Técnica esportiva'/>
                </Picker>

                {this.renderButton()}
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

const mapStateToProps = state => (
  {
    descricao_profissional: state.FormMentoringReducer.descricao_profissional,
    agencia: state.FormMentoringReducer.agencia,
    conta: state.FormMentoringReducer.conta,
    banco: state.FormMentoringReducer.banco,
    img1: state.FormMentoringReducer.img1,
    img2: state.FormMentoringReducer.img2,
    idioma: state.FormMentoringReducer.idioma,
    categoria_mentoria: state.FormMentoringReducer.categoria_mentoria,
  }
);

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
      padding: 10, 
      justifyContent: 'center', 
      alignItems: 'center' 
    },
  uploadImage: {
      flexDirection: 'row',
      marginTop: 20,
      marginLeft: 110,
      width: 150,
      height: 150,
      justifyContent: 'center'  
  },
  uploadBtn: {
      marginTop: 90,
      justifyContent: 'center',
      alignItems:'center',
  },
  containerBtn: {
      flex: 1
  },
  containerForm: {
      flex: 11,
      justifyContent: 'center'
  },
  text: {
      marginTop: 10,
      marginLeft: 10,
      fontSize: 20,
      color: '#fff',
  },
  conteinerTextImg: {
    flexDirection: 'row',
    marginTop: 20,
    height: 65,
    backgroundColor: '#fc5b07'
  },
  conteinerText: {
      flexDirection: 'row',
      marginTop: 20,
      height: 45,
      backgroundColor: '#fc5b07'
  },
  pais: {
      color: '#fff',
  },
  form: {
      fontSize: 20,
      height: 45,
      marginTop: 20,
      borderColor: '#ffffff',
      color: '#fff'
  },
});

export default connect(mapStateToProps, {modificaScreenRequest, modificaDescrricaoProfissional, modificaAgencia, modificaConta, modificaBanco, modificaImg1, modificaImg2, modificaIdioma, modificaCategoriaMentoria})(FormMentoring)
