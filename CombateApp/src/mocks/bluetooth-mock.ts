import { BluetoothDevice } from "react-native-bluetooth-classic";
import { ALogger } from "../internal/adapter/logger/logger-adapter";
import { CheckSumBuilder } from "../internal/core/builder/check-sum-builder";
import { PBluetooth } from "../internal/core/port/bluetooth-port";

export class BluetoothMock implements PBluetooth {
  getBondedDevices(): Promise<Array<BluetoothDevice>> {
    return Promise.resolve([{} as BluetoothDevice]);
  }

  isBluetoothAvailable(): Promise<void> {
    return Promise.resolve(undefined);
  }

  isBluetoothEnabled(): Promise<void> {
    return Promise.resolve(undefined);
  }

  read(timeoutMs: number): Promise<string> {
    let response = "N000111";
    const builder = new CheckSumBuilder(new ALogger(false));
    const cs = builder.build(response);
    const gps =
      ",210230,A,3855.4487,N,09446.0071,W,0.0,076.2,130495,003.8,E*69";
    response = "&5" + response + cs + gps + "\r\n";
    return Promise.resolve(response);
  }

  setDevice(device: BluetoothDevice): Promise<void> {
    return Promise.resolve(undefined);
  }

  write(data: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}
