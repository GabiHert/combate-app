import { v4 } from "uuid";
import { BluetoothApp } from "../../../src/cmd/bluetoothapp/bluetooth-app";
import { BluetoothErrorType } from "../../../src/internal/core/error/error-type";
import { BluetoothMock } from "../../mock/bluetooth-mock";
import { LoggerMock } from "../../mock/logger-mock";

describe("bluetooth app test", () => {
  let loggerMocked = new LoggerMock();
  let bluetoothMocked = new BluetoothMock();
  let bluetoothApp = new BluetoothApp(loggerMocked, bluetoothMocked);
  let errorMessage: string;
  beforeEach(() => {
    loggerMocked.clear();
    bluetoothMocked.clear();
    errorMessage = v4();
  });
  it("should init bluetooth with success", async () => {
    await bluetoothApp.init();
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(bluetoothMocked.isBluetoothAvailableCalled).toBe(1);
    expect(bluetoothMocked.isBluetoothEnabledCalled).toBe(1);
  });

  it("should return an error trying to init bluetooth when bluetooth returns an error", async () => {
    bluetoothMocked.isBluetoothEnabledError = errorMessage;
    await expect(async () => bluetoothApp.init()).rejects.toThrow(
      new BluetoothErrorType(errorMessage)
    );
    expect(loggerMocked.infoCalled).toBe(1);
    expect(loggerMocked.errorCalled).toBe(1);
    expect(bluetoothMocked.isBluetoothAvailableCalled).toBe(1);
    expect(bluetoothMocked.isBluetoothEnabledCalled).toBe(0);
  });

  it("should return an empty list when getBondedDevices gets no device", async () => {
    const result = await bluetoothApp.getBondedDevices();
    expect(result).toEqual([]);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(bluetoothMocked.getBondedDevicesCalled).toBe(1);
  });

  it("should throw an error when getBondedDevices catches an error", async () => {
    bluetoothMocked.getBondedDevicesError = errorMessage;
    await expect(async () => bluetoothApp.getBondedDevices()).rejects.toThrow(
      new BluetoothErrorType(errorMessage)
    );
    expect(loggerMocked.infoCalled).toBe(1);
    expect(loggerMocked.errorCalled).toBe(1);
    expect(bluetoothMocked.getBondedDevicesCalled).toBe(1);
  });

  //todo: there are tests missing
});

export {};
