import { bluetooth } from '../../internal/core/port/bluetooth-port';
import { logger } from '../../internal/core/port/logger-port';
import { IItem } from '../../internal/interface/item';
import { BluetoothApp } from '../bluetoothapp/bluetooth-app';

export interface PBluetoothApp {
  /**
   * checks if the device can use Bluetooth
   * @throws an error if bluetooth cannot be used.
   */
  init(): Promise<void>;

  /**
   * Lists all Bluetooth devices already paired.
   * @return An array of the available devices with their name and id
   */
  getBondedDevices(): Promise<Array<IItem>>;

  /**
   * Selects the device to communicate
   * @param deviceId device identifier
   * @throws an error if bluetooth cannot be selected.
   */
  selectDevice(deviceId: string): Promise<void>;
}

export const bluetoothApp = new BluetoothApp(logger, bluetooth);
