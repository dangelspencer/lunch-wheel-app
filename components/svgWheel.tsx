import Svg, {
    Circle,
    G,
    Text,
    Path,
    Rect
} from 'react-native-svg';

import * as _ from 'lodash';
import React from 'react';
import { Button, View, StyleSheet, Text as RNText } from 'react-native';

export class SVGWheel extends React.Component<{}, { degrees: number, spinning: boolean, spinSpeed: number, items: any[], selectedItem?: any }> {
    constructor(props: any) {
        super(props);

        const items = [
            {
                name: 'Skyline',
                weight: 1,
                color: 'green',
                startDegree: 0,
                endDegree: 0,
                textX: 0,
                textY: 0
            }, {
                name: 'Chipotle',
                weight: 1,
                color: 'blue',
                startDegree: 0,
                endDegree: 0,
                textX: 0,
                textY: 0
            }, {
                name: 'Basil Thai',
                weight: 1,
                color: 'yellow',
                startDegree: 0,
                endDegree: 0,
                textX: 0,
                textY: 0
            }, {
                name: 'Smashburger',
                weight: 1,
                color: 'red',
                startDegree: 0,
                endDegree: 0,
                textX: 0,
                textY: 0
            }, {
                name: 'DiBella\'s',
                weight: 1,
                color: 'purple',
                startDegree: 0,
                endDegree: 0,
                textX: 0,
                textY: 0
            }, {
                name: 'Buffalo Wild Wings',
                weight: 1,
                color: 'gray',
                startDegree: 0,
                endDegree: 0,
                textX: 0,
                textY: 0
            }
        ];

        const totalWeight = _.sumBy(items, 'weight');

        this.weightedDegrees = 360 / totalWeight;
        let startDegree = 0;

        _.each(items, item => {
            item.startDegree = startDegree;
            item.endDegree = item.startDegree + (item.weight * this.weightedDegrees);
            startDegree = item.endDegree;

            const textLocation = this.polarToCartesian(0, 0, 115, item.startDegree + (item.endDegree - item.startDegree) / 2);
            item.textX = textLocation.x;
            item.textY = textLocation.y;
        });

        this.state = {
            degrees: 0,
            spinning: false,
            spinSpeed: 0,
            items: items
        };
    }

    private weightedDegrees: number = 0;

    determineItem() {
        const finalDegree = 360 - (this.state.degrees % 360);
        for (const item of this.state.items) {
            if (finalDegree > item.startDegree && finalDegree <= item.endDegree) {
                this.setState({
                    ...this.state,
                    selectedItem: item,
                    degrees: this.state.degrees % 360
                });
            }
        }
    }

    polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
        var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
        var start = this.polarToCartesian(x, y, radius, endAngle);
        var end = this.polarToCartesian(x, y, radius, startAngle);

        var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        var d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
            'L', 0, 0
        ].join(" ");

        return d;
    }

    spin() {
        if (this.state.spinning) {
            return;
        }

        const speed = Math.floor(Math.random() * 60 + 30);
        this.setState({
            ...this.state,
            degrees: this.state.degrees + speed,
            spinning: true,
            spinSpeed: speed,
            selectedItem: undefined
        });

        let interval = setInterval(() => {
            if (this.state.spinSpeed < 0.1) {
                this.setState({
                    ...this.state,
                    spinning: false,
                    spinSpeed: 0
                });

                clearInterval(interval);
                this.determineItem();
            }

            const newSpeed = this.state.spinSpeed - (this.state.spinSpeed * 0.02);
            const newDegrees = this.state.degrees + newSpeed
            this.setState({
                ...this.state,
                degrees: newDegrees,
                spinSpeed: newSpeed
            });
        }, 30);
    }

    render() {
        return (
            <View
                style={[
                    StyleSheet.absoluteFill,
                    { alignItems: 'center' },
                ]}>
                <Svg height={410} width={410} viewBox="-205 -205 410 410">
                    <G transform={`rotate(${this.state.degrees}, 0, 0)`}>
                        {this.state.items.map((element, index) =>
                            <G 
                                key={index}>
                                <Path
                                    d={this.describeArc(0, 0, 200, element.startDegree, element.endDegree)} fill={element.color}
                                    stroke="black"
                                    strokeWidth="2.5"
                                ></Path>
                                <Text
                                    x={element.textX}
                                    y={element.textY}
                                    fill="black"
                                    transform={`rotate(${(element.startDegree + (element.endDegree - element.startDegree) / 2) - 90}, ${element.textX}, ${element.textY})`}
                                >{element.name}</Text>
                            </G>
                        )}

                        <Circle
                            cx="0"
                            cy="0"
                            r="110"
                            stroke="black"
                            strokeWidth="2.5"
                            fill="white"
                        />
                    </G>

                    <Rect
                        x="-3"
                        y="-205"
                        width="7"
                        height="30"
                        fill="black"
                    />
                </Svg>
                <RNText style={{fontSize: 20, fontWeight: 'bold'}}>{this.state.selectedItem === undefined ? '' : this.state.selectedItem.name}</RNText>
                <Button onPress={() => this.spin()} title="Spin Wheel"></Button>
            </View>
        );
    }
}