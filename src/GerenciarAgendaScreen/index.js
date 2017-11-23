import React, { Component } from "react";
import GerenciarAgendaScreen from "./GerenciarAgendaScreen.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    GerenciarAgendaScreen: { screen: GerenciarAgendaScreen },
}));
