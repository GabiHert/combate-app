import BottomSheet from '@gorhom/bottom-sheet';
import { Box } from 'native-base';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { BackHandler } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Severity, SeverityEnum } from '../../internal/core/enum/severity';
import { config } from '../../internal/core/port/config-port';
import { preExecutionConfig } from '../../internal/core/port/pre-execution-config-port';
import { appConfig } from '../../app/config/app-config';
import { Theme } from '../../app/theme/theme';
import { ShowToast } from '../../Components/AlertToast';
import ApplicatorSelector from './components/ApplicatorSelector';
import PoisonAmountSelector from './components/PoisonAmountSelector';
import Sheet, { IApplicatorsPercentage } from './components/Sheet';
import StatusBar from './components/StatusBar';
import { Applicator } from './types/applicator';
import { CONSTANTS } from '../../internal/config/config';

function ExecutionScreen(props: { navigation: any }) {
  const bottomSheetRef: React.RefObject<BottomSheet> = React.createRef();
  const sheetHeight = appConfig.screen.height / 2 - 30;
  const blockHeight = sheetHeight / 3;
  const spaceBetweenBlocksHeight = 3;
  const snapPoints = [40, appConfig.screen.height / 2];
  let handleSheetChanges: any;
  const [velocity, setVelocity] = useState<number>(0);
  const [doseInProgress, setDoseInProgress] = useState<boolean>(false);

  const [leftApplicatorLoad, setLeftApplicatorLoad] = useState(
    preExecutionConfig.getCache().leftApplicatorLoad
  );
  const [leftApplicatorActive, setLeftApplicatorActive] = useState(true);
  const [leftApplicatorAvailable, setLeftApplicatorAvailable] = useState(true);

  const [rightApplicatorLoad, setRightApplicatorLoad] = useState(
    preExecutionConfig.getCache().rightApplicatorLoad
  );
  const [rightApplicatorActive, setRightApplicatorActive] = useState(true);
  const [rightApplicatorAvailable, setRightApplicatorAvailable] = useState(true);

  const [centerApplicatorLoad, setCenterApplicatorLoad] = useState(
    preExecutionConfig.getCache().centerApplicatorLoad
  );
  const [centerApplicatorActive, setCenterApplicatorActive] = useState(true);
  const [centerApplicatorAvailable, setCenterApplicatorAvailable] = useState(true);

  const [applicatorsLoadPercentage, setApplicatorsLoadPercentage] =
    useState<IApplicatorsPercentage>({
      center: calculateApplicatorsLoadPercentage(
        config.getCache().APPLICATION.CENTER_TANK_MAX_LOAD,
        centerApplicatorLoad
      ),
      left: calculateApplicatorsLoadPercentage(
        config.getCache().APPLICATION.LEFT_TANK_MAX_LOAD,
        leftApplicatorLoad
      ),
      right: calculateApplicatorsLoadPercentage(
        config.getCache().APPLICATION.RIGHT_TANK_MAX_LOAD,
        rightApplicatorLoad
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
        setVelocity(response.velocity);
      }
      const cache = preExecutionConfig.getCache();
      cache.leftApplicatorLoad = leftApplicatorLoad;
      cache.rightApplicatorLoad = rightApplicatorLoad;
      cache.centerApplicatorLoad = centerApplicatorLoad;
      preExecutionConfig.update(cache);
    }, CONSTANTS.REQUEST_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [doseInProgress, leftApplicatorLoad]);

  const onFinishButtonPress = useCallback(() => {
    props.navigation.navigate('HomeScreen');
  }, []);

  const onLeftApplicatorSelectedCallback = useCallback(
    (state: boolean) => {
      setLeftApplicatorActive(state);
    },
    [setLeftApplicatorActive]
  );

  const onRightApplicatorSelectedCallback = useCallback(
    (state: boolean) => {
      setRightApplicatorActive(state);
    },
    [setRightApplicatorActive]
  );

  const onCenterApplicatorSelectedCallback = useCallback(
    (state: boolean) => {
      setCenterApplicatorActive(state);
    },
    [setCenterApplicatorActive]
  );

  const processDose = useCallback(
    async (amount: number) => {
      setDoseInProgress(true);
      //call backend
      let activeApplicators = 0;
      if (leftApplicatorActive) {
        activeApplicators++;
        let load = leftApplicatorLoad;
        if (load <= 1) {
          load = 0;
          if (!showLeftNoLoadWarnOnce) {
            ShowToast({
              durationMs: 15000,
              title: 'Reservatório Esquerdo Vazio',
              message:
                'Por favor, verifique a carga do dosador esquerdo e o desative se estiver vazio.',
              severity: SeverityEnum.WARN,
              closeButton: true,
            });
            setShowLeftNoLoadWarnOnce(true);
          }
        } else {
          load -= amount * config.getCache().APPLICATION.DOSE_WEIGHT_KG;
        }
        setLeftApplicatorLoad(load);
      } else if (leftApplicatorAvailable) {
        setLeftApplicatorActive(true);
      }

      if (rightApplicatorActive) {
        activeApplicators++;
        let load = rightApplicatorLoad;
        if (load <= 1) {
          load = 0;
          if (!showRightNoLoadWarnOnce) {
            ShowToast({
              durationMs: 15000,
              title: 'Reservatório Direito Vazio',
              message:
                'Por favor, verifique a carga do dosador direito e o desative se estiver vazio.',
              severity: SeverityEnum.WARN,
              closeButton: true,
            });
            setShowRightNoLoadWarnOnce(true);
          }
        } else {
          load -= amount * config.getCache().APPLICATION.DOSE_WEIGHT_KG;
        }
        setRightApplicatorLoad(load);
      } else if (rightApplicatorAvailable) {
        setRightApplicatorActive(true);
      }

      if (centerApplicatorActive) {
        activeApplicators++;
        let load = centerApplicatorLoad;
        if (load <= 1) {
          load = 0;
          if (!showCenterNoLoadWarnOnce) {
            ShowToast({
              durationMs: 15000,
              title: 'Reservatório Central Vazio',
              message:
                'Por favor, verifique a carga do dosador central e o desative se estiver vazio.',
              severity: SeverityEnum.WARN,
              closeButton: true,
            });
            setShowCenterNoLoadWarnOnce(true);
          }
        } else {
          load -= amount * config.getCache().APPLICATION.DOSE_WEIGHT_KG;
        }
        setCenterApplicatorLoad(load);
      } else if (centerApplicatorAvailable) {
        setCenterApplicatorActive(true);
      }
      const center = calculateApplicatorsLoadPercentage(
        config.getCache().APPLICATION.CENTER_TANK_MAX_LOAD,
        centerApplicatorLoad
      );
      const right = calculateApplicatorsLoadPercentage(
        config.getCache().APPLICATION.RIGHT_TANK_MAX_LOAD,
        rightApplicatorLoad
      );
      const left = calculateApplicatorsLoadPercentage(
        config.getCache().APPLICATION.LEFT_TANK_MAX_LOAD,
        leftApplicatorLoad
      );
      if (left.severity.name != applicatorsLoadPercentage.left.severity.name) {
        let durationMs = 5000;
        let closeButton = false;
        if (left.severity.name == SeverityEnum.ERROR.name) {
          durationMs = 10000;
          closeButton = true;
        }
        ShowToast({
          title: `Reservatório Esquerdo: ${left.percentage}%`,
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
          title: `Reservatório Direito: ${right.percentage}%`,
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
          title: `Reservatório Cenral: ${center.percentage}%`,
          message: `Atingido menos de ${center.percentage}% de sua capacidade total.`,
          durationMs,
          severity: center.severity,
          closeButton,
        });
      }
      setApplicatorsLoadPercentage({ center, right, left });

      setDoseInProgress(false);
      setAppliedDoses(appliedDoses + amount * activeApplicators);
    },
    [
      centerApplicatorLoad,
      leftApplicatorLoad,
      rightApplicatorLoad,
      centerApplicatorActive,
      leftApplicatorActive,
      rightApplicatorActive,
      centerApplicatorAvailable,
      leftApplicatorAvailable,
      rightApplicatorAvailable,
      doseInProgress,
      setAppliedDoses,
      setApplicatorsLoadPercentage,
      applicatorsLoadPercentage,
      appliedDoses,
    ]
  );

  const onPresetPressed = useCallback(
    (value: number) => {
      processDose(value);
    },
    [processDose]
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Box height={'15%'} alignItems="center" justifyContent="center" width="100%">
        <StatusBar velocity={velocity} applicatorsLoadPercentage={applicatorsLoadPercentage} />
      </Box>

      <Box height={'60%'} width={'100%'} marginBottom={'5%'}>
        <PoisonAmountSelector onPresetPressed={onPresetPressed} />
      </Box>

      <Box alignItems="center" justifyContent="center" width="100%" height="15%">
        <ApplicatorSelector
          leftApplicatorActive={leftApplicatorActive}
          leftApplicatorAvailable={leftApplicatorAvailable}
          rightApplicatorActive={rightApplicatorActive}
          rightApplicatorAvailable={rightApplicatorAvailable}
          centerApplicatorActive={centerApplicatorActive}
          centerApplicatorAvailable={centerApplicatorAvailable}
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
          <Box
            style={{
              paddingBottom: 0,
              height: 0,
              alignSelf: 'center',
            }}
          >
            <Box
              style={{
                width: 70,
                height: 5,
                borderRadius: 3,
                backgroundColor: 'white',
                marginTop: 9,
              }}
            />
          </Box>
        )}
        backgroundStyle={{ backgroundColor: Theme().color.b400 }}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 9,
          },
          shadowOpacity: 0.5,
          shadowRadius: 12.35,
          elevation: 19,
        }}
      >
        <Sheet
          blockHeight={blockHeight}
          sheetHeight={sheetHeight}
          spaceBetweenBlocksHeight={spaceBetweenBlocksHeight}
          onFinishPressed={() => {
            onFinishButtonPress();
          }}
          appliedDoses={appliedDoses}
          applicatorsLoad={{
            centerApplicatorLoad: centerApplicatorLoad,
            leftApplicatorLoad: leftApplicatorLoad,
            rightApplicatorLoad: rightApplicatorLoad,
          }}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
export default ExecutionScreen;
