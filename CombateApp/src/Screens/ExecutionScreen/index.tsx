import BottomSheet from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import { Box } from 'native-base';
import React, { useCallback, useState } from 'react';
import { BackHandler } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { appConfig } from '../../app/config/app-config';
import { Instance } from '../../app/instance/instance';
import { Theme } from '../../app/theme/theme';
import { CONSTANTS } from '../../internal/config/config';
import { RequestDto } from '../../internal/core/dto/request-dto';
import { EventEnum } from '../../internal/core/enum/event';
import { Severity, SeverityEnum } from '../../internal/core/enum/severity';
import ApplicatorSelector from './components/ApplicatorSelector';
import PoisonAmountSelector from './components/PoisonAmountSelector';
import Sheet, { IApplicatorsPercentage } from './components/Sheet';
import StatusBar from './components/StatusBar';

function ExecutionScreen(props: { navigation: any }) {
  const bottomSheetRef: React.RefObject<BottomSheet> = React.createRef();
  const sheetHeight = appConfig.screen.height / 2 - 30;
  const blockHeight = sheetHeight / 3;
  const spaceBetweenBlocksHeight = 3;
  const snapPoints = [40, appConfig.screen.height / 2];
  let handleSheetChanges: any;
  const [velocity, setVelocity] = useState<string>(' ');
  const [requestOnProgress, setRequestOnProgress] = useState<boolean>(false);

  const [leftApplicatorLoad, setLeftApplicatorLoad] = useState(
    Instance.GetInstance().preExecutionConfigCache.getCache().leftApplicatorLoad
  );
  const [leftApplicatorActive, setLeftApplicatorActive] = useState(false);
  const [leftApplicatorAvailable, setLeftApplicatorAvailable] = useState(false);

  const [rightApplicatorLoad, setRightApplicatorLoad] = useState(
    Instance.GetInstance().preExecutionConfigCache.getCache().rightApplicatorLoad
  );
  const [rightApplicatorActive, setRightApplicatorActive] = useState(false);
  const [rightApplicatorAvailable, setRightApplicatorAvailable] = useState(false);

  const [centerApplicatorLoad, setCenterApplicatorLoad] = useState(
    Instance.GetInstance().preExecutionConfigCache.getCache().centerApplicatorLoad
  );
  const [centerApplicatorActive, setCenterApplicatorActive] = useState(false);
  const [centerApplicatorAvailable, setCenterApplicatorAvailable] = useState(false);

  const [applicatorsLoadPercentage, setApplicatorsLoadPercentage] =
    useState<IApplicatorsPercentage>({
      center: calculateApplicatorsLoadPercentage(
        Instance.GetInstance().configCache.getCache().APPLICATION.CENTER_TANK_MAX_LOAD,
        centerApplicatorLoad
      ),
      left: calculateApplicatorsLoadPercentage(
        Instance.GetInstance().configCache.getCache().APPLICATION.LEFT_TANK_MAX_LOAD,
        leftApplicatorLoad
      ),
      right: calculateApplicatorsLoadPercentage(
        Instance.GetInstance().configCache.getCache().APPLICATION.RIGHT_TANK_MAX_LOAD,
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

  useFocusEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  });

  useFocusEffect(() => {
    const interval = setInterval(async () => {
      if (!requestOnProgress) {
        setRequestOnProgress(true);
        try {
          const requestDto = new RequestDto({
            applicatorsAmount:
              Instance.GetInstance().preExecutionConfigCache.getCache().applicatorsAmount,
            client: Instance.GetInstance().preExecutionConfigCache.getCache().clientName,
            deviceName: Instance.GetInstance().preExecutionConfigCache.getCache().deviceName,
            doseWeightG: Instance.GetInstance().configCache.getCache().APPLICATION.DOSE_WEIGHT_G,
            event: EventEnum.TrackPoint.name,
            maxVelocity: Instance.GetInstance().configCache.getCache().APPLICATION.MAX_VELOCITY,
            linesSpacing: Instance.GetInstance().configCache.getCache().LINE_SPACING,
            plot: Instance.GetInstance().preExecutionConfigCache.getCache().plot,
            poisonType: Instance.GetInstance().configCache.getCache().POISON_TYPE,
            project: Instance.GetInstance().preExecutionConfigCache.getCache().projectName,
            streetsAmount: Instance.GetInstance().preExecutionConfigCache.getCache().streetsAmount,
            tractorName: Instance.GetInstance().preExecutionConfigCache.getCache().tractorName,
            weather: Instance.GetInstance().preExecutionConfigCache.getCache().weather,
            dose: {
              amount: 0,
            },
          });
          const responseDto = await Instance.GetInstance().combateApp.request(requestDto);
          setVelocity(responseDto.gps.speed);
        } catch (err) {
          await Instance.GetInstance().errorHandler.handle(err)
        } finally {
          setRequestOnProgress(false);
        }
      }
      const cache = Instance.GetInstance().preExecutionConfigCache.getCache();
      if (
        cache.leftApplicatorLoad != leftApplicatorLoad ||
        cache.centerApplicatorLoad != centerApplicatorLoad ||
        cache.rightApplicatorLoad != rightApplicatorLoad
      ) {
        cache.leftApplicatorLoad = leftApplicatorLoad;
        cache.rightApplicatorLoad = rightApplicatorLoad;
        cache.centerApplicatorLoad = centerApplicatorLoad;
        Instance.GetInstance().preExecutionConfigCache.update(cache);
      }
    }, CONSTANTS.REQUEST_INTERVAL_MS);

    return () => clearInterval(interval);
  });

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
    async (preset: {NAME:string, DOSE_AMOUNT:number}) => {
      if (!requestOnProgress) {
        setRequestOnProgress(true);
        try {
          const requestDto = new RequestDto({
            applicatorsAmount:
              Instance.GetInstance().preExecutionConfigCache.getCache().applicatorsAmount,
            client: Instance.GetInstance().preExecutionConfigCache.getCache().clientName,
            deviceName: Instance.GetInstance().preExecutionConfigCache.getCache().deviceName,
            doseWeightG: Instance.GetInstance().configCache.getCache().APPLICATION.DOSE_WEIGHT_G,
            event: preset.NAME,
            maxVelocity: Instance.GetInstance().configCache.getCache().APPLICATION.MAX_VELOCITY,
            linesSpacing: Instance.GetInstance().configCache.getCache().LINE_SPACING,
            plot: Instance.GetInstance().preExecutionConfigCache.getCache().plot,
            poisonType: Instance.GetInstance().configCache.getCache().POISON_TYPE,
            project: Instance.GetInstance().preExecutionConfigCache.getCache().projectName,
            streetsAmount: Instance.GetInstance().preExecutionConfigCache.getCache().streetsAmount,
            tractorName: Instance.GetInstance().preExecutionConfigCache.getCache().tractorName,
            weather: Instance.GetInstance().preExecutionConfigCache.getCache().weather,
            dose: {
              amount:preset.DOSE_AMOUNT,
            },
          });
          const responseDto = await Instance.GetInstance().combateApp.request(requestDto);
          setVelocity(responseDto.gps.speed);
          const _aux = !appliedDoses ? 0 : appliedDoses;
          const applicatorsAmount =
            Instance.GetInstance().preExecutionConfigCache.getCache().applicatorsAmount;
          setAppliedDoses(_aux + preset.DOSE_AMOUNT * applicatorsAmount);
        } catch (err) {
          await Instance.GetInstance().errorHandler.handle(err)

        } finally {
          setRequestOnProgress(false);
        }
      }
    },
    [requestOnProgress, appliedDoses]
  );

  const onPresetPressed = useCallback(
    async (value: {NAME:string, DOSE_AMOUNT:number}, callback: () => void) => {
      await processDose(value);
      callback();
    },
    [processDose]
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Box height={'15%'} alignItems="center" justifyContent="center" width="100%">
        <StatusBar
          velocity={velocity}
          applicatorsLoadPercentage={applicatorsLoadPercentage}
          loadPercentageEnabled={false}
        />
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
