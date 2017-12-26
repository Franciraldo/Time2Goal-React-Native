
import { USER_HOME } from '../actions/types';

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
    premium: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) { 
        case USER_HOME:
            return action.payload 
            
        default:
            return state;    
    }
}