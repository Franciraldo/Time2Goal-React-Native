
import { USER_FORM_MENTORING, 
         MODIFICAR_DESCRICAO_PROFISSIONAL,
         MODIFICAR_AGENCIA,
         MODIFICAR_CONTA,
         MODIFICAR_BANCO,
         MODIFICAR_IMG1,
         MODIFICAR_IMG2,
         MODIFICAR_IDIOMA,
         MODIFICAR_CATEGORIA_MENTORIA
        } from '../actions/types';

const INITIAL_STATE = { 

    descricao_profissional: '',
    agencia: '',
    conta: '',
    banco: '',
    img1: '',
    img2: '',
    idioma: '',
    categoria_mentoria: '',
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) { 
        case USER_FORM_MENTORING:
            return action.payload 

        case MODIFICAR_DESCRICAO_PROFISSIONAL:
            return { ...state, descricao_profissional: action.payload }
        
        case MODIFICAR_AGENCIA:
            return { ...state, agencia: action.payload }
          
        case MODIFICAR_CONTA:
            return { ...state, conta: action.payload }
        
        case MODIFICAR_BANCO:
            return { ...state, banco: action.payload }
            
        case MODIFICAR_IMG1:
            return { ...state, img1: action.payload }
        
        case MODIFICAR_IMG2:
            return { ...state, img2: action.payload }
            
        case MODIFICAR_IDIOMA:
            return { ...state, idioma: action.payload }
          
        case MODIFICAR_CATEGORIA_MENTORIA:
            return { ...state, categoria_mentoria: action.payload }    

        default:
            return state;    
    }
}