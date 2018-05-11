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
         USER_CONVERSAS,
         LISTA_MENTORES,
         PROFILE_MENTOR,
         SET_NOME_MENTOR,
         SET_EMAIL_MENTOR, 
         SET_DESCRICAO_PROFISSIONAL_MENTOR, 
         SET_CATEGORIA_MENTORIA_MENTOR, 
         SET_IDIOMA_MENTOR, 
         SET_IMAGEM_MENTOR, 
         SET_QTD_ALUNOS, 
         SET_VALOR_HORA,
         MODIFICAR_DATA,
         MODIFICAR_HORA,
         CHECK_CALL,
         LISTA_VIDEOS_FREE_ALL,
         LISTA_VIDEOS_PREMIUM_ALL,
         LOADING_VIDEO_ALL,
         } from './types';

const setNomeMentor = (texto) => {
    return {
        type: SET_NOME_MENTOR,
        payload: texto
    }
}

const setEmailMentor = (texto) => {
    return {
        type: SET_EMAIL_MENTOR,
        payload: texto
    }
}
const setDescricaoProfissionalMentor = (texto) => {
    return {
        type: SET_DESCRICAO_PROFISSIONAL_MENTOR,
        payload: texto
    }
}
const setCategoriaMentoriaMentor = (texto) => {
    return {
        type: SET_CATEGORIA_MENTORIA_MENTOR,
        payload: texto
    }
}
const setIdiomaMentor = (texto) => {
    return {
        type: SET_IDIOMA_MENTOR,
        payload: texto
    }
}
const setImagemMentor = (texto) => {
    return {
        type: SET_IMAGEM_MENTOR,
        payload: texto
    }
}
const setQtdAlunosMentor = (texto) => {
    return {
        type: SET_QTD_ALUNOS,
        payload: texto
    }
}
const setValorHoraMentor = (texto) => {
    return {
        type: SET_VALOR_HORA,
        payload: texto
    }
}
export const modificaAdicionaContatoEmail = (texto) => {
    return {
        type: MODIFICA_ADICIONA_CONTATO_EMAIL,
        payload: texto.toLowerCase()
    }
}
export const marcarMentoria = (texto) => {
    return dispatch => {
        dispatch({type: SET_EMAIL_MENTOR, payload: texto})
        Actions.marcarMentoring()
    }
}

export const abrirPerfil = (contato) => {
    return dispatch => {
        console.log('abrir Perfil: ', contato)
        dispatch({type: SET_NOME_MENTOR, payload: contato.nome})
        dispatch({type: SET_EMAIL_MENTOR, payload: contato.email})
        dispatch({type: SET_DESCRICAO_PROFISSIONAL_MENTOR, payload: contato.descricao_profissional})
        dispatch({type: SET_CATEGORIA_MENTORIA_MENTOR, payload: contato.categoria_mentoria})
        dispatch({type: SET_IDIOMA_MENTOR, payload: contato.idioma})
        dispatch({type: SET_IMAGEM_MENTOR, payload: contato.img})
        dispatch({type: SET_QTD_ALUNOS, payload: contato.qtd_alunos})
        dispatch({type: SET_VALOR_HORA, payload: contato.valor_hora})
        
        Actions.profileMentor()
    }    
}
export const adicionaContato = (email) => {
    
    return dispatch => {
        let emailB64 = b64.encode(email);
        firebase.database().ref(`/contatos/ ${emailB64}` )
        .on('value')
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

export const contatosUsuarioFetch = () => {
    return (dispatch) => {
        firebase.database().ref(`/mentores` )
            .on("value", snapshot => {   
                //console.log('value Mentores: ', snapshot.val())
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

export const setHora = (now) => {
    return (dispatch) => {
        let hora = `${now.getHours()}`
        let minuto = `${now.getMinutes()}`

        if(hora <= 9){
            hora = hora.replace(hora.substring(-1, 0), '0');
        }
        if(minuto <= 9){
            minuto = minuto.replace(minuto.substring(-1, 0), '0');
        }

        let hora_atual = `${hora}:${minuto}`

        dispatch({ type: MODIFICAR_HORA, payload: hora_atual });
    }
}

export const check_call = (usuario, contatoEmail, checkCall, checkAvaliacao, data, hora, horaFinal, nota ) => {
    return (dispatch) => {

        console.log('check_call: ', {usuario, contatoEmail, checkCall, checkAvaliacao, data, hora, horaFinal, nota})
        const mentorEmailB64 = b64.encode(usuario.email);
        const alunoEmailB64 = b64.encode(contatoEmail);
        
        firebase.database().ref(`/avaliacao/${mentorEmailB64}/${alunoEmailB64}`)
        .set({checkCall, checkAvaliacao, data, imgMentor: usuario.img, horaInicial: hora, horaFinal, nota})
        .then(() => dispatch ({ type: CHECK_CALL, payload: checkCall}))
        

    }
}

export const get_check_call = (usuario, contatoEmail) => {
    return (dispatch) => {
        const mentorEmailB64 = b64.encode(usuario.email);
        const alunoEmailB64 = b64.encode(contatoEmail);

        if(usuario.mentoring){
            firebase.database().ref(`/avaliacao/${mentorEmailB64}/${alunoEmailB64}`)
            .on("value", snapshot => { 
                console.log('get_check_call snapshot', snapshot.val())
                dispatch ({ type: CHECK_CALL, payload: snapshot.val()})
            })
        }
        
        
    }
}

export const stop_call = (usuario, contatoEmail, checkCall, horaFinal ) => {
    return (dispatch) => {
        console.log('stop_call: ', {checkCall, horaFinal})
        const mentorEmailB64 = b64.encode(usuario.email);
        const alunoEmailB64 = b64.encode(contatoEmail);
        
        let db = firebase.database().ref(`/avaliacao/${mentorEmailB64}/${alunoEmailB64}`);
        db.child("checkCall").set(checkCall);
        db.child("horaFinal").set(horaFinal);
        dispatch ({ type: CHECK_CALL, payload: checkCall})
    }
}

export const setData = (now) => {
    return (dispatch) => {
    
        let dia = `${now.getUTCDay()}`
        let mes = `${now.getUTCMonth()}`

        if(dia <= 9){
            if(dia === '0'){
                dia = "1";
                dia = dia.replace(dia.substring(-1, 0), '0');
            }else{
                dia = dia.replace(dia.substring(-1, 0), '0');
            }
        }
        if(mes <= 9){
            mes = mes.replace(mes.substring(-1, 0), '0');
        }
        let data_atual = `${dia}/${mes}/${now.getUTCFullYear()}`

        dispatch({ type: MODIFICAR_DATA, payload: data_atual });
    }
}

const doTruncarStr = (str, size) => {
    if (str==undefined || str=='undefined' || str =='' || size==undefined || size=='undefined' || size ==''){
        return str;
    }
    var shortText = str;
    if(str.length >= size+3){
        shortText = str.substring(0, size).concat('...');
    }
    return shortText;
}

export const enviarMensagem = (mensagem, contatoNome, contatoEmail, contatoImg, usuario, hora_atual, data_atual, link, avaliacaoAction) => {
    let shortText = doTruncarStr(mensagem, 28);
    //console.log('dados enviarMensagem:', {mensagem, contatoNome, contatoEmail, contatoImg, usuario, shortText, hora_atual, data_atual, link, avaliacaoAction})
    return dispatch => {

        //conversão para base 64
        const usuarioEmailB64 = b64.encode(usuario.email);
        const contatoEmailB64 = b64.encode(contatoEmail);

        firebase.auth().onAuthStateChanged((user) => {
            firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
            .push({mensagem, tipo: 'e', hora_atual, data_atual, link, avaliacaoAction, checkAvaliacao:false})
            .then(() => {
                firebase.database().ref(`/mensagens/${contatoEmailB64}/${usuarioEmailB64}`)
                .push({mensagem, tipo: 'r', hora_atual, data_atual, link, avaliacaoAction, checkAvaliacao: false})
                .then(() => {
                    // Armazenar o cabeçalho de conversa do usuário autenticado
                    firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}/${contatoEmailB64}`)
                    .set({ nome: contatoNome, email: contatoEmail, img: contatoImg, shortText, hora_atual, data_atual}).then(() => {
                        firebase.database().ref(`/usuario_conversas/${contatoEmailB64}/${usuarioEmailB64}`)
                        .set({nome: usuario.nome, email: usuario.email, img: usuario.img, shortText, hora_atual, data_atual }).then(() => {
                            dispatch ({ type: ENVIA_MENSAGEM_SUCESSO})
                        })
                    })
                })
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
    return dispatch => {
        //console.log('conversasUsuarioFetch: ', email)
        let usuarioEmailB64 = b64.encode(email);
        console.log('usuarioEmailB64: ', usuarioEmailB64)

        firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}`)
            .on("value", snapshot => { 
                //console.log('conversasUsuarioFetch snapshot', _.values(snapshot.val()))
                dispatch({ type: LISTA_CONVERSAS_USUARIO, payload: _.values(snapshot.val()) })
            })
    }
}

export const getAllVideos = (email) => {
    return (dispatch) => {
        dispatch({type: LOADING_VIDEO_ALL, payload: true})
        console.log("getVideosMentor email: ", email)
        var emailB64 = b64.encode(email);
        firebase.database().ref(`videos/${emailB64}/free`)
        .on("value", snapshot => {
            console.log("getVideosAllFree: ", _.values(snapshot.val()))
            dispatch({type: LISTA_VIDEOS_FREE_ALL, payload: _.values(snapshot.val())})
            firebase.database().ref(`videos/${emailB64}/premium`)
            .on("value", snapshot => {
                console.log("getVideosAllPremium: ", _.values(snapshot.val()))
                dispatch({type: LISTA_VIDEOS_PREMIUM_ALL, payload: _.values(snapshot.val())})
                dispatch({type: LOADING_VIDEO_ALL, payload: false})
            })
        })
    }    
}

export const menotresFetch = () => {
    const { currentUser } = firebase.auth();

    return dispatch => {
        let usuarioEmailB64 = b64.encode(currentUser.email);

        firebase.database().ref(`/mentores`)
            .on("value", snapshot => { 
                //console.log('value Mentores: ', snapshot.val())
                dispatch({ type: LISTA_MENTORES, payload: snapshot.val() })
            })
    }
}

export const signOut = ( ) => {
    return dispatch => {

        let usuario = {
            nome: '',
            email: '',
            descricao: '',
            img: '',
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
            premium: false,
            facebookid: ''
        }
        
        firebase.auth().onAuthStateChanged((user) => {
            firebase.auth().signOut().then(() =>{
                dispatch({ type: USER_SIDEBAR , payload: usuario })
                dispatch({ type: USER_PROFILE , payload: usuario })
                dispatch({ type: USER_FORM_MENTORING , payload: usuario })
                dispatch({ type: USER_HOME , payload: usuario })
                
                Actions.formLogin()
            })
        })
    }
}
