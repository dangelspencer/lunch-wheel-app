import React from 'react';
import { FlatList, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationScreenProps, NavigationEvents } from 'react-navigation';
import { DeviceStorage } from '../components/deviceStorage';
import { Wheel } from '../models/wheel';

interface HomeState {
    wheels: Wheel[];
}

export class HomeScreen extends React.Component<NavigationScreenProps, HomeState> {
    static navigationOptions = {
        title: 'Wheels'
    };

    constructor(props: NavigationScreenProps) {
        super(props);

        this.state = {
            wheels: []
        };
    }

    async componentWillMount() {
        await this.loadWheels();
    }

    async componentWillReceiveProps() {
        await this.loadWheels();
    }

    async componentWillFocus() {
        await this.loadWheels();
    }

    async loadWheels() {
        const wheels = await DeviceStorage.loadAllWheels();
        if (wheels != null) {
            this.setState({
                ...this.state,
                wheels: wheels
            });
        }
    }

    render() {
        return (
            <ScrollView>
                <NavigationEvents
                    onWillFocus={() => {
                        this.loadWheels();
                    }}
                />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <FlatList
                        style={{ marginTop: 10 }}
                        data={this.state.wheels}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(i: any) =>

                            <TouchableOpacity
                                style={{
                                    width: 300,
                                    height: 50,
                                    backgroundColor: 'white',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: 10,
                                    borderRadius: 25,
                                    borderColor: 'black',
                                    borderWidth: 5
                                }}
                                onPress={() => { this.props.navigation.navigate('Wheel', { wheel: i.item }) }}>
                                <Text>{i.item.name}</Text>
                            </TouchableOpacity>}

                    />
                    <TouchableOpacity
                        style={{
                            width: 300,
                            height: 50,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 25,
                            borderColor: 'black',
                            borderWidth: 5
                        }}
                        onPress={() => { this.props.navigation.navigate('CreateWheel', {}) }}>
                        <Text>Add Wheel</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}