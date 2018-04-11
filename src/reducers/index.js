import { combineReducers } from 'redux';
import AuthenticacaoReducer from './AuthenticacaoReducer';
import AppReducer from './AppReducer';
import ListaContatosReducer from './ListaContatosReducer';
import ListaConversaReducer from './ListaConversaReducer';
import ListaConversasReducer from './ListaConversasReducer';
import SideBarReducer from './SideBarReducer';
import ProfileReducer from './ProfileReducer';
import FormMentoringReducer from './FormMentoringReducer';
import HomeReducer from './HomeReducer';
import MentoringReducer from './MentoringReducer';
import ProfileMentorReducer from './ProfileMentorReducer';
import GerenciarVideosReducer from './GerenciarVideosReducer';
import AvaliacaoReducer from './AvaliacaoReducer';


export default combineReducers({
    AuthenticacaoReducer,
    AvaliacaoReducer,
    AppReducer,
    ListaContatosReducer,
    ListaConversaReducer,
    ListaConversasReducer,
    SideBarReducer,
    MentoringReducer,
    ProfileReducer,
    FormMentoringReducer,
    ProfileMentorReducer,
    GerenciarVideosReducer,
    HomeReducer
});