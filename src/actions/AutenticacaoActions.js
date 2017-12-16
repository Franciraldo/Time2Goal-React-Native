import RNFetchBlob from 'react-native-fetch-blob'
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'; 
import b64 from 'base-64';
import { MODIFICA_EMAIL,
         MODIFICA_SENHA,
         MODIFICA_NOME,
         MODIFICA_DESCRICAO,
         CADASTRO_USUARIO_SUCESSO,
         CADASTRO_USUARIO_ERRO,
         LOGIN_USUARIO_SUCESSO,
         LOGIN_USUARIO_ERRO,
         LOGIN_EM_ANDAMENTO,
         MODIFICA_IMG,
         CADASTRO_EM_ANDAMENTO,
         MODIFICAR_BOOL,
         MODIFICAR_PAIS,
         MODIFICAR_CPF,
         MODIFICAR_DATA_NASCIMENTO,
         MODIFICAR_CEP,
         MODIFICAR_ENDERECO,
         MODIFICAR_TITULAR_CARD,
         MODIFICAR_NUMERO_CARD,
         MODIFICAR_VALIDADE_DATA,
         MODIFICAR_CVV,
         MODIFICAR_SCREEN_REQUEST
        } from './types';
import { Platform } from 'react-native';

const fs = RNFetchBlob.fs
const Blob = RNFetchBlob.polyfill.Blob
const testImageName = `image-from-react-native-${Platform.OS}-${new Date()}.png`

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export const modificaEmail = (texto) => {
    return {
        type: MODIFICA_EMAIL,
        payload: texto.toLowerCase()
    }
}

export const modificaSenha = (texto) => {
    return {
        type: MODIFICA_SENHA,
        payload: texto
    }
}

export const modificaDescricao = (texto) => {
    return {
        type: MODIFICA_DESCRICAO,
        payload: texto 
    }
}

export const modificaNome = (texto) => {
    return {
        type: MODIFICA_NOME,
        payload: texto
    }
}

export const modificarIMG = (data) => {
    return {
        type: MODIFICA_IMG,
        payload: data
    }
}

export const modificarBool = (bool) => {
    return {
        type: MODIFICAR_BOOL,
        payload: bool
    }
}
export const modificaCPF = (cpf) => {
    return {
        type: MODIFICAR_CPF,
        payload: cpf
    }
}
export const modificaDataNascimento = (dataNascimento) => {
    return {
        type: MODIFICAR_DATA_NASCIMENTO,
        payload: dataNascimento
    }
}
export const modificaCEP = (cep) => {
    return {
        type: MODIFICAR_CEP,
        payload: cep
    }
}
export const modificaEndereco = (endereco) => {
    return {
        type: MODIFICAR_ENDERECO,
        payload: endereco
    }
}
export const modificaTitularCard = (titularCartao) => {
    return {
        type: MODIFICAR_TITULAR_CARD,
        payload: titularCartao
    }
}
export const modificaNumeroCard = (numeroCartao) => {
    return {
        type: MODIFICAR_NUMERO_CARD,
        payload: numeroCartao
    }
}
export const modificaValidadeData = (validadeData) => {
    return {
        type: MODIFICAR_VALIDADE_DATA,
        payload: validadeData
    }
}
export const modificaCVV = (cvv) => {
    return {
        type: MODIFICAR_CVV,
        payload: cvv
    }
}
export const modificaScreenRequest = (screen_request) => {
    return {
        type: MODIFICAR_SCREEN_REQUEST,
        payload: screen_request
    }
}

export const modificaNacionalidade = (pais) => {
    return {
        type: MODIFICAR_PAIS,
        payload: pais
    }
}

export const cadastraUsuario = ({nome, email, senha, descricao, img, bool, cpf, dataNascimento, cep, endereco, titularCard, numeroCard, validadeCard, cvv, pais}) => {
    //console.log('props', {nome, email, senha, descricao, img, bool, cpf, dataNascimento, cep, endereco, titularCard, numeroCard, validadeCard, cvv, pais});
    return (dispatch) => {
        console.log('cadastroMetod:',{nome, email, senha, descricao, bool});
        
        dispatch({type: CADASTRO_EM_ANDAMENTO});
        
        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(user => {
                let emailB64 = b64.encode(email);
                firebase.database().ref(`/contatos/ ${emailB64}` )
                .push({nome})
                .then(value => { 
                    let usuario = firebase.database().ref(`/usuarios/ ${emailB64}` )
                    .push().set({
                        nome: nome,
                        email: email,
                        descricao: descricao,
                        mentoring: false,
                        cpf: '',
                        titularCartao: '',
                        numeroCartao: '',
                        validade: '',
                        cvv: '',
                        dataNascimento: '',
                        cep: '',
                        endereco: '',
                        pais: '',
                        premium: bool
                    })
                    cadastraUsuarioSucesso(dispatch)
                })
                .catch(erro => cadastraUsuarioErro(erro, dispatch));
            }) 
            .catch(erro => cadastraUsuarioErro(erro, dispatch));
    }
}
const cadastraUsuarioSucesso = (dispatch) => {
    dispatch(
        {
            type: CADASTRO_USUARIO_SUCESSO
        }
    ); 
    Actions.formLogin();
}

const cadastraUsuarioErro = (erro, dispatch) => {
    dispatch(
        {
            type: CADASTRO_USUARIO_ERRO,
            payload: erro.message
        }
    );
    
}

export const autenticarUsuario = ({email, senha}) => {
    return (dispatch) => {

        dispatch({type: LOGIN_EM_ANDAMENTO})

        firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(value => loginUsuarioSucesso(dispatch))
        .catch(erro => loginUsuarioErro(erro, dispatch));
    }
    
}

const loginUsuarioSucesso = (dispatch) => {
    dispatch(
        {
            type: LOGIN_USUARIO_SUCESSO,
        }
    );

    Actions.principal();
}
const loginUsuarioErro = (erro, dispatch) => {
    dispatch(
        {
            type: LOGIN_USUARIO_ERRO,
            payload: erro.message
        }
    );
}