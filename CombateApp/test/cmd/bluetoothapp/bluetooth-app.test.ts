import { v4 } from 'uuid';
import { BluetoothApp } from '../../../src/cmd/bluetoothapp/bluetooth-app';
import { BluetoothErrorType } from '../../../src/internal/core/error/error-type';
import { logger, PLogger } from '../../../src/internal/core/port/logger-port';
import { BluetoothMock } from '../../mock/bluetooth-mock';
import { LoggerMock } from '../../mock/logger-mock';

describe('bluetooth app test', () => {
  let loggerMocked = new LoggerMock();
  let bluetoothMocked = new BluetoothMock();
  let bluetoothApp = new BluetoothApp(loggerMocked, bluetoothMocked);
  let errorMessage: string;
  beforeEach(() => {
    loggerMocked.clear();
    bluetoothMocked.clear();
    errorMessage = v4();
  });
  it('should init bluetooth with success', async () => {
    await bluetoothApp.init();
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(bluetoothMocked.isBluetoothAvailableCalled).toBe(1);
    expect(bluetoothMocked.isBluetoothEnabledCalled).toBe(1);
  });

  it('should return an error trying to init bluetooth when bluetooth returns an error', async () => {
    bluetoothMocked.isBluetoothEnabledError = errorMessage;
    await expect(async () => bluetoothApp.init()).rejects.toThrow(
      new BluetoothErrorType(errorMessage)
    );
    expect(loggerMocked.infoCalled).toBe(1);
    expect(loggerMocked.errorCalled).toBe(1);
    expect(bluetoothMocked.isBluetoothAvailableCalled).toBe(1);
    expect(bluetoothMocked.isBluetoothEnabledCalled).toBe(0);
  });

  it('should getBondedDevices with success', async () => {
    const device = {
      name: v4(),
      address: v4(),
      id: v4(),
      rssi: undefined,
      extra: undefined,
    };
    bluetoothMocked.getBondedDevicesReturn = device;
    const result = await bluetoothApp.getBondedDevices();
    expect(result).toBe([{ id: device.id, name: device.name }]);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(bluetoothMocked.getBondedDevicesCalled).toBe(1);
  });
});

export {};
