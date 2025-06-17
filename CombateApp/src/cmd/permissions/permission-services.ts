import { Alert, Linking, PermissionsAndroid, Platform } from "react-native";
import { IPermissionService } from "../port/permission-services-port";

export class PermissionService implements IPermissionService {
  async requestBluetoothPermissions(): Promise<boolean> {
    if (Platform.OS !== "android") return true;

    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ]);

    if (
      granted["android.permission.BLUETOOTH_SCAN"] ===
      PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
    ) {
      Alert.alert(
        "Permissão necessária",
        "Você negou permanentemente a permissão de escanear dispositivos Bluetooth. Vá até as configurações do app e ative manualmente.",
        [
          {
            text: "Abrir configurações",
            onPress: () => Linking.openSettings(),
          },
          { text: "Cancelar", style: "cancel" },
        ]
      );
    }

    if (
      granted["android.permission.ACCESS_FINE_LOCATION"] ===
      PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
    ) {
      Alert.alert(
        "Permissão necessária",
        "Você negou permanentemente a permissão de localização do dispositivos. Vá até as configurações do app e ative manualmente.",
        [
          {
            text: "Abrir configurações",
            onPress: () => Linking.openSettings(),
          },
          { text: "Cancelar", style: "cancel" },
        ]
      );
    }

    return (
      granted["android.permission.BLUETOOTH_CONNECT"] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted["android.permission.BLUETOOTH_SCAN"] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted["android.permission.ACCESS_FINE_LOCATION"] ===
        PermissionsAndroid.RESULTS.GRANTED
    );
  }
}
