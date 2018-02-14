import { 
    SET_HORA_INICIAL,
    SET_MINUTO_INICIAL,
    SET_HORA_FINAL,
    SET_MINUTO_FINAL,
    SELECTED_DAY,
    LISTA_AGENDA_DAYS,
    GET_DAYS_SELECTED,
    GET_HORARIOS,
    SET_EMAIL_MENTOR,
    CHECKOUT_MENTORIA,
 } from '../actions/types';

const INITIAL_STATE = {
      emailMentor: '',  
      selected_day: '',
      days_selected: '',
      hora_inicial: '',
      minuto_inicial: '',
      hora_final: '',
      minuto_final: '',
      lista_agenda_day: '',
      lista_agenda_horarios: '',
      bool: false
 }

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {   
        case SET_EMAIL_MENTOR:
            return { ...state, emailMentor: action.payload }  
        case SET_HORA_INICIAL:
            return { ...state, hora_inicial: action.payload }  
        case GET_HORARIOS:
            return { ...state, lista_agenda_horarios: action.payload }
        case SET_MINUTO_INICIAL:
            return { ...state, minuto_inicial: action.payload }
        case GET_DAYS_SELECTED:
            return { ...state, days_selected: action.payload }  
        case SET_HORA_FINAL:
            return { ...state, hora_final: action.payload }    
        case SET_MINUTO_FINAL:
            return { ...state, minuto_final: action.payload }      
        case SELECTED_DAY:
            return { ...state, selected_day: action.payload }       
        case LISTA_AGENDA_DAYS:
            return { ...state, lista_agenda_day: action.payload }
        case CHECKOUT_MENTORIA:
            return { ...state, bool: action.payload }
        default:
            return state;    
    }
}