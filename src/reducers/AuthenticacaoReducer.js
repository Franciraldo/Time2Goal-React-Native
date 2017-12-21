import { MODIFICA_EMAIL,
         MODIFICA_SENHA,
         MODIFICA_NOME,
         MODIFICA_DESCRICAO,
         CADASTRO_USUARIO_SUCESSO,
         CADASTRO_USUARIO_ERRO,
         LOGIN_USUARIO_ERRO,
         LOGIN_EM_ANDAMENTO,
         LOGIN_USUARIO_SUCESSO,
         CADASTRO_EM_ANDAMENTO,
         MODIFICA_IMG,
         MODIFICAR_BOOL,
         MODIFICAR_CPF,
         MODIFICAR_PAIS,
         MODIFICAR_DATA_NASCIMENTO,
         MODIFICAR_CEP,
         MODIFICAR_ENDERECO,
         MODIFICAR_TITULAR_CARD,
         MODIFICAR_NUMERO_CARD,
         MODIFICAR_VALIDADE_DATA,
         MODIFICAR_CVV,
         MODIFICAR_SCREEN_REQUEST,
         MODIFICA_FACEBOOK_ID,
   } from '../actions/types';

const INITIAL_STATE = { 
    nome: '',
    email: '',
    senha: '',
    img: '',
    descricao: '',
    erroCadastro: '',
    erroLogin: '',
    bool: false,
    cpf: '',
    dataNascimento: '',
    pais: '',
    cep: '',
    endereco: '',
    titularCard: '',
    numeroCard: '',
    validadeCard: '',
    cvv: '',
    facebookid: '',
    screen_request: '',
    loading_login: false,
    loading_cadastro: false
}
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case MODIFICA_EMAIL:
            return { ...state, email: action.payload }
        case MODIFICA_IMG:
            return { ...state, img: action.payload }  
        case MODIFICAR_BOOL:
            return { ...state, bool: action.payload } 
        case MODIFICA_FACEBOOK_ID:
            return { ...state, facebookid: action.payload }     
        case MODIFICAR_PAIS:
            return { ...state, pais: action.payload }    
        case MODIFICAR_CPF:
            return { ...state, cpf: action.payload }
        case MODIFICAR_DATA_NASCIMENTO:
            return { ...state, dataNascimento: action.payload }
        case MODIFICAR_CEP:
            return { ...state, cep: action.payload }    
        case MODIFICAR_ENDERECO:
            return { ...state, endereco: action.payload }
        case MODIFICAR_TITULAR_CARD:
            return { ...state, titularCard: action.payload } 
        case MODIFICAR_NUMERO_CARD:
            return { ...state, numeroCard: action.payload }            
        case MODIFICAR_VALIDADE_DATA:
            return { ...state, validadeCard: action.payload }
        case MODIFICAR_CVV:
            return { ...state, cvv: action.payload }    
        case MODIFICA_SENHA:
            return { ...state, senha: action.payload }
        case MODIFICA_NOME:
            return { ...state, nome: action.payload }
        case MODIFICA_DESCRICAO:
            return { ...state, descricao: action.payload }
        case CADASTRO_USUARIO_ERRO:
            return { ...state, erroCadastro: action.payload, loading_cadastro : false }   
        case CADASTRO_USUARIO_SUCESSO:
            return { ...state, nome: '', senha: '', loading_cadastro : false }  
        case LOGIN_USUARIO_ERRO:
            return { ...state, erroLogin: action.payload, loading_login: false }  
        case LOGIN_EM_ANDAMENTO: 
            return { ...state, loading_login: true }
        case LOGIN_USUARIO_SUCESSO:
            return { ...state }
        case CADASTRO_EM_ANDAMENTO: 
            return { ...state, loading_cadastro : true }  
        case MODIFICAR_SCREEN_REQUEST:
            return { ...state, screen_request: action.payload } 
        default:
            return { }
        break;         
    }
    return state;
}