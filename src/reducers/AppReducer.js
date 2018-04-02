import { MODIFICA_ADICIONA_CONTATO_EMAIL, ADICIONAR_CONTATO_ERRO, ADICIONAR_CONTATO_SUCESSO, MODIFICA_MENSAGEM, ENVIA_MENSAGEM_SUCESSO, MODIFICAR_DATA, MODIFICAR_HORA, CHECK_CALL } from '../actions/types';

const INITIAL_STATE = {
    adiciona_contato_email: '',
    cadastro_resultado_txt_erro: '',
    cadastro_resultado_inclusao: false,
    mensagem: '',
    data: '',
    hora: '',
    booleanCall: false, 
 };

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case MODIFICA_ADICIONA_CONTATO_EMAIL:
            return { ...state, adiciona_contato_email: action.payload}
            break;
        case ADICIONAR_CONTATO_ERRO:
            return { ...state, cadastro_resultado_txt_erro: action.payload}
            break; 
        case ADICIONAR_CONTATO_SUCESSO:
            return { ...state, cadastro_resultado_inclusao: action.payload, adiciona_contato_email: ''}
            break;
        case MODIFICA_MENSAGEM:
            return { ...state, mensagem: action.payload }
            break;
        case ENVIA_MENSAGEM_SUCESSO:
            return { ...state, mensagem: '' }
        case MODIFICAR_DATA:
            return { ...state, data: action.payload }
        case MODIFICAR_HORA:
            return { ...state, hora: action.payload }
        case CHECK_CALL:
            return { ...state, booleanCall: action.payload }         
        default: 
            return state;
            break;
    }
}