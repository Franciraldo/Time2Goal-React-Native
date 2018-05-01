import React, { Component } from 'react';
import { View, Text, ListView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';


class Videos extends Component {

    componentDidMount() {
        console.log('Videos componentDidMount: ', this.props); 
        
      }
      componentWillMount() {
        console.log('Videos componentWillMount: ', this.props)
            
      }
      componentWillReceiveProps(nextProps){
        console.log('Videos componentWillReceiveProps: ', nextProps)
      }
    
    render() {
        return (
            <View>
                
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {  };
}

export default connect(mapStateToProps, {})(Videos)