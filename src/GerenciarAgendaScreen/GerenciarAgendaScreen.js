import React from "react";
import { AppRegistry, Alert, View, StyleSheet, TouchableHighlight, Picker, ListView, FlatList, Image } from "react-native";
import { Container, Header, Left, Body, Title, Card, CardItem, Content, Right, Icon, Button, Text } from "native-base";
import { StackNavigator } from "react-navigation";
import {LocaleConfig, Calendar} from 'react-native-calendars';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import { getDaysAgendados, salvarHorario, modificarSelectDay, modificarHoraInicial, modificarHoraFinal, modificarMinutoInicial, modificarMinutoFinal, getHorarios, deleteHorarios} from '../actions/FormMentoringActions';
const checkout_off = require('../imgs/checked_off.png')
const checkout_on = require('../imgs/checked_on.png')
const chat = require('../imgs/chat-icon.png');

LocaleConfig.locales['pt'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan.','Fev.','Mar.','Abr.','Mai.','Jun.','Jul.','Agos.','Set.','Out.','Nov.','Dec.'],
  dayNames: ['Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'],
  dayNamesShort: ['Seg.','Ter.','Qua.','Qui.','Sex.','Sab.','Dom.']
};
LocaleConfig.defaultLocale = 'pt';
class GerenciarAgendaScreen extends React.Component {

  componentDidMount(){
    this.props.navigation.setParams({ popupDialog: this.popupDialog });
    const day = this.formatDate();
    console.log('GerenciarAgendaScreen day: ', day); 
    this.props.modificarSelectDay(day);
    console.log('GerenciarAgendaScreen componentDidMount: ', this.props) 
  }

  formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

  componentWillMount() {
      console.log('GerenciarAgendaScreen componentWillMount: ', this.props); 
      const {lista_agenda_horarios} = this.props;
      const {email} = this.props.usuario;
      const day = this.formatDate();
      this.props.getDaysAgendados(email);
      this.props.getHorarios(email, day);
      this.criaFonteDeDados(lista_agenda_horarios);    
  }

  componentWillReceiveProps(nextProps){
    //console.log('GerenciarAgendaScreen componentWillReceiveProps: ', nextProps)
    const {emailMentor, lista_agenda_horarios} = nextProps
    this.criaFonteDeDados(lista_agenda_horarios);
  }
  
  _salvarHorario() {
    var horaAtual = new Date().getHours();
    var minutoAtual = new Date().getMinutes();
    const { hora_inicial, minuto_inicial, hora_final, minuto_final } = this.props
    const { email } = this.props.usuario
    const day = this.props.selected_day
    
    console.log('_salvarHorario: ', { day, horaAtual, minutoAtual, hora_inicial, minuto_inicial, hora_final, minuto_final, email })
    
    if( hora_inicial != '' && minuto_inicial != ''  && hora_final != '' && minuto_final != ''){
      
      if(parseInt(hora_inicial) >= horaAtual && parseInt(minuto_inicial) >= minutoAtual && parseInt(hora_final) >= parseInt(hora_inicial) && parseInt(minuto_inicial) < parseInt(minuto_final)){
        salvarHorario(day, hora_inicial, hora_final, minuto_inicial, minuto_final, email)
        this.props.modificarHoraInicial('')
        this.props.modificarHoraFinal('')
        this.props.modificarMinutoInicial('')
        this.props.modificarMinutoFinal('')

        this.popupDialog.dismiss()
      }else{
        Alert.alert(
          'Atenção',
          'Por favor insira um horário valido.',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      }
    } else {
      Alert.alert(
        'Atenção',
        'Por favor informe Horario inicial e horario final.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
  }



  onDaySelect(day) {
    const {emailMentor, lista_agenda_horarios, usuario} = this.props
      console.log('onDaySelect', { day, emailMentor, lista_agenda_horarios})
    var mesAtual = new Date().getMonth() + 1;
    var diaAtual = new Date().getDate();
    var daySelected = day.day;
    var mesSelected = day.month;
    console.log('datas: ', {mesAtual, diaAtual, daySelected, mesSelected})

    if((daySelected >= diaAtual) || (daySelected <  diaAtual && mesSelected > mesAtual)){
        this.props.modificarSelectDay(day.dateString)
        this.props.getHorarios(usuario.email, day.dateString)
        this.criaFonteDeDados(lista_agenda_horarios);
    }else{
      Alert.alert(
        'Atenção',
        'você não pode selecionar uma data passada.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }

  }

    criaFonteDeDados( lista_agenda_horarios ) {
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2});
      this.dataSource = ds.cloneWithRows( lista_agenda_horarios )
  }

  renderRow(lista_agenda_horarios, emailMentor) {
    let {selected_day} = this.props; 
    console.log('lista_agenda_horarios: ', lista_agenda_horarios)
    const day = this.formatDate()
      if(lista_agenda_horarios.bool){
          return (
            <TouchableHighlight onPress={
                () => false
            }>
                <View style={{ flex: 1, flexDirection: 'row', padding: 20, borderBottomWidth: 1, borderColor: "#ccc"}}>
                        <View style={{ flexDirection: 'column', width: 200}}>
                          <Text style={{ fontSize: 16, color: "#fff", backgroundColor: 'transparent'}}>{lista_agenda_horarios.nome_aluno}</Text>
                          <Text style={{ fontSize: 14, color: "#fff", backgroundColor: 'transparent'}}>{lista_agenda_horarios.hora_inicial}:{lista_agenda_horarios.minuto_inicial} - {lista_agenda_horarios.hora_final}:{lista_agenda_horarios.minuto_final}</Text>
                        </View>
                        <View style={{flexDirection: 'row', marginLeft: 10}}>
                          <TouchableHighlight onPress={() => { Actions.conversa({ title: lista_agenda_horarios.nome_aluno, contatoNome: lista_agenda_horarios.nome_aluno , contatoEmail: lista_agenda_horarios.email_aluno, contatoImg: lista_agenda_horarios.img_aluno }) }}>
                              <Image
                                  style={styles.button}
                                  source={chat}
                              />
                          </TouchableHighlight>
                          <Image
                            style={styles.check_on}
                            source={checkout_on}
                          />    
                        </View>
                </View>
            </TouchableHighlight>
        )
      }else{
          return (
            <TouchableHighlight onPress={
                () =>  false}
                onLongPress={() => {
                  Alert.alert(
                    'Atenção',
                    'Você tem certeza que gostaria de excluir o horário ?',
                    [
                      {text: 'Sim', onPress: () => this.props.deleteHorarios(selected_day, lista_agenda_horarios.uid)},
                      {text: 'Não', onPress: () => false, style: 'cancel'},
                    ],
                    { cancelable: false }
                  )
                  
                }}>
                <View style={{ flex: 1, flexDirection: 'row', padding: 20, borderBottomWidth: 1, borderColor: "#ccc"}}>
                        <View style={{ flexDirection: 'column', width: 285}}>
                          <Text style={{ fontSize: 16, color: "#fff", backgroundColor: 'transparent'}}>Horario vago</Text>
                          <Text style={{ fontSize: 14, color: "#fff", backgroundColor: 'transparent'}}>{lista_agenda_horarios.hora_inicial}:{lista_agenda_horarios.minuto_inicial} - {lista_agenda_horarios.hora_final}:{lista_agenda_horarios.minuto_final}</Text>
                        </View>
                        
                        <Image
                          style={styles.check_off}
                          source={checkout_off}
                          />
                </View>
            </TouchableHighlight>
        )
      }
  }

  renderListView() {
      if(this.props.lista_agenda_horarios.length > 0){
        return (
            <ListView 
                enableEmptySections
                dataSource={ this.dataSource }
                renderRow={ this.renderRow.bind(this) }
            />
        );
    }else{
        return (
              <FlatList
                data={[
                  {key: 'você não selecionou horários para hoje.'}
                ]}
                renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
              />
          );
    }
  }
  render() {
    const slideAnimation = new SlideAnimation({
      slideFrom: 'bottom',
    });
    const vacation = {key:'vacation', color: 'red', selectedColor: 'blue'};
    const massage = {key:'massage', color: 'blue', selectedColor: 'blue'};
    const workout = {key:'workout', color: 'green'};

    return (
      <Container>
        <Content padder style={styles.container}>
              <PopupDialog height= {500} dialogTitle={<DialogTitle titleStyle={styles.DialogTitle} titleTextStyle={{color: 'white'}} title="Selecione o Horario de Disponibilidade" />} dialogAnimation={this.slideAnimation}  dialogStyle={{backgroundColor: '#2b2a29'}} ref={(popupDialog) => { this.popupDialog = popupDialog; }}>          
                    
                    
              <View zIndex={1} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', bottom: 10, top: 5}}>
                      <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={styles.text}>Horario Inicial: </Text>
                      </View>
                      <View style={{ flex: 1, flexDirection: 'column' }}>
                          <Picker  selectedValue={ this.props.hora_inicial } onValueChange={ hora => this.props.modificarHoraInicial(hora)}>
                                <Picker.Item color='#fff'label='' value=''/>
                                <Picker.Item color='#fff'label='00' value='00'/>
                                <Picker.Item color='#fff'label='01' value='01'/>
                                <Picker.Item color='#fff'label='02' value='02'/>
                                <Picker.Item color='#fff'label='03' value='03'/>
                                <Picker.Item color='#fff'label='04' value='04'/>
                                <Picker.Item color='#fff'label='05' value='05'/>
                                <Picker.Item color='#fff'label='06' value='06'/>
                                <Picker.Item color='#fff'label='07' value='07'/>
                                <Picker.Item color='#fff'label='08' value='08'/>
                                <Picker.Item color='#fff'label='09' value='09'/>
                                <Picker.Item color='#fff'label='10' value='10'/>
                                <Picker.Item color='#fff'label='11' value='11'/>
                                <Picker.Item color='#fff'label='12' value='12'/>
                                <Picker.Item color='#fff'label='13' value='13'/>
                                <Picker.Item color='#fff'label='14' value='14'/>
                                <Picker.Item color='#fff'label='15' value='15'/>
                                <Picker.Item color='#fff'label='16' value='16'/>
                                <Picker.Item color='#fff'label='17' value='17'/>
                                <Picker.Item color='#fff'label='18' value='18'/>
                                <Picker.Item color='#fff'label='19' value='19'/>
                                <Picker.Item color='#fff'label='20' value='20'/>
                                <Picker.Item color='#fff'label='21' value='21'/>
                                <Picker.Item color='#fff'label='22' value='22'/>
                                <Picker.Item color='#fff'label='23' value='23'/>
                          </Picker>
                      </View>
                      
                      <View style={{ flex: 1, flexDirection: 'column' }}>
                            <Picker  selectedValue={ this.props.minuto_inicial } onValueChange={ minuto => this.props.modificarMinutoInicial(minuto)}>
                              <Picker.Item color='#fff'label='' value=''/>
                              <Picker.Item color='#fff'label='00' value='00'/>
                              <Picker.Item color='#fff'label='15' value='15'/>
                              <Picker.Item color='#fff'label='30' value='30'/>
                              <Picker.Item color='#fff'label='45' value='45'/>
                          </Picker>
                      </View>                      
                    </View>
                    
                  <View zIndex={1} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', bottom: 60, top: 5 }}>
                  <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text style={styles.text}>Hora Final: </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'column' }}>
                      <Picker  selectedValue={ this.props.hora_final } onValueChange={ hora => this.props.modificarHoraFinal(hora)}>
                          <Picker.Item color='#fff'label='' value=''/>
                          <Picker.Item color='#fff'label='00' value='00'/>
                          <Picker.Item color='#fff'label='01' value='01'/>
                          <Picker.Item color='#fff'label='02' value='02'/>
                          <Picker.Item color='#fff'label='03' value='03'/>
                          <Picker.Item color='#fff'label='04' value='04'/>
                          <Picker.Item color='#fff'label='05' value='05'/>
                          <Picker.Item color='#fff'label='06' value='06'/>
                          <Picker.Item color='#fff'label='07' value='07'/>
                          <Picker.Item color='#fff'label='08' value='08'/>
                          <Picker.Item color='#fff'label='09' value='09'/>
                          <Picker.Item color='#fff'label='10' value='10'/>
                          <Picker.Item color='#fff'label='11' value='11'/>
                          <Picker.Item color='#fff'label='12' value='12'/>
                          <Picker.Item color='#fff'label='13' value='13'/>
                          <Picker.Item color='#fff'label='14' value='14'/>
                          <Picker.Item color='#fff'label='15' value='15'/>
                          <Picker.Item color='#fff'label='16' value='16'/>
                          <Picker.Item color='#fff'label='17' value='17'/>
                          <Picker.Item color='#fff'label='18' value='18'/>
                          <Picker.Item color='#fff'label='19' value='19'/>
                          <Picker.Item color='#fff'label='20' value='20'/>
                          <Picker.Item color='#fff'label='21' value='21'/>
                          <Picker.Item color='#fff'label='22' value='22'/>
                          <Picker.Item color='#fff'label='23' value='23'/>
                      </Picker>
                  </View>
                  
                  <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Picker  selectedValue={ this.props.minuto_final } onValueChange={ minuto => this.props.modificarMinutoFinal(minuto)}>
                          <Picker.Item color='#fff'label='' value=''/>
                          <Picker.Item color='#fff'label='00' value='00'/>
                          <Picker.Item color='#fff'label='15' value='15'/>
                          <Picker.Item color='#fff'label='30' value='30'/>
                          <Picker.Item color='#fff'label='45' value='45'/>
                      </Picker>
                  </View>
              </View>

              <View zIndex={2} style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                  <TouchableHighlight style={styles.btn} onPress={() => this._salvarHorario()}>
                      <Text style={styles.btnText}>Confirmar</Text>
                  </TouchableHighlight>
              </View>
                    
                    
              </PopupDialog>
              <View>
                <Calendar
                    onDayPress={ this.onDaySelect.bind(this) }                   
                    current={this.props.lista_agenda_day}
                    markingType={'multi-dot'}
                    theme={{
                      backgroundColor: '#ffffff',
                      calendarBackground: '#2b2a29',
                      textSectionTitleColor: '#b6c1cd',
                      selectedDayBackgroundColor: '#fc5b07',
                      selectedDayTextColor: '#fc5b07',
                      todayTextColor: '#fc5b03',
                      dayTextColor: '#ffffff',
                      textDisabledColor: '#d9e1e8',
                      dotColor: '#00adf5',
                      selectedDotColor: '#ffffff',
                      arrowColor: '#ffffff',
                      monthTextColor: '#ffffff',
                      textDayFontSize: 16,
                      textMonthFontSize: 16,
                      textDayHeaderFontSize: 16
                    }}            
                    hideArrows={false}
                  />
                  <View style={{ flex: 1, flexDirection: 'row', marginTop: 10}}>
                      {this.renderListView()}
                  </View>
              </View>
          </Content>
      </Container>
    );
  }

}

GerenciarAgendaScreen.navigationOptions = ({ navigation }) => ({
  header: (
        <Header style={{ backgroundColor: '#fc5b07'}} titleStyle={{backgroundColor: 'transparent', color: '#fff'}}>
          <Left>
            <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
              <Icon name="menu"  style={{backgroundColor: 'transparent', color: '#fff'}}/>
            </Button>
          </Left>
          <Body>
            <Title style={{backgroundColor: 'transparent', color: '#fff'}}> Agenda </Title>
          </Body>
          <Right>
            <Button transparent
              onPress={() => {
                navigation.state.params.popupDialog.show()
              } }  underlayColor="transparent">
              <Icon style={styles.icon} name="ios-add" />
            </Button>
          </Right>
        </Header>
  )
});

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  DialogTitle: {
    backgroundColor: '#fc5b07',
    borderColor: '#fc5b07',
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
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#2b2a29'

},
icon: {
  fontSize: 35,
  color: '#fff',
  
},
check_on: {
  marginLeft: 25,
  width: 30,
  height: 30,
  borderRadius: 15  
},
check_off: {
  marginLeft: 10,
  width: 30,
  height: 30,
  borderRadius: 15
},
button: {
  width: 60,
  height: 49,
},
item: {
  padding: 10,
  fontSize: 18,
  backgroundColor: 'transparent',
  color: '#fff',
  height: 44,
},
text: {
  marginTop: 30,
  marginBottom: 10,
  fontSize: 15,
  color: '#fff',
},
});


const mapStateToProps = state => {

  const usuario = state.HomeReducer;

  //console.log('mapStateToProps SideBar', usuario)
 //console.log('Conversas mapStateToProps state: ', state);

    return ({
      usuario,
      selected_day: state.MentoringReducer.selected_day,
      days_selected: state.MentoringReducer.days_selected,
      hora_inicial: state.MentoringReducer.hora_inicial,
      minuto_inicial: state.MentoringReducer.minuto_inicial,
      hora_final: state.MentoringReducer.hora_final,
      minuto_final: state.MentoringReducer.minuto_final,
      lista_agenda_day: state.MentoringReducer.lista_agenda_day,
      lista_agenda_horarios: state.MentoringReducer.lista_agenda_horarios
    })
  }

export default connect(mapStateToProps, {salvarHorario, getDaysAgendados, modificarSelectDay, modificarHoraInicial, modificarHoraFinal, modificarMinutoInicial, modificarMinutoFinal, getHorarios, deleteHorarios})(GerenciarAgendaScreen)
