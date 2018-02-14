
import { PROFILE_MENTOR,
         SET_NOME_MENTOR,
         SET_EMAIL_MENTOR, 
         SET_DESCRICAO_PROFISSIONAL_MENTOR, 
         SET_CATEGORIA_MENTORIA_MENTOR, 
         SET_IDIOMA_MENTOR, 
         SET_IMAGEM_MENTOR, 
         SET_QTD_ALUNOS, 
         SET_VALOR_HORA } from '../actions/types';

const INITIAL_STATE = { 

    nome: '',
    email: '',
    descricao_profissional: '',
    categoria_mentoria: '', 
    idioma: '',
    img: '',
    qtd_alunos: '',
    valor_hora: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) { 
        case PROFILE_MENTOR:
            return action.payload
        case SET_NOME_MENTOR: 
            return { ...state, nome: action.payload }
        case SET_EMAIL_MENTOR: 
            return { ...state, email: action.payload } 
        case SET_DESCRICAO_PROFISSIONAL_MENTOR: 
            return { ...state, descricao_profissional: action.payload }
        case SET_CATEGORIA_MENTORIA_MENTOR: 
            return { ...state, categoria_mentoria: action.payload }
        case SET_IDIOMA_MENTOR: 
            return { ...state, idioma: action.payload }
        case SET_IMAGEM_MENTOR: 
            return { ...state, img: action.payload }
        case SET_QTD_ALUNOS: 
            return { ...state, qtd_alunos: action.payload }
        case SET_VALOR_HORA: 
            return { ...state, valor_hora: action.payload }             
        default:
            return state;    
    }
}