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
  readCalled: number;
  readResult: () => string;
  readDelay: number;
  writeCalled: number;
  writeDelay: number;

  clear(): void {
    this.isBluetoothAvailableCalled = 0;
    this.isBluetoothEnabledCalled = 0;
    this.isBluetoothEnabledError = undefined;
    this.getBondedDevicesCalled = 0;
    this.getBondedDevicesError = undefined;
    this.setDeviceCalled = 0;
    this.setDeviceError = undefined;
    this.readCalled = 0;
    this.readResult = () => '';
    this.readDelay = 0;
    this.writeCalled = 0;
    this.writeDelay = 0;
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
  async read(): Promise<string> {
    this.readCalled++;
    await new Promise((resolve) => setTimeout(resolve, this.readDelay));
    return this.readResult();
  }
  async write(data: string): Promise<void> {
    this.writeCalled++;
    await new Promise((resolve) => setTimeout(resolve, this.writeDelay));
  }
  async setDevice(device): Promise<void> {
    this.setDeviceCalled++;
    if (this.setDeviceError) throw new BluetoothErrorType(this.setDeviceError);
  }
}
