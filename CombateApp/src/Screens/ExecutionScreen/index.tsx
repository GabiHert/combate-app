import BottomSheet from '@gorhom/bottom-sheet';
import { Box, Button } from 'native-base';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Severity, SeverityEnum } from '../../api/core/enum/severity';
import { Config } from '../../app/config/config';
import { Theme } from '../../app/theme/theme';
import ApplicatorSelector from './components/ApplicatorSelector';
import PoisonAmountSelector from './components/PoisonAmountSelector';
import Sheet from './components/Sheet';
import StatusBar from './components/StatusBar';
import style from './style';
import { Applicator } from './types/applicator';

function ExecutionScreen(props: { navigation: any; route: any }) {
  const bottomSheetRef: React.RefObject<BottomSheet> = React.createRef();
  const snapPoints: Array<string> = ['3.5%', '20%', '52%'];
  let handleSheetChanges: any;

  const [doseAmount, setDoseAmount] = useState<number>(Config().APPLICATION.MIN_DOSES);
  const [velocity, setVelocity] = useState<number>(0);

  const [bluetoothStatus, setBluetoothStatus] = useState<Severity>(SeverityEnum.WARN);
  const [gpsStatus, setGpsStatus] = useState<Severity>(SeverityEnum.WARN);
  const [applicatorsStatus, setApplicatorsStatus] = useState<Severity>(SeverityEnum.WARN);

  const [leftApplicator, setLeftApplicator] = useState<Applicator>({
    active: false,
    available: false,
    load: 0,
  });
  const [centerApplicator, setCenterApplicator] = useState<Applicator>({
    active: false,
    available: false,
    load: 0,
  });
  const [rightApplicator, setRightApplicator] = useState<Applicator>({
    active: false,
    available: true,
    load: 0,
  });

  function onFinishButtonPress() {
    props.navigation.navigate('HomeScreen');
  }

  function onDoseButtonPress() {
    //todo: call backend
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Box height={'15%'} alignItems="center" justifyContent="center" width="100%">
        <StatusBar
          velocity={velocity}
          applicatorStatus={applicatorsStatus}
          gpsStatus={gpsStatus}
          bluetoothStatus={bluetoothStatus}
        />
      </Box>

      <Box height={'45%'}>
        <PoisonAmountSelector
          onPresetPressed={() => {}}
          onDoseAmountChange={setDoseAmount}
          doseAmount={doseAmount}
        />
      </Box>

      <Box alignItems="center" justifyContent="center" width="100%" height="20%">
        <Button
          onPress={onDoseButtonPress}
          width="60%"
          borderRadius={10}
          height="80%"
          bgColor={Theme().color.b200}
          _pressed={{ opacity: 0.8 }}
          _text={{ color: 'black' }}
        >
          Dosar
        </Button>
      </Box>

      <Box alignItems="center" justifyContent="center" width="100%" height="15%">
        <ApplicatorSelector
          leftApplicator={leftApplicator}
          centerApplicator={centerApplicator}
          rightApplicator={rightApplicator}
        />
      </Box>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleComponent={() => (
          <Box style={style.closeLineContainer}>
            <Box style={style.closeLine} />
          </Box>
        )}
        backgroundStyle={{ backgroundColor: Theme().color.b400 }}
        style={style.bottomSheet}
      >
        <Sheet onFinishPressed={onFinishButtonPress} />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

export default ExecutionScreen;
