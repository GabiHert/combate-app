import { IItem } from "native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types";
import { PBluetoothApp } from "../cmd/port/bluetooth-app-port";

export class BluetoothAppMock implements PBluetoothApp {
  getBondedDevices(): Promise<Array<IItem>> {
    return Promise.resolve([{ name: "mock", id: "mock" }]);
  }

  init(): Promise<void> {
    return Promise.resolve(undefined);
  }

  selectDevice(deviceId: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}
