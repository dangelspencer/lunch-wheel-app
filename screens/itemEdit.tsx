import * as _ from 'lodash';
import React from 'react';
import {Button, Text, View, TextInput, TouchableOpacity} from "react-native";
import {NavigationScreenProps} from "react-navigation";
import {DeviceStorage} from '../components/deviceStorage';
import { WheelItem } from '../models/wheelItem';

export interface ItemEditScreenState {
    id: string;
    name: string;
    weight: number;
    color: string | null;
    customColor: boolean;
}

export class ItemEditScreen extends React.Component<NavigationScreenProps, ItemEditScreenState> {
    static navigationOptions = {
        title: 'Edit Item'
    };

    constructor(props: NavigationScreenProps) {
        super(props);

        const wheel = props.navigation.getParam('wheel');
        const index = props.navigation.getParam('index');
        
        if(wheel.items.length === index) {
            this.state = {
                id: '',
                name: '',
                weight: 1,
                color: '',
                customColor: false
            }
        } else {
            this.state = wheel.items[index];
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>Name</Text>
                <TextInput 
                    value={this.state.name}
                    style={{fontSize: 30, width: 300, borderColor: 'black', borderWidth: 5, borderRadius: 25, textAlign: 'center'}}
                    onChangeText={(text: string) => this.setState({name: text})}>
                </TextInput>
                <Text style={{fontSize: 30, fontWeight: 'bold', marginTop: 10}}>Weight</Text>
                <TextInput 
                    value={this.state.weight.toString()}
                    style={{fontSize: 30, width: 300, borderColor: 'black', borderWidth: 5, borderRadius: 25, textAlign: 'center'}}
                    keyboardType="number-pad"
                    onChangeText={(text: string) => this.setState({weight: parseInt(text) || 0})}>
                </TextInput>
                <TouchableOpacity 
                    style={{ 
                        width: 300, 
                        height: 50, 
                        backgroundColor: 'white', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        marginTop: 10,
                        borderRadius: 25,
                        borderColor: 'black',
                        borderWidth: 5
                    }}
                    onPress={() => {
                        const wheel = this.props.navigation.getParam('wheel');
                        const index = this.props.navigation.getParam('index');

                        wheel.items.splice(index, 1);

                        DeviceStorage.saveWheel(wheel);

                        this.props.navigation.navigate('Wheel', wheel);
                    }}>
                    <Text>Delete</Text>
                </TouchableOpacity>
                <View style= {{flex: 1, flexDirection: 'row', height: 50, marginTop: 10}}>
                    <View style={{flex: 1, marginLeft: 10, marginRight: 5}}>
                        <Button onPress={() => {this.props.navigation.goBack()}} title="Cancel"></Button>
                    </View>
                    <View style={{flex: 1, marginLeft: 5, marginRight: 10}}>
                        <Button onPress={() => {
                            const wheel = this.props.navigation.getParam('wheel');
                            const index = this.props.navigation.getParam('index');

                            const item: WheelItem = Object.assign({}, this.state);
                            
                            if (item.color !== '') {
                                item.customColor = true;
                            }

                            if(wheel.items.length === index) {
                                wheel.items.push(item);
                            } else {
                                wheel.items.splice(index, 1, item);
                            }

                            DeviceStorage.saveWheel(wheel);

                            this.props.navigation.navigate('Wheel', wheel);
                        }} title="Done"></Button>
                    </View>
                </View>
            </View>
        )
    }
}
