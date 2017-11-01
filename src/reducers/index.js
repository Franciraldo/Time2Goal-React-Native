import { combineReducers } from 'redux';
import AuthenticacaoReducer from './AuthenticacaoReducer';
import AppReducer from './AppReducer';
import ListaContatosReducer from './ListaContatosReducer';
import ListaConversaReducer from './ListaConversaReducer';
import ListaConvetsasReducer from './ListaConversasReducer';


export default combineReducers({
    AuthenticacaoReducer,
    AppReducer,
    ListaContatosReducer,
    ListaConversaReducer,
    ListaConvetsasReducer
});