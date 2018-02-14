import React, { Component } from "react";
import FormLogin from "../components/FormLogin";
import FormCadastro from "../components/FormCadastro";
import CameraView from '../components/CameraView';
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    FormLogin: { screen: FormLogin, navigationOptions: { header: null }},
    FormCadastro: { screen: FormCadastro },
    CameraView: { screen: CameraView},
}));