import RNBluetoothClassic, {
  BluetoothDevice,
} from "react-native-bluetooth-classic";
import { Instance } from "../../../../view/app/instance/instance";
import { CONSTANTS } from "../../config/config";
import { BluetoothErrorType } from "../../core/error/error-type";
import { PBluetooth } from "../../core/port/bluetooth-port";
import { PLogger } from "../../core/port/logger-port";
import { timeout } from "../../core/utils/timeout";

export class ABluetooth implements PBluetooth {
  private _device: BluetoothDevice;

  constructor(private readonly _logger: PLogger) {}

  private async _healthCheck(): Promise<void> {
    if (!this._device) {
      const devices = await this.getBondedDevices();
      for (let i = 0; i < devices.length; i++) {
        if (devices[i].id == Instance.GetInstance().getConnectedDeviceId()) {
          this._device = devices[i];
          if (!this._device.isConnected()) await this._device.connect();
          return;
        }
      }
      throw new BluetoothErrorType(
        CONSTANTS.ERRORS.A_BLUETOOTH.DEVICE_NOT_SELECTED
      );
    }
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
        event: "ABluetooth.isBluetoothAvailable",
        details: "Process started",
      });

      const result = await RNBluetoothClassic.isBluetoothAvailable();
      if (!result) {
        this._logger.warn({
          event: "ABluetooth.isBluetoothAvailable",
          details: "Process warn - not available",
        });
        throw new BluetoothErrorType(
          CONSTANTS.ERRORS.A_BLUETOOTH.NOT_AVAILABLE
        );
      }
      this._logger.info({
        event: "ABluetooth.isBluetoothAvailable",
        details: "Process finished",
      });
    } catch (err) {
      this._logger.error({
        event: "ABluetooth.isBluetoothAvailable",
        details: "Process error",
        error: err.message,
      });

      throw err;
    }
  }

  async isBluetoothEnabled(): Promise<void> {
    try {
      this._logger.info({
        event: "ABluetooth.isBluetoothEnabled",
        details: "Process started",
      });

      const result = await RNBluetoothClassic.isBluetoothAvailable();

      if (!result) {
        this._logger.warn({
          event: "ABluetooth.isBluetoothEnabled",
          details: "Process warn - not enabled",
        });
        throw new BluetoothErrorType(CONSTANTS.ERRORS.A_BLUETOOTH.NOT_ENABLED);
      }

      this._logger.info({
        event: "ABluetooth.isBluetoothEnabled",
        details: "Process finished",
      });
    } catch (err) {
      this._logger.error({
        event: "ABluetooth.isBluetoothEnabled",
        details: "Process error",
        error: err.message,
      });

      throw err;
    }
  }

  async getBondedDevices(): Promise<BluetoothDevice[]> {
    try {
      this._logger.info({
        event: "ABluetooth.getConnectedDevices",
        details: "Process started",
      });
      const devices = await RNBluetoothClassic.getBondedDevices();
      this._logger.info({
        event: "ABluetooth.getConnectedDevices",
        details: "Process finished",
        devices,
      });
      return devices;
    } catch (err) {
      this._logger.error({
        event: "ABluetooth.getConnectedDevices",
        details: "Process error",
        error: err.message,
      });

      throw err;
    }
  }

  async read(timeoutMs: number): Promise<string> {
    try {
      this._logger.info({
        event: "ABluetooth.read",
        details: "Process started",
        timeoutMs,
      });

      await this._healthCheck();

      if (!this._device) {
        this._logger.warn({
          event: "ABluetooth.read",
          details: "Process warn - device not selected",
        });
        throw new BluetoothErrorType(
          CONSTANTS.ERRORS.A_BLUETOOTH.DEVICE_NOT_SELECTED
        );
      }

      const isConnected = await this._device.isConnected();

      if (!isConnected) {
        this._logger.warn({
          event: "ABluetooth.read",
          details: "Process warn - device not selected",
        });
        throw new BluetoothErrorType(
          CONSTANTS.ERRORS.A_BLUETOOTH.SELECTED_DEVICE_NOT_CONNECTED
        );
      }

      const getMessage = async () => {
        let str = undefined;
        while (!str) {
          let dataAvailable = await this._device.available();
          while (!dataAvailable) dataAvailable = await this._device.available();
          const data = await this._device.read();
          if (data) {
            const aux = data.toString();
            let dataStr = "";
            for (let i = 0; i < aux.length; i++) {
              if (aux.charCodeAt(i) != 45) {
                dataStr += aux[i];
              }
            }
            if (dataStr) {
              str = dataStr;
            }
          }
        }
        return str;
      };

      const message = await timeout(
        timeoutMs,
        getMessage(),
        new BluetoothErrorType(CONSTANTS.ERRORS.A_BLUETOOTH.READ_TIMEOUT)
      );

      this._logger.info({
        event: "ABluetooth.read",
        details: "Process finished",
        message: message,
      });
      return message;
    } catch (err) {
      this._logger.error({
        event: "ABluetooth.read",
        details: "Process error",
        error: err.message,
      });

      throw err;
    }
  }

  async write(data: string): Promise<void> {
    try {
      this._logger.info({
        event: "ABluetooth.write",
        details: "Process started",
      });

      await this._healthCheck();

      if (!this._device) {
        this._logger.warn({
          event: "ABluetooth.write",
          details: "Process warn - device not selected",
        });
        throw new BluetoothErrorType(
          CONSTANTS.ERRORS.A_BLUETOOTH.DEVICE_NOT_SELECTED
        );
      }

      const isConnected = await this._device.isConnected();

      if (isConnected) {
        this._logger.info({
          event: "ABluetooth.write",
          details: "data is about to be written",
        });

        let count = 0;
        do {
          const result = await this._device.write(data, "ascii");

          if (result) break;
          count++;
        } while (count < CONSTANTS.APPLICATION.BLUETOOTH_WRITE_RETRIES);

        if (count) {
          this._logger.warn({
            event: "ABluetooth.write",
            details:
              CONSTANTS.APPLICATION.BLUETOOTH_WRITE_RETRIES.toString() +
              " attempts failed",
          });
          throw new BluetoothErrorType(
            CONSTANTS.ERRORS.A_BLUETOOTH.WRITE_5_ATTEMPTS_FAILED
          );
        }
      }

      this._logger.info({
        event: "ABluetooth.write",
        details: "Process finished",
      });
    } catch (err) {
      this._logger.error({
        event: "ABluetooth.write",
        details: "Process error",
        error: err.message,
      });

      throw err;
    }
  }

  async setDevice(device: BluetoothDevice): Promise<void> {
    try {
      this._logger.info({
        event: "ABluetooth.selectDevice",
        details: "Process started",
      });

      const isConnected = await device.isConnected();
      if (!isConnected) {
        this._logger.warn({
          event: "ABluetooth.selectDevice",
          details: "device is not connected",
        });
        const result = await device.connect().catch(() => {
          this._logger.warn({
            event: "ABluetooth.selectDevice",
            details: "device could not be connected",
          });
          throw new BluetoothErrorType(
            CONSTANTS.ERRORS.A_BLUETOOTH.SELECTED_DEVICE_NOT_CONNECTED
          );
        });

        if (!result) {
          this._logger.warn({
            event: "ABluetooth.selectDevice",
            details: "device could not be connected",
          });
          throw new BluetoothErrorType(
            CONSTANTS.ERRORS.A_BLUETOOTH.SELECTED_DEVICE_NOT_CONNECTED
          );
        }
      }

      Instance.GetInstance().setConnectedDeviceId(device.id);
      this._device = device;
    } catch (err) {
      this._logger.error({
        event: "ABluetooth.selectDevice",
        details: "Process error",
        error: err.message,
      });

      throw err;
    }
  }
}
