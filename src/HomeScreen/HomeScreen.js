import React from "react";
import { View, StyleSheet, StatusBar } from 'react-native';
import { TabViewAnimated, SceneMap } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import TabBarMenu from '../components/TabBarMenu';
import Conversas from '../components/Conversas';
import Contatos from '../components/Contatos';
import Videos from '../components/Videos';
import { habilitaInclusaoContato } from '../actions/AppActions'; 
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import { connect } from 'react-redux';
class HomeScreen extends React.Component {
  
      componentDidMount(){
        console.log('HomeScreen componentDidMount: ', this.props)
      }

      componentWillMount(){
        console.log('HomeScreen componentWillMount: ', this.props)
        
    }

    componentWillReceiveProps(nextProps){
      console.log('HomeScreen componentWillReceiveProps: ', nextProps)
      
        
    }
  
    state = {
      index: 0,
      routes: [
        { key: '1', title: 'Videos' },
        { key: '2', title: 'Mentores' },
        { key: '3', title: 'Conversas' }
        
        
      ],
    };
  
    _handleIndexChange = index => this.setState({ index });
  
    _renderHeader = props => <TabBarMenu {...props}/>;
  
    _renderScene = SceneMap({
      '1': Videos,
      '2': Contatos,
      '3': Conversas
      
    });
  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon style={styles.icon} name="menu" />
            </Button>
          </Left>
          <Body>
            <Title style={styles.title}>Principal</Title>
          </Body>
          <Right>
            <Button transparent
              onPress={() => false }  underlayColor="transparent">
              <Icon style={styles.icon} name="ios-search" />
            </Button>
          </Right>
        </Header>
          <TabViewAnimated
            style={styles.container}
            navigationState={this.state}
            renderScene={this._renderScene}
            renderHeader={this._renderHeader}
            onIndexChange={this._handleIndexChange}
          />
        
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2a29'
  },
  header: {
    backgroundColor: '#fc5b0b'
  },
  title: {
    backgroundColor: 'transparent',
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
  icon: {
    fontSize: 35,
    color: '#fff',
    
  },
});

const mapStateToProps = state => {

  const usuario = state.HomeReducer;

  //console.log('mapStateToProps SideBar', usuario)
 //console.log('Conversas mapStateToProps state: ', state);

    return ({
      usuario,
    })
  }

export default connect(mapStateToProps, {})(HomeScreen)