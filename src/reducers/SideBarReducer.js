
import { USER_SIDEBAR, USER_SIDEBAR_REFRESH } from '../actions/types';

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
        case USER_SIDEBAR:
            return action.payload
        
        case USER_SIDEBAR_REFRESH:
        console.log('USER_SIDEBAR_REFRESH', )
            return { INITIAL_STATE }     
            
        default:
            return state;    
    }
}