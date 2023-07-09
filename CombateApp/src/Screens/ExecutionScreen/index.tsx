import BottomSheet from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import { Box } from 'native-base';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const promises = useRef<Array<()=>Promise<void>>>([])
  const bottomSheetRef: React.RefObject<BottomSheet> = React.createRef();
  const sheetHeight = appConfig.screen.height / 2 - 30;
  const blockHeight = sheetHeight / 3;
  const spaceBetweenBlocksHeight = 3;
  const snapPoints = [40, appConfig.screen.height / 2];
  let handleSheetChanges: any;
  const [velocity, setVelocity] = useState<string>(' ');
  const requestOnProgress = useRef<boolean>(false);
  function setRequestOnProgress(value:boolean){
    requestOnProgress.current = value
  }

  const startRequestTime = useRef<number>(0);
  function setStartRequestTime(value:number){
    startRequestTime.current = value
  }
  
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

    const appliedDosesRef = useRef(0)
  const [appliedDoses, setAppliedDoses] = useState<number>(0);
  const addAppliedDosesCallback = useCallback((value:number)=>{
    appliedDosesRef.current += value
    setAppliedDoses(appliedDosesRef.current);
  },[appliedDoses])
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
    async function trackPoint(){
        try {
          setRequestOnProgress(true);
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
          
          const cache = Instance.GetInstance().preExecutionConfigCache.getCache();
          if (
            cache.leftApplicatorLoad != leftApplicatorLoad ||
            cache.centerApplicatorLoad != centerApplicatorLoad ||
            cache.rightApplicatorLoad != rightApplicatorLoad
          ) {
            cache.leftApplicatorLoad = leftApplicatorLoad;
            cache.rightApplicatorLoad = rightApplicatorLoad;
            cache.centerApplicatorLoad = centerApplicatorLoad;
            await Instance.GetInstance().preExecutionConfigCache.update(cache);
          }
        } catch (err) {
          await Instance.GetInstance().errorHandler.handle(err)
        } finally {
          setRequestOnProgress(false);
        }
    }
      
    const interval = setInterval(() => {
    const length = promises.current.length
      if(!requestOnProgress.current && length == 0){
        if (new Date().getTime() > (startRequestTime.current + CONSTANTS.REQUEST_INTERVAL_MS)){
          setStartRequestTime(new Date().getTime());
          promises.current.push(trackPoint)
        }
      }}, 1000);
    return () => clearInterval(interval);
    
 });

 useEffect(()=>{
  const interval = setInterval(async ()=>{
    const length = promises.current.length
    if(!requestOnProgress.current && length>0){
        const reverted = promises.current.reverse();
        const promiseFunc = reverted.pop()
        promises.current = reverted.reverse();
        await promiseFunc();
    }    
  },500)

  return () => clearInterval(interval);
  
 },[])

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
    async (preset: {NAME:string, DOSE_AMOUNT:number},callback:()=>void) => {
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
        } catch (err) {
          await Instance.GetInstance().errorHandler.handle(err)

        } finally {
          setRequestOnProgress(false);
          callback();
        }
    },
    []
  );


  const onPresetPressed = useCallback(
    async (preset: {NAME:string, DOSE_AMOUNT:number}, callback: () => void) => {

      async function process(){
        await processDose(preset,callback)
        const applicatorsAmount =
        Instance.GetInstance().preExecutionConfigCache.getCache().applicatorsAmount;
      addAppliedDosesCallback(preset.DOSE_AMOUNT * applicatorsAmount);
      console.log(preset.DOSE_AMOUNT)
      console.log(applicatorsAmount)
      }
      promises.current.push(process)

    },
    []
  );

  const onEventRegister = useCallback(
     (requestDto:RequestDto,callback:()=>void) => {
      async function process(){
        setRequestOnProgress(true);
        try {
          await Instance.GetInstance().combateApp.request(requestDto);
        } catch (err) {
          await Instance.GetInstance().errorHandler.handle(err)
        }finally{
          setRequestOnProgress(false);
          callback()
        }
      } 

      promises.current.push(process)

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
          onEventRegister={onEventRegister}
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
