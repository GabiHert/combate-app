import { BluetoothDevice } from 'react-native-bluetooth-classic';
import { BluetoothErrorType } from '../../src/internal/core/error/error-type';
import { PBluetooth } from '../../src/internal/core/port/bluetooth-port';

export class BluetoothMock implements PBluetooth {
  isBluetoothEnabledCalled: number;
  isBluetoothEnabledError: string;
  isBluetoothAvailableCalled: number;
  getBondedDevicesCalled: number;
  getBondedDevicesReturn: { id: string; name: string };

  clear(): void {
    this.isBluetoothAvailableCalled = 0;
    this.isBluetoothEnabledCalled = 0;
    this.isBluetoothEnabledError = undefined;
    this.getBondedDevicesCalled = 0;
  }
  async isBluetoothAvailable(): Promise<void> {
    this.isBluetoothAvailableCalled++;
    if (this.isBluetoothEnabledError) {
      throw new BluetoothErrorType(this.isBluetoothEnabledError);
    }
  }
  async isBluetoothEnabled(): Promise<void> {
    this.isBluetoothEnabledCalled++;
  }
  async getBondedDevices(): Promise<BluetoothDevice[]> {
    this.getBondedDevicesCalled++;

    return [new BluetoothDevice({ ...this.getBondedDevicesReturn }, undefined)];
  }
  read(): Promise<string> {
    throw new Error('Method not implemented.');
  }
  write(data: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  setDevice(device: BluetoothDevice): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
