import React, { Component } from 'react';
import { View, ScrollView, Picker, TouchableOpacity, TextInput, Text, StyleSheet, Image, TouchableHighlight,  ActivityIndicator, ImageBackground} from 'react-native';
import { AppRegistry, Alert } from "react-native";
import { Container, Header, Left, Body,Button, Title, Card, CardItem, Content, Right, Icon } from "native-base";
import { StackNavigator } from "react-navigation";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import _ from 'lodash';
//import {  } from '../actions/AutenticacaoActions';


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
_uploadImage() {
  Actions.camera()
}

  renderImage1(){
    if (this.props.img !== undefined) {
        return (
            <Image
            style={styles.uploadImage}
            source={{ uri: this.props.img}}
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
  if (this.props.img !== undefined) {
      return (
          <Image
          style={styles.uploadImage}
          source={{ uri: this.props.img}}
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
                        onChangeText={ texto => false } />
            
            
            <View style={styles.conteinerText}>
                    <Text style={styles.text}>
                        Dados Bancarios:   
                    </Text>
            </View>    

            <TextInput 
                    value={this.props.titularCard} 
                    style={styles.form}
                    placeholder='Agência'
                    placeholderTextColor='#fff' 
                    onChangeText={ texto => false}/>
                <TextInput 
                    value={this.props.numeroCard} 
                    style={styles.form}
                    placeholder='Conta'
                    placeholderTextColor='#fff' 
                    onChangeText={ texto => false}/>

                <View style={styles.conteinerText}>
                    <Text style={styles.text}>
                        Informe o Banco:  
                    </Text>
                </View>

                <Picker  selectedValue={ this.props.pais } onValueChange={ pais => false}>
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
                
                {this.renderImage2()}

                <TouchableHighlight style={styles.btn} onPress={() => false}>
                  <Text style={{fontSize: 20, color: '#ffffff', fontWeight: 'bold'}}>CAPTURAR IMAGEM</Text>
                </TouchableHighlight>

                <View style={styles.conteinerTextImg}>
                    <Text style={styles.text}>
                        Precisamos que você capture uma imagem sua com a Identidade!  
                    </Text>
                </View>    
                
                {this.renderImage1()}

                <TouchableHighlight style={styles.btn} onPress={() => false}>
                  <Text style={{fontSize: 20, color: '#ffffff', fontWeight: 'bold'}}>CAPTURAR IMAGEM</Text>
                </TouchableHighlight>

                <View style={styles.conteinerText}>
                    <Text style={styles.text}>
                        Informe o idioma de origem:  
                    </Text>
                </View>
                
                <Picker  selectedValue={ this.props.pais } onValueChange={ pais => false}>
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
                
                <Picker  selectedValue={ this.props.pais } onValueChange={ pais => false}>
                    <Picker.Item color='#fff'label='Técnico' value='Técnico'/>
                    <Picker.Item color='#fff'label='Fisioterapia' value='Fisioterapia'/>
                    <Picker.Item color='#fff'label='Jogador Profissional' value='Jogador Profissional'/>
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
    nome: state.AuthenticacaoReducer.nome,
    email: state.AuthenticacaoReducer.email,
    senha: state.AuthenticacaoReducer.senha,
    descricao: state.AuthenticacaoReducer.descricao,
    bool: state.AuthenticacaoReducer.bool,
    img: state.AuthenticacaoReducer.img,
    cpf: state.AuthenticacaoReducer.cpf,
    titularCartao: state.AuthenticacaoReducer.titularCard,
    numeroCartao: state.AuthenticacaoReducer.numeroCard,
    validade: state.AuthenticacaoReducer.validadeCard,
    cvv: state.AuthenticacaoReducer.cvv,
    dataNascimento: state.AuthenticacaoReducer.dataNascimento,
    cep: state.AuthenticacaoReducer.cep,
    endereco: state.AuthenticacaoReducer.endereco,
    pais: state.AuthenticacaoReducer.pais,
    premium: state.AuthenticacaoReducer.bool,
    screen_request: state.AuthenticacaoReducer.screen_request,
    erroCadastro: state.AuthenticacaoReducer.erroCadastro,
    loading_cadastro: state.AuthenticacaoReducer.loading_cadastro
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

export default connect(mapStateToProps, {})(FormMentoring)
