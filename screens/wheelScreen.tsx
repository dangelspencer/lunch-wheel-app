import * as _ from 'lodash';
import React from 'react';
import {FlatList, Modal, ScrollView, Text, TouchableHighlight, TouchableOpacity, View, TextInput} from "react-native";
import {NavigationScreenProps} from "react-navigation";
import {Wheel as IWheel} from '../models/wheel';
import {Wheel} from '../components/wheel';

interface WheelScreenState {
    screeWidth: number;
    wheel: IWheel;
    addingItem: boolean;
}

export class WheelScreen extends React.Component<NavigationScreenProps, WheelScreenState> {
    private wheelReference: any;

    constructor(props: NavigationScreenProps) {
        super(props);

        const wheel = props.navigation.getParam('wheel');

        const itemsWithoutColors = _.filter(wheel.items, item => {
            return item.color == null || item.color === '';
        });

        const numItemsWithoutColors = itemsWithoutColors.length;
        let currentItemWithoutColor = 0;

        _.each(wheel.items, item => {
            if (item.color === '') {
                item.color = this.getColor(currentItemWithoutColor, numItemsWithoutColors);
                currentItemWithoutColor++;
            }
        });

        this.state = {
            screeWidth: 0, 
            wheel: props.navigation.getParam('wheel'),
            addingItem: false
        };
    }

    static navigationOptions = {
        title: '',
    };



    byte2Hex(n: number) {
        var nybHexString = "0123456789ABCDEF";
        return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
    }

    RGB2Color(r: number, g: number, b: number) {
        return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
    }

    getColor(item: number, maxitem: number) {
        const phase = 0;
        const center = 128;
        const width = 127;
        const frequency = Math.PI * 2 / maxitem;

        const red = Math.sin(frequency * item + 2 + phase) * width + center;
        const green = Math.sin(frequency * item + 0 + phase) * width + center;
        const blue = Math.sin(frequency * item + 4 + phase) * width + center;

        return this.RGB2Color(red, green, blue);
    }

    setViewDetails(event: any) {
        const {width, height} = event.nativeEvent.layout;
        this.setState({screeWidth: width > height ? height : width});
    }

    toggleModalVisibility(addingItem: boolean) {
        this.setState({
            ...this.state,
            addingItem: addingItem
        });
    }

    render() {
        if (this.state.screeWidth > 0) {
            return (
                <ScrollView> 
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{fontSize: 22, fontWeight: 'bold', marginTop: 10}}>{this.state.wheel.name}</Text>
                        <Text style={{fontSize: 15, paddingBottom: '5%'}}>{this.state.wheel.items.length} Items</Text>
                        <Wheel items={this.state.wheel.items} screenWidth={this.state.screeWidth}></Wheel>
                        <FlatList
                        style={{marginTop: 20}}
                        data={this.state.wheel.items}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(i: any) => 
                            
                            <View 
                                style={{ 
                                    width: this.state.screeWidth - 50, 
                                    height: 50, 
                                    backgroundColor: i.item.color, 
                                    justifyContent: 'center', 
                                    alignItems: 'center', 
                                    marginBottom: 10,
                                    borderRadius: 25,
                                    borderColor: 'black',
                                    borderWidth: 5
                                }}>
                                <Text style={{fontSize: 18, color: 'black'}}>{i.item.name}</Text>
                            </View>}
                        />
                    </View>
                </ScrollView>
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
