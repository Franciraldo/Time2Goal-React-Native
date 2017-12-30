import React, { Component } from 'react';
import { View, ScrollView, Picker, TouchableOpacity, TextInput, Text, StyleSheet, Image, TouchableHighlight,  ActivityIndicator, ImageBackground} from 'react-native';
import { AppRegistry, Alert } from "react-native";
import { Container, Header, Left, Body,Button, Title, Card, CardItem, Content, Right, Icon } from "native-base";
import { StackNavigator } from "react-navigation";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { UpdateDados, UpdateImg, modificaEmail, modificarBool, modificarIMG, modificaScreenRequest, modificaSenha, modificaNome, modificaDescricao,  cadastraUsuario, modificaNacionalidade, modificaCPF, modificaDataNascimento, modificaCEP, modificaEndereco, modificaTitularCard, modificaNumeroCard, modificaValidadeData, modificaCVV } from '../actions/AutenticacaoActions';
import formComplement from '../components/FormComplement'



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
            <TouchableHighlight style={{ marginTop: 20, borderWidth: 1, borderColor: '#532e1c', borderRadius: 18, backgroundColor: '#fc5b07', padding: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => this._updateDados()}>
                <Text style={{fontSize: 20, color: '#ffffff', fontWeight: 'bold'}}>Salvar</Text>
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

/*
<TextInput 
                            secureTextEntry
                            value={this.props.senha} 
                            style={styles.form}
                            placeholder='Senha'
                            placeholderTextColor='#fff' 
                            onChangeText={ texto => this.props.modificaSenha(texto)}/>

                            <TextInput 
                            value={this.props.email}
                            style={styles.form}
                            placeholder='E-mail' 
                            placeholderTextColor='#fff' 
                            onChangeText={ texto => this.props.modificaEmail(texto)}/>

*/

  render() {

    const {bool} = this.props;

        const textValue = bool ? "ON": "OFF";
        const buttonBg = bool ? "whitesmoke" : "#e42125";
        const borderBg = bool ? "whitesmoke":"#e42125";
        const textColor = bool ? "black":"whitesmoke";

    return (
        <View style={styles.container}>
                
            <ScrollView>
            <TouchableHighlight style={styles.uploadBtn} onPress={() => this._uploadImage()}>
                    {this.renderImage()}
            </TouchableHighlight>
            <TextInput 
                            value={this.props.nome}
                            style={styles.form}
                            placeholder='Nome'
                            placeholderTextColor='#fff'
                            onChangeText={ texto => this.props.modificaNome(texto)}/>
                        
            <Text style={{backgroundColor: 'transparent', color: '#ff0000', fontSize: 18}}>{ this.props.erroCadastro }</Text>

            <View style={{ flex: 1}}>
                <TextInput
                        multiline={true}
                        value={this.props.descricao}
                        numberOfLines={4}
                        style={styles.form}
                        placeholderTextColor='#fff'
                        placeholder='Descrição'
                        onChangeText={texto => this.props.modificaDescricao(texto)} />
            </View>
            <View style={{ marginTop: 10, flexDirection: 'row'}}>
                    <Text style={{marginTop: 10, marginBottom: 30, backgroundColor: "transparent", fontSize: 16, color: '#fff', fontWeight: 'bold', marginRight: 15}}>Habilitar conta Premium </Text>
                    <TouchableOpacity onPress={() => this._onPress()} style={{ width: 75, height: 35,
                    borderWidth: 1,
                    borderColor: borderBg , borderRadius: 18, 
                    padding: 10, justifyContent: 'center',
                    alignItems:'center', backgroundColor: buttonBg}} >
                            <Text style={{backgroundColor: "transparent", fontSize: 16, color: textColor, fontWeight: 'bold'}}>{textValue}</Text>
                    </TouchableOpacity>
                    
            </View>
                <View style={styles.conteinerText}>
                    <Text style={styles.text}>
                        Dados Pessoais:
                    </Text>
                </View>
                <TextInput 
                    value={this.props.cpf}
                    style={styles.form}
                    placeholder='CPF'
                    placeholderTextColor='#fff'
                    onChangeText={ texto => this.props.modificaCPF(texto)}/>
                
                <TextInput 
                    value={this.props.dataNascimento}
                    style={styles.form}
                    placeholder='Data Nascimento' 
                    placeholderTextColor='#fff' 
                    onChangeText={ texto => this.props.modificaDataNascimento(texto)}/>
                
                <TextInput 
                    value={this.props.cep} 
                    style={styles.form}
                    placeholder='CEP'
                    placeholderTextColor='#fff' 
                    onChangeText={ texto => this.props.modificaCEP(texto)}/>

                <TextInput
                        multiline={true}
                        value={this.props.endereco}
                        numberOfLines={4}
                        style={styles.form}
                        placeholderTextColor='#fff'
                        placeholder='Endereço'
                        onChangeText={texto => this.props.modificaEndereco(texto)} />
                <View style={styles.conteinerText}>
                    <Text style={styles.text}>
                        Informe o país de origem:  
                    </Text>
                </View>
                
                <Picker  selectedValue={ this.props.pais } onValueChange={ pais => this.props.modificaNacionalidade(pais)}>
                    <Picker.Item color='#fff' label='Afeganistão' value='AF'/>
                    <Picker.Item color='#fff' label='Africa do Sul' value='ZA'/> 
                    <Picker.Item color='#fff' label='Albânia' value='AL'/> 
                    <Picker.Item color='#fff'label='Alemanha' value='DE'/> 
                    <Picker.Item color='#fff'label='Andorra' value='AD'/> 
                    <Picker.Item color='#fff'label='Angola' value='AO'/> 
                    <Picker.Item color='#fff'label='Anguilla' value='AI'/> 
                    <Picker.Item color='#fff'label='Antartica' value='AQ'/> 
                    <Picker.Item color='#fff'label='Antígua e Barbuda' value='AG'/> 
                    <Picker.Item color='#fff'label='Antilhas Holandesas' value='AN'/> 
                    <Picker.Item color='#fff'label='Arábia Saudita' value='SA'/> 
                    <Picker.Item color='#fff'label='Argélia' value='DZ'/> 
                    <Picker.Item color='#fff'label='Argentina' value='AR'/> 
                    <Picker.Item color='#fff'label='Armênia' value='AM'/> 
                    <Picker.Item color='#fff'label='Aruba' value='AW'/> 
                    <Picker.Item color='#fff'label='Austrália' value='AU'/> 
                    <Picker.Item color='#fff'label='Áustria' value='AT'/> 
                    <Picker.Item color='#fff'label='Azerbaidjão' value='AZ'/> 
                    <Picker.Item color='#fff'label='Bahamas' value='BS'/> 
                    <Picker.Item color='#fff'label='Bangladesh' value='BD'/> 
                    <Picker.Item color='#fff'label='Barbados' value='BB'/> 
                    <Picker.Item color='#fff'label='Bareine' value='BH'/> 
                    <Picker.Item color='#fff'label='Belarus' value='BY'/> 
                    <Picker.Item color='#fff'label='Bélgica' value='BE'/> 
                    <Picker.Item color='#fff'label='Belize' value='BZ'/> 
                    <Picker.Item color='#fff'label='Benelux' value='BX'/> 
                    <Picker.Item color='#fff'label='Benin' value='BJ'/> 
                    <Picker.Item color='#fff'label='Bermudas' value='BM'/>
                    <Picker.Item color='#fff'label='Bolívia' value='BO'/>
                    <Picker.Item color='#fff'label='Bósnia e Herzegóvina' value='BA'/>
                    <Picker.Item color='#fff'label='Botswana' value='BW'/>
                    <Picker.Item color='#fff'label='Brasil' value='Brasil'/>
                    <Picker.Item color='#fff'label='Bulgária' value='BG'/>
                    <Picker.Item color='#fff'label='Brunei Darussalam' value='BN'/>
                    <Picker.Item color='#fff'label='Burkina Faso' value='BF'/>
                    <Picker.Item color='#fff'label='Burundi' value='BI'/>
                    <Picker.Item color='#fff'label='Butão' value='BT'/>
                    <Picker.Item color='#fff'label='Cabo Verde' value='CV'/>
                    <Picker.Item color='#fff'label='Camarões' value='CM'/>
                    <Picker.Item color='#fff'label='Camboja' value='KH'/>
                    <Picker.Item color='#fff'label='Canadá' value='CA'/>
                    <Picker.Item color='#fff'label='Catar' value='QA'/>
                    <Picker.Item color='#fff'label='Cazaquistão' value='KZ'/>
                    <Picker.Item color='#fff'label='Chade' value='TD'/>
                    <Picker.Item color='#fff'label='Guiné Bissau' value='GW'/>
                    <Picker.Item color='#fff'label='Guine Equatorial' value='GQ'/>
                    <Picker.Item color='#fff'label='Haiti' value='HT'/>
                    <Picker.Item color='#fff'label='Holanda' value='NL'/>
                    <Picker.Item color='#fff'label='Honduras' value='HN'/>
                    <Picker.Item color='#fff'label='Hong-Kong' value='HK'/>
                    <Picker.Item color='#fff'label='Hungria' value='HU'/>
                    <Picker.Item color='#fff'label='Iêmen' value='YE'/>
                    <Picker.Item color='#fff'label='Ilha Bouvet' value='BV'/>     
                    <Picker.Item color='#fff'label='Ilha do Homem' value='IM'/>
                    <Picker.Item color='#fff'label='Ilha Natal' value='CX'/>
                    <Picker.Item color='#fff'label='Ilha Norfalk' value='NF'/>
                    <Picker.Item color='#fff'label='Ilhas Cayman' value='KY'/>
                    <Picker.Item color='#fff'label='Ilhas Cocos' value='CC'/>
                    <Picker.Item color='#fff'label='Ilhas Cook' value='CK'/>
                    <Picker.Item color='#fff'label='Ilhas do Canal' value='GG'/>
                    <Picker.Item color='#fff'label='Ilhas Faroe' value='FO'/>
                    <Picker.Item color='#fff'label='Ilhas Heard e McDonald' value='HM'/>
                    <Picker.Item color='#fff'label='Ilhas Marianas do Norte' value='MP'/>
                    <Picker.Item color='#fff'label='Ilhas Marshall' value='MH'/>
                    <Picker.Item color='#fff'label='Ilhas Salomão' value='SB'/>
                    <Picker.Item color='#fff'label='Ilhas Turks e Caicos' value='TC'/>
                    <Picker.Item color='#fff'label='Ilhas Virgens (Britânicas)' value='VG'/>
                    <Picker.Item color='#fff'label='Ilhas Virgens (U.S.)' value='VI'/>
                    <Picker.Item color='#fff'label='Ilhas Wallis e Futura' value='WF'/>
                    <Picker.Item color='#fff'label='India' value='IN'/>
                    <Picker.Item color='#fff'label='Indonésia' value='ID'/>
                    <Picker.Item color='#fff'label='Irã' value='IR'/>
                    <Picker.Item color='#fff'label='Iraque' value='IQ'/>
                    <Picker.Item color='#fff'label='Irlanda' value='IE'/>
                    <Picker.Item color='#fff'label='Islândia' value='IS'/>
                    <Picker.Item color='#fff'label='Israel' value='IL'/>
                    <Picker.Item color='#fff'label='Itália' value='IT'/>
                    <Picker.Item color='#fff'label='Jamaica' value='JM'/>
                    <Picker.Item color='#fff'label='Japão' value='JP'/>
                    <Picker.Item color='#fff'label='Jersey' value='JE'/>
                    <Picker.Item color='#fff'label='Palau' value='PW'/>
                    <Picker.Item color='#fff'label='Panamá' value='PA'/>
                    <Picker.Item color='#fff'label='Papua Nova Guiné' value='PG'/>
                    <Picker.Item color='#fff'label='Paquistão' value='PK'/>
                    <Picker.Item color='#fff'label='Paraguai' value='PY'/>
                    <Picker.Item color='#fff'label='Peru' value='PE'/>
                    <Picker.Item color='#fff'label='Pitcairn' value='PN'/>
                    <Picker.Item color='#fff'label='Polinésia Francesa' value='PF'/>
                    <Picker.Item color='#fff'label='Polônia' value='PL'/>
                    <Picker.Item color='#fff'label='Porto Rico' value='PR'/>
                    <Picker.Item color='#fff'label='Portugal' value='PT'/>
                    <Picker.Item color='#fff'label='Quênia' value='KE'/>
                    <Picker.Item color='#fff'label='Quirguistão' value='KG'/>
                    <Picker.Item color='#fff'label='Reino Unido' value='GB'/>
                    <Picker.Item color='#fff'label='Quênia' value='KE'/>
                    <Picker.Item color='#fff'label='República Centro Africana' value='CF'/>
                    <Picker.Item color='#fff'label='República da Coréia' value='KR'/>
                    <Picker.Item color='#fff'label='República da Macedonia' value='MK'/>
                    <Picker.Item color='#fff'label='República da Moldova' value='MD'/>
                    <Picker.Item color='#fff'label='República Dem. Do Congo' value='CD'/>
                    <Picker.Item color='#fff'label='República Dominicana' value='DO'/>
                    <Picker.Item color='#fff'label='República Pop. Dem. da Coreia' value='KP'/>
                    <Picker.Item color='#fff'label='República Tcheca' value='CZ'/>
                    <Picker.Item color='#fff'label='República Unida da Tanzânia' value='TZ'/>
                    <Picker.Item color='#fff'label='Reunião' value='RE'/>
                    <Picker.Item color='#fff'label='Romênia' value='RO'/>
                    <Picker.Item color='#fff'label='Ruanda' value='RW'/>
                    <Picker.Item color='#fff'label='Saara Ocidental' value='EH'/>
                    <Picker.Item color='#fff'label='Saint Pierre e Miquelon' value='PM'/>
                    <Picker.Item color='#fff'label='Samoa Americana' value='AS'/>
                    <Picker.Item color='#fff'label='Samoa Ocidental' value='WS'/>
                    <Picker.Item color='#fff'label='Santa Helena' value='SH'/>
                    <Picker.Item color='#fff'label='Santa Lúcia' value='LC'/>
                    <Picker.Item color='#fff'label='São Marino' value='SM'/>
                    <Picker.Item color='#fff'label='São Vicente e Granadinas' value='VC'/>
                    <Picker.Item color='#fff'label='Serra Leoa' value='SL'/>
                    <Picker.Item color='#fff'label='Seychelles' value='SC'/>
                    <Picker.Item color='#fff'label='Síria' value='SY'/>
                    <Picker.Item color='#fff'label='Sri Lanka' value='LK'/>
                    <Picker.Item color='#fff'label='Sudão' value='SD'/>
                    <Picker.Item color='#fff'label='Chile' value='CL'/>
                    <Picker.Item color='#fff'label='China' value='CN'/>
                    <Picker.Item color='#fff'label='Chipre' value='CY'/>
                    <Picker.Item color='#fff'label='Colômbia' value='CO'/>
                    <Picker.Item color='#fff'label='Comores' value='KM'/>
                    <Picker.Item color='#fff'label='Congo' value='CG'/>
                    <Picker.Item color='#fff'label='Costa do Marfim' value='CI'/>
                    <Picker.Item color='#fff'label='Costa Rica' value='CR'/>
                    <Picker.Item color='#fff'label='Croácia' value='HR'/>
                    <Picker.Item color='#fff'label='Cuba' value='CU'/>
                    <Picker.Item color='#fff'label='Dinamarca' value='DK'/>
                    <Picker.Item color='#fff'label='Djibuti' value='DJ'/>
                    <Picker.Item color='#fff'label='Dominica' value='DM'/>
                    <Picker.Item color='#fff'label='Egito' value='EG'/>
                    <Picker.Item color='#fff'label='El Salvador' value='SV'/>
                    <Picker.Item color='#fff'label='Emirados Árabes Unidos' value='AE'/>
                    <Picker.Item color='#fff'label='Equador' value='EC'/>
                    <Picker.Item color='#fff'label='Eritréia' value='ER'/>
                    <Picker.Item color='#fff'label='Eslováquia' value='SK'/>
                    <Picker.Item color='#fff'label='Espanha' value='ES'/>
                    <Picker.Item color='#fff'label='Estados Unidos da América' value='US'/>
                    <Picker.Item color='#fff'label='Estônia' value='EE'/>
                    <Picker.Item color='#fff'label='Etiópia' value='ET'/>
                    <Picker.Item color='#fff'label='Federação Russa' value='RU'/>
                    <Picker.Item color='#fff'label='Fiji' value='FJ'/>
                    <Picker.Item color='#fff'label='Filipinas' value='PH'/>
                    <Picker.Item color='#fff'label='Finlândia' value='FI'/>
                    <Picker.Item color='#fff'label='França' value='FR'/>
                    <Picker.Item color='#fff'label='Gabão' value='GA'/>
                    <Picker.Item color='#fff'label='Gambia' value='GM'/>
                    <Picker.Item color='#fff'label='Geórgia' value='GE'/>
                    <Picker.Item color='#fff'label='Gana' value='GH'/>
                    <Picker.Item color='#fff'label='Geórgia do Sul e Ilhas Sandwich do Sul' value='GS'/>
                    <Picker.Item color='#fff'label='Gibraltar' value='GI'/>
                    <Picker.Item color='#fff'label='Granada' value='GD'/>
                    <Picker.Item color='#fff'label='Grécia' value='GR'/>
                    <Picker.Item color='#fff'label='Groenlândia' value='GL'/>
                    <Picker.Item color='#fff'label='Guadalupe' value='GP'/>
                    <Picker.Item color='#fff'label='Guam' value='GU'/>
                    <Picker.Item color='#fff'label='Guatemala' value='GT'/>
                    <Picker.Item color='#fff'label='Guiana' value='GY'/>
                    <Picker.Item color='#fff'label='Guine' value='GN'/>
                    <Picker.Item color='#fff'label='Jordânia' value='JO'/>
                    <Picker.Item color='#fff'label='Kiribati' value='KI'/>
                    <Picker.Item color='#fff'label='Kuwait' value='KW'/>
                    <Picker.Item color='#fff'label='Laos' value='LA'/>
                    <Picker.Item color='#fff'label='Lesoto' value='LS'/>
                    <Picker.Item color='#fff'label='Letônia' value='LV'/>
                    <Picker.Item color='#fff'label='Líbano' value='LB'/>
                    <Picker.Item color='#fff'label='Libéria' value='LR'/>
                    <Picker.Item color='#fff'label='Líbia' value='LY'/>
                    <Picker.Item color='#fff'label='Liechtenstein' value='LI'/>
                    <Picker.Item color='#fff'label='Lituânia' value='LT'/>
                    <Picker.Item color='#fff'label='Luxemburgo' value='LU'/>
                    <Picker.Item color='#fff'label='Macau' value='MO'/>
                    <Picker.Item color='#fff'label='Madagascar' value='MG'/>
                    <Picker.Item color='#fff'label='Malásia' value='MY'/>
                    <Picker.Item color='#fff'label='Malawi' value='MW'/>
                    <Picker.Item color='#fff'label='Maldivas' value='MV'/>
                    <Picker.Item color='#fff'label='Mali' value='ML'/>
                    <Picker.Item color='#fff'label='Malta' value='MT'/>
                    <Picker.Item color='#fff'label='Marrocos' value='MA'/>
                    <Picker.Item color='#fff'label='Martinica' value='MQ'/>
                    <Picker.Item color='#fff'label='Maurício' value='MU'/>
                    <Picker.Item color='#fff'label='Mauritânia' value='MR'/>
                    <Picker.Item color='#fff'label='México' value='MX'/>
                    <Picker.Item color='#fff'label='Mianmá' value='MM'/>
                    <Picker.Item color='#fff'label='Micronésia' value='FM'/>
                    <Picker.Item color='#fff'label='Moçambique' value='MZ'/>
                    <Picker.Item color='#fff'label='Mônaco' value='MC'/>
                    <Picker.Item color='#fff'label='Mongólia' value='MN'/>
                    <Picker.Item color='#fff'label='Mont Serrat' value='MS'/>
                    <Picker.Item color='#fff'label='Montenegro' value='ME'/>
                    <Picker.Item color='#fff'label='Namíbia' value='NA'/>
                    <Picker.Item color='#fff'label='Nauru' value='NR'/>
                    <Picker.Item color='#fff'label='Nepal' value='NP'/>
                    <Picker.Item color='#fff'label='Nicarágua' value='NI'/>
                    <Picker.Item color='#fff'label='Níger' value='NE'/>
                    <Picker.Item color='#fff'label='Nigéria' value='NG'/>
                    <Picker.Item color='#fff'label='Noruega' value='NO'/>
                    <Picker.Item color='#fff'label='Nova Caledônia' value='NC'/>
                    <Picker.Item color='#fff'label='Nova Zelândia' value='NZ'/>
                    <Picker.Item color='#fff'label='Omã' value='OM'/>
                    <Picker.Item color='#fff'label='Suécia' value='SE'/>
                    <Picker.Item color='#fff'label='Suíça' value='CH'/>
                    <Picker.Item color='#fff'label='Suriname' value='SR'/>
                    <Picker.Item color='#fff'label='Svalbard e Jan Mayen' value='SJ'/>
                    <Picker.Item color='#fff'label='Tadjiquistão' value='TJ'/>
                    <Picker.Item color='#fff'label='Tailândia' value='TH'/>
                    <Picker.Item color='#fff'label='Togo' value='TG'/>
                    <Picker.Item color='#fff'label='Tokelau' value='TK'/>
                    <Picker.Item color='#fff'label='Tonga' value='TO'/>
                    <Picker.Item color='#fff'label='Trinidad e Tobago' value='TT'/>
                    <Picker.Item color='#fff'label='Tunísia' value='TN'/>
                    <Picker.Item color='#fff'label='Turcomenistão' value='TM'/>
                    <Picker.Item color='#fff'label='Turquia' value='TR'/>
                    <Picker.Item color='#fff'label='Tuvalu' value='TV'/>
                    <Picker.Item color='#fff'label='Ucrânia' value='UA'/>
                    <Picker.Item color='#fff'label='Uganda' value='UG'/>
                    <Picker.Item color='#fff'label='Uruguai' value='UY'/>
                    <Picker.Item color='#fff'label='Uzbequistão' value='UZ'/>
                    <Picker.Item color='#fff'label='Vanuatu' value='VU'/>
                    <Picker.Item color='#fff'label='Vaticano' value='VA'/>
                    <Picker.Item color='#fff'label='Venezuela' value='VE'/>
                    <Picker.Item color='#fff'label='Vietnã' value='VN'/>
                    <Picker.Item color='#fff'label='Yugoslávia' value='YU'/>
                    <Picker.Item color='#fff'label='Zaire' value='ZR'/>
                    <Picker.Item color='#fff'label='Zâmbia' value='ZM'/>
                    <Picker.Item color='#fff'label='Zimbábue' value='ZW'/>
                    <Picker.Item color='#fff'label='São Cristovão e Nevis' value='KN'/>
                    <Picker.Item color='#fff'label='São Tomé e Príncipe' value='ST'/>
                    <Picker.Item color='#fff'label='Senegal' value='SN'/>
                    <Picker.Item color='#fff'label='Sérvia' value='RS'/>
                    <Picker.Item color='#fff'label='Singapura' value='SG'/>
                    <Picker.Item color='#fff'label='Somália' value='SO'/>
                    <Picker.Item color='#fff'label='Suazilândia' value='SZ'/>
                </Picker>  

                <View style={styles.conteinerText}>
                    <Text style={styles.text}>
                        Dados Cartão:   
                    </Text>
                </View>  
                <TextInput 
                    value={this.props.titularCard} 
                    style={styles.form}
                    placeholder='Nome Titular do Cart.'
                    placeholderTextColor='#fff' 
                    onChangeText={ texto => this.props.modificaTitularCard(texto)}/>
                <TextInput 
                    value={this.props.numeroCard} 
                    style={styles.form}
                    placeholder='Número do Cart.'
                    placeholderTextColor='#fff' 
                    onChangeText={ texto => this.props.modificaNumeroCard(texto)}/>
                <TextInput 
                    value={this.props.validadeCard} 
                    style={styles.form}
                    placeholder='Validade dat.'
                    placeholderTextColor='#fff' 
                    onChangeText={ texto => this.props.modificaValidadeData(texto)}/>
                <TextInput 
                    value={this.props.cvv} 
                    style={styles.form}
                    placeholder='CVV'
                    placeholderTextColor='#fff' 
                    onChangeText={ texto => this.props.modificaCVV(texto)}/>

                {this.renderButton()}
            </ScrollView>
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
            <Title style={{backgroundColor: 'transparent', color: '#fff'}}>Profile</Title>
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
  uploadImage: {
      width: 90,
      height: 90  
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
      color: '#fff'
  },
});

export default connect(mapStateToProps, {UpdateDados, UpdateImg, modificaEmail, modificarBool, modificarIMG, modificaScreenRequest, modificaSenha, modificaNome, modificaDescricao,  cadastraUsuario, modificaNacionalidade, modificaCPF, modificaDataNascimento, modificaCEP, modificaEndereco, modificaTitularCard, modificaNumeroCard, modificaValidadeData, modificaCVV})(Profile)
