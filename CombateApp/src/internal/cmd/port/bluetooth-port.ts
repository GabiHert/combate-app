import { IItem } from '../../interface/item';

export interface PBluetooth {
  /**
   * Starts the device`s Bluetooth.
   * @throws an error if bluetooth cannot be started.
   */
  init(): Promise<void>;

  /**
   * Lists all Bluetooth devices already paired.
   * @return An array of the available devices with their name and id
   */
  getBoundedDevices(): Promise<IItem>;

  /**
   * Connects to a device
   * @param deviceId device identifier
   * @param timeoutMs timeout in milliseconds
   * @throws an error if bluetooth cannot be connected or timeout expires.
   */
  connect(deviceId: string, timeoutMs?: number): Promise<void>;

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
}
