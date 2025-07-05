export interface IPermissionService {
  requestBluetoothPermissions(): Promise<boolean>;
}