
import { LISTA_CONTATO_USUARIO, USER_CONTATOS } from '../actions/types';

const INITIAL_STATE = { }

export default (state = INITIAL_STATE, action) => {
    switch(action.type) { 
        case LISTA_CONTATO_USUARIO:
            return action.payload 
        
        case USER_CONTATOS:
            return action.payload 
                
        default:
            return state;    
    }
}