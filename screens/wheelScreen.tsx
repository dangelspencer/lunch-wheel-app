import React, {useRef} from 'react';
import {Button, Text, View} from "react-native";
import {NavigationScreenProps} from "react-navigation";
import {Wheel as IWheel} from '../models/wheel';
import {Wheel} from '../components/wheel';

interface WheelScreenState {
    screeWidth: number;
    wheel: IWheel;
}

export class WheelScreen extends React.Component<NavigationScreenProps, WheelScreenState> {
    private wheelReference: any;

    constructor(props: NavigationScreenProps) {
        super(props);

        this.state = {
            screeWidth: 0, 
            wheel: props.navigation.getParam('wheel')
        };
    }

    static navigationOptions = {
        title: '',
    };

    setViewDetails(event: any) {
        const {width, height} = event.nativeEvent.layout;
        this.setState({screeWidth: width > height ? height : width});
    }

    render() {
        if (this.state.screeWidth > 0) {
            return (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{fontSize: 22, fontWeight: 'bold'}}>{this.state.wheel.name}</Text>
                    <Text style={{fontSize: 15, paddingBottom: '5%'}}>{this.state.wheel.items.length} Items</Text>
                    <Wheel items={this.state.wheel.items} screenWidth={this.state.screeWidth}></Wheel>
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
