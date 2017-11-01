/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import Routes from './Routes';
import reducers from './reducers'



    class App extends Component {
        componentWillMount() {
            // Initialize Firebase
            firebase.initializeApp({
                apiKey: "AIzaSyBFsae0VnS-ih4UVu6evTdRvTM8dg4N45I",
                authDomain: "time2goal-735fc.firebaseapp.com",
                databaseURL: "https://time2goal-735fc.firebaseio.com",
                projectId: "time2goal-735fc",
                storageBucket: "time2goal-735fc.appspot.com",
                messagingSenderId: "708056998479"
            });
        }
        render(){
            return (
                <Provider store={ createStore(reducers, {}, applyMiddleware(ReduxThunk)) }>
                    <Routes/>
                </Provider>
            );
        }
    }

export default App;


