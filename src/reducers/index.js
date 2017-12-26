import { combineReducers } from 'redux';
import AuthenticacaoReducer from './AuthenticacaoReducer';
import AppReducer from './AppReducer';
import ListaContatosReducer from './ListaContatosReducer';
import ListaConversaReducer from './ListaConversaReducer';
import ListaConvetsasReducer from './ListaConversasReducer';
import SideBarReducer from './SideBarReducer';
import ProfileReducer from './ProfileReducer';
import FormMentoringReducer from './FormMentoringReducer';
import HomeReducer from './HomeReducer'


export default combineReducers({
    AuthenticacaoReducer,
    AppReducer,
    ListaContatosReducer,
    ListaConversaReducer,
    ListaConvetsasReducer,
    SideBarReducer,
    ProfileReducer,
    FormMentoringReducer,
    HomeReducer
});