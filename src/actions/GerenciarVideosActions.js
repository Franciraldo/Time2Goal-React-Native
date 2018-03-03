import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob'
import { Actions } from 'react-native-router-flux'; 
import b64 from 'base-64';
import _ from 'lodash';
import { Platform } from 'react-native';
import { ABRIR_POPUP_GERENCIAR_VIDEOS, SELECTED_TYPE_VIDEO } from './types';


const fs = RNFetchBlob.fs
const Blob = RNFetchBlob.polyfill.Blob
const testVideoName = `time2goal-${Platform.OS}-${new Date()}.MOV`

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

export const uploadVideos = (uri, usuario, type) => {
    return (dispatch) => {

        var emailB64 = b64.encode(usuario.email);
        firebase.auth().onAuthStateChanged((user) => {
            console.log('onAuthStateChanged: ', user)
            console.log('dados: ', { uri, usuario, type })
            
            let rnfbURI = RNFetchBlob.wrap(uri)
            // create Blob from file path
            Blob
                .build(rnfbURI, { type : 'multipart/form-data;'})
                .then((blob) => {
                // upload image using Firebase SDK
                firebase.storage()
                    .ref('videos-mentor') // rn-firebase-upload
                    .child(testVideoName)
                    .put(blob, { contentType : 'multipart/form-data' })
                    .then((snapshot) => {
                    console.log('snapshot video', snapshot)
                    
                firebase.storage()
                    .ref('videos-mentor/' + testVideoName)
                    .getDownloadURL().then((url) => {
                                console.log('url: ', url)
                                firebase.database().ref(`videos/${type}`).push().set({                                
                                        email_mentor: usuario.email,
                                        uri: url,
                                })
                                firebase.database().ref(`videos_mentor/${emailB64}/${type}`).push().set({                                    
                                    uri: url,
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