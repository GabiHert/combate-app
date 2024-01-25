import { BluetoothDevice } from "react-native-bluetooth-classic";
import { ALogger } from "../internal/adapter/logger/logger-adapter";
import { CheckSumBuilder } from "../internal/core/builder/check-sum-builder";
import { PBluetooth } from "../internal/core/port/bluetooth-port";

export class BluetoothMock implements PBluetooth {
  private doses: string = "N";
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
    let response = this.doses + "000111";
    const builder = new CheckSumBuilder(new ALogger(false));
    const cs = builder.build(response);
    const gps =
      ",203522.00,A,5109.0262308,N,11401.8407342,W,2.504,133.4,130522,0.0,E,D*2B";
    response = "&5" + response + cs + gps + "\r\n";
    return Promise.resolve(response);
  }

  setDevice(device: BluetoothDevice): Promise<void> {
    return Promise.resolve(undefined);
  }

  write(data: string): Promise<void> {
    this.doses = data[4];
    return Promise.resolve(undefined);
  }
}
