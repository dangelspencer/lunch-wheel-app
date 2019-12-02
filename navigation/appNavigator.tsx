import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {CreateWheelScreen} from '../screens/createWheelScreen';
import {ItemEditScreen} from '../screens/itemEdit';
import {HomeScreen} from "../screens/homeScreen";
import {WheelScreen} from '../screens/wheelScreen';

export const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        Wheel: {
            screen: WheelScreen
        },
        EditItem: {
            screen: ItemEditScreen
        },
        CreateWheel: {
            screen: CreateWheelScreen
        }
    }, {
        initialRouteName: "Home"
    });