import { MODIFICA_ADICIONA_CONTATO_EMAIL, ADICIONAR_CONTATO_ERRO, ADICIONAR_CONTATO_SUCESSO, MODIFICA_MENSAGEM, ENVIA_MENSAGEM_SUCESSO, MODIFICAR_DATA, MODIFICAR_HORA, CHECK_CALL, LISTA_VIDEOS_FREE_ALL,
    LISTA_VIDEOS_PREMIUM_ALL,
    LOADING_VIDEO_ALL, } from '../actions/types';

const INITIAL_STATE = {
    adiciona_contato_email: '',
    cadastro_resultado_txt_erro: '',
    cadastro_resultado_inclusao: false,
    mensagem: '',
    data: '',
    hora: '',
    lista_videos_free_all: '',
    lista_videos_premium_all: '',
    loading_video_all: false,
    booleanCall: false, 
 };

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOADING_VIDEO_ALL:
            return { ...state, loading_video_all: action.payload}
            break;
        case LISTA_VIDEOS_PREMIUM_ALL:
            return { ...state, lista_videos_premium_all: action.payload}
            break;
        case LISTA_VIDEOS_FREE_ALL:
            return { ...state, lista_videos_free_all: action.payload}
            break;
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