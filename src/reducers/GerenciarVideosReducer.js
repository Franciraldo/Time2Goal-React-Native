
import {  
    ABRIR_POPUP_GERENCIAR_VIDEOS,
    SELECTED_TYPE_VIDEO,
    LOADING_UPLOAD_VIDEO,
   } from '../actions/types';

const INITIAL_STATE = { 

    abrirPopUp: false,
    select_type_video: '',
    loadin_upload: false
}

export default (state = INITIAL_STATE, action) => {
switch(action.type) { 
   case ABRIR_POPUP_GERENCIAR_VIDEOS:
        return { ...state, abrirPopUp: action.payload}
        break;
   case SELECTED_TYPE_VIDEO:
        return { ...state, select_type_video: action.payload}
        break;
    case LOADING_UPLOAD_VIDEO:
        return { ...state, loadin_upload: action.payload}
        break;     
   default:
       return state;    
}
}