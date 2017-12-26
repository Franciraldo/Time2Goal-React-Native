import firebase from 'firebase';
import { Actions } from 'react-native-router-flux'; 
import b64 from 'base-64';
import _ from 'lodash';

import { MODIFICA_ADICIONA_CONTATO_EMAIL,
         ADICIONAR_CONTATO_ERRO,
         ADICIONAR_CONTATO_SUCESSO,
         LISTA_CONTATO_USUARIO,
         MODIFICA_MENSAGEM,
         LISTA_CONVERSA_USUARIO,
         ENVIA_MENSAGEM_SUCESSO,
         LISTA_CONVERSAS_USUARIO,
         USER_SIDEBAR,
         USER_PROFILE,
         USER_FORM_MENTORING,
         USER_HOME,
         USER_CONTATOS,
         USER_CONVERSAS } from './types';

export const modificaAdicionaContatoEmail = (texto) => {
    return {
        type: MODIFICA_ADICIONA_CONTATO_EMAIL,
        payload: texto.toLowerCase()
    }
}

export const adicionaContato = (email) => {
    
    return dispatch => {
        let emailB64 = b64.encode(email);
        firebase.database().ref(`/contatos/ ${emailB64}` )
        .once('value')
        .then(snapshot => { 
            
            if(snapshot.val()){
                //email do contato que queremos adicionar
                //email => outra alternativa para capturar o primeiro elemento do array _.first(_.values(snapshot.val()))
                const dadosUsuario =  _.values(snapshot.val());
                console.log(dadosUsuario);

                //email do usuario autenticado
                const { currentUser } = firebase.auth();
                let emailUsuarioB64 = b64.encode(currentUser.email)
                
                firebase.database().ref(`/usuario_contatos/ ${emailUsuarioB64}` )
                .push({ email, nome: dadosUsuario[0].nome })
                .then(() => adicionaContatoSucesso(dispatch))
                .catch(erro => adicionaContatoErro(erro.message, dispatch))
                
            } else {
                dispatch({
                    type: ADICIONAR_CONTATO_ERRO, 
                    payload: 'E-mail informado não corresponde a um usuário válido!' 
                })
            }
        
        })
    }
}
const adicionaContatoErro = (erro, dispatch) => (
    dispatch({
        type: ADICIONAR_CONTATO_ERRO, 
        payload: erro 
    })
);
const adicionaContatoSucesso = (dispatch) => (
    dispatch({
        type: ADICIONAR_CONTATO_SUCESSO,
        payload: true
    })
);

export const habilitaInclusaoContato = () => (
    {
        type: ADICIONAR_CONTATO_SUCESSO,
        payload: false
    }
)

export const contatosUsuarioFetch = (email) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        
        let emailUsuarioB64 = email !== undefined ? b64.encode(email) : b64.encode(currentUser.email) 
        firebase.database().ref(`/usuario_contatos/ ${emailUsuarioB64}` )
            .on("value", snapshot => {   
                dispatch({ type: LISTA_CONTATO_USUARIO, payload: snapshot.val() });
             })
        
    };
}

export const modificaMensagem = texto => {
    return ({
        type: MODIFICA_MENSAGEM,
        payload: texto
    })
}

export const enviarMensagem = (mensagem, contatoNome, contatoEmail) => {
    // dados do contato (contatoNome e contatoEmail)
    //dados do usuario (email)
    const { currentUser } = firebase.auth();
    const usuarioEmail = currentUser.email;

    return dispatch => {

        //conversão para base 64
        const usuarioEmailB64 = b64.encode(usuarioEmail);
        const contatoEmailB64 = b64.encode(contatoEmail);

        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
        .push({mensagem, tipo: 'e'})
        .then(() => {
            firebase.database().ref(`/mensagens/${contatoEmailB64}/${usuarioEmailB64}`)
            .push({mensagem, tipo: 'r'})
            .then(() => dispatch ({ type: ENVIA_MENSAGEM_SUCESSO}))
        })
        .then(() => {
            // Armazenar o cabeçalho de conversa do usuário autenticado
            firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}/${contatoEmailB64}`)
            .set({ nome: contatoNome, email: contatoEmail})
        })
        .then(() => {
            // Armazenar o cabeçalho de conversa do contato
            firebase.database().ref(`/contatos/${usuarioEmailB64}`)
            .once('value')
            .then( snapshot => {

                const dadosUsuario = _.first(_.values(snapshot.val()))

                firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}/${contatoEmailB64}`)
                .set({nome: dadosUsuario.nome, email: usuarioEmail})
            })
        })
    }
}

export const conversaUsuarioFetch = contatoEmail => {

    const { currentUser } = firebase.auth();

    //compor os emails da base64
    let usuarioEmailB64 = b64.encode(currentUser.email);
    let contatoEmailB64 = b64.encode(contatoEmail);

    return dispatch => {
        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
        .on("value", snapshot => {
            dispatch({ type: LISTA_CONVERSA_USUARIO, payload: snapshot.val() })
        })
    } 
}

export const conversasUsuarioFetch = (email) => {
    const { currentUser } = firebase.auth();

    return dispatch => {
        let usuarioEmailB64 = email !== undefined ? b64.encode(email) : b64.encode(currentUser.email);

        firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}`)
            .on("value", snapshot => { 
                dispatch({ type: LISTA_CONVERSAS_USUARIO, payload: snapshot.val() })
            })
    }
}

export const getUsuario = (email) => {
    const { currentUser } = firebase.auth();

    return dispatch => {
        let emailB64 = email !== undefined ? b64.encode(email) : b64.encode(currentUser.email);

        firebase.database().ref(`/usuarios/ ${emailB64}`)
            .on("value", snapshot => { 
                dispatch({ type: USER_SIDEBAR , payload: _.first(_.values(snapshot.val())) })
                dispatch({ type: USER_PROFILE , payload: _.first(_.values(snapshot.val())) })
                dispatch({ type: USER_FORM_MENTORING , payload: _.first(_.values(snapshot.val())) })
                dispatch({ type: USER_HOME , payload: _.first(_.values(snapshot.val())) })
            })
    }
}

