
import { USER_FORM_MENTORING } from '../actions/types';

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
        case USER_FORM_MENTORING:
            return action.payload 
            
        default:
            return state;    
    }
}