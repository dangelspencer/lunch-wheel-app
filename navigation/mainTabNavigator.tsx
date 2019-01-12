import React from 'react';
import {Text, View} from "react-native";
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import { HomeScreen } from "../screens/homeScreen";

export const MainTabNavigator = createBottomTabNavigator({
    Home: HomeScreen
});