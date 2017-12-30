
import { USER_PROFILE, UPDATE_DADOS_EM_ANDAMENTO, UPDATE_DADOS_SUCESSO } from '../actions/types';

const INITIAL_STATE = { 

    nome: '',
    email: '',
    descricao: '',
    img: '',
    mentoring: '',
    cpf: '',
    titularCartao: '',
    numeroCartao: '',
    validade: '',
    cvv: '',
    dataNascimento: '',
    cep: '',
    endereco: '',
    pais: '',
    premium: '',
    update_dados: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) { 
        case USER_PROFILE:
            return action.payload
        case UPDATE_DADOS_EM_ANDAMENTO: 
            return { ...state, update_dados: true } 
        case UPDATE_DADOS_SUCESSO: 
            return { ...state, update_dados: false } 
        default:
            return state;    
    }
}