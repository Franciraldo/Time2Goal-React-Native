import firebase from 'firebase';
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
         CADASTRO_EM_ANDAMENTO
        } from './types';

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

export const cadastraUsuario = ({nome, email, senha, descricao, bool}) => {
    console.log('props', {nome, email, senha, descricao, bool});
    return (dispatch) => {

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