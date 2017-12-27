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
          MODIFICAR_CATEGORIA_MENTORIA
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

const enviarImg1 = ({img1, emailB64}) => {
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
                                                let usuario = firebase.database().ref(`/mentores/ ${emailB64}` )
                                                .push().set({
                                                        img1: url !== undefined ? url : '',
                                                })                                                
                                            }).catch((err) => {
                                                console.log('display storage filed', err)
                                            })
                                            blob.close()
                                    })
                                }).catch((err) => {
                                    console.log('firebase upload storage filed', err)
                                })
}

const enviarImg2 = ({img2, emailB64}) => {
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
                                                let usuario = firebase.database().ref(`/mentores/ ${emailB64}` )
                                                .push().set({
                                                        img2: url !== undefined ? url : '',
                                                })                                                
                                            }).catch((err) => {
                                                console.log('display storage filed', err)
                                            })
                                            blob.close()
                                    })
                                }).catch((err) => {
                                    console.log('firebase upload storage filed', err)
                                })
}


export const enviarFormMentoring = ({nome, email, descricao_profissional, agencia, conta, banco, img1, img2, idioma, categoria_mentoria}) => {
        return (dispatch) => {
            console.log('enviarFormMentoring:',{nome, email, descricao_profissional, agencia, conta, banco, img1, img2, idioma, categoria_mentoria});
            var emailB64 = b64.encode(email);
            
            let mentore = firebase.database().ref(`/mentores/ ${emailB64}` )
                            .push().set({
                                nome: nome !== undefined ? nome : '',
                                email: email,
                                descricao_profissional: descricao_profissional !== undefined ? descricao : '',
                                agencia: agencia !== undefined ? agencia : '',
                                conta: conta !== undefined ? conta : '',
                                banco: banco !== undefined ? banco : '',
                                img1: '',
                                img2: '',
                                idioma: idioma !== undefined ? idioma : '',
                                categoria_mentoria: categoria_mentoria !== undefined ? categoria_mentoria : '',
                                mentoring: false,
                            })

                            enviarImg1(img1, emailB64)
                            enviarImg2(img2, emailB64)                 
                            
                            
    }
}