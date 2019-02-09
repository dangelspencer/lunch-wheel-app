import * as _ from 'lodash';
import React, { useImperativeMethods } from 'react';
import { Button, FlatList, Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { DeviceStorage } from '../components/deviceStorage';
import uuid from 'uuid/v4'

export interface CreateWheelScreenState {
    wheelName: string;
}

export class CreateWheelScreen extends React.Component<NavigationScreenProps, CreateWheelScreenState> {
    static navigationOptions = {
        title: 'Create Wheel'
    };

    constructor(props: NavigationScreenProps) {
        super(props);

        this.state = {
           wheelName: ''
        };
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Name</Text>
                <TextInput
                    value={this.state.wheelName}
                    style={{ fontSize: 30, width: 300, borderColor: 'black', borderWidth: 5, borderRadius: 25, textAlign: 'center' }}
                    onChangeText={(text: string) => {
                        this.setState({
                            ...this.state,
                            wheelName: text
                        })
                    }}>
                </TextInput>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ flex: 1, marginLeft: 10, marginRight: 5 }}>
                        <Button onPress={() => { this.props.navigation.goBack() }} title="Cancel"></Button>
                    </View>
                    <View style={{ flex: 1, marginLeft: 5, marginRight: 10 }}>
                        <Button onPress={() => {
                            const wheel = {
                                id: uuid(),
                                name: this.state.wheelName,
                                items: []
                            }
                            
                            DeviceStorage.saveWheel(wheel);

                            this.props.navigation.replace('Wheel', {wheel: wheel});

                        }} title="Done"></Button>
                    </View>
                </View>
            </View>
        )
    }
}
