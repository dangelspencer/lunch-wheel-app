import * as _ from 'lodash';
import {AsyncStorage} from 'react-native';
import { Wheel } from '../models/wheel';

const key = 'WHEELS';

export class DeviceStorage {
    static async saveWheel(wheel: Wheel) {
        let wheels: Wheel[] = await this.loadAllWheels();
        
        if (wheels == null) {
            wheels = [];
        }

        const storedWheelIndex = _.findIndex(wheels, storedWheel => {
            return storedWheel.id === wheel.id;
        });

        if (storedWheelIndex === -1) {
            wheels.push(wheel);
        } else {
            wheels.splice(storedWheelIndex, 1, wheel);
        }

        await this.saveWheels(wheels);
    }

    static async saveWheels(wheels: Wheel[]) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(wheels));
        } catch (err) {
            console.log(`Failed to save wheels.\n${err}`);
        }
    }

    static async loadAllWheels() {
        try {
            const wheelsJson = await AsyncStorage.getItem(key);
            if (wheelsJson !== null) {
                return JSON.parse(wheelsJson);
            }
            return null;
        } catch (err) {
            console.log(`Failed to load wheels.\n${err}`);
            return null;
        }
    }

    static async deleteWheel(wheelId: String) {
        let wheels: Wheel[] = await this.loadAllWheels();
        
        if (wheels == null) {
            wheels = [];
        }

        const storedWheelIndex = _.findIndex(wheels, storedWheel => {
            return storedWheel.id === wheelId;
        });

        if (storedWheelIndex !== -1) {
            wheels.splice(storedWheelIndex, 1);
        }

        await this.saveWheels(wheels);
    }
}