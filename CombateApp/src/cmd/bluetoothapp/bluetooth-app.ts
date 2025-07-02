import { Alert, Linking } from "react-native";
import { BluetoothDevice } from "react-native-bluetooth-classic";
import { CONSTANTS } from "../../internal/config/config";
import { BluetoothErrorType } from "../../internal/core/error/error-type";
import { PBluetooth } from "../../internal/core/port/bluetooth-port";
import { PLogger } from "../../internal/core/port/logger-port";
import { IItem } from "../../internal/interface/item";
import { PBluetoothApp } from "../port/bluetooth-app-port";
import { IPermissionService } from "../port/permission-services-port";

export class BluetoothApp implements PBluetoothApp {
  private _devices: Array<BluetoothDevice>;
  private _deviceId: string;
  constructor(
    private readonly _logger: PLogger,
    private readonly _bluetooth: PBluetooth,
    private readonly _permissionService: IPermissionService
  ) {}

  async init(): Promise<void> {
    try {
      this._logger.info({
        event: "BluetoothApp.init",
        details: "Process started",
      });
      const granted =
        await this._permissionService.requestBluetoothPermissions();

      this._devices = await this._bluetooth.getBondedDevices();

      if (!granted) {
        Alert.alert(
          "Permissão necessária",
          "Você negou permanentemente a permissão de escanear dispositivos Bluetooth ou da localização. Vá até as configurações do app e ative manualmente.",
          [
            {
              text: "Abrir configurações",
              onPress: () => Linking.openSettings(),
            },
            { text: "Cancelar", style: "cancel" },
          ]
        );
      }

      this._logger.info({
        event: "BluetoothApp.init",
        details: "Process finished",
      });
    } catch (err) {
      this._logger.error({
        event: "BluetoothApp.init",
        details: "Process error",
        error: err.message,
      });
      throw err;
    }
  }
  async getBondedDevices(): Promise<Array<IItem>> {
    try {
      this._logger.info({
        event: "BluetoothApp.getConnectedDevices",
        details: "Process started",
      });
      this._devices = await this._bluetooth.getBondedDevices();

      let items: Array<IItem> = [];
      this._devices.forEach((device) => {
        items.push({ id: device.id || device.address, name: device.name });
      });

      this._logger.info({
        event: "BluetoothApp.getConnectedDevices",
        details: "Process finished",
        items,
      });
      return items;
    } catch (err) {
      this._logger.error({
        event: "BluetoothApp.getConnectedDevices",
        details: "Process error",
        error: err.message,
      });

      throw err;
    }
  }

  async selectDevice(deviceId: string): Promise<void> {
    try {
      this._logger.info({
        event: "BluetoothApp.selectDevice",
        details: "Process started",
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
          event: "BluetoothApp.selectDevice",
          details: "Process warn",
          warn: "Empty device list",
        });
        throw new BluetoothErrorType(
          CONSTANTS.ERRORS.BLUETOOTH_APP.EMPTY_DEVICE_LIST
        );
      }

      if (selectedDevice) {
        //@ts-ignore
        await this._bluetooth.setDevice(selectedDevice);
      } else {
        this._logger.warn({
          event: "BluetoothApp.selectDevice",
          details: "Process warn",
          warn: "No selected device",
        });
        throw new BluetoothErrorType(
          CONSTANTS.ERRORS.BLUETOOTH_APP.DEVICE_NOT_AVAILABLE
        );
      }
      this._logger.info({
        event: "BluetoothApp.selectDevice",
        details: "Process finished",
      });
    } catch (err) {
      this._logger.error({
        event: "BluetoothApp.selectDevice",
        details: "Process error",
        error: err.message,
      });

      throw err;
    }
  }

  get deviceId() {
    return this._deviceId;
  }

  async discoverUnpairedDevices(): Promise<Array<IItem>> {
    try {
      this._logger.info({
        event: "BluetoothApp.discoverUnpairedDevices",
        details: "Process started",
      });

      const devices = await this._bluetooth.discoverUnpairedDevices();
      const items: Array<IItem> = devices.map((device) => ({
        id: device.id,
        name: device.name,
      }));

      this._logger.info({
        event: "BluetoothApp.discoverUnpairedDevices",
        details: "Process finished",
        items,
      });

      return items;
    } catch (err) {
      this._logger.error({
        event: "BluetoothApp.discoverUnpairedDevices",
        details: "Process error",
        error: err.message,
      });
      throw err;
    }
  }

  async pairDevice(deviceId: string): Promise<void> {
    try {
      this._logger.info({
        event: "BluetoothApp.pairDevice",
        details: "Process started",
        deviceId,
      });

      if (!this._devices || this._devices.length === 0) {
        // Atualiza a lista de dispositivos pareados primeiro
        this._devices = await this._bluetooth.getBondedDevices();
      }
      const deviceToPair = this._devices.find(
        (device) => device.id === deviceId || device.address === deviceId
      );

      if (!deviceToPair) {
        this._logger.warn({
          event: "BluetoothApp.pairDevice",
          details:
            "Device not found in bonded list. Trying to discover unpaired devices...",
        });

        // Aqui você pode usar outro método para descobrir dispositivos não pareados (se implementado)
        const unpairedDevices =
          await this._bluetooth.discoverUnpairedDevices?.();
        const device = unpairedDevices?.find((d) => d.id === deviceId);

        if (!device) {
          throw new BluetoothErrorType(
            CONSTANTS.ERRORS.BLUETOOTH_APP.DEVICE_NOT_AVAILABLE
          );
        }

        await this._bluetooth.pairDevice(device.id);
      } else {
        this._logger.info({
          event: "BluetoothApp.pairDevice",
          details: "Device already bonded",
        });
      }

      this._logger.info({
        event: "BluetoothApp.pairDevice",
        details: "Process finished",
      });
    } catch (err) {
      this._logger.error({
        event: "BluetoothApp.pairDevice",
        details: "Process error",
        error: err.message,
      });

      throw err;
    }
  }
}
