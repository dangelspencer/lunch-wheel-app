import React from 'react';
import {Button, Text, View} from "react-native";
import {NavigationScreenProps} from "react-navigation";
import {SVGWheel} from '../components/svgWheel';
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
    //     const items: WheelItem[] = [
    //         {
    //             name: 'Skyline',
    //             weight: 1
    //         }, {
    //             name: 'Chipotle',
    //             weight: 1
    //         }, {
    //             name: 'Basil Thai',
    //             weight: 1
    //         }, {
    //             name: 'Smashburger',
    //             weight: 1
    //         }
    //     ];

    //     if (this.state.screeWidth > 0) {
    //         return (
    //             <>
    //                 <Wheel screenWidth={this.state.screeWidth} items={items}></Wheel>
    //             </>
    //         );
    //     } 

    //     return (
    //         <>
    //             <View style={{ flex: 1, alignItems: 'center' }} onLayout={(event) => this.setViewDetails(event)}>
    //                 <Text>Lunch Wheel</Text>
    //                 <Text>Width {this.state.screeWidth}</Text>
    //             </View>
    //         </>
    //     );
    
        return (<SVGWheel></SVGWheel>);
    }
}