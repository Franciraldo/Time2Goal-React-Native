import React from "react";
import { AppRegistry, Alert, StyleSheet } from "react-native";
import { Container, Header, Left, Body, Title, Card, CardItem, Content, Right, Icon, Button, Text } from "native-base";
import { StackNavigator } from "react-navigation";
var ImagePicker = require('react-native-image-picker');
// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Select Avatar',
  mediaType: 'video',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class GerenciarVideosScreen extends React.Component {
  componentDidMount() {
    
  }
  render() {
    return (
      <Container>
        <Content padder style={styles.container}>
          
        </Content>
      </Container>
    );
  }
}
GerenciarVideosScreen.navigationOptions = ({ navigation }) => ({
  header: (
    <Header style={{ backgroundColor: '#fc5b07'}} titleStyle={{backgroundColor: 'transparent', color: '#fff'}}>
      <Left>
        <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
          <Icon name="menu"  style={{backgroundColor: 'transparent', color: '#fff'}}/>
        </Button>
      </Left>
      <Body>
        <Title style={{backgroundColor: 'transparent', color: '#fff'}}> Meus Videos </Title>
      </Body>
      <Right>
        <Button transparent
          onPress={() => {
            ImagePicker.showImagePicker(options, (response) => {
              if (response.didCancel) {
                console.log('User cancelled image picker');
              }
              else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              }
              else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              }
              else {
                let source = { uri: response.uri };
            
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                console.log('Response = ', response);
              }
            });
          } }  underlayColor="transparent">
          <Icon style={styles.icon} name="ios-add" />
        </Button>
      </Right>
    </Header>
  )
});

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  DialogTitle: {
    backgroundColor: '#fc5b07',
    borderColor: '#fc5b07',
  },
  btn: { 
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#532e1c',
    borderRadius: 18,
    backgroundColor: '#fc5b07',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 250
},
btnText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: 'bold'
},
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#2b2a29'

},
uploadImage: {
  justifyContent: 'flex-end',
  marginLeft: 200,
  width: 30,
  height: 30,
  borderRadius: 15  
},
item: {
  padding: 10,
  fontSize: 18,
  backgroundColor: 'transparent',
  color: '#fff',
  height: 44,
},
icon: {
  fontSize: 35,
  color: '#fff',
  
},
text: {
  marginTop: 30,
  marginBottom: 10,
  fontSize: 15,
  color: '#fff',
},
});