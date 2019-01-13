import Svg, {
    Circle,
    Ellipse,
    G,
    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
} from 'react-native-svg';

import * as _ from 'lodash';
import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

export class SVGWheel extends React.Component<{}, { degrees: number, spinning: boolean, spinSpeed: number }> {

    constructor(props: any) {
        super(props);

        this.state = {
            degrees: 0,
            spinning: false,
            spinSpeed: 0
        };
    }

    private spinTimeout: any;

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
        
        const speed = 30;
        this.setState({
            ...this.state,
            degrees: this.state.degrees + speed,
            spinning: true,
            spinSpeed: speed
        });

        let interval = setInterval(() => {
            if (this.state.spinSpeed < 1) {
                this.setState({
                    ...this.state,
                    spinning: false,
                    spinSpeed: 0
                });

                clearInterval(interval);
            }

            const newSpeed = this.state.spinSpeed - (this.state.spinSpeed * 0.02);
            this.setState({
                ...this.state,
                degrees: this.state.degrees + newSpeed,
                spinSpeed: newSpeed
            });
            console.log(this.state.degrees);
        }, 30);
    }

    render() {

        const items: any[] = [
            {
                name: 'Skyline',
                weight: 1,
                color: 'green'
            }, {
                name: 'Chipotle',
                weight: 1,
                color: 'blue'
            }, {
                name: 'Basil Thai',
                weight: 1,
                color: 'yellow'
            }, {
                name: 'Smashburger',
                weight: 1,
                color: 'red'
            }
        ];

        const totalWeight = _.sumBy(items, 'weight');

        const weightedDegrees = 360 / totalWeight;
        let startDegree = 0;

        _.each(items, item => {
            item.startDegree = startDegree;
            item.endDegree = item.startDegree + (item.weight * weightedDegrees);
            startDegree = item.endDegree;
        });

        return (
            <View
                style={[
                    StyleSheet.absoluteFill,
                    { alignItems: 'center' },
                ]}>
                <Svg height={410} width={410} viewBox="-205 -205 410 410">
                    {items.map((element, index) =>
                        <Path key={index} d={this.describeArc(0, 0, 200, element.startDegree, element.endDegree)} fill={element.color} stroke="black" strokeWidth="2.5" transform={`rotate(${this.state.degrees}, 0, 0)`}></Path>
                    )}
                    <Circle
                        cx="0"
                        cy="0"
                        r="125"
                        stroke="black"
                        strokeWidth="2.5"
                        fill="white"
                        transform={`rotate(${this.state.degrees}, 0, 0)`}
                    />
                </Svg>
                <Button onPress={() => this.spin()} title="Spin Wheel"></Button>
            </View>
        );
    }
}