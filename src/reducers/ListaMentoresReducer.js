import { LISTA_MENTORES, MENTOR } from '../actions/types';

const INITIAL_STATE = { }

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {   
        case LISTA_MENTORES:
            return action.payload;
            
        case MENTOR:
            return action.payload;    
        default:
            return state;    
    }
}