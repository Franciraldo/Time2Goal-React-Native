import RNFetchBlob from 'react-native-fetch-blob'
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'; 
import b64 from 'base-64';
import {  MODIFICAR_DESCRICAO_PROFISSIONAL,
          MODIFICAR_AGENCIA,
          MODIFICAR_CONTA,
          MODIFICAR_BANCO,
          MODIFICAR_IMG1,
          MODIFICAR_IMG2,
          MODIFICAR_IDIOMA,
          MODIFICAR_CATEGORIA_MENTORIA,
          ENVIANDO_DADOS_FORM_MENTORING_SUCESSO,
          ENVIANDO_DADOS,
          USER_SIDEBAR_REFRESH
          } from './types';
import { Platform } from 'react-native';


const fs = RNFetchBlob.fs
const Blob = RNFetchBlob.polyfill.Blob
const testImageName = `time2goal-${Platform.OS}-${new Date()}.png`

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export const modificaDescrricaoProfissional = (texto) => {
        return {
            type: MODIFICAR_DESCRICAO_PROFISSIONAL,
            payload: texto
        }
    }

export const modificaAgencia = (texto) => {
        return {
                type: MODIFICAR_AGENCIA,
                payload: texto
        }
}

export const modificaConta = (texto) => {
        return {
                type: MODIFICAR_CONTA,
                payload: texto
        }
}

export const modificaBanco = (texto) => {
        return {
                type: MODIFICAR_BANCO,
                payload: texto
        }
}

export const modificaImg1 = (texto) => {
        return {
                type: MODIFICAR_IMG1,
                payload: texto
        }
}
export const modificaImg2 = (texto) => {
        return {
                type: MODIFICAR_IMG2,
                payload: texto
        }
}
export const modificaIdioma = (texto) => {
        return {
                type: MODIFICAR_IDIOMA,
                payload: texto
        }
}


export const modificaCategoriaMentoria = (texto) => {
        return {
                type: MODIFICAR_CATEGORIA_MENTORIA,
                payload: texto
        }
}

const enviarImg1 = (img1, emailB64) => {
        console.log('enviarImg1', {img1, emailB64})
        return dispatch => {
                        
        }
}

const dadosEnviadosComSucesso = ( dispatch, navigation, email) => {
        console.log('dadosEnviadosComSucesso', navigation)
        dispatch({type: ENVIANDO_DADOS_FORM_MENTORING_SUCESSO})
        //dispatch({type: USER_SIDEBAR_REFRESH})
        navigation.navigate("Home")
}


export const enviarFormMentoring = (nome, email, descricao_profissional, agencia, conta, banco, img1, img2, idioma, categoria_mentoria, navigation) => {
        return (dispatch) => {
            
            dispatch({type: ENVIANDO_DADOS})
            
            console.log('enviarFormMentoring:',{nome, email, descricao_profissional, agencia, conta, banco, img1, img2, idioma, categoria_mentoria});
            var emailB64 = b64.encode(email);
            firebase.auth().onAuthStateChanged((user) => {
                console.log('onAuthStateChanged: ', user)
                let rnfbURI = RNFetchBlob.wrap(img1)
                // create Blob from file path
                Blob
                    .build(rnfbURI, { type : 'image/png;'})
                    .then((blob) => {
                    // upload image using Firebase SDK
                    firebase.storage()
                        .ref('img-form-mentoring') // rn-firebase-upload
                        .child(testImageName)
                        .put(blob, { contentType : 'image/png' })
                        .then((snapshot) => {
                        console.log('snapshot img1', snapshot)
                        
                    firebase.storage()
                        .ref('img-form-mentoring/' + testImageName)
                        .getDownloadURL().then((url) => {
                                    console.log('url1: ', url)          
                                    
                                    var url1 = url;

                                    console.log('var url1: ', url1)

                                        let rnfbURI = RNFetchBlob.wrap(img2)
                                        // create Blob from file path
                                        Blob
                                                .build(rnfbURI, { type : 'image/png;'})
                                                .then((blob) => {
                                                // upload image using Firebase SDK
                                                firebase.storage()
                                                .ref('img-form-mentoring') // rn-firebase-upload
                                                .child(testImageName)
                                                .put(blob, { contentType : 'image/png' })
                                                .then((snapshot) => {
                                                console.log('snapshot img2', snapshot)
                                                
                                                firebase.storage()
                                                .ref('img-form-mentoring/' + testImageName)
                                                .getDownloadURL().then((url) => {
                                                                console.log('url2: ', url)
                                                                let mentore = firebase.database().ref(`/mentores/ ${emailB64}` ).set({
                                                                        nome: nome,
                                                                        email: email,
                                                                        descricao_profissional: descricao_profissional,
                                                                        agencia: agencia,
                                                                        conta: conta,
                                                                        banco: banco,
                                                                        img1: url1,
                                                                        img2: url,
                                                                        idioma: idioma,
                                                                        categoria_mentoria: categoria_mentoria,
                                                                        mentoring: false,
                                                                })  
                                                                
                                                                let usuario = firebase.database().ref(`/usuarios/ ${emailB64}`).child('mentoring').set(true)
                                                                
                                                                dadosEnviadosComSucesso(dispatch, navigation, email)
                                                                
                                                                
                                                        }).catch((err) => {
                                                                console.log('display storage filed', err)
                                                        })
                                                        blob.close()
                                                })
                                                }).catch((err) => {
                                                console.log('firebase upload storage filed', err)
                                                })
                                }).catch((err) => {
                                    console.log('display storage filed', err)
                                })
                                blob.close()
                        })
                    }).catch((err) => {
                        console.log('firebase upload storage filed', err)
                    })

            })              
                            
    }
}