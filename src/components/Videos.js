import React, { Component } from 'react';
import { View, Text, ListView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';


class Videos extends Component {
    
    render() {
        return (
            <View>
                Text
            </View>
        );
    }
}

const mapStateToProps = state => {
    const contatos = _.map(state.ListaContatosReducer, (val, uid) => {
        return { ...val, uid }
    })
    return { contatos };
}

export default connect(mapStateToProps, {contatosUsuarioFetch})(Contatos)