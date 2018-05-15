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
         MODIFICA_FACEBOOK_ID,
         MODIFICAR_SCREEN_REQUEST,
         USER_SIDEBAR,
         USER_PROFILE,
         USER_FORM_MENTORING,
         USER_HOME,
         UPDATE_DADOS_EM_ANDAMENTO,
         UPDATE_DADOS_SUCESSO

        } from './types';
import { Platform } from 'react-native';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk'
import _ from 'lodash';


const fs = RNFetchBlob.fs
const Blob = RNFetchBlob.polyfill.Blob
const testImageName = `time2goal-${Platform.OS}-${new Date()}.png`

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export const modificaEmail = (texto) => {
    return {
        type: MODIFICA_EMAIL,
        payload: texto.toLowerCase()
    }
}

export const setEmail = (texto) => {
    return {
        type: MODIFICA_EMAIL,
        payload: texto
    }
}

export const modificaSenha = (texto) => {
    return {
        type: MODIFICA_SENHA,
        payload: texto
    }
}

export const modificaFacebookId = (texto) => {
    return {
        type: MODIFICA_FACEBOOK_ID,
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
    console.log(titularCartao)
    return {
        type: MODIFICAR_TITULAR_CARD,
        payload: titularCartao
    }
}
export const modificaNumeroCard = (numeroCartao) => {
    console.log(numeroCartao)
    return {
        type: MODIFICAR_NUMERO_CARD,
        payload: numeroCartao
    }
}
export const modificaValidadeData = (validadeData) => {
    console.log(validadeData)
    return {
        type: MODIFICAR_VALIDADE_DATA,
        payload: validadeData
    }
}
export const modificaCVV = (cvv) => {
    console.log(cvv)
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
        console.log('cadastroMetod:',{nome, email, senha, descricao, img});
        var mime = 'image/jpeg';
        var emailB64 = b64.encode(email);
        dispatch({type: CADASTRO_EM_ANDAMENTO});
        
        
        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(user => {
                console.log('User: ',user)

                firebase.auth()
                        .signInWithEmailAndPassword(email, senha)
                        .catch((err) => {
                            console.log('firebase sigin failed', err)
                        })
                        
                            if(img !== "" && img !== undefined){
                            return new Promise((resolve, reject) => {
                                let imgUri = img; let uploadBlob = null;
                                const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
                                const { currentUser } = firebase.auth();
                                const imageRef = firebase.storage().ref('images-users/' + testImageName)
                            
                                fs.readFile(uploadUri, 'base64')
                                    .then(data => {
                                    return Blob.build(data, { type: `${mime};BASE64` });
                                    })
                                    .then(blob => {
                                    uploadBlob = blob;
                                    return imageRef.put(blob, { contentType: mime, name: testImageName });
                                    })
                                    .then(() => {
                                    uploadBlob.close()
                                    imageRef.getDownloadURL().then((url) => {                                          
                                        salvarDatavaseDados(dispatch, nome, email, descricao, url, false, cpf, titularCard, numeroCard, validadeCard, cvv, dataNascimento, cep, endereco, pais, bool, '', emailB64)
                                    })                                        
                                    //return imageRef.getDownloadURL();
                                    })
                                    .then(url => {
                                    console.log('url: ', url)
                                    resolve(url);
                                    })
                                    .catch(error => {
                                    reject(error)
                                })
                                })
                            } else {
                                salvarDatavaseDados(dispatch, nome, email, descricao, '', false, '', '', '', '', '', '', '', '', '', false, '', emailB64)
                            }
                            //cadastraUsuarioSucesso(dispatch)
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
    firebase.auth().signOut().then(() => Actions.formLogin())
}

const cadastraUsuarioErro = (erro, dispatch) => {
    dispatch(
        {
            type: CADASTRO_USUARIO_ERRO,
            payload: erro.message
        }
    );
    
}

export const autenticarUsuario = (email, senha) => {
    return (dispatch) => {
        console.log('Usuario: ', {email, senha} )
        dispatch({type: LOGIN_EM_ANDAMENTO})
        var emailB64 = b64.encode(email);

        firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(value => loginUsuarioSucesso(dispatch, emailB64))
        .catch(erro => loginUsuarioErro(erro, dispatch));
    }
    
}

const salvarDatavaseDados = (dispatch, nome, email, descricao, img, mentoring, cpf, titularCartao, numeroCartao, validade, cvv, dataNascimento, cep, endereco, pais, premium, id,  emailB64) => {
    
    firebase.database().ref(`/contatos/${emailB64}`).set({
        nome,
        email,
        img
    })
    console.log('salvarDatabaseDados', {dispatch, nome, email, descricao, img, mentoring, cpf, titularCartao, numeroCartao, validade, cvv, dataNascimento, cep, endereco, pais, premium, id,  emailB64})   
    let usuario = firebase.database().ref(`/usuarios/${emailB64}` ).set({
        nome: nome !== undefined ? nome : '',
        email: email,
        descricao: descricao !== undefined ? descricao : '',
        img: img !== undefined ? img : '',
        mentoring: mentoring !== undefined ? mentoring : false,
        cpf: cpf !== undefined ? cpf : '',
        titularCartao: titularCartao !== undefined ? titularCartao : '',
        numeroCartao: numeroCartao !== undefined ? numeroCartao : '',
        validade: validade !== undefined ? validade : '',
        cvv: cvv !== undefined ? cvv : '',
        dataNascimento: dataNascimento !== undefined ? dataNascimento : '',
        cep: cep !== undefined ? cep : '',
        endereco: endereco !== undefined ? endereco : '',
        pais: pais !== undefined ? pais : '',
        premium: premium !== undefined ? premium : false,
        facebookid: id !== undefined ? id : ''
    })
    loginUsuarioSucesso(dispatch, emailB64)

    
      
        
}

const criarUsuarioFireBase = (dispatch, nome, email, url, id, emailB64) => { 
    console.log('criarUsuarioFireBase')
    firebase.auth().createUserWithEmailAndPassword(email, emailB64)
            .then(user => {
                console.log('criado usuario no firebaseAuth')
                firebase.auth().signInWithEmailAndPassword(email, emailB64)
                .then(value =>{
                    console.log('Autentico FIREBASE: ', value)

                    firebase.auth().onAuthStateChanged((user) => {
                        console.log('onAuthStateChanged: ', user)
                        salvarDatavaseDados(dispatch, nome, email, '', url, false, '', '', '', '', '', '', '', '', '', false, id, emailB64)  
                    })
                })
                .catch(erro => loginUsuarioErro(erro, dispatch)); 
            }) 
            .catch(erro => { 
                            console.log('NÃO fois possivel criar usuario no firebaseAuth', erro)
                        });
}

export const UpdateDados = (nome, email, descricao, img, cpf, titularCartao, numeroCartao, validade, cvv, dataNascimento, cep, endereco, pais, premium, navigation) => {
    return (dispatch) => {
        dispatch({type: UPDATE_DADOS_EM_ANDAMENTO})
        var emailB64 = b64.encode(email);
        console.log('UpdateDados: ', {nome, email, descricao, img, cpf, titularCartao, numeroCartao, validade, cvv, dataNascimento, cep, endereco, pais, premium, navigation})
        let usuario = firebase.database().ref(`/usuarios/${emailB64}` ).set({
                nome: nome ,
                email: email,
                descricao: descricao,
                img: img,
                cpf: cpf,
                titularCartao: titularCartao,
                numeroCartao: numeroCartao,
                validade: validade,
                cvv: cvv,
                dataNascimento: dataNascimento,
                cep: cep,
                endereco: endereco,
                pais: pais,
                premium: premium,
            })
            updateDadosSucesso(dispatch, navigation)
    }
}

export const habilitarPremiumSideBar = (bool, email) => {
    return dispatch => {
        console.log('habilitarPremiumSideBar', {bool, email})
        var emailB64 = b64.encode(email);
        let usuario = firebase.database().ref(`/usuarios/${emailB64}` ).child('premium').set(bool)
    }
}

export const UpdateImg = (img, email) => {
    return dispatch => {
        var emailB64 = b64.encode(email);
        let rnfbURI = RNFetchBlob.wrap(img)
            // create Blob from file path
            Blob
                .build(rnfbURI, { type : 'image/png;'})
                .then((blob) => {
                // upload image using Firebase SDK
                firebase.storage()
                    .ref('images-users') // rn-firebase-upload
                    .child(testImageName)
                    .put(blob, { contentType : 'image/png' })
                    .then((snapshot) => {
                    console.log('snapshot', snapshot)
                    
                firebase.storage()
                    .ref('images-users/' + testImageName)
                    .getDownloadURL().then((url) => {
                        console.log('url: ', url)
                        
                        let usuario = firebase.database().ref(`/usuarios/${emailB64}` ).set({
                            img: url,
                        })
                        updateDadosSucesso(dispatch, navigation)

                        }).catch((err) => {
                            console.log('display storage filed', err)
                        })
                        blob.close()
                    })
                }).catch((err) => {
                    console.log('firebase upload storage filed', err)
                })

        }
    }


const updateDadosSucesso = (dispatch, navigation) => {
    dispatch({ type: UPDATE_DADOS_SUCESSO})
    navigation.navigate("Home")
}

export const autenticarFacebook = (nome, email, id, url) => {
    return (dispatch) => {

            dispatch({type: LOGIN_EM_ANDAMENTO})

            console.log('autenticarFacebookMetod', {nome, email, id, url})
            var emailB64 = b64.encode(email);
        
            let usuario = firebase.database().ref(`/usuarios/${emailB64}` )
            usuario.once('value', (snapshot) => {
                console.log('USUARIO: ', snapshot.val())
                if(snapshot.val() !== null){
                    console.log('existe usuario')
        
                    firebase.auth().signInWithEmailAndPassword(email, emailB64)
                    .then(value => loginUsuarioSucesso(dispatch, emailB64))
                    .catch(erro => loginUsuarioErro(erro, dispatch));

                } else {
                    console.log('NÃO existe usuario')
                    criarUsuarioFireBase(dispatch, nome, email, url, id, emailB64)
                }   
            })
        }
}

const loginUsuarioSucesso = (dispatch, emailB64) => {
    dispatch(
        {
            type: LOGIN_USUARIO_SUCESSO,
        }
    );
    console.log('loginUsuarioSucesso: ', emailB64)

    firebase.database().ref(`/usuarios/${emailB64}`)
        .on("value", snapshot => { 
           
            dispatch({ type: USER_SIDEBAR , payload: snapshot.val() })
            dispatch({ type: USER_PROFILE , payload: snapshot.val() })
            dispatch({ type: USER_FORM_MENTORING , payload: snapshot.val() })
            dispatch({ type: USER_HOME , payload: snapshot.val() })
            console.log('getUsuario snapshot: ',  snapshot.val())
        })

    Actions.principal();
}

export const getUsuarioLogado = (email) => {
    return (dispatch) => {
        var emailB64 = b64.encode(email);
        firebase.database().ref(`/usuarios/${emailB64}`)
        .on("value", snapshot => { 
           
            dispatch({ type: USER_SIDEBAR , payload: snapshot.val() })
            dispatch({ type: USER_PROFILE , payload: snapshot.val() })
            dispatch({ type: USER_FORM_MENTORING , payload: snapshot.val() })
            dispatch({ type: USER_HOME , payload: snapshot.val() })
            console.log('getUsuarioLogado snapshot: ',  snapshot.val())
        })
    }
}

const loginUsuarioErro = (erro, dispatch) => {
    dispatch(
        {
            type: LOGIN_USUARIO_ERRO,
            payload: erro.message
        }
    );
}