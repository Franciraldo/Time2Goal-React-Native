import { combineReducers } from 'redux';
import AuthenticacaoReducer from './AuthenticacaoReducer';
import AppReducer from './AppReducer';
import ListaContatosReducer from './ListaContatosReducer';
import ListaConversaReducer from './ListaConversaReducer';
import ListaConvetsasReducer from './ListaConversasReducer';
import SideBarReducer from './SideBarReducer';
import ProfileReducer from './ProfileReducer';
import FormMentoringReducer from './FormMentoringReducer';
import HomeReducer from './HomeReducer';
import MentoringReducer from './MentoringReducer';
import ProfileMentorReducer from './ProfileMentorReducer';
import GerenciarVideosReducer from './GerenciarVideosReducer';


export default combineReducers({
    AuthenticacaoReducer,
    AppReducer,
    ListaContatosReducer,
    ListaConversaReducer,
    ListaConvetsasReducer,
    SideBarReducer,
    MentoringReducer,
    ProfileReducer,
    FormMentoringReducer,
    ProfileMentorReducer,
    GerenciarVideosReducer,
    HomeReducer
});