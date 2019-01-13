import React from 'react';
import {createStackNavigator, createSwitchNavigator} from 'react-navigation';
import {HomeScreen} from "../screens/homeScreen";
import {WheelScreen} from '../screens/wheelScreen';

export const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        Wheel: {
            screen: WheelScreen
        }
    }, {
        initialRouteName: "Home"
    });