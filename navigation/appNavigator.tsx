import React from 'react';
import {createStackNavigator, createSwitchNavigator} from 'react-navigation';
import {HomeScreen} from "../screens/homeScreen";

export const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen
        }
    }, {
        initialRouteName: "Home"
    });