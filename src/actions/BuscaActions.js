import firebase from 'firebase';
import { Actions } from 'react-native-router-flux'; 
import b64 from 'base-64';
import _ from 'lodash';

import { LISTA_BUSCA, MODIFICAR_FILTROS_PESQUISA, MODIFICAR_TEXTO_PESQUISA } from './types';

export const modificarTextoPesquisa = (texto, tipo_pesquisa) => {
    return (dispatch) => {
        
        console.log('modificarTextoPesquisa: ', {texto, tipo_pesquisa})
        let db = firebase.database();
        if(texto !== ''){
            switch(tipo_pesquisa) {
                case 'mentor':
                    db.ref('mentores').orderByChild("nome").startAt(`${texto}`).endAt(`${texto}\uf8ff`).on('value', function(snapshot){
                        console.log('snapshot: ', snapshot.val())
                        dispatch({ type: LISTA_BUSCA, payload: snapshot.val()});
                    })
                    break;
                case 'videos_free':
                    db.ref('videos/free').orderByChild("titulo").startAt(`${texto}`).endAt(`${texto}\uf8ff`).on('value', function(snapshot){
                        console.log('snapshot: ', snapshot.val())
                        dispatch({ type: LISTA_BUSCA, payload: snapshot.val()});
                    })
                    break;
                case 'videos_premium':                
                    db.ref('videos/premium').orderByChild("titulo").startAt(`${texto}`).endAt(`${texto}\uf8ff`).on('value', function(snapshot){
                        console.log('snapshot: ', snapshot.val())
                        dispatch({ type: LISTA_BUSCA, payload: snapshot.val()});
                    })
                    break;
                case 'categorias':
                    db.ref('mentores').orderByChild("categoria_mentoria").startAt(`${texto}`).endAt(`${texto}\uf8ff`).on('value', function(snapshot){
                        console.log('snapshot: ', snapshot.val())
                        dispatch({ type: LISTA_BUSCA, payload: snapshot.val()});    
                    })
                    break;
                default:
                    db.ref('mentores').orderByChild("nome").startAt(`${texto}`).endAt(`${texto}\uf8ff`).on('value', function(snapshot){
                        console.log('snapshot: ', snapshot.val())
                        dispatch({ type: LISTA_BUSCA, payload: snapshot.val()});
                    })
                break;
            }
        }
        dispatch({ type: MODIFICAR_TEXTO_PESQUISA, payload: texto });
    };
}
export const modificarFiltrosPesquisa = (texto) => {
    return {
        type: MODIFICAR_FILTROS_PESQUISA,
        payload: texto
    }
}
