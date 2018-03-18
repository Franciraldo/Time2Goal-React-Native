import React, { Component } from 'react';
import { View, ScrollView, Picker, TouchableOpacity, TextInput, Text, StyleSheet, Image, TouchableHighlight,  ActivityIndicator, ImageBackground, Keyboard} from 'react-native';
import { AppRegistry, Alert } from "react-native";
import { Container, Header, Left, Body,Button, Title, Card, CardItem, Content, Right, Icon } from "native-base";
import { StackNavigator } from "react-navigation";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { UpdateDados, UpdateImg, modificaEmail, modificarBool, modificarIMG, modificaScreenRequest, modificaSenha, modificaNome, modificaDescricao,  cadastraUsuario, modificaNacionalidade, modificaCPF, modificaDataNascimento, modificaCEP, modificaEndereco, modificaTitularCard, modificaNumeroCard, modificaValidadeData, modificaCVV } from '../actions/AutenticacaoActions';
import formComplement from '../components/FormComplement'
import PopupDialog from 'react-native-popup-dialog';


class Profile extends React.Component {
    componentWillMount(){
        console.log('Profile componentWillMount props: ', this.props)
        this.props.modificaEmail(this.props.usuario.email)  
        this.props.modificarBool(this.props.usuario.premium)
        this.props.modificaNome(this.props.usuario.nome)
        this.props.modificaDescricao(this.props.usuario.descricao)
        this.props.modificaNacionalidade(this.props.usuario.dataNascimento)
        this.props.modificaCPF(this.props.usuario.cpf)
        this.props.modificaDataNascimento(this.props.usuario.dataNascimento)
        this.props.modificaCEP(this.props.usuario.cep)
        this.props.modificaEndereco(this.props.usuario.endereco)
        this.props.modificaTitularCard(this.props.usuario.titularCartao)
        this.props.modificaNumeroCard(this.props.usuario.numeroCartao)
        this.props.modificaValidadeData(this.props.usuario.validade)
        this.props.modificaCVV(this.props.usuario.cvv)
        this.props.modificarIMG(this.props.usuario.img)
        this.props.modificaScreenRequest('formUpdate')
        
    }
    
    componentWillReceiveProps(nextProps){
      console.log('Profile componentWillReceiveProps props: ', nextProps)
        
    }
  componentDidMount() {
    //alert("No Users Found", "Oops, Looks like you are not signed in");
  }

  renderButton(){   
    if(this.props.update_dados){
        return (
            <ActivityIndicator size='large'/>
        );    
    } 
        return(
            <TouchableHighlight style={styles.btn} onPress={() => this._updateDados()}>
                <Text style={styles.btnText}>Salvar</Text>
            </TouchableHighlight>
        )
}
_updateDados(){
    const { nome, email, descricao, img, cpf, dataNascimento, cep, endereco, titularCard,numeroCard, validadeCard, cvv, pais, bool, navigation } = this.props;
    if(img.toString() === this.props.usuario.img.toString()){
        this.props.UpdateDados(nome, email, descricao, this.props.usuario.img.toString(), cpf, titularCard, numeroCard, validadeCard, cvv, dataNascimento, cep, endereco, pais, bool, navigation)
    }else{
        this.props.UpdateDados(nome, email, descricao, '', cpf, titularCard, numeroCard, validadeCard, cvv, dataNascimento, cep, endereco, pais, bool, navigation)
        UpdateImg(img, email)
    }
    
    //this.props.UpdateDados(nome, email, descricao, img, this.props.usuario.mentoring, cpf, titularCard, numeroCard, validadeCard, cvv, dataNascimento, cep, endereco, pais, bool, this.props.navigation, )
}
_uploadImage() {
  Actions.camera()
}
_onPress() {
      this.props.modificarBool(!this.props.bool)
      
}

  renderImage(){
    if (this.props.img !== "") {
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
    _onPressDescricao() {
        alert('Este campo e para você informar um breve descrição.')
    }

  render() {

    const {bool} = this.props;

        const textValue = bool ? "ON": "OFF";
        const buttonBg = bool ? "whitesmoke" : "#e42125";
        const borderBg = bool ? "whitesmoke":"#e42125";
        const textColor = bool ? "black":"whitesmoke";

    return (
        <View style={styles.container}>
            <PopupDialog  dialogStyle={{backgroundColor: '#2b2a29'}} ref={(popupDialog) => { this.popupDialog = popupDialog; }}>
                <Picker  selectedValue={ this.props.pais } onValueChange={ pais => this.props.modificaNacionalidade(pais)}>
                            <Picker.Item color='#fff' label='Selecione um país' value=''/>
                            <Picker.Item color='#fff' label='Afeganistão' value='Afeganistão'/>
                            <Picker.Item color='#fff' label='Africa do Sul' value='Africa do Sul'/> 
                            <Picker.Item color='#fff' label='Albânia' value='Albânia'/> 
                            <Picker.Item color='#fff'label='Alemanha' value='Alemanha'/> 
                            <Picker.Item color='#fff'label='Andorra' value='Andorra'/> 
                            <Picker.Item color='#fff'label='Angola' value='Angola'/> 
                            <Picker.Item color='#fff'label='Anguilla' value='Anguilla'/> 
                            <Picker.Item color='#fff'label='Antartica' value='Antartica'/> 
                            <Picker.Item color='#fff'label='Antígua e Barbuda' value='Antígua e Barbuda'/> 
                            <Picker.Item color='#fff'label='Antilhas Holandesas' value='Antilhas Holandesas'/> 
                            <Picker.Item color='#fff'label='Arábia Saudita' value='Arábia Saudita'/> 
                            <Picker.Item color='#fff'label='Argélia' value='Argélia'/> 
                            <Picker.Item color='#fff'label='Argentina' value='Argentina'/> 
                            <Picker.Item color='#fff'label='Armênia' value='Armênia'/> 
                            <Picker.Item color='#fff'label='Aruba' value='Aruba'/> 
                            <Picker.Item color='#fff'label='Austrália' value='Austrália'/> 
                            <Picker.Item color='#fff'label='Áustria' value='Áustria'/> 
                            <Picker.Item color='#fff'label='Azerbaidjão' value='Azerbaidjão'/> 
                            <Picker.Item color='#fff'label='Bahamas' value='Bahamas'/> 
                            <Picker.Item color='#fff'label='Bangladesh' value='Bangladesh'/> 
                            <Picker.Item color='#fff'label='Barbados' value='Barbados'/> 
                            <Picker.Item color='#fff'label='Bareine' value='Bareine'/> 
                            <Picker.Item color='#fff'label='Belarus' value='Belarus'/> 
                            <Picker.Item color='#fff'label='Bélgica' value='Bélgica'/> 
                            <Picker.Item color='#fff'label='Belize' value='Belize'/> 
                            <Picker.Item color='#fff'label='Benelux' value='Benelux'/> 
                            <Picker.Item color='#fff'label='Benin' value='Benin'/> 
                            <Picker.Item color='#fff'label='Bermudas' value='Bermudas'/>
                            <Picker.Item color='#fff'label='Bolívia' value='Bolívia'/>
                            <Picker.Item color='#fff'label='Bósnia e Herzegóvina' value='Bósnia e Herzegóvina'/>
                            <Picker.Item color='#fff'label='Botswana' value='Botswana'/>
                            <Picker.Item color='#fff'label='Brasil' value='Brasil'/>
                            <Picker.Item color='#fff'label='Bulgária' value='Bulgária'/>
                            <Picker.Item color='#fff'label='Brunei Darussalam' value='Brunei Darussalam'/>
                            <Picker.Item color='#fff'label='Burkina Faso' value='Burkina Faso'/>
                            <Picker.Item color='#fff'label='Burundi' value='Burundi'/>
                            <Picker.Item color='#fff'label='Butão' value='Butão'/>
                            <Picker.Item color='#fff'label='Cabo Verde' value='Cabo Verde'/>
                            <Picker.Item color='#fff'label='Camarões' value='Camarões'/>
                            <Picker.Item color='#fff'label='Camboja' value='Camboja'/>
                            <Picker.Item color='#fff'label='Canadá' value='Canadá'/>
                            <Picker.Item color='#fff'label='Catar' value='Catar'/>
                            <Picker.Item color='#fff'label='Cazaquistão' value='Cazaquistão'/>
                            <Picker.Item color='#fff'label='Chade' value='Chade'/>
                            <Picker.Item color='#fff'label='Guiné Bissau' value='Guiné Bissau'/>
                            <Picker.Item color='#fff'label='Guine Equatorial' value='Guine Equatorial'/>
                            <Picker.Item color='#fff'label='Haiti' value='Haiti'/>
                            <Picker.Item color='#fff'label='Holanda' value='Holanda'/>
                            <Picker.Item color='#fff'label='Honduras' value='Honduras'/>
                            <Picker.Item color='#fff'label='Hong-Kong' value='Hong-Kong'/>
                            <Picker.Item color='#fff'label='Hungria' value='Hungria'/>
                            <Picker.Item color='#fff'label='Iêmen' value='Iêmen'/>
                            <Picker.Item color='#fff'label='Ilha Bouvet' value='Ilha Bouvet'/>     
                            <Picker.Item color='#fff'label='Ilha do Homem' value='Ilha do Homem'/>
                            <Picker.Item color='#fff'label='Ilha Natal' value='Ilha Natal'/>
                            <Picker.Item color='#fff'label='Ilha Norfalk' value='Ilha Norfalk'/>
                            <Picker.Item color='#fff'label='Ilhas Cayman' value='Ilhas Cayman'/>
                            <Picker.Item color='#fff'label='Ilhas Cocos' value='Ilhas Cocos'/>
                            <Picker.Item color='#fff'label='Ilhas Cook' value='Ilhas Cook'/>
                            <Picker.Item color='#fff'label='Ilhas do Canal' value='Ilhas do Canal'/>
                            <Picker.Item color='#fff'label='Ilhas Faroe' value='Ilhas Faroe'/>
                            <Picker.Item color='#fff'label='Ilhas Heard e McDonald' value='Ilhas Heard e McDonald'/>
                            <Picker.Item color='#fff'label='Ilhas Marianas do Norte' value='Ilhas Marianas do Norte'/>
                            <Picker.Item color='#fff'label='Ilhas Marshall' value='Ilhas Marshall'/>
                            <Picker.Item color='#fff'label='Ilhas Salomão' value='Ilhas Salomão'/>
                            <Picker.Item color='#fff'label='Ilhas Turks e Caicos' value='Ilhas Turks e Caicos'/>
                            <Picker.Item color='#fff'label='Ilhas Virgens (Britânicas)' value='Ilhas Virgens (Britânicas)'/>
                            <Picker.Item color='#fff'label='Ilhas Virgens (U.S.)' value='Ilhas Virgens (U.S.)'/>
                            <Picker.Item color='#fff'label='Ilhas Wallis e Futura' value='Ilhas Wallis e Futura'/>
                            <Picker.Item color='#fff'label='India' value='India'/>
                            <Picker.Item color='#fff'label='Indonésia' value='Indonésia'/>
                            <Picker.Item color='#fff'label='Irã' value='Irã'/>
                            <Picker.Item color='#fff'label='Iraque' value='Iraque'/>
                            <Picker.Item color='#fff'label='Irlanda' value='Irlanda'/>
                            <Picker.Item color='#fff'label='Islândia' value='Islândia'/>
                            <Picker.Item color='#fff'label='Israel' value='Israel'/>
                            <Picker.Item color='#fff'label='Itália' value='Itália'/>
                            <Picker.Item color='#fff'label='Jamaica' value='Jamaica'/>
                            <Picker.Item color='#fff'label='Japão' value='Japão'/>
                            <Picker.Item color='#fff'label='Jersey' value='Jersey'/>
                            <Picker.Item color='#fff'label='Palau' value='Palau'/>
                            <Picker.Item color='#fff'label='Panamá' value='Panamá'/>
                            <Picker.Item color='#fff'label='Papua Nova Guiné' value='Papua Nova Guiné'/>
                            <Picker.Item color='#fff'label='Paquistão' value='Paquistão'/>
                            <Picker.Item color='#fff'label='Paraguai' value='Paraguai'/>
                            <Picker.Item color='#fff'label='Peru' value='Peru'/>
                            <Picker.Item color='#fff'label='Pitcairn' value='Pitcairn'/>
                            <Picker.Item color='#fff'label='Polinésia Francesa' value='Polinésia Francesa'/>
                            <Picker.Item color='#fff'label='Polônia' value='Polônia'/>
                            <Picker.Item color='#fff'label='Porto Rico' value='Porto Rico'/>
                            <Picker.Item color='#fff'label='Portugal' value='Portugal'/>
                            <Picker.Item color='#fff'label='Quênia' value='Quênia'/>
                            <Picker.Item color='#fff'label='Quirguistão' value='Quirguistão'/>
                            <Picker.Item color='#fff'label='Reino Unido' value='Reino Unido'/>
                            <Picker.Item color='#fff'label='Quênia' value='Quênia'/>
                            <Picker.Item color='#fff'label='República Centro Africana' value='República Centro Africana'/>
                            <Picker.Item color='#fff'label='República da Coréia' value='República da Coréia'/>
                            <Picker.Item color='#fff'label='República da Macedonia' value='República da Macedonia'/>
                            <Picker.Item color='#fff'label='República da Moldova' value='República da Moldova'/>
                            <Picker.Item color='#fff'label='República Dem. Do Congo' value='República Dem. Do Congo'/>
                            <Picker.Item color='#fff'label='República Dominicana' value='República Dominicana'/>
                            <Picker.Item color='#fff'label='República Pop. Dem. da Coreia' value='República Pop. Dem. da Coreia'/>
                            <Picker.Item color='#fff'label='República Tcheca' value='República Tcheca'/>
                            <Picker.Item color='#fff'label='República Unida da Tanzânia' value='República Unida da Tanzânia'/>
                            <Picker.Item color='#fff'label='Reunião' value='Reunião'/>
                            <Picker.Item color='#fff'label='Romênia' value='Romênia'/>
                            <Picker.Item color='#fff'label='Ruanda' value='Ruanda'/>
                            <Picker.Item color='#fff'label='Saara Ocidental' value='Saara Ocidental'/>
                            <Picker.Item color='#fff'label='Saint Pierre e Miquelon' value='Saint Pierre e Miquelon'/>
                            <Picker.Item color='#fff'label='Samoa Americana' value='Samoa Americana'/>
                            <Picker.Item color='#fff'label='Samoa Ocidental' value='Samoa Ocidental'/>
                            <Picker.Item color='#fff'label='Santa Helena' value='Santa Helena'/>
                            <Picker.Item color='#fff'label='Santa Lúcia' value='Santa Lúcia'/>
                            <Picker.Item color='#fff'label='São Marino' value='São Marino'/>
                            <Picker.Item color='#fff'label='São Vicente e Granadinas' value='São Vicente e Granadinas'/>
                            <Picker.Item color='#fff'label='Serra Leoa' value='Serra Leoa'/>
                            <Picker.Item color='#fff'label='Seychelles' value='Seychelles'/>
                            <Picker.Item color='#fff'label='Síria' value='Síria'/>
                            <Picker.Item color='#fff'label='Sri Lanka' value='Sri Lanka'/>
                            <Picker.Item color='#fff'label='Sudão' value='Sudão'/>
                            <Picker.Item color='#fff'label='Chile' value='Chile'/>
                            <Picker.Item color='#fff'label='China' value='China'/>
                            <Picker.Item color='#fff'label='Chipre' value='Chipre'/>
                            <Picker.Item color='#fff'label='Colômbia' value='Colômbia'/>
                            <Picker.Item color='#fff'label='Comores' value='Comores'/>
                            <Picker.Item color='#fff'label='Congo' value='Congo'/>
                            <Picker.Item color='#fff'label='Costa do Marfim' value='Costa do Marfim'/>
                            <Picker.Item color='#fff'label='Costa Rica' value='Costa Rica'/>
                            <Picker.Item color='#fff'label='Croácia' value='Croácia'/>
                            <Picker.Item color='#fff'label='Cuba' value='Cuba'/>
                            <Picker.Item color='#fff'label='Dinamarca' value='Dinamarca'/>
                            <Picker.Item color='#fff'label='Djibuti' value='Djibuti'/>
                            <Picker.Item color='#fff'label='Dominica' value='Dominica'/>
                            <Picker.Item color='#fff'label='Egito' value='Egito'/>
                            <Picker.Item color='#fff'label='El Salvador' value='El Salvador'/>
                            <Picker.Item color='#fff'label='Emirados Árabes Unidos' value='Emirados Árabes Unidos'/>
                            <Picker.Item color='#fff'label='Equador' value='Equador'/>
                            <Picker.Item color='#fff'label='Eritréia' value='Eritréia'/>
                            <Picker.Item color='#fff'label='Eslováquia' value='Eslováquia'/>
                            <Picker.Item color='#fff'label='Espanha' value='Espanha'/>
                            <Picker.Item color='#fff'label='Estados Unidos da América' value='Estados Unidos da América'/>
                            <Picker.Item color='#fff'label='Estônia' value='Estônia'/>
                            <Picker.Item color='#fff'label='Etiópia' value='Etiópia'/>
                            <Picker.Item color='#fff'label='Federação Russa' value='Federação Russa'/>
                            <Picker.Item color='#fff'label='Fiji' value='Fiji'/>
                            <Picker.Item color='#fff'label='Filipinas' value='Filipinas'/>
                            <Picker.Item color='#fff'label='Finlândia' value='Finlândia'/>
                            <Picker.Item color='#fff'label='França' value='França'/>
                            <Picker.Item color='#fff'label='Gabão' value='Gabão'/>
                            <Picker.Item color='#fff'label='Gambia' value='Gambia'/>
                            <Picker.Item color='#fff'label='Geórgia' value='Geórgia'/>
                            <Picker.Item color='#fff'label='Gana' value='Gana'/>
                            <Picker.Item color='#fff'label='Geórgia do Sul e Ilhas Sandwich do Sul' value='Geórgia do Sul e Ilhas Sandwich do Sul'/>
                            <Picker.Item color='#fff'label='Gibraltar' value='Gibraltar'/>
                            <Picker.Item color='#fff'label='Granada' value='Granada'/>
                            <Picker.Item color='#fff'label='Grécia' value='Grécia'/>
                            <Picker.Item color='#fff'label='Groenlândia' value='Groenlândia'/>
                            <Picker.Item color='#fff'label='Guadalupe' value='Guadalupe'/>
                            <Picker.Item color='#fff'label='Guam' value='Guam'/>
                            <Picker.Item color='#fff'label='Guatemala' value='Guatemala'/>
                            <Picker.Item color='#fff'label='Guiana' value='Guiana'/>
                            <Picker.Item color='#fff'label='Guine' value='Guine'/>
                            <Picker.Item color='#fff'label='Jordânia' value='Jordânia'/>
                            <Picker.Item color='#fff'label='Kiribati' value='Kiribati'/>
                            <Picker.Item color='#fff'label='Kuwait' value='Kuwait'/>
                            <Picker.Item color='#fff'label='Laos' value='Laos'/>
                            <Picker.Item color='#fff'label='Lesoto' value='Lesoto'/>
                            <Picker.Item color='#fff'label='Letônia' value='Letônia'/>
                            <Picker.Item color='#fff'label='Líbano' value='Líbano'/>
                            <Picker.Item color='#fff'label='Libéria' value='Libéria'/>
                            <Picker.Item color='#fff'label='Líbia' value='Líbia'/>
                            <Picker.Item color='#fff'label='Liechtenstein' value='Liechtenstein'/>
                            <Picker.Item color='#fff'label='Lituânia' value='Lituânia'/>
                            <Picker.Item color='#fff'label='Luxemburgo' value='Luxemburgo'/>
                            <Picker.Item color='#fff'label='Macau' value='Macau'/>
                            <Picker.Item color='#fff'label='Madagascar' value='Madagascar'/>
                            <Picker.Item color='#fff'label='Malásia' value='Malásia'/>
                            <Picker.Item color='#fff'label='Malawi' value='Malawi'/>
                            <Picker.Item color='#fff'label='Maldivas' value='Maldivas'/>
                            <Picker.Item color='#fff'label='Mali' value='Mali'/>
                            <Picker.Item color='#fff'label='Malta' value='Malta'/>
                            <Picker.Item color='#fff'label='Marrocos' value='Marrocos'/>
                            <Picker.Item color='#fff'label='Martinica' value='Martinica'/>
                            <Picker.Item color='#fff'label='Maurício' value='Maurício'/>
                            <Picker.Item color='#fff'label='Mauritânia' value='Mauritânia'/>
                            <Picker.Item color='#fff'label='México' value='México'/>
                            <Picker.Item color='#fff'label='Mianmá' value='Mianmá'/>
                            <Picker.Item color='#fff'label='Micronésia' value='Micronésia'/>
                            <Picker.Item color='#fff'label='Moçambique' value='Moçambique'/>
                            <Picker.Item color='#fff'label='Mônaco' value='Mônaco'/>
                            <Picker.Item color='#fff'label='Mongólia' value='Mongólia'/>
                            <Picker.Item color='#fff'label='Mont Serrat' value='Mont Serrat'/>
                            <Picker.Item color='#fff'label='Montenegro' value='Montenegro'/>
                            <Picker.Item color='#fff'label='Namíbia' value='Namíbia'/>
                            <Picker.Item color='#fff'label='Nauru' value='Nauru'/>
                            <Picker.Item color='#fff'label='Nepal' value='Nepal'/>
                            <Picker.Item color='#fff'label='Nicarágua' value='Nicarágua'/>
                            <Picker.Item color='#fff'label='Níger' value='Níger'/>
                            <Picker.Item color='#fff'label='Nigéria' value='Nigéria'/>
                            <Picker.Item color='#fff'label='Noruega' value='Noruega'/>
                            <Picker.Item color='#fff'label='Nova Caledônia' value='Nova Caledônia'/>
                            <Picker.Item color='#fff'label='Nova Zelândia' value='Nova Zelândia'/>
                            <Picker.Item color='#fff'label='Omã' value='Omã'/>
                            <Picker.Item color='#fff'label='Suécia' value='Suécia'/>
                            <Picker.Item color='#fff'label='Suíça' value='Suíça'/>
                            <Picker.Item color='#fff'label='Suriname' value='Suriname'/>
                            <Picker.Item color='#fff'label='Svalbard e Jan Mayen' value='Svalbard e Jan Mayen'/>
                            <Picker.Item color='#fff'label='Tadjiquistão' value='Tadjiquistão'/>
                            <Picker.Item color='#fff'label='Tailândia' value='Tailândia'/>
                            <Picker.Item color='#fff'label='Togo' value='Togo'/>
                            <Picker.Item color='#fff'label='Tokelau' value='Tokelau'/>
                            <Picker.Item color='#fff'label='Tonga' value='Tonga'/>
                            <Picker.Item color='#fff'label='Trinidad e Tobago' value='Trinidad e Tobago'/>
                            <Picker.Item color='#fff'label='Tunísia' value='Tunísia'/>
                            <Picker.Item color='#fff'label='Turcomenistão' value='Turcomenistão'/>
                            <Picker.Item color='#fff'label='Turquia' value='Turquia'/>
                            <Picker.Item color='#fff'label='Tuvalu' value='Tuvalu'/>
                            <Picker.Item color='#fff'label='Ucrânia' value='Ucrânia'/>
                            <Picker.Item color='#fff'label='Uganda' value='Uganda'/>
                            <Picker.Item color='#fff'label='Uruguai' value='Uruguai'/>
                            <Picker.Item color='#fff'label='Uzbequistão' value='Uzbequistão'/>
                            <Picker.Item color='#fff'label='Vanuatu' value='Vanuatu'/>
                            <Picker.Item color='#fff'label='Vaticano' value='Vaticano'/>
                            <Picker.Item color='#fff'label='Venezuela' value='Venezuela'/>
                            <Picker.Item color='#fff'label='Vietnã' value='Vietnã'/>
                            <Picker.Item color='#fff'label='Yugoslávia' value='Yugoslávia'/>
                            <Picker.Item color='#fff'label='Zaire' value='Zaire'/>
                            <Picker.Item color='#fff'label='Zâmbia' value='Zâmbia'/>
                            <Picker.Item color='#fff'label='Zimbábue' value='Zimbábue'/>
                            <Picker.Item color='#fff'label='São Cristovão e Nevis' value='São Cristovão e Nevis'/>
                            <Picker.Item color='#fff'label='São Tomé e Príncipe' value='São Tomé e Príncipe'/>
                            <Picker.Item color='#fff'label='Senegal' value='Senegal'/>
                            <Picker.Item color='#fff'label='Sérvia' value='Sérvia'/>
                            <Picker.Item color='#fff'label='Singapura' value='Singapura'/>
                            <Picker.Item color='#fff'label='Somália' value='Somália'/>
                            <Picker.Item color='#fff'label='Suazilândia' value='Suazilândia'/>
                </Picker>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableHighlight style={styles.btn} onPress={() => this.popupDialog.dismiss()}>
                        <Text style={styles.btnText}>Confirmar</Text>
                    </TouchableHighlight>
                </View>
            </PopupDialog>
            <View style={styles.containerForm}>
                <ScrollView>
                <TouchableHighlight style={styles.uploadBtn} onPress={() => this._uploadImage()}>
                    {this.renderImage()}
                </TouchableHighlight>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <View style={styles.containerTextInput}>
                                            <TextInput 
                                                value={this.props.nome}
                                                style={styles.textInput}
                                                placeholder='Nome'
                                                placeholderTextColor='#fff'
                                                onChangeText={ texto => this.props.modificaNome(texto)}/>
                                            <View style={styles.linha}></View>   
                                        </View>

                                        <View style={styles.containerTextInput}>
                                            <TextInput 
                                                value={this.props.email}
                                                style={styles.textInput}
                                                placeholder='E-mail' 
                                                placeholderTextColor='#fff' 
                                                onChangeText={ texto => this.props.modificaEmail(texto)}/>

                                            <View style={styles.linha}></View>   
                                        </View>
                                            <Text style={{backgroundColor: 'transparent', color: '#ff0000', fontSize: 18}}>{ this.props.erroCadastro }</Text>

                                            <View style={styles.containerTextInput}>
                                                <TextInput
                                                            multiline={true}
                                                            value={this.props.descricao}
                                                            numberOfLines={4}
                                                            style={styles.textInput}
                                                            placeholderTextColor='#fff'
                                                            placeholder='Descrição'
                                                            onChangeText={texto => this.props.modificaDescricao(texto)} />
                                                            <TouchableOpacity onPress={() => this._onPressDescricao()} style={{ width: 25, height: 25,
                                                                borderWidth: 1,
                                                                borderRadius: 18, 
                                                                position: 'absolute',
                                                                padding: 8, justifyContent: 'center',
                                                                marginTop: 20,
                                                                marginLeft: 220,
                                                                backgroundColor: '#fc5b07'}} >
                                                                        <Text style={{backgroundColor: "transparent",  fontSize: 12, color: '#fff', fontWeight: 'bold'}}>?</Text>
                                                            </TouchableOpacity>
                                                <View style={styles.linha}></View>   
                                            </View>
                                            <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                                                <View style={{ flexDirection: 'row'}}>
                                                        <Text style={{marginTop: 10, marginBottom: 50, backgroundColor: "transparent", fontSize: 13, color: '#fff', fontWeight: 'bold', marginRight: 15}}>Habilitar conta Premium </Text>
                                                        <TouchableOpacity onPress={() => this._onPress()} style={{ width: 45, height: 25,
                                                        borderWidth: 1,
                                                        borderColor: borderBg , borderRadius: 18, 
                                                        padding: 8, justifyContent: 'center',
                                                        marginTop: 5,
                                                        alignItems:'center', backgroundColor: buttonBg}} >
                                                                <Text style={{backgroundColor: "transparent", fontSize: 12, color: textColor, fontWeight: 'bold'}}>{textValue}</Text>
                                                        </TouchableOpacity>
                                                        
                                                </View>
                                            </View>
                                            <View style={styles.conteinerText}>
                                    <Text style={styles.text}>
                                        Dados pessoais e de pagamento:
                                    </Text>
                                </View>

                                <View style={styles.containerTextInput}>
                                    <TextInput 
                                        value={this.props.cpf}
                                        style={styles.textInputFirst}
                                        placeholder='CPF'
                                        keyboardType='number-pad'
                                        placeholderTextColor='#fff'
                                        onChangeText={ texto => this.props.modificaCPF(texto)}/>
                                        <View style={styles.linha}></View>   
                                </View>
                                
                                <View style={styles.containerTextInput}>
                                    <TextInput 
                                        value={this.props.dataNascimento}
                                        style={styles.textInput}
                                        placeholder='Data Nascimento'
                                        keyboardType='numbers-and-punctuation' 
                                        placeholderTextColor='#fff' 
                                        onChangeText={ texto => this.props.modificaDataNascimento(texto)}/>
                                        <View style={styles.linha}></View>   
                                </View>

                                <View style={styles.containerTextInput}>
                                    <TextInput 
                                        value={this.props.cep} 
                                        style={styles.textInput}
                                        placeholder='CEP'
                                        keyboardType='number-pad'
                                        placeholderTextColor='#fff' 
                                        onChangeText={ texto => this.props.modificaCEP(texto)}/>
                                        <View style={styles.linha}></View>   
                                </View>

                                <View style={styles.containerTextInput}>
                                    <TextInput
                                            multiline={true}
                                            value={this.props.endereco}
                                            numberOfLines={4}
                                            style={styles.textInput}
                                            placeholderTextColor='#fff'
                                            placeholder='Endereço'
                                            onChangeText={texto => this.props.modificaEndereco(texto)} />
                                        <View style={styles.linha}></View>   
                                </View>
                                
                                <View style={styles.containerTextInput}>
                                    <TextInput
                                            multiline={true}
                                            value={this.props.pais}
                                            style={styles.textInput}
                                            placeholderTextColor='#fff'
                                            placeholder='País'
                                            onEndEditing={this.clearFocus}
                                            onFocus={() => {
                                                Keyboard.dismiss()
                                                this.popupDialog.show()}}/>        
                                    <View style={styles.linha}></View>   
                                </View>

                                <View style={styles.containerTextInput}>
                                    <TextInput 
                                        value={this.props.titularCard} 
                                        style={styles.textInput}
                                        placeholder='Nome Titular do Cart.'
                                        placeholderTextColor='#fff' 
                                        onChangeText={ texto => this.props.modificaTitularCard(texto)}/>    
                                    <View style={styles.linha}></View>   
                                </View>

                                <View style={styles.containerTextInput}>
                                    <TextInput 
                                        value={this.props.numeroCard} 
                                        style={styles.textInput}
                                        placeholder='Número do Cart.'
                                        keyboardType='number-pad'
                                        placeholderTextColor='#fff' 
                                        onChangeText={ texto => this.props.modificaNumeroCard(texto)}/>
                                    <View style={styles.linha}></View>   
                                </View>

                                <View style={{flexDirection: 'row'}}>
                                        <View style={styles.containerTextInput}>
                                            <TextInput 
                                                value={this.props.validadeCard} 
                                                style={styles.validade}
                                                placeholder='Validade'
                                                placeholderTextColor='#fff' 
                                                keyboardType='numbers-and-punctuation'
                                                onChangeText={ texto => this.props.modificaValidadeData(texto)}/>
                                            <View style={styles.linha_validade}></View>   
                                        </View>
                                        <View style={styles.containerTextInput}>
                                            <TextInput 
                                                value={this.props.cvv} 
                                                style={styles.cvv}
                                                placeholder='CVV'
                                                keyboardType='number-pad'
                                                placeholderTextColor='#fff' 
                                                onChangeText={ texto => this.props.modificaCVV(texto)}/>
                                                <View style={styles.linha_cvv}></View>   
                                        </View>
                                </View>
                                    {this.renderButton()}
                        </View>
                </ScrollView>
            </View>
        </View>
    );
  }
}
Profile.navigationOptions = ({ navigation }) => ({
  header: (
        <Header style={{ backgroundColor: '#fc5b07'}} titleStyle={{backgroundColor: 'transparent', color: '#fff'}}>
          <Left>
            <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
              <Icon name="menu"  style={{backgroundColor: 'transparent', color: '#fff'}}/>
            </Button>
          </Left>
          <Body>
            <Title style={{backgroundColor: 'transparent', color: '#fff'}}>Cadastro</Title>
          </Body>
          <Right />
        </Header>
  )
});

const mapStateToProps = state => {

    const usuario = state.ProfileReducer;
  
    console.log('mapStateToProps Profile', usuario)
  
      //console.log('Conversas mapStateToProps state: ', state);
  
      return ({
        usuario,
        nome: state.AuthenticacaoReducer.nome,
        email: state.AuthenticacaoReducer.email,
        senha: state.AuthenticacaoReducer.senha,
        descricao: state.AuthenticacaoReducer.descricao,
        bool: state.AuthenticacaoReducer.bool,
        img: state.AuthenticacaoReducer.img,
        cpf: state.AuthenticacaoReducer.cpf,
        dataNascimento: state.AuthenticacaoReducer.dataNascimento,
        cep: state.AuthenticacaoReducer.cep,
        endereco: state.AuthenticacaoReducer.endereco,
        titularCard: state.AuthenticacaoReducer.titularCard,
        numeroCard: state.AuthenticacaoReducer.numeroCard,
        validadeCard: state.AuthenticacaoReducer.validadeCard,
        screen_request: state.AuthenticacaoReducer.screen_request,
        cvv: state.AuthenticacaoReducer.cvv,
        bool: state.AuthenticacaoReducer.bool,
        pais: state.AuthenticacaoReducer.pais,
        update_dados: state.ProfileReducer.update_dados
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
        marginTop: 10,
        marginBottom: 10,
        fontSize: 15,
        color: '#fff',
    },
    pais: {
        color: '#fff',
    },
});

export default connect(mapStateToProps, {UpdateDados, UpdateImg, modificaEmail, modificarBool, modificarIMG, modificaScreenRequest, modificaSenha, modificaNome, modificaDescricao,  cadastraUsuario, modificaNacionalidade, modificaCPF, modificaDataNascimento, modificaCEP, modificaEndereco, modificaTitularCard, modificaNumeroCard, modificaValidadeData, modificaCVV})(Profile)
