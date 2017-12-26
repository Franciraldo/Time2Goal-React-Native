import { LISTA_CONVERSAS_USUARIO, USER_CONVERSAS } from '../actions/types';

const INITIAL_STATE = { }

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {   
        case LISTA_CONVERSAS_USUARIO:
            return action.payload;
            
        case USER_CONVERSAS:
            return action.payload;    
        default:
            return state;    
    }
}