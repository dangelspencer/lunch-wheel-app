import React from 'react';
import {Button, Text, View} from "react-native";
import {NavigationScreenProps} from "react-navigation";
import {Wheel as IWheel} from '../models/wheel';
import {Wheel} from '../components/wheel';

interface WheelScreenState {
    screeWidth: number;
    wheel: IWheel;
}

export class WheelScreen extends React.Component<NavigationScreenProps, WheelScreenState> {
    constructor(props: NavigationScreenProps) {
        super(props);

        this.state = {
            screeWidth: 0, 
            wheel: props.navigation.getParam('wheel')
        };
    }

    static navigationOptions = (params: any) => {
        return {
          title: params.navigation.getParam('wheel').name || 'Wheel',
        };
      };

    setViewDetails(event: any) {
        const {width, height} = event.nativeEvent.layout;
        this.setState({screeWidth: width > height ? height : width});
    }

    render() {

        if (this.state.screeWidth > 0) {
            return (
                <View style={{ flex: 1, alignItems: 'center' }} onLayout={(event) => this.setViewDetails(event)}>
                    <Wheel items={this.state.wheel.items} screenWidth={this.state.screeWidth}></Wheel>
                    <Text>Lunch Wheel</Text>
                </View>
            );
        } 
        return (
            <>
                <View style={{ flex: 1, alignItems: 'center' }} onLayout={(event) => this.setViewDetails(event)}>
                </View>
            </>
        );
    }
}
