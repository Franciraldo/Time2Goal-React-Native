import React from "react";
import { AppRegistry, Alert, View, StyleSheet, TouchableHighlight, Picker, ListView, FlatList, Image } from "react-native";
import { Container, Header, Left, Body, Title, Card, CardItem, Content, Right, Icon, Button, Text } from "native-base";
import { StackNavigator } from "react-navigation";
import {LocaleConfig} from 'react-native-calendars';
import {Calendar} from 'react-native-calendars';
import { connect } from 'react-redux';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import { getDaysAgendados, getHorarios, salvarHorario, modificarSelectDay, modificarHoraInicial, modificarHoraFinal, modificarMinutoInicial, modificarMinutoFinal, selecionarHorario } from '../actions/FormMentoringActions';
import _ from 'lodash';
const today = new Date()
const checkout_off = require('../imgs/checked_off.png')
const checkout_on = require('../imgs/checked_on.png')

LocaleConfig.locales['pt'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan.','Fev.','Mar.','Abr.','Mai.','Jun.','Jul.','Agos.','Set.','Out.','Nov.','Dec.'],
  dayNames: ['Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'],
  dayNamesShort: ['Seg.','Ter.','Qua.','Qui.','Sex.','Sab.','Dom.']
};
LocaleConfig.defaultLocale = 'pt';

class MarcarMentoring extends React.Component {
  componentDidMount(){
    console.log('MarcarMentoring componentDidMount: ', this.props) 
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

    componentWillMount(){
      console.log('MarcarMentoring componentWillMount: ', this.props) 
    
      const {emailMentor, lista_agenda_horarios} = this.props
      this.props.getDaysAgendados(emailMentor)
      const day = this.formatDate()
      this.props.getHorarios(emailMentor, day)
      this.criaFonteDeDados(lista_agenda_horarios);
      
      console.log('horarios componentDidMount: ', lista_agenda_horarios) 
  }

  componentWillReceiveProps(nextProps){

    console.log('MarcarMentoring componentWillReceiveProps: ', nextProps)

    const {emailMentor, lista_agenda_horarios} = nextProps
    this.criaFonteDeDados(lista_agenda_horarios);
    
    //this.criaFonteDeDados(nextProps.lista_agenda_horarios);
    
    

  }
  
  _salvarHorario(){
    const { hora_inicial, minuto_inicial, hora_final, minuto_final} = this.props
    const { email} = this.props.usuario
    const day = this.props.selected_day.dateString
    

    console.log('_salvarHorario: ', { day, hora_inicial, minuto_inicial, hora_final, minuto_final, email })
    if( hora_inicial != '' && minuto_inicial != ''  && hora_final != '' && minuto_final != ''){
      
      salvarHorario(day, hora_inicial, hora_final, minuto_inicial, minuto_final, email)
      
      this.props.modificarHoraInicial('')
      this.props.modificarHoraFinal('')
      this.props.modificarMinutoInicial('')
      this.props.modificarMinutoFinal('')

      this.popupDialog.dismiss()
    }else{
      alert('Por favor informe Horario inicial e horario final')
    }
    
  }
  onDaySelect(day) {
    const {emailMentor, lista_agenda_horarios} = this.props
    console.log('onDaySelect', { day, emailMentor, lista_agenda_horarios})
    var mesAtual = new Date().getMonth() + 1;
    var diaAtual = new Date().getDate();
    var daySelected = day.day;
    var mesSelected = day.month;

    if((daySelected >= diaAtual) || (daySelected <  diaAtual && mesSelected > mesAtual)){  
        this.props.modificarSelectDay(day)
        this.props.getHorarios(emailMentor, day.dateString)
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
    let day = ""    
    if(this.props.selected_day === ""){
      day = this.formatDate()
    }else{
      day = this.props.selected_day.dateString
    }
      if(lista_agenda_horarios.bool){
          return (
            <TouchableHighlight onPress={
              () =>  false}>
              <View style={{ flex: 1, flexDirection: 'row', padding: 20, borderBottomWidth: 1, borderColor: "#ccc"}}>
                      <View style={{ flexDirection: 'column', width: 285}}>                      
                        <Text style={{ fontSize: 14, color: "#fff", backgroundColor: 'transparent'}}>{lista_agenda_horarios.hora_inicial}:{lista_agenda_horarios.minuto_inicial} - {lista_agenda_horarios.hora_final}:{lista_agenda_horarios.minuto_final}</Text>
                      </View>
                      
                      <Image
                          style={styles.check_on}
                          source={checkout_on}
                          />
              </View>
          </TouchableHighlight>            
        )
      }else{
          return (
            <TouchableHighlight onPress={
              () =>  this.props.selecionarHorario(lista_agenda_horarios, this.props.emailMentor, day, this.props.usuario)}>
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
    console.log(this.props.lista_agenda_horarios)
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
                  {key: 'Não exisate horário disponivel para hoje'}
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
                                <Picker.Item color='#fff'label='00' value='0'/>
                                <Picker.Item color='#fff'label='01' value='1'/>
                                <Picker.Item color='#fff'label='02' value='2'/>
                                <Picker.Item color='#fff'label='03' value='3'/>
                                <Picker.Item color='#fff'label='04' value='4'/>
                                <Picker.Item color='#fff'label='05' value='5'/>
                                <Picker.Item color='#fff'label='06' value='6'/>
                                <Picker.Item color='#fff'label='07' value='7'/>
                                <Picker.Item color='#fff'label='08' value='8'/>
                                <Picker.Item color='#fff'label='09' value='9'/>
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
                              <Picker.Item color='#fff'label='05' value='05'/>
                              <Picker.Item color='#fff'label='10' value='10'/>
                              <Picker.Item color='#fff'label='15' value='15'/>
                              <Picker.Item color='#fff'label='20' value='20'/>
                              <Picker.Item color='#fff'label='25' value='25'/>
                              <Picker.Item color='#fff'label='30' value='30'/>
                              <Picker.Item color='#fff'label='35' value='35'/>
                              <Picker.Item color='#fff'label='40' value='40'/>
                              <Picker.Item color='#fff'label='45' value='45'/>
                              <Picker.Item color='#fff'label='50' value='50'/>
                              <Picker.Item color='#fff'label='55' value='55'/>
                              <Picker.Item color='#fff'label='60' value='60'/>
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
                          <Picker.Item color='#fff'label='05' value='05'/>
                          <Picker.Item color='#fff'label='10' value='10'/>
                          <Picker.Item color='#fff'label='15' value='15'/>
                          <Picker.Item color='#fff'label='20' value='20'/>
                          <Picker.Item color='#fff'label='25' value='25'/>
                          <Picker.Item color='#fff'label='30' value='30'/>
                          <Picker.Item color='#fff'label='35' value='35'/>
                          <Picker.Item color='#fff'label='40' value='40'/>
                          <Picker.Item color='#fff'label='45' value='45'/>
                          <Picker.Item color='#fff'label='50' value='50'/>
                          <Picker.Item color='#fff'label='55' value='55'/>
                          <Picker.Item color='#fff'label='60' value='60'/>
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
                    markedDates={this.props.lista_agenda_day}                    
                    current={this.props.lista_agenda_day}
                    markingType={'multi-dot'}
                    theme={{
                      backgroundColor: '#ffffff',
                      calendarBackground: '#2b2a29',
                      textSectionTitleColor: '#b6c1cd',
                      selectedDayBackgroundColor: '#fc5b07',
                      selectedDayTextColor: '#ffffff',
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

MarcarMentoring.navigationOptions = ({ navigation }) => ({
  header: (
        <Header style={{ backgroundColor: '#fc5b07'}} titleStyle={{backgroundColor: 'transparent', color: '#fff'}}>
          <Left>
            <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
              <Icon name="menu"  style={{backgroundColor: 'transparent', color: '#fff'}}/>
            </Button>
          </Left>
          <Body>
            <Title style={{backgroundColor: 'transparent', color: '#fff'}}> Agenda Mentor </Title>
          </Body>
          <Right />
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
  uploadImage: {
    justifyContent: 'flex-end',
    marginLeft: 120,
    width: 30,
    height: 30,
    borderRadius: 15  
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
    marginTop: 60,
    backgroundColor: '#2b2a29'

},
text: {
  marginTop: 30,
  marginBottom: 10,
  fontSize: 15,
  color: '#fff',
},
item: {
  padding: 10,
  fontSize: 18,
  backgroundColor: 'transparent',
  color: '#fff',
  height: 44,
},
check_on: {
  marginLeft: 10,
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
});


const mapStateToProps = state => {

  const usuario = state.HomeReducer;

  //console.log('mapStateToProps SideBar', usuario)
 //console.log('Conversas mapStateToProps state: ', state);

    return ({
      usuario,
      emailMentor: state.MentoringReducer.emailMentor,
      selected_day: state.MentoringReducer.selected_day,
      days_selected: state.MentoringReducer.days_selected,
      hora_inicial: state.MentoringReducer.hora_inicial,
      minuto_inicial: state.MentoringReducer.minuto_inicial,
      hora_final: state.MentoringReducer.hora_final,
      minuto_final: state.MentoringReducer.minuto_final,
      mode: state.MentoringReducer.mode,
      lista_agenda_day: state.MentoringReducer.lista_agenda_day,
      lista_agenda_horarios: state.MentoringReducer.lista_agenda_horarios,
      checkout_mentoria_Andamento: state.MentoringReducer.checkout_mentoria_Andamento
    })
  }

export default connect(mapStateToProps, {getDaysAgendados, getHorarios, salvarHorario, modificarSelectDay, modificarHoraInicial, modificarHoraFinal, modificarMinutoInicial, modificarMinutoFinal, selecionarHorario})(MarcarMentoring)
