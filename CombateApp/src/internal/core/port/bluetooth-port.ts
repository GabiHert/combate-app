import { BluetoothDevice } from 'react-native-bluetooth-classic';
import { logger } from './logger-port';

export interface PBluetooth {
  /**
   * Checks if bluetooth is available.
   * @throws an error if bluetooth is not available in the current device.
   */
  isBluetoothAvailable(): Promise<void>;

  /**
   * Checks if bluetooth is enabled.
   * @throws an error if bluetooth is not enabled.
   */
  isBluetoothEnabled(): Promise<void>;

  /**
   * Lists all Bluetooth devices already paired.
   * @return An array of the available devices
   */
  getBondedDevices(): Promise<Array<BluetoothDevice>>;

  /**
   * Reads from the connected device
   * @return received message
   * @throws an error if data cannot be read.
   */
  read(): Promise<string>;

  /**
   * Writes to the connected device
   * @param data message to be written
   * @throws an error if data cannot be written.
   */
  write(data: string): Promise<void>;

  /**
   * Selects the device to communicate
   * @param device device to communicate
   * @throws an error if bluetooth cannot be selected.
   */
  setDevice(device: BluetoothDevice): Promise<void>;
}
