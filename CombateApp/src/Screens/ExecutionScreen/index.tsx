import BottomSheet from '@gorhom/bottom-sheet';
import { Box, Button } from 'native-base';
import React, { memo, useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { max } from 'react-native-reanimated';
import { Severity, SeverityEnum } from '../../api/core/enum/severity';
import { ILocation } from '../../api/interface/location';
import { Config } from '../../app/config/config';
import { Theme } from '../../app/theme/theme';
import ApplicatorSelector from './components/ApplicatorSelector';
import PoisonAmountSelector from './components/PoisonAmountSelector';
import Sheet, { IApplicatorsPercentage } from './components/Sheet';
import StatusBar from './components/StatusBar';
import style from './style';
import { Applicator } from './types/applicator';

function ExecutionScreen(props: { navigation: any; route: any }) {
  const applicator: {
    center: { loadKg: number };
    right: { loadKg: number };
    left: { loadKg: number };
  } = props.route.params.applicator;

  const bottomSheetRef: React.RefObject<BottomSheet> = React.createRef();
  const snapPoints: Array<string> = ['3.5%', '20%', '52%'];
  let handleSheetChanges: any;
  const [doseAmount, setDoseAmount] = useState<number>(Config().APPLICATION.MIN_DOSES);
  const [velocity, setVelocity] = useState<number>(0);
  const [bluetoothStatus, setBluetoothStatus] = useState<Severity>(SeverityEnum.WARN);
  const [gpsStatus, setGpsStatus] = useState<Severity>(SeverityEnum.WARN);
  const [applicatorsStatus, setApplicatorsStatus] = useState<Severity>(SeverityEnum.WARN);
  const [doseInProgress, setDoseInProgress] = useState<boolean>(false);
  const [leftApplicator, setLeftApplicator] = useState<Applicator>({
    active: false,
    available: false,
    loadKg: applicator.left.loadKg || 0,
  });
  const [centerApplicator, setCenterApplicator] = useState<Applicator>({
    active: false,
    available: false,
    loadKg: applicator.center.loadKg || 0,
  });
  const [rightApplicator, setRightApplicator] = useState<Applicator>({
    active: false,
    available: true,
    loadKg: applicator.right.loadKg || 0,
  });
  const [location, setLocation] = useState<ILocation>({
    latitude: '00.00000',
    longitude: '00.00000',
  });

  const [applicatorsLoadPercentage, setApplicatorsLoadPercentage] =
    useState<IApplicatorsPercentage>({
      center: calculateApplicatorsLoadPercentage(
        Config().APPLICATION.TOTAL_LOAD_KG,
        centerApplicator.loadKg
      ),
      left: calculateApplicatorsLoadPercentage(
        Config().APPLICATION.TOTAL_LOAD_KG,
        leftApplicator.loadKg
      ),
      right: calculateApplicatorsLoadPercentage(
        Config().APPLICATION.TOTAL_LOAD_KG,
        rightApplicator.loadKg
      ),
    });

  function calculateApplicatorsLoadPercentage(maxLoad: number, currentLoadKg: number): number {
    return Math.round((currentLoadKg / maxLoad) * 100);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!doseInProgress) {
        //todo: perform CB request
        const response = {
          gpsStatus: SeverityEnum.WARN,
          bluetoothStatus: SeverityEnum.OK,
          applicatorsStatus: SeverityEnum.ERROR,
          velocity: 10,
          location: { latitude: '', longitude: '' },
        };

        setApplicatorsStatus(response.applicatorsStatus);
        setBluetoothStatus(response.bluetoothStatus);
        setGpsStatus(response.gpsStatus);
        setVelocity(response.velocity);
      }
    }, Config().APPLICATION.REQUEST_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  function onFinishButtonPress() {
    props.navigation.navigate('HomeScreen');
  }

  function processDose(amount: number) {
    console.log('processDose', amount);
    setApplicatorsStatus(SeverityEnum.WARN);
    setDoseInProgress(true);
    //call backend

    if (leftApplicator.active) {
      setLeftApplicator({
        active: true,
        available: leftApplicator.available,
        loadKg: leftApplicator.loadKg - amount * Config().APPLICATION.DOSE_WEIGHT_KG,
      });
    }

    if (rightApplicator.active) {
      console.log('hete');
      setRightApplicator({
        active: true,
        available: rightApplicator.available,
        loadKg: rightApplicator.loadKg - amount * Config().APPLICATION.DOSE_WEIGHT_KG,
      });
    }

    if (centerApplicator.active) {
      setCenterApplicator({
        active: true,
        available: centerApplicator.available,
        loadKg: centerApplicator.loadKg - amount * Config().APPLICATION.DOSE_WEIGHT_KG,
      });
    }

    const center = calculateApplicatorsLoadPercentage(
      Config().APPLICATION.TOTAL_LOAD_KG,
      centerApplicator.loadKg
    );
    const right = calculateApplicatorsLoadPercentage(
      Config().APPLICATION.TOTAL_LOAD_KG,
      rightApplicator.loadKg
    );
    const left = calculateApplicatorsLoadPercentage(
      Config().APPLICATION.TOTAL_LOAD_KG,
      leftApplicator.loadKg
    );
    setApplicatorsLoadPercentage({ center, right, left });
    setApplicatorsStatus(SeverityEnum.OK);
    setDoseInProgress(false);
  }

  function onDoseButtonPress() {
    processDose(doseAmount);
  }

  function onPresetPressed(value: number) {
    processDose(value);
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
          onPresetPressed={onPresetPressed}
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
          onLeftApplicatorSelected={() => {
            console.log('Left Applicator Selected');
          }}
          onCenterApplicatorSelected={() => {}}
          onRightApplicatorSelected={(b) => {
            console.log('Left Applicator Selected');
          }}
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
        <Sheet
          onFinishPressed={onFinishButtonPress}
          location={location}
          applicatorsLoadPercentage={applicatorsLoadPercentage}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

export default memo(ExecutionScreen);
