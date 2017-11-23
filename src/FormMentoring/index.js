import React, { Component } from "react";
import FormMentoring from "./FormMentoring.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    FormMentoring: { screen: FormMentoring },
}));
