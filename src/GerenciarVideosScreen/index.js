import React, { Component } from "react";
import GerenciarVideosScreen from "./GerenciarVideosScreen.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    GerenciarVideosScreen: { screen: GerenciarVideosScreen },
}));
