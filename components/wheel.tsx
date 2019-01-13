import * as _ from 'lodash';
import React from 'react';
import { Button, StyleSheet, Text as RNText, View } from 'react-native';
import Svg, { Circle, G, Path, Rect, Text } from 'react-native-svg';
import {WheelItem} from '../models/wheelItem';

interface ExtendedWheelItem {
    id: string;
    name: string;
    displayName: string;
    weight: number;
    color: string;
    startDegree: number;
    endDegree: number;
    textX: number;
    textY: number;
}

interface WheelProps {
    items: WheelItem[];
    screenWidth: number;
}

interface WheelState {
    degrees: number; 
    spinning: boolean; 
    spinSpeed: number; 
    items: ExtendedWheelItem[]; 
    selectedItem?: ExtendedWheelItem; 
    weightedDegrees?: number;
    screenWidth: number;
}

export class Wheel extends React.Component<WheelProps, WheelState> {
    constructor(props: WheelProps) {
        super(props);

        this.state = {
            degrees: 0,
            spinning: false,
            spinSpeed: 0,
            items: [], 
            screenWidth: Math.floor(props.screenWidth)
        };
    }

    componentDidMount() {
        this.loadItems(this.props.items);
    }

    loadItems(items: WheelItem[]) {
        const totalWeight = _.sumBy(items, 'weight');
        const itemsWithoutColors = _.filter(items, item => {
            return item.color == null || item.color === '';
        });

        const numItemsWithoutColors = itemsWithoutColors.length;
        let currentItemWithoutColor = 0;

        const weightedDegrees = 360 / totalWeight;
        let startDegree = 0;

        const newItems: ExtendedWheelItem[] = [];

        const maxTextLength = Math.floor((this.state.screenWidth / 2 - 5) / 13);

        _.each(items, item => {
            const itemDisplayName = item.name.length < maxTextLength ? item.name : item.name.substr(0, maxTextLength - 3) + '...'; 

            const newItem: ExtendedWheelItem = {
                ...item,
                color: item.color === null ? '' : item.color,
                startDegree: 0,
                endDegree: 0,
                textX: 0, 
                textY: 0,
                displayName: itemDisplayName
            };
            newItem.startDegree = startDegree;
            newItem.endDegree = newItem.startDegree + (item.weight * weightedDegrees);
            startDegree = newItem.endDegree;

            const textLocation = this.polarToCartesian(0, 0, this.state.screenWidth * 0.12, (newItem.startDegree + (newItem.endDegree - newItem.startDegree) / 2) + 6);
            newItem.textX = textLocation.x;
            newItem.textY = textLocation.y;

            if (newItem.color === '') {
                newItem.color = this.getColor(currentItemWithoutColor, numItemsWithoutColors);
                currentItemWithoutColor++;
            }

            newItems.push(newItem);
        });

        this.setState({
            ...this.state,
            items: newItems,
            weightedDegrees: weightedDegrees,
        })
    }

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

        return [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
            'L', 0, 0
        ].join(" ");
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

    render() {
        return (
            <View
                style={[
                    StyleSheet.absoluteFill,
                    { alignItems: 'center' },

                ]}>
                <Svg 
                    height={this.state.screenWidth} 
                    width={this.state.screenWidth} 
                    viewBox={`${-(this.state.screenWidth / 2)} ${-(this.state.screenWidth / 2)} ${this.state.screenWidth} ${this.state.screenWidth}`}>
                    <G 
                        transform={`rotate(${this.state.degrees}, 0, 0)`}>
                        {this.state.items.map((element, index) =>
                            <G 
                                key={index}>
                                <Path
                                    d={this.describeArc(0, 0, (this.state.screenWidth / 2) - 5, element.startDegree, element.endDegree)} fill={element.color}
                                    stroke="black"
                                    strokeWidth="2.5"
                                ></Path>
                                <Text
                                    x={element.textX}
                                    y={element.textY}
                                    fill="black"
                                    fontWeight={'bold'}
                                    fontSize={18}
                                    transform={`rotate(${(element.startDegree + (element.endDegree - element.startDegree) / 2) - 90}, ${element.textX}, ${element.textY})`}
                                >{Math.abs(element.endDegree - element.startDegree) > 30 ? element.displayName : ''}</Text>
                            </G>
                        )}

                        <Circle
                            cx="0"
                            cy="0"
                            r={this.state.screenWidth * 0.1}
                            stroke="black"
                            strokeWidth="2.5"
                            fill="white"
                        />
                    </G>

                    <Rect
                        x="-3"
                        y={-(this.state.screenWidth / 2) - 3}
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

// 15 characters for default radius