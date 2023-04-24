import { IItem } from '../../internal/interface/item';

export interface PBluetoothApp {
  /**
   * Starts the device`s Bluetooth.
   * @throws an error if bluetooth cannot be started.
   */
  init(): Promise<void>;

  /**
   * Lists all Bluetooth devices already paired.
   * @return An array of the available devices with their name and id
   */
  getConnectedDevices(): Promise<Array<IItem>>;

  /**
   * Selects the device to communicate
   * @param deviceId device identifier
   * @throws an error if bluetooth cannot be selected.
   */
  selectDevice(deviceId: string): Promise<void>;
}
