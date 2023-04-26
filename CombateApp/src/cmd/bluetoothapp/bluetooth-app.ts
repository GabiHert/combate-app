import { PermissionsAndroid } from 'react-native';
import { BluetoothDevice, BluetoothError } from 'react-native-bluetooth-classic';
import { CONSTANTS } from '../../internal/config/config';
import { BluetoothErrorType } from '../../internal/core/error/error-type';
import { PBluetooth } from '../../internal/core/port/bluetooth-port';
import { PLogger } from '../../internal/core/port/logger-port';
import { IItem } from '../../internal/interface/item';
import { PBluetoothApp } from '../port/bluetooth-app-port';

export class BluetoothApp implements PBluetoothApp {
  private _devices: Array<BluetoothDevice>;
  constructor(private readonly _logger: PLogger, private readonly _bluetooth: PBluetooth) {}

  async init(): Promise<void> {
    try {
      this._logger.info({ event: 'BluetoothApp.init', details: 'Process started' });

      await this._bluetooth.isBluetoothAvailable();
      await this._bluetooth.isBluetoothEnabled();

      this._logger.info({ event: 'BluetoothApp.init', details: 'Process finished' });
    } catch (err) {
      this._logger.info({
        event: 'BluetoothApp.init',
        details: 'Process error',
        error: err.message,
      });

      throw err;
    }
  }
  async getBondedDevices(): Promise<Array<IItem>> {
    try {
      this._logger.info({ event: 'BluetoothApp.getConnectedDevices', details: 'Process started' });
      this._devices = await this._bluetooth.getBondedDevices();
      let items: Array<IItem> = [];
      this._devices.forEach((device) => {
        items.push({ id: device.id || device.address, name: device.name });
      });

      this._logger.info({
        event: 'BluetoothApp.getConnectedDevices',
        details: 'Process finished',
        items,
      });
      return items;
    } catch (err) {
      this._logger.error({
        event: 'BluetoothApp.getConnectedDevices',
        details: 'Process error',
        error: err.message,
      });

      throw err;
    }
  }

  async selectDevice(deviceId: string): Promise<void> {
    try {
      this._logger.info({
        event: 'BluetoothApp.selectDevice',
        details: 'Process started',
        deviceId,
      });

      let selectedDevice: BluetoothDevice = undefined;
      if (this._devices) {
        this._devices.forEach((device) => {
          if (device.id === deviceId || device.address === deviceId) {
            selectedDevice = device;
          }
        });
      } else {
        this._logger.warn({
          event: 'BluetoothApp.selectDevice',
          details: 'Process warn',
          warn: 'Empty device list',
        });
        throw new BluetoothErrorType(CONSTANTS.ERRORS.BLUETOOTH_APP.EMPTY_DEVICE_LIST);
      }

      if (selectedDevice) {
        await this._bluetooth.setDevice(selectedDevice);
      } else {
        this._logger.warn({
          event: 'BluetoothApp.selectDevice',
          details: 'Process warn',
          warn: 'No selected device',
        });
        throw new BluetoothErrorType(CONSTANTS.ERRORS.BLUETOOTH_APP.DEVICE_NOT_AVAILABLE);
      }
      this._logger.info({ event: 'BluetoothApp.selectDevice', details: 'Process finished' });
    } catch (err) {
      this._logger.error({
        event: 'BluetoothApp.selectDevice',
        details: 'Process error',
        error: err.message,
      });

      throw err;
    }
  }
}
