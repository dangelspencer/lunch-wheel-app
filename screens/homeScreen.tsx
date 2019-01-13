import React from 'react';
import {Button, Text, View} from "react-native";
import {NavigationScreenProps} from "react-navigation";
import {Wheel} from '../components/wheel';
import { WheelItem } from '../models/wheelItem';

interface HomeState {
    screeWidth: number;
}

export class HomeScreen extends React.Component<NavigationScreenProps, HomeState> {
    static navigationOptions = {
        title: "Home"
    };

    constructor(props: NavigationScreenProps) {
        super(props);

        this.state = {screeWidth: 0};
    }

    setViewDetails(event: any) {
        const {width} = event.nativeEvent.layout;
        this.setState({screeWidth: width});
    }

    render() {
        const items: WheelItem[] = [
            {
                id: '',
                name: 'Skyline',
                weight: 1,
                color: null
            }, {
                id: '',
                name: 'Chipotle',
                weight: 1,
                color: null
            }, {
                id: '',
                name: 'Basil Thai',
                weight: 1,
                color: null
            }, {
                id: '',
                name: 'Smashburger',
                weight: 1,
                color: null
            }, {
                id: '',
                name: 'Dibella\'s',
                weight: 1,
                color: ''
            }, {
                id: '',
                name: 'Buffalo Wild Wings',
                weight: 1,
                color: ''
            }
        ];

        if (this.state.screeWidth > 0) {
            return (
                <View style={{ flex: 1, alignItems: 'center' }} onLayout={(event) => this.setViewDetails(event)}>
                    <Wheel items={items} screenWidth={this.state.screeWidth}></Wheel>
                </View>
            );
        } 

        return (
            <>
                <View style={{ flex: 1, alignItems: 'center' }} onLayout={(event) => this.setViewDetails(event)}>
                    <Text>Lunch Wheel</Text>
                    <Text>Width {this.state.screeWidth}</Text>
                </View>
            </>
        );
    }
}