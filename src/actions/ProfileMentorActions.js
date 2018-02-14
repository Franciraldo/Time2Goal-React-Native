import firebase from 'firebase';
import { Actions } from 'react-native-router-flux'; 
import b64 from 'base-64';
import _ from 'lodash';

import { MODIFICA_ADICIONA_CONTATO_EMAIL } from './types';


export const getDados = (email) => {
    return dispatch => {

        let emailB64 = b64.encode(email);
        console.log('email Mentor: ', emailB64)
        firebase.database().ref('mentores').child('dmljdG9ybWYuZGZAaG90bWFpbC5jb20=')
        .on('value', snapshot => { 
            console.log('Dados Mentor: ', _.first(snapshot.val()))
        })
        
    }
}