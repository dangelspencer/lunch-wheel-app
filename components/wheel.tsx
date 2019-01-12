import Canvas from 'react-native-canvas';
import React from 'react';
import {WheelItem} from '../models/wheelItem';
import {Button, Text, View} from "react-native";

interface WheelProps {
    items: WheelItem[];
    screenWidth: number;
}

interface WheelState {
    screenWidth: number;
    selectedItem?: WheelItem;
}


export class Wheel extends React.Component<WheelProps, WheelState> {
    constructor(props: WheelProps) {
        super(props);

        this.state = {
            screenWidth: this.props.screenWidth
        };
    }

    private ctx: any;
    private spinning: boolean = false;
    private startAngle: number = Math.random() * 2 * Math.PI;
    private spinTimeout: any;

    componentDidMount() {
        this.drawWheel();
    }

    handleCanvas = (canvas: any) => {
        this.ctx = canvas.getContext('2d');
    } 

    drawWheel() {
        if (this.ctx != null) {

            // get max height and width for wheel
            const height = this.state.screenWidth;
            const width = this.state.screenWidth;


            this.ctx.clearRect(0, 0, width, height);
            this.ctx.canvas.height = height;
            this.ctx.canvas.width = width;

            // configure constants for drawing
            const center = width / 2;
            const outsideRadius = width / 2 - 10;
            const insideRadius = outsideRadius / 2;
            const textRadius = outsideRadius - 75;

            let angle = this.startAngle;
            if (this.props.items) {
                let totalWeight = 0;
                for (let i = 0; i < this.props.items.length; i++) {
                    totalWeight += this.props.items[i].weight;
                }
                const weightedArc = 2 * Math.PI / totalWeight;
                const weightedDegrees = 360 / totalWeight;

                for (let i = 0; i < this.props.items.length; i++) {
                    this.props.items[i].arc = weightedArc * this.props.items[i].weight;
                    this.props.items[i].degrees = weightedDegrees * this.props.items[i].weight;
                }

                for (let i = 0; i < this.props.items.length; i++) {
                    const item = this.props.items[i];

                    if (item.arc) {
                        this.ctx.fillStyle = this.getColor(i, this.props.items.length);
                        this.ctx.beginPath();
                        this.ctx.arc((center), (center), outsideRadius, angle, angle + item.arc, false);
                        this.ctx.arc((center), (center), insideRadius, angle + item.arc, angle, true);
                        this.ctx.stroke();
                        this.ctx.fill();
                
                        this.ctx.save();
                        this.ctx.shadowOffsetX = -1;
                        this.ctx.shadowOffsetY = -1;
                        this.ctx.shadowBlur = 0;
                        this.ctx.fillStyle = "white";
                        this.ctx.translate((center) + Math.cos(angle + item.arc / 2) * textRadius, (center) + Math.sin(angle + item.arc / 2) * textRadius);
                        this.ctx.rotate(angle + item.arc / 2 - 2 * Math.PI);
                        const text = item.name;
                        this.ctx.fillText(text, -this.ctx.measureText(text).width / 2, 0);
                        this.ctx.restore();
                
                        angle += item.arc;
                    }
                }
            }
            
            // draw arrow
            this.ctx.fillStyle = "black";
            this.ctx.beginPath();
            this.ctx.moveTo((center) - 4, (center - 5) - center + 10);
            this.ctx.lineTo((center) + 4, (center - 5) - center + 10);
            this.ctx.lineTo((center) + 4, (center + 5) - center + 10);
            this.ctx.lineTo((center) + 9, (center + 5) - center + 10);
            this.ctx.lineTo((center) + 0, (center + 13) - center + 10);
            this.ctx.lineTo((center) - 9, (center + 5) - center + 10);
            this.ctx.lineTo((center) - 4, (center + 5) - center + 10);
            this.ctx.lineTo((center) - 4, (center - 5) - center + 10);
            this.ctx.fill();
        }
    }

    spin() {
        if (this.spinning) {
          return;
        }
        this.setState({
            ...this.state,
            selectedItem: undefined
        });
    
        const spinAngleStart = Math.random() * 10 + 30;
        const spinTime = 0;
        const spinTimeTotal = 1 + Math.floor((Math.random() * 10 + 1) * 1000);
        this.spinning = true;
        this.rotateWheel(spinAngleStart, spinTime, spinTimeTotal);
      }
    
      rotateWheel(spinAngleStart: number, spinTime: number, spinTimeTotal: number) {
        spinTime += 30;
        if (spinTime >= spinTimeTotal) {
          this.stopRotateWheel();
          this.spinning = false;
          return;
        }
        const spinAngle = spinAngleStart - this.easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
        this.startAngle += (spinAngle * Math.PI / 180);
        this.drawWheel();
        this.spinTimeout = setTimeout(() => { this.rotateWheel(spinAngleStart, spinTime, spinTimeTotal) }, 60);
      }
    
      stopRotateWheel() {
        clearInterval(this.spinTimeout);
        const degrees = 360 - (this.startAngle * 180 / Math.PI + 90) % 360;
    
        let currentDegree = 0;
        for (let i = 0; i <= this.props.items.length; i++) {
          currentDegree += this.props.items[i].degrees
          if (currentDegree >= degrees) {
            this.setState({
                ...this.state,
                selectedItem: this.props.items[i]
            });
            break;
          }
        }
    
        // this.ctx.save();
        // this.ctx.font = 'bold 30px sans-serif';
        // var text = restarauntName;
        // this.ctx.fillText(text, (this.center * this.sizeModifier) - this.ctx.measureText(text).width / 2, (this.center * this.sizeModifier) + 10);
        // this.ctx.restore();
      }
    
      easeOut(t: number, b: number, c: number, d: number) {
        var ts = (t /= d) * t;
        var tc = ts * t;
        return b + c * (tc + -3 * ts + 3 * t);
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
            <>
                <Canvas ref={this.handleCanvas} />
                <View style={{flex: 1, alignItems: 'center' }}>
                    <Button
                        onPress={() => {
                            this.spin();
                        }}
                        title="Spin Wheel"
                    />
                    {this.state.selectedItem != null ? <Text>Selected Item: {this.state.selectedItem.name}</Text> : <></>}
                </View>
            </>
        )
    }
}