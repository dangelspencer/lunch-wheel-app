import React from 'react';
import {createAppContainer} from 'react-navigation';
import {AppNavigator} from "./appNavigator";

export const AppContainer = createAppContainer(AppNavigator);