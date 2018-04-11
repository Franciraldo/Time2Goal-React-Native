import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'; 
import b64 from 'base-64';
import { MODIFICAR_RATING, MODIFICAR_TRABALHO, MODIFICAR_TOTAL_ALUNOS } from './types';
import { Platform } from 'react-native';
import _ from 'lodash';

export const modificarRating = (rating) => {
    return dispatch => {
        dispatch({type: MODIFICAR_RATING, payload: rating})
    }
}

export const setAvaliacao = (email, nome, alunoNome, rating) => {
    return dispatch => {
        let mentorEmailB64 = b64.encode(email)        
        firebase.database().ref(`/avaliacao_mentores/${mentorEmailB64}`).push().set({
            nome_mentor: nome,
            nome_aluno: alunoNome,
            nota: rating
        })
        
    }
}

export const getDadosMentor = (email) => {
    return dispatch => {
        let mentorEmailB64 = b64.encode(email)        
        firebase.database().ref(`/mentores/ ${mentorEmailB64}`)
        .once('value', snapshot => { 
            console.log('Dados Mentor2: ', snapshot.val())
            dispatch({type: MODIFICAR_TRABALHO, payload: snapshot.val().categoria_mentoria})
            dispatch({type: MODIFICAR_TOTAL_ALUNOS, payload: snapshot.val().qtd_alunos})
        })
    }
}