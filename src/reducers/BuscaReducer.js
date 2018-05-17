
import { LISTA_BUSCA, MODIFICAR_FILTROS_PESQUISA, MODIFICAR_TEXTO_PESQUISA } from '../actions/types';

const INITIAL_STATE = { 
    texto_pesquisa: '',
    tipo_pesquisa: '',
    lista_busca: '',
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) { 
        case LISTA_BUSCA:
            return { ...state, lista_busca: action.payload }    
        case MODIFICAR_TEXTO_PESQUISA:
            return { ...state, texto_pesquisa: action.payload }  
        case MODIFICAR_FILTROS_PESQUISA:
            return { ...state, tipo_pesquisa: action.payload }       
        default:
            return state;    
    }
}