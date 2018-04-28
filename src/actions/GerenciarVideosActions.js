import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob'
import { Actions } from 'react-native-router-flux'; 
import b64 from 'base-64';
import _ from 'lodash';
import { Platform, Alert } from 'react-native';
import { ABRIR_POPUP_GERENCIAR_VIDEOS, SELECTED_TYPE_VIDEO, LOADING_UPLOAD_VIDEO, LISTA_VIDEOS_FREE_MENTOR } from './types';
import RNThumbnail from 'react-native-thumbnail';

const fs = RNFetchBlob.fs
const Blob = RNFetchBlob.polyfill.Blob
const testVideoName = `time2goal-${Platform.OS}-${new Date()}.MOV`
const testImageName = `time2goal-${Platform.OS}-${new Date()}.jpg`

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

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
            console.log("getVideosMentor: ", _.values(snapshot.val()))
            dispatch({type: LISTA_VIDEOS_FREE_MENTOR, payload: _.values(snapshot.val())})
        })
    }
}

export const uploadVideos = (dados, usuario, type) => {
    return (dispatch) => {
        dispatch({type: LOADING_UPLOAD_VIDEO, payload: true})
        var emailB64 = b64.encode(usuario.email);
        firebase.auth().onAuthStateChanged((user) => {
            console.log('onAuthStateChanged: ', user)
            console.log('dados: ', { dados, usuario, type })
            
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
                                        const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
                                        const { currentUser } = firebase.auth();
                                        const imageRef = firebase.storage().ref('thumbnail-videos/' + testImageName)
                                    
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
                                                firebase.database().ref(`videos/${type}/${uidVideos}`).set({                                
                                                    email_mentor: usuario.email,
                                                    uri: urlVideo,
                                                    thumbnail: url
                                                })
                                                firebase.database().ref(`videos_mentor/${emailB64}/${type}`).push().set({                                    
                                                    uri: urlVideo,
                                                    uidVideos,
                                                    thumbnail: url
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