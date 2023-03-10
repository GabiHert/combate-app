import BottomSheet from '@gorhom/bottom-sheet';
import { Box, Button, Toast, useToast } from 'native-base';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { BackHandler } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AConfig } from '../../api/core/adapter/config';
import { Severity, SeverityEnum } from '../../api/core/enum/severity';
import { ILocation } from '../../api/interface/location';
import { Theme } from '../../app/theme/theme';
import { AlertToast, ShowToast } from '../../Components/AlertToast';
import ApplicatorSelector from './components/ApplicatorSelector';
import PoisonAmountSelector from './components/PoisonAmountSelector';
import Sheet, { IApplicatorsPercentage } from './components/Sheet';
import StatusBar from './components/StatusBar';
import style from './style';
import { Applicator } from './types/applicator';

function ExecutionScreen(props: { navigation: any; route: any }) {
  const config: AConfig = props.route.params.config;
  const applicator: {
    center: { loadKg: number };
    right: { loadKg: number };
    left: { loadKg: number };
  } = props.route.params.applicator;
  const bottomSheetRef: React.RefObject<BottomSheet> = React.createRef();
  const snapPoints: Array<string> = ['3.5%', '20%', '40%', '52%'];
  let handleSheetChanges: any;
  const [doseAmount, setDoseAmount] = useState<number>(config.get().APPLICATION.MIN_DOSES);
  const [velocity, setVelocity] = useState<number>(0);
  const [bluetoothStatus, setBluetoothStatus] = useState<Severity>(SeverityEnum.WARN);
  const [gpsStatus, setGpsStatus] = useState<Severity>(SeverityEnum.WARN);
  const [applicatorsStatus, setApplicatorsStatus] = useState<Severity>(SeverityEnum.WARN);
  const [doseInProgress, setDoseInProgress] = useState<boolean>(false);
  const [leftApplicator, setLeftApplicator] = useState<Applicator>({
    active: false,
    available: true,
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
        config.get().APPLICATION.CENTER_TANK_MAX_LOAD,
        centerApplicator.loadKg
      ),
      left: calculateApplicatorsLoadPercentage(
        config.get().APPLICATION.LEFT_TANK_MAX_LOAD,
        leftApplicator.loadKg
      ),
      right: calculateApplicatorsLoadPercentage(
        config.get().APPLICATION.RIGHT_TANK_MAX_LOAD,
        rightApplicator.loadKg
      ),
    });
  const [appliedDoses, setAppliedDoses] = useState<number>(0);
  const [showRightNoLoadWarnOnce, setShowRightNoLoadWarnOnce] = useState(false);
  const [showLeftNoLoadWarnOnce, setShowLeftNoLoadWarnOnce] = useState(false);
  const [showCenterNoLoadWarnOnce, setShowCenterNoLoadWarnOnce] = useState(false);

  function getLoadPercentageStatusSeverity(loadPercentage: number): Severity {
    if (loadPercentage <= 33.33) {
      return SeverityEnum.ERROR;
    }
    if (loadPercentage > 33.33 && loadPercentage < 66.66) {
      return SeverityEnum.WARN;
    }
    if (loadPercentage >= 66.66) {
      return SeverityEnum.OK;
    }
  }
  function calculateApplicatorsLoadPercentage(
    maxLoad: number,
    currentLoadKg: number
  ): { percentage: number; severity: Severity } {
    const percentage = Math.round((currentLoadKg / maxLoad) * 100);
    const severity = getLoadPercentageStatusSeverity(percentage);
    return { severity, percentage };
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!doseInProgress) {
        //todo: perform CB request
        let response = {
          gpsStatus: SeverityEnum.WARN,
          bluetoothStatus: SeverityEnum.OK,
          applicatorsStatus: SeverityEnum.OK,
          velocity: 10,
          location: { latitude: '', longitude: '' },
        };

        setApplicatorsStatus(response.applicatorsStatus);
        setBluetoothStatus(response.bluetoothStatus);
        setGpsStatus(response.gpsStatus);
        setVelocity(response.velocity);
      }
    }, config.get().APPLICATION.REQUEST_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [doseInProgress]);

  function onFinishButtonPress() {
    props.navigation.navigate('HomeScreen');
  }

  const onLeftApplicatorSelectedCallback = useCallback(
    (state: boolean) => {
      const aux = { ...leftApplicator };
      aux.active = state;
      setLeftApplicator(aux);
    },
    [leftApplicator, setLeftApplicator]
  );

  const onRightApplicatorSelectedCallback = useCallback(
    (state: boolean) => {
      const aux = { ...rightApplicator };
      aux.active = state;
      setRightApplicator(aux);
    },
    [rightApplicator, setRightApplicator]
  );

  const onCenterApplicatorSelectedCallback = useCallback(
    (state: boolean) => {
      const aux = { ...centerApplicator };
      aux.active = state;
      setCenterApplicator(aux);
    },
    [rightApplicator, setRightApplicator]
  );

  const processDose = useCallback(
    async (amount: number) => {
      setApplicatorsStatus(SeverityEnum.WARN);
      setDoseInProgress(true);
      //call backend
      let activeApplicators = 0;
      if (leftApplicator.active) {
        activeApplicators++;
        let load = leftApplicator.loadKg;
        if (load <= 0) {
          load = 0;
          if (!showLeftNoLoadWarnOnce) {
            ShowToast({
              durationMs: 15000,
              title: 'Reservat??rio Esquerdo Vazio',
              message:
                'Por favor, verifique a carga do dosador esquerdo e o desative se estiver vazio.',
              severity: SeverityEnum.WARN,
              closeButton: true,
            });
            setShowLeftNoLoadWarnOnce(true);
          }
        } else {
          load -= amount * config.get().APPLICATION.DOSE_WEIGHT_KG;
        }
        setLeftApplicator({
          active: true,
          available: leftApplicator.available,
          loadKg: load,
        });
      }

      if (rightApplicator.active) {
        activeApplicators++;
        let load = rightApplicator.loadKg;
        if (load <= 0) {
          load = 0;
          if (!showRightNoLoadWarnOnce) {
            ShowToast({
              durationMs: 15000,
              title: 'Reservat??rio Direito Vazio',
              message:
                'Por favor, verifique a carga do dosador direito e o desative se estiver vazio.',
              severity: SeverityEnum.WARN,
              closeButton: true,
            });
            setShowRightNoLoadWarnOnce(true);
          }
        } else {
          load -= amount * config.get().APPLICATION.DOSE_WEIGHT_KG;
        }
        setRightApplicator({
          active: true,
          available: rightApplicator.available,
          loadKg: load,
        });
      }

      if (centerApplicator.active) {
        activeApplicators++;
        let load = centerApplicator.loadKg;
        if (load <= 0) {
          load = 0;
          if (!showCenterNoLoadWarnOnce) {
            ShowToast({
              durationMs: 15000,
              title: 'Reservat??rio Central Vazio',
              message:
                'Por favor, verifique a carga do dosador central e o desative se estiver vazio.',
              severity: SeverityEnum.WARN,
              closeButton: true,
            });
            setShowCenterNoLoadWarnOnce(true);
          }
        } else {
          load -= amount * config.get().APPLICATION.DOSE_WEIGHT_KG;
        }
        setCenterApplicator({
          active: true,
          available: centerApplicator.available,
          loadKg: load,
        });
      }

      const center = calculateApplicatorsLoadPercentage(
        config.get().APPLICATION.CENTER_TANK_MAX_LOAD,
        centerApplicator.loadKg
      );
      const right = calculateApplicatorsLoadPercentage(
        config.get().APPLICATION.RIGHT_TANK_MAX_LOAD,
        rightApplicator.loadKg
      );
      const left = calculateApplicatorsLoadPercentage(
        config.get().APPLICATION.LEFT_TANK_MAX_LOAD,
        leftApplicator.loadKg
      );
      if (left.severity.name != applicatorsLoadPercentage.left.severity.name) {
        let durationMs = 5000;
        let closeButton = false;
        if (left.severity.name == SeverityEnum.ERROR.name) {
          durationMs = 10000;
          closeButton = true;
        }
        ShowToast({
          title: `Reservat??rio Esquerdo: ${left.percentage}%`,
          message: `Atingido menos de ${left.percentage}% de sua capacidade total.`,
          durationMs,
          severity: left.severity,
          closeButton,
        });
      }
      if (right.severity.name != applicatorsLoadPercentage.right.severity.name) {
        let durationMs = 5000;
        let closeButton = false;
        if (right.severity.name == SeverityEnum.ERROR.name) {
          durationMs = 10000;
          closeButton = true;
        }
        ShowToast({
          title: `Reservat??rio Direito: ${right.percentage}%`,
          message: `Atingido menos de ${right.percentage}% de sua capacidade total.`,
          durationMs,
          severity: right.severity,
          closeButton,
        });
      }
      if (center.severity.name != applicatorsLoadPercentage.center.severity.name) {
        let durationMs = 5000;
        let closeButton = false;
        if (center.severity.name == SeverityEnum.ERROR.name) {
          durationMs = 10000;
          closeButton = true;
        }
        ShowToast({
          title: `Reservat??rio Cenral: ${center.percentage}%`,
          message: `Atingido menos de ${center.percentage}% de sua capacidade total.`,
          durationMs,
          severity: center.severity,
          closeButton,
        });
      }
      setApplicatorsLoadPercentage({ center, right, left });
      setApplicatorsStatus(SeverityEnum.OK);
      setDoseInProgress(false);
      setAppliedDoses(appliedDoses + amount * activeApplicators);
    },
    [
      centerApplicator,
      leftApplicator,
      rightApplicator,
      doseInProgress,
      setAppliedDoses,
      setApplicatorsLoadPercentage,
      applicatorsLoadPercentage,
      appliedDoses,
    ]
  );

  const onDoseButtonPress = useCallback(() => {
    processDose(doseAmount);
  }, [doseAmount, processDose]);

  const onPresetPressed = useCallback(
    (value: number) => {
      processDose(value);
    },
    [processDose]
  );

  const onApplicatorsStatusChange = useCallback(() => {
    return applicatorsStatus;
  }, [applicatorsStatus]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Box height={'15%'} alignItems="center" justifyContent="center" width="100%">
        <StatusBar
          velocity={velocity}
          applicatorStatusChange={onApplicatorsStatusChange}
          gpsStatus={gpsStatus}
          bluetoothStatus={bluetoothStatus}
        />
      </Box>

      <Box height={'45%'}>
        <PoisonAmountSelector
          config={config}
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
          onLeftApplicatorSelected={onLeftApplicatorSelectedCallback}
          onCenterApplicatorSelected={onCenterApplicatorSelectedCallback}
          onRightApplicatorSelected={onRightApplicatorSelectedCallback}
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
          config={config}
          onFinishPressed={onFinishButtonPress}
          location={location}
          applicatorsLoadPercentage={applicatorsLoadPercentage}
          appliedDoses={appliedDoses}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
export default memo(ExecutionScreen);
