import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob'
import { Actions } from 'react-native-router-flux'; 
import b64 from 'base-64';
import _ from 'lodash';
import { Platform, Alert } from 'react-native';
import { ABRIR_POPUP_GERENCIAR_VIDEOS, SELECTED_TYPE_VIDEO, LOADING_UPLOAD_VIDEO, LISTA_VIDEOS_FREE_MENTOR, LISTA_VIDEOS_PREMIUM_MENTOR, MODIFICAR_TITULO_VIDEO, } from './types';
import RNThumbnail from 'react-native-thumbnail';

const fs = RNFetchBlob.fs
const Blob = RNFetchBlob.polyfill.Blob

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export const modificarTitulo = (texto) => {
    return {
        type: MODIFICAR_TITULO_VIDEO, 
        payload: texto,
    }
}

export const deleteVideo = (video) => {
    return (dispatch) => {
        const { currentUser } = firebase.auth();
        dispatch({type: LOADING_UPLOAD_VIDEO, payload: true})
        var emailB64 = b64.encode(currentUser.email);
        console.log('deleteVideo: ', {emailB64, video})

        const storeRefThumbnail = firebase.storage().ref(`thumbnail-videos`).child(`${video.thumbnail_nome}`)
        const storeRefVideo = firebase.storage().ref(`videos-mentor`).child(`${video.child_video_name}`)

        storeRefThumbnail.delete().then(function() {
            console.log('Excluiu thumbnail-videos')
            storeRefVideo.delete().then(function() {
                console.log('Excluiu videos-mentor')
                firebase.database().ref(`videos/${video.type}`).child(`${video.uidVideosAll}`).remove().then(() => {
                    console.log('Excluiu videos All')
                    firebase.database().ref(`videos_mentor/${emailB64}/${video.type}`).child(`${video.uidVideosMentor}`).remove().then(() => {
                        console.log('Excluiu videos mentor')
                        Alert.alert(
                            'Delete',
                            'Delete efetuado com sucesso.',
                            [
                              {text: 'OK', onPress: () => dispatch({type: LOADING_UPLOAD_VIDEO, payload: false})},
                            ],
                            { cancelable: false }
                          )
                    })
                })
            }).catch(function(error) {
                console.log('Erro: ', error)
            });
          }).catch(function(error) {
            console.log('Erro: ', error)
          });
    }
}
export const checkpopup = (bool) => {
    console.log('checkpopup: ', bool)
    return {
        type: ABRIR_POPUP_GERENCIAR_VIDEOS,
        payload: bool
    }
}

export const modificarTypeVideo = (type_video) => {
    console.log('modificarTypeVideo: ', type_video)
    return {
        type: SELECTED_TYPE_VIDEO,
        payload: type_video
    }
}

export const getVideosMentorFree = (email) => {
    return (dispatch) => {
        console.log("getVideosMentor email: ", email)
        var emailB64 = b64.encode(email);
        firebase.database().ref(`videos_mentor/${emailB64}/free`)
        .on("value", snapshot => {
            console.log("getVideosMentorFree: ", _.map(snapshot.val()))
            dispatch({type: LISTA_VIDEOS_FREE_MENTOR, payload: _.values(snapshot.val())})
        })
    }
}
export const getVideosMentorPremium = (email) => {
    return (dispatch) => {
        console.log("getVideosMentorPremium email: ", email)
        var emailB64 = b64.encode(email);
        firebase.database().ref(`videos_mentor/${emailB64}/premium`)
        .on("value", snapshot => {
            console.log("getVideosMentorPremium: ", _.values(snapshot.val()))
            dispatch({type: LISTA_VIDEOS_PREMIUM_MENTOR, payload: _.values(snapshot.val())})
        })
    }
}

export const uploadVideos = (dados, usuario, type, titulo) => {
    return (dispatch) => {
        dispatch({type: LOADING_UPLOAD_VIDEO, payload: true})
        var emailB64 = b64.encode(usuario.email);
        let tituloB64 = b64.encode(titulo);
        let testVideoName = `time2goal-${tituloB64}-${new Date()}.MP4`
        let testImageName = `time2goal-${tituloB64}-${new Date()}.jpg`
        

        firebase.auth().onAuthStateChanged((user) => {
            console.log('onAuthStateChanged: ', user)
            console.log('dados: ', { dados, usuario, type, titulo })
            
            let rnfbURI = RNFetchBlob.wrap(dados.origURL)
            // create Blob from file path
            Blob
                .build(rnfbURI, { type : 'multipart/form-data;'})
                .then((blob) => {
                // upload image using Firebase SDK
                let uidVideos = b64.encode(testVideoName);
                firebase.storage()
                    .ref('videos-mentor') // rn-firebase-upload
                    .child(testVideoName)
                    .put(blob, { contentType : 'multipart/form-data' })
                    .then((snapshot) => {
                    console.log('snapshot video', snapshot)
                    
                firebase.storage()
                    .ref('videos-mentor/' + testVideoName)
                    .getDownloadURL().then((urlVideo) => {
                                console.log('url: ', urlVideo)                        
                                RNThumbnail.get(dados.uri).then((result) => {
                                    console.log("thumbnail path", result); // thumbnail path                            
                                        let imgUri = result.path;
                                        let uploadBlob = null;
                                        let mime = 'image/jpg';
                                        let uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
                                        let imageRef = firebase.storage().ref('thumbnail-videos/' + testImageName)
                                        var uid = '';
                                    
                                        fs.readFile(uploadUri, 'base64')
                                            .then(data => {
                                            return Blob.build(data, { type: `${mime};BASE64` });
                                            })
                                            .then(blob => {
                                            uploadBlob = blob;
                                            return imageRef.put(blob, { contentType: mime, name: testImageName });
                                            })
                                            .then(() => {                            
                                            imageRef.getDownloadURL().then((url) => {                                          
                                                let videos = firebase.database().ref(`videos/${type}`)
                                                videos.push().set({                                
                                                    email_mentor: usuario.email,
                                                    thumbnail: url,
                                                    titulo,
                                                }).then(() => {
                                                    videos.once('child_added', function(data) {
                                                        let videos_mentor = firebase.database().ref(`videos_mentor/${emailB64}/${type}`)
                                                        videos_mentor.push().set({                                    
                                                            uri: urlVideo,
                                                            child_video_name: testVideoName,
                                                            thumbnail: url,
                                                            thumbnail_nome: testImageName,
                                                            titulo,
                                                            type: type,
                                                            uidVideosAll: data.key,
                                                            uidVideosMentor: ''
                                                        })
                                                        videos_mentor.once('child_added', function(data) {
                                                            firebase.database().ref(`videos_mentor/${emailB64}/${type}`).child(`${data.key}`).child('uidVideosMentor').set(data.key)
                                                        })
                                                    });
                                                })

                                                Alert.alert(
                                                    'Sucesso',
                                                    'O upload do video foi feito com sucesso.',
                                                    [
                                                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                    ],
                                                    { cancelable: false }
                                                  )
                                                  uploadBlob.close()
                                                  dispatch({type: LOADING_UPLOAD_VIDEO, payload: false})
                                            }).catch((err) => {
                                                console.log('Thumbnail erro: ', err)
                                            })                                                                          
                                        })                                                                       
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