
import { LISTA_BUSCA, MODIFICAR_FILTROS_PESQUISA, MODIFICAR_TEXTO_PESQUISA, BACKGROUND_COLOR_MENTORES, BACKGROUND_COLOR_FREE_VIDEOS, BACKGROUND_COLOR_PREMIUM_VIDEOS, BACKGROUND_COLOR_CATEGORIAS } from '../actions/types';

const INITIAL_STATE = { 
    texto_pesquisa: '',
    tipo_pesquisa: '',
    lista_busca: '',
    backgroundColorMentores: 'transparent',
    backgroundColorFreeVideos: 'transparent',
    backgroundColorPremiumVideos: 'transparent',
    backgroundColorCategoria: 'transparent',
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) { 
        case LISTA_BUSCA:
            return { ...state, lista_busca: action.payload }
        case BACKGROUND_COLOR_MENTORES:
             return { ...state, backgroundColorMentores: action.payload }
        case BACKGROUND_COLOR_FREE_VIDEOS:
             return { ...state, backgroundColorFreeVideos: action.payload } 
        case BACKGROUND_COLOR_PREMIUM_VIDEOS:
             return { ...state, backgroundColorPremiumVideos: action.payload }          
        case BACKGROUND_COLOR_CATEGORIAS:   
            return { ...state, backgroundColorCategoria: action.payload }  
        case MODIFICAR_TEXTO_PESQUISA:
            return { ...state, texto_pesquisa: action.payload }  
        case MODIFICAR_FILTROS_PESQUISA:
            return { ...state, tipo_pesquisa: action.payload }       
        default:
            return state;    
    }
}