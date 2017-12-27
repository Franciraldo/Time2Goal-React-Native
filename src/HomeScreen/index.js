import React, { Component } from "react";
import HomeScreen from "./HomeScreen.js";
import GerenciarAgendaScreen from "../GerenciarAgendaScreen/index.js";
import GerenciarVideosScreen from "../GerenciarVideosScreen/index.js";
import FormMentoring from "../FormMentoring/index.js";
import Profile from "../ProfileScreen/index.js";
import SideBar from "../SideBar/SideBar.js";
import { DrawerNavigator } from "react-navigation";
const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    GerenciarAgenda: { screen: GerenciarAgendaScreen },
    GerenciarVideosScreen: {screen: GerenciarVideosScreen },
    FormMentoring: {screen: FormMentoring}, 
    Profile: { screen: Profile }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeScreenRouter;
