import React, { Component } from 'react';
import { View, Text, ListView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
const logo = require('../imgs/logo.png');

class Avaliacao extends Component {
    
    componentDidMount(){
        console.log('Avaliacao componentDidMount: ', this.props)
        
    }

    componentWillMount() {
        console.log('Avaliacao componentWillMount: ', this.props)
        
    }
    componentWillReceiveProps(nextProps) {
        console.log('Avaliacao componentWillReceiveProps: ', nextProps)

    }

    render() {
        return (
            <View>
                <Text>
                    Avaliacao
                </Text>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {  };
}

export default connect(mapStateToProps, {})(Avaliacao)