import * as _ from 'lodash';
import React from 'react';
import {FlatList, Modal, ScrollView, Text, TouchableHighlight, TouchableOpacity, View, TextInput} from "react-native";
import {NavigationScreenProps} from "react-navigation";
import {Wheel as IWheel} from '../models/wheel';
import {Wheel} from '../components/wheel';
import { ItemEditScreen } from './itemEdit';
import { WheelItem } from '../models/wheelItem';
import { DeviceStorage } from '../components/deviceStorage';

interface WheelScreenState {
    screeWidth: number;
    wheel: IWheel;
}

export class WheelScreen extends React.Component<NavigationScreenProps, WheelScreenState> {
    private wheelReference: any;

    constructor(props: NavigationScreenProps) {
        super(props);

        const wheel = props.navigation.getParam('wheel');

        _.each(wheel.items, item => {
            if (item.color === '' || !item.customColor) {
                item.color = this.getColor(wheel.items.indexOf(item), wheel.items.length);
            }
        });

        this.state = {
            screeWidth: 0, 
            wheel: props.navigation.getParam('wheel')
        };
    }

    static navigationOptions = {
        title: '',
    };


    componentWillReceiveProps(nextProps: NavigationScreenProps) {
        const wheel = nextProps.navigation.getParam('wheel');

        if (wheel.items.length > 0) {
            _.each(wheel.items, item => {
                if (item.color === '' || !item.customColor) {
                    item.color = this.getColor(wheel.items.indexOf(item), wheel.items.length);
                }
            });
        }

        this.setState({
            ...this.state,
            wheel: wheel,
        });
    }

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

    render() {
        if (this.state.screeWidth > 0) {
            return (
                <ScrollView> 
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{fontSize: 22, fontWeight: 'bold', marginTop: 10}}>{this.state.wheel.name}</Text>
                        <Text style={{fontSize: 15, paddingBottom: '5%'}}>{this.state.wheel.items.length} Items</Text>
                        {
                            this.state.wheel.items.length > 0 ? 
                                <>
                                    <Wheel items={this.state.wheel.items} screenWidth={this.state.screeWidth}></Wheel> 
                                    <Text style={{fontSize: 22, fontWeight: 'bold', marginTop: 10}}>Items</Text>
                                </>
                            : 
                                <></>
                        }

                        
                        <FlatList
                        style={{marginTop: 20}}
                        data={this.state.wheel.items}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(i: any) => 
                            
                            <TouchableOpacity 
                                onPress={() => {this.props.navigation.navigate('EditItem', {
                                    wheel: this.state.wheel,
                                    index: i.index
                                })}}
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
                            </TouchableOpacity>}
                        />
                        <TouchableOpacity 
                            onPress={() => {this.props.navigation.navigate('EditItem', {
                                wheel: this.state.wheel,
                                index: this.state.wheel.items.length
                            })}}
                            style={{ 
                                width: this.state.screeWidth - 50, 
                                height: 50, 
                                backgroundColor: 'white', 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                marginBottom: 10,
                                borderRadius: 25,
                                borderColor: 'black',
                                borderWidth: 5
                            }}>
                            <Text style={{fontSize: 18, color: 'black'}}>Add Item</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => {
                                DeviceStorage.deleteWheel(this.state.wheel.id).then(() => {
                                    this.props.navigation.goBack();
                                });
                            }}
                            style={{ 
                                width: this.state.screeWidth - 50, 
                                height: 50, 
                                backgroundColor: 'red', 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                marginBottom: 10,
                                borderRadius: 25,
                                borderColor: 'black',
                                borderWidth: 5
                            }}>
                            <Text style={{fontSize: 18, color: 'black'}}>Delete</Text>
                        </TouchableOpacity>
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
