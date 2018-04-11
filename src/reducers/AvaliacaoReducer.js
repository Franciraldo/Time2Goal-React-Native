import { MODIFICAR_RATING, MODIFICAR_TRABALHO, MODIFICAR_TOTAL_ALUNOS } from '../actions/types';

const INITIAL_STATE = { 
    starCount: 0,
    trabalho: '',
    total_alunos: 0,
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) { 
        case MODIFICAR_RATING:
            return { ...state, starCount: action.payload }  
        case MODIFICAR_TRABALHO:
            return { ...state, trabalho: action.payload }
        case MODIFICAR_TOTAL_ALUNOS:
            return { ...state, total_alunos: action.payload }       
        default:
            return state;    
    }
}