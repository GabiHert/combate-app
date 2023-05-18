import RNBluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';
import { CONSTANTS } from '../../config/config';
import { BluetoothErrorType } from '../../core/error/error-type';
import { PBluetooth } from '../../core/port/bluetooth-port';
import { PLogger } from '../../core/port/logger-port';

export class ABluetooth implements PBluetooth {
  private _device: BluetoothDevice;
  constructor(private readonly _logger: PLogger) {}

  private async _checkPermissions(): Promise<void> {
    // this._logger.info({ event: 'ABluetooth.checkPermissions', details: 'Process started' });
    // const hasPermission = await PermissionsAndroid.check(
    //   PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
    // );
    // if (!hasPermission) {
    //   const granted = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    //     {
    //       title: 'Permissão acesso bluetooth',
    //       message: 'é necessario acesso ao bluetooth para conexão ao CB.',
    //       buttonNeutral: 's',
    //       buttonNegative: 'Cancelar',
    //       buttonPositive: 'OK',
    //     }
    //   );
    //   if (granted != PermissionsAndroid.RESULTS.GRANTED) {
    //     this._logger.warn({
    //       event: 'ABluetooth.checkPermissions',
    //       details: 'Process warn - permission not granted',
    //     });
    //     //throw new BluetoothErrorType(CONSTANTS.ERRORS.A_BLUETOOTH.PERMISSIONS_DENIED);
    //   }
    // }
    // this._logger.info({ event: 'ABluetooth.checkPermissions', details: 'Process finished' });
  }

  async isBluetoothAvailable(): Promise<void> {
    try {
      this._logger.info({
        event: 'BluetoothApp.isBluetoothAvailable',
        details: 'Process started',
      });

      await this._checkPermissions();
      const result = await RNBluetoothClassic.isBluetoothAvailable();
      if (!result) {
        this._logger.warn({
          event: 'BluetoothApp.isBluetoothAvailable',
          details: 'Process warn - not available',
        });
        throw new BluetoothErrorType(CONSTANTS.ERRORS.A_BLUETOOTH.NOT_AVAILABLE);
      }
      this._logger.info({
        event: 'BluetoothApp.isBluetoothAvailable',
        details: 'Process finished',
      });
    } catch (err) {
      this._logger.error({
        event: 'BluetoothApp.isBluetoothAvailable',
        details: 'Process error',
        error: err.message,
      });

      throw err;
    }
  }
  async isBluetoothEnabled(): Promise<void> {
    try {
      this._logger.info({
        event: 'BluetoothApp.isBluetoothEnabled',
        details: 'Process started',
      });

      await this._checkPermissions();
      const result = await RNBluetoothClassic.isBluetoothAvailable();

      if (!result) {
        this._logger.warn({
          event: 'BluetoothApp.isBluetoothEnabled',
          details: 'Process warn - not enabled',
        });
        throw new BluetoothErrorType(CONSTANTS.ERRORS.A_BLUETOOTH.NOT_ENABLED);
      }

      this._logger.info({
        event: 'BluetoothApp.isBluetoothEnabled',
        details: 'Process finished',
      });
    } catch (err) {
      this._logger.error({
        event: 'BluetoothApp.isBluetoothEnabled',
        details: 'Process error',
        error: err.message,
      });

      throw err;
    }
  }

  async getBondedDevices(): Promise<BluetoothDevice[]> {
    try {
      this._logger.info({
        event: 'BluetoothApp.getConnectedDevices',
        details: 'Process started',
      });
      await this._checkPermissions();
      const devices = await RNBluetoothClassic.getBondedDevices();
      this._logger.info({
        event: 'BluetoothApp.getConnectedDevices',
        details: 'Process finished',
        devices,
      });
      return devices;
    } catch (err) {
      this._logger.error({
        event: 'BluetoothApp.getConnectedDevices',
        details: 'Process error',
        error: err.message,
      });

      throw err;
    }
  }
  async read(timeoutMs: number): Promise<string> {
    try {
      this._logger.info({
        event: 'BluetoothApp.read',
        details: 'Process started',
      });

      await this._checkPermissions();

      if (!this._device) {
        this._logger.warn({
          event: 'BluetoothApp.read',
          details: 'Process warn - device not selected',
        });
        throw new BluetoothErrorType(CONSTANTS.ERRORS.A_BLUETOOTH.DEVICE_NOT_SELECTED);
      }
      let message: string = undefined;

      const isConnected = await this._device.isConnected();
      const dataAvailable = await this._device.available();

      if (isConnected && dataAvailable) {
        this._logger.info({
          event: 'BluetoothApp.read',
          details: 'data available',
        });

        const end = new Date();
        end.setMilliseconds(new Date().getMilliseconds() + timeoutMs);
        while (new Date().getTime() <= end.getTime() && !message) {
          const data = await this._device.read();
          message = data.toString();
        }
        if (!message) {
          this._logger.warn({
            event: 'BluetoothApp.read',
            details: 'Process warn - device not selected',
          });
          throw new BluetoothErrorType(CONSTANTS.ERRORS.A_BLUETOOTH.READ_TIMEOUT);
        }
      }

      this._logger.info({
        event: 'BluetoothApp.read',
        details: 'Process finished',
        message,
      });

      return message;
    } catch (err) {
      this._logger.error({
        event: 'BluetoothApp.read',
        details: 'Process error',
        error: err.message,
      });

      throw err;
    }
  }
  async write(data: string): Promise<void> {
    try {
      this._logger.info({
        event: 'BluetoothApp.write',
        details: 'Process started',
      });

      await this._checkPermissions();

      const isConnected = await this._device.isConnected();

      if (isConnected) {
        this._logger.info({
          event: 'BluetoothApp.write',
          details: 'data is about to be written',
        });

        let count = 0;
        do {
          const result = await this._device.write(data, 'ascii');
          if (result) break;
          count++;
        } while (count < CONSTANTS.APPLICATION.BLUETOOTH_WRITE_RETRIES);

        if (count) {
          this._logger.warn({
            event: 'BluetoothApp.write',
            details: CONSTANTS.APPLICATION.BLUETOOTH_WRITE_RETRIES.toString() + ' attempts failed',
          });
          throw new BluetoothErrorType(CONSTANTS.ERRORS.A_BLUETOOTH.WRITE_5_ATTEMPTS_FAILED);
        }
      }

      this._logger.info({
        event: 'BluetoothApp.write',
        details: 'Process finished',
      });
    } catch (err) {
      this._logger.error({
        event: 'BluetoothApp.write',
        details: 'Process error',
        error: err.message,
      });

      throw err;
    }
  }
  async setDevice(device: BluetoothDevice): Promise<void> {
    try {
      this._logger.info({
        event: 'BluetoothApp.selectDevice',
        details: 'Process started',
      });
      await this._checkPermissions();

      const isConnected = await device.isConnected();
      if (!isConnected) {
        this._logger.warn({
          event: 'BluetoothApp.selectDevice',
          details: 'device is not connected',
        });
        const result = await device.connect().catch(() => {
          this._logger.warn({
            event: 'BluetoothApp.selectDevice',
            details: 'device could not be connected',
          });
          throw new BluetoothErrorType(CONSTANTS.ERRORS.A_BLUETOOTH.SELECTED_DEVICE_NOT_CONNECTED);
        });

        if (!result) {
          this._logger.warn({
            event: 'BluetoothApp.selectDevice',
            details: 'device could not be connected',
          });
          throw new BluetoothErrorType(CONSTANTS.ERRORS.A_BLUETOOTH.SELECTED_DEVICE_NOT_CONNECTED);
        }
      }

      this._device = device;
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
