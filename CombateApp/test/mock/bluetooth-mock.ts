import { BluetoothErrorType } from '../../src/internal/core/error/error-type';
import { PBluetooth } from '../../src/internal/core/port/bluetooth-port';

export class BluetoothMock implements PBluetooth {
  isBluetoothEnabledCalled: number;
  isBluetoothEnabledError: string;
  isBluetoothAvailableCalled: number;
  getBondedDevicesCalled: number;
  getBondedDevicesError: string;
  setDeviceCalled: number;
  setDeviceError: string;

  clear(): void {
    this.isBluetoothAvailableCalled = 0;
    this.isBluetoothEnabledCalled = 0;
    this.isBluetoothEnabledError = undefined;
    this.getBondedDevicesCalled = 0;
    this.getBondedDevicesError = undefined;
    this.setDeviceCalled = 0;
    this.setDeviceError = undefined;
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
  async getBondedDevices() {
    this.getBondedDevicesCalled++;
    if (this.getBondedDevicesError) throw new BluetoothErrorType(this.getBondedDevicesError);

    return [];
  }
  read(): Promise<string> {
    throw new Error('Method not implemented.');
  }
  write(data: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async setDevice(device): Promise<void> {
    this.setDeviceCalled++;
    if (this.setDeviceError) throw new BluetoothErrorType(this.setDeviceError);
  }
}
