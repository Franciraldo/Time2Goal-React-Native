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
          USER_SIDEBAR_REFRESH,
          MODIFICAR_TITULO_POPUP,
          SET_HORA_INICIAL,
          SET_MINUTO_INICIAL,
          SET_HORA_FINAL,
          SET_MINUTO_FINAL,
          SELECTED_DAY,
          LISTA_AGENDA_DAYS,
          GET_HORARIOS,
          MODIFICAR_VALOR_MENTORIA,
          } from './types';
import { Platform } from 'react-native';
import _ from 'lodash';



const fs = RNFetchBlob.fs
const Blob = RNFetchBlob.polyfill.Blob
const testImageName = `time2goal-${Platform.OS}-${new Date()}.png`

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob


export const modificarTitlePopup = (title) => {
        console.log('title: ', title)
        return {
                type: MODIFICAR_TITULO_POPUP,
                payload: title
            }
}
export const modificarHoraInicial = (hora) => {
        return {
                type: SET_HORA_INICIAL,
                payload: hora
            }
}


export const modificarHoraFinal = (hora) => {
        return {
                type: SET_HORA_FINAL,
                payload: hora
            }
}

export const modificarMinutoInicial = (minuto) => {
        return {
                type: SET_MINUTO_INICIAL,
                payload: minuto
            }
}
export const modificarMinutoFinal = (minuto) => {
        return {
                type: SET_MINUTO_FINAL,
                payload: minuto
            }
}

export const selecionarHorario = (lista_agenda_horarios, emailMentor, day, usuario) => {
                return (dispatch) => {
                        
                        console.log('selecionarHorario', {lista_agenda_horarios, emailMentor, day, usuario})  
                        var emailB64 = b64.encode(emailMentor);
                        let horarios = firebase.database().ref("agenda_horarios_mentores")
                        horarios.child(`${emailB64}`).child(`${day}`).child(`${lista_agenda_horarios.uid}`).child("bool").set(true)
                        horarios.child(`${emailB64}`).child(`${day}`).child(`${lista_agenda_horarios.uid}`).child("nome_aluno").set(usuario.nome)
                        horarios.child(`${emailB64}`).child(`${day}`).child(`${lista_agenda_horarios.uid}`).child("email_aluno").set(usuario.email)
                        horarios.child(`${emailB64}`).child(`${day}`).child(`${lista_agenda_horarios.uid}`).child("img_aluno").set(usuario.img)
                              
                }
                
}

export const salvarHorario = (day, hora_inicial, hora_final, minuto_inicial, minuto_final, email) => {

        console.log('salvarHorario: ', {day, hora_inicial, hora_final, minuto_inicial, minuto_final, email})
        var emailB64 = b64.encode(email);
        let mentore = firebase.database().ref(`/agenda_mentores/${emailB64}`) 
        mentore.child('agenda').child(`${day}`).set({
                selected: true
        }).then(() => console.log('funcionou'))
        .catch(erro => console.log('erro day set: ', erro))

        let horarios = firebase.database().ref(`/agenda_horarios_mentores/${emailB64}`)
        horarios.child(`${day}`).push().set({
                hora_inicial: hora_inicial,
                minuto_inicial: minuto_inicial,
                hora_final: hora_final,
                minuto_final: minuto_final,
                nome_aluno: '',
                email_aluno: '',
                img_aluno: '',
                bool: false
        }).then( () => console.log('funcionou horario')).catch( erro => console.log('erro horario set: ', erro))
        
}

export const getHorarioDisponivel = (emailMentor, day) => {
        console.log('getHorarioDisponivel', {emailMentor, day})
        return (dispatch) => {
                var emailB64 = b64.encode(emailMentor);
                let mentore = firebase.database().ref(`/agenda_horarios_mentores/${emailB64}/${day}`)
                mentore.on('value', function(snapshot) {
                console.log('getHorarioDisponivel itens: ', snapshot.val())
                        modificaDays(dispatch, snapshot.val().agenda)
                });
        }
}

export const getDaysAgendados = (email) => {        
        return (dispatch) => {
        
                var emailB64 = b64.encode(email);
                console.log('getDaysAgendados', {email, emailB64})
                let mentore = firebase.database().ref(`/agenda_mentores/${emailB64}`)
                mentore.on('value', function(snapshot) {
                console.log('item-lista-agenda', snapshot.val().agenda)
                        modificaDays(dispatch, snapshot.val().agenda)
                });
        }
}

export const getHorarios = (email, day) => {
        return (dispatch) => {
                var emailB64 = b64.encode(email);
                let listadeHorariosDia = firebase.database().ref(`/agenda_horarios_mentores/${emailB64}/${day}`)
                listadeHorariosDia.on('value', function(snapshot) {

                const horarios = _.map(snapshot.val(), (val, uid) => {
                        return { ...val, uid }
                        })
                dispatch({ type: GET_HORARIOS, payload: horarios})
                });
        }
}

const modificaDays = (dispatch, listaDays) => {
        console.log('modificaDays: ', listaDays)
        dispatch({
                type: LISTA_AGENDA_DAYS,
                payload: listaDays
            })
}

export const modificarSelectDay = (day) => {
        return {
                type: SELECTED_DAY,
                payload: day
            }
}
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

export const modificaValorMentoria = (texto) => {
        return {
                type: MODIFICAR_VALOR_MENTORIA,
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

const formatDate = () => {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
    }


export const enviarFormMentoring = (nome, email, descricao_profissional, agencia, conta, banco, img1, img2, idioma, categoria_mentoria, img, valor_mentor, navigation) => {
        return (dispatch) => {
            
            dispatch({type: ENVIANDO_DADOS})
            
            console.log('enviarFormMentoring:',{nome, email, descricao_profissional, agencia, conta, banco, img1, img2, idioma, categoria_mentoria, img});
            var emailB64 = b64.encode(email);            
            firebase.auth().onAuthStateChanged((user) => {
                console.log('onAuthStateChanged: ', user)

                //INICIO CORREÇÃO
                var mime = 'image/jpeg';
                new Promise((resolve, reject) => {
                        let imgUri = img1; let uploadBlob = null;
                        const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
                        const { currentUser } = firebase.auth();
                        const imageRef = firebase.storage().ref(`'img-form-mentoring/${email}`)
                    
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
                                var url1 = url;
                                console.log('var url1: ', url1)
                                new Promise((resolve, reject) => {
                                        let imgUri = img2; let uploadBlob = null;
                                        const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
                                        const { currentUser } = firebase.auth();
                                        const imageRef = firebase.storage().ref(`'img-form-mentoring/${email}`)
                                    
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
                                                var url2 = url;
                                                console.log('url2: ', url)
                                                let mentore = firebase.database().ref(`/mentores/ ${emailB64}` ).set({
                                                        img: img,
                                                        nome: nome,
                                                        email: email,
                                                        descricao_profissional: descricao_profissional,
                                                        agencia: agencia,
                                                        conta: conta,
                                                        banco: banco,
                                                        img1: url1,
                                                        img2: url2,
                                                        idioma: idioma,
                                                        categoria_mentoria: categoria_mentoria,
                                                        mentoring: false,
                                                        valor_hora: valor_mentor,
                                                        qtd_alunos: 0,

                                                })  
                                                
                                                let usuario = firebase.database().ref(`/usuarios/ ${emailB64}`).child('mentoring').set(true)
                                                let day = formatDate()
                                                console.log('enviarFormMentoring day: ', day)
                                                let agendaMentor = firebase.database().ref(`/agenda_mentores/${emailB64}`).child('agenda').child(`${day}`).set({
                                                        selected: true
                                                });
                                                
                                                dadosEnviadosComSucesso(dispatch, navigation, email)
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




                //FIM CORREÇÃO
            })              
                            
    }
}