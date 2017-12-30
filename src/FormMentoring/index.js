import React, { Component } from "react";
import FormMentoring from "./FormMentoring.js";
import CameraView from '../components/CameraView';
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    FormMentoring: { screen: FormMentoring },
    CameraView: { screen: CameraView , navigationOptions: { header: null }},
}));
