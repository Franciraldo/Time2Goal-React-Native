import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import HomeScreen from "./HomeScreen/index.js";
import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import BoasVindas from './components/BoasVindas';
import Principal from './components/Principal';
import AdicionarContato from './components/AdicionarContato';
import Conversa from './components/Conversa';
import CameraView from './components/CameraView';
import formComplement from './components/FormComplement';

export default props => (
    <Router navigationBarStyle={{ backgroundColor: '#fc5b07'}} titleStyle={{backgroundColor: 'transparent', color: '#fff'}}>
        <Scene key='formLogin' component={FormLogin} tabTitle="Login" hideNavBar={true} initial/>
        <Scene key='formCadastro' component={FormCadastro} title="Cadastro" hideNavBar={false}/>
        <Scene key='boasVindas' component={BoasVindas} tabTitle="Bem-Vindo" hideNavBar={true}/>
        <Scene key='principal' component={HomeScreen} tabTitle="Principal" hideNavBar={true} />
        <Scene key='adicionarContato' component={AdicionarContato} tabTitle="Adicionar Contato" hideNavBar={false} />
        <Scene key='conversa' component={Conversa} tabTitle="Conversa" hideNavBar={false} />
        <Scene key='formComplement' component={formComplement} tabTitle="Cadastro(Completo)" hideNavBar={false}/>
        <Scene key='camera' component={CameraView} tabTitle="Cam" hideNavBar={true} />
    </Router>
)