import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';
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
            wheels: [
                {
                    name: 'Test Wheel 1',
                    items: [
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
                    ]
                }, {
                    name: 'Test Wheel 2',
                    items: [
                        {
                            id: '',
                            name: 'Skyline',
                            weight: 1,
                            color: 'red'
                        }, {
                            id: '',
                            name: 'Chipotle',
                            weight: 1,
                            color: 'blue'
                        }, {
                            id: '',
                            name: 'Basil Thai',
                            weight: 1,
                            color: 'green'
                        }, {
                            id: '',
                            name: 'Smashburger',
                            weight: 1,
                            color: 'grey'
                        }, {
                            id: '',
                            name: 'Dibella\'s',
                            weight: 1,
                            color: 'white'
                        }, {
                            id: '',
                            name: 'Buffalo Wild Wings',
                            weight: 1,
                            color: 'yellow'
                        }
                    ]
                }, {
                    name: 'Big Wheel',
                    items: [
                        { id: '', color: '', name: "Basil Thai", weight: 4 },
                        { id: '', color: '', name: "Skyline", weight: 5 },
                        { id: '', color: '', name: "Qdoba", weight: 3 },
                        { id: '', color: '', name: "Mio's", weight: 4 },
                        { id: '', color: '', name: "El Vaquero", weight: 2 },
                        { id: '', color: '', name: "Dibella's", weight: 3 },
                        { id: '', color: '', name: "Brickhouse", weight: 1 },
                        { id: '', color: '', name: "B Dubs", weight: 2 },
                        { id: '', color: '', name: "Chipolte", weight: 2 },
                        { id: '', color: '', name: "City Barbecue", weight: 3 },
                        { id: '', color: '', name: "DeSha's", weight: 1 },
                        { id: '', color: '', name: "Silver Spring House", weight: 1 },
                        { id: '', color: '', name: "Penn Station", weight: 1 },
                        { id: '', color: '', name: "Slatts", weight: 2 },
                        { id: '', color: '', name: "Montgomery Towne Tavern", weight: 2 },
                        { id: '', color: '', name: "Firehouse", weight: 1 },
                        { id: '', color: '', name: "Marion's", weight: 2 },
                        { id: '', color: '', name: "LaRosa's", weight: 1 },
                        { id: '', color: '', name: "Envision", weight: 1 },
                        { id: '', color: '', name: "Korea House", weight: 1 },
                        { id: '', color: '', name: "Dolsot", weight: 1 },
                        { id: '', color: '', name: "Blue Goose", weight: 2 }
                    ]
                }
            ]
        };
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home</Text>
                <FlatList
                    data={this.state.wheels}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={(i: any) => <Text onPress={() => this.props.navigation.navigate('Wheel', {wheel: i.item})}>{i.item.name}</Text>}
                />
            </View>
        );
    }
}