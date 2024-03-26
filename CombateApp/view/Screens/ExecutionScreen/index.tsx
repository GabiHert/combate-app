import BottomSheet from "@gorhom/bottom-sheet";
import { useFocusEffect } from "@react-navigation/native";
import { Box } from "native-base";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BackHandler } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RequestDto } from "../../../src/internal/core/dto/request-dto";
import { ResponseDto } from "../../../src/internal/core/dto/response-dto";
import { EventEnum } from "../../../src/internal/core/enum/event";
import {
  Severity,
  SeverityEnum,
} from "../../../src/internal/core/enum/severity";
import { IDoseRequest } from "../../../src/internal/interface/dose-request";
import { appConfig } from "../../app/config/app-config";
import { Instance } from "../../app/instance/instance";
import { Theme } from "../../app/theme/theme";
import { ShowToast } from "../../Components/AlertToast";
import ApplicatorSelector from "./components/ApplicatorSelector";
import PoisonAmountSelector from "./components/PoisonAmountSelector";
import Sheet, { IApplicatorsPercentage } from "./components/Sheet";
import StatusBar from "./components/StatusBar";

interface Process {
  process: () => Promise<void>;
  type: string;
}

function ExecutionScreen(props: { navigation: any }) {
  const promises = useRef<Array<Process>>([]);
  const bottomSheetRef: React.RefObject<BottomSheet> = React.createRef();
  const sheetHeight = appConfig.screen.height / 2 - 30;
  const blockHeight = sheetHeight / 3;
  const spaceBetweenBlocksHeight = 3;
  const snapPoints = [40, appConfig.screen.height / 2];
  let handleSheetChanges: any;
  const [velocity, setVelocity] = useState<string>(" ");
  const requestOnProgress = useRef<boolean>(false);

  function setRequestOnProgress(value: boolean) {
    requestOnProgress.current = value;
  }

  const leftApplicatorLoad = useRef(
    Instance.GetInstance().preExecutionConfigCache.getCache().leftApplicatorLoad
  );

  const leftApplicatorActive = useRef(true);
  const leftApplicatorAvailable = useRef(false);
  const rightApplicatorActive = useRef(true);
  const rightApplicatorAvailable = useRef(false);
  const centerApplicatorActive = useRef(true);
  const centerApplicatorAvailable = useRef(false);

  const [leftApplicatorActiveState, setLeftApplicatorActiveState] =
    useState(true);
  const [leftApplicatorAvailableState, setLeftApplicatorAvailableState] =
    useState(false);
  const [rightApplicatorActiveState, setRightApplicatorActiveState] =
    useState(true);
  const [rightApplicatorAvailableState, setRightApplicatorAvailableState] =
    useState(false);
  const [centerApplicatorActiveState, setCenterApplicatorActiveState] =
    useState(true);
  const [centerApplicatorAvailableState, setCenterApplicatorAvailableState] =
    useState(false);

  function setLeftApplicatorActive(v: boolean) {
    leftApplicatorActive.current = v;
    setLeftApplicatorActiveState(v);
  }

  function setLeftApplicatorAvailable(v: boolean) {
    leftApplicatorAvailable.current = v;
    setLeftApplicatorAvailableState(v);
  }

  function setRightApplicatorActive(v: boolean) {
    rightApplicatorActive.current = v;
    setRightApplicatorActiveState(v);
  }

  function setRightApplicatorAvailable(v: boolean) {
    rightApplicatorAvailable.current = v;
    setRightApplicatorAvailableState(v);
  }

  function setCenterApplicatorActive(v: boolean) {
    centerApplicatorActive.current = v;
    setCenterApplicatorActiveState(v);
  }

  function setCenterApplicatorAvailable(v: boolean) {
    centerApplicatorAvailable.current = v;
    setCenterApplicatorAvailableState(v);
  }

  const rightApplicatorLoad = useRef(
    Instance.GetInstance().preExecutionConfigCache.getCache()
      .rightApplicatorLoad
  );

  const centerApplicatorLoad = useRef(
    Instance.GetInstance().preExecutionConfigCache.getCache()
      .centerApplicatorLoad
  );

  const [applicatorsLoadPercentage, setApplicatorsLoadPercentage] =
    useState<IApplicatorsPercentage>(undefined);

  const appliedDosesRef = useRef(0);
  const [appliedDoses, setAppliedDoses] = useState<number>(0);
  const addAppliedDosesCallback = useCallback(
    (dose: IDoseRequest) => {
      let applicatorsAmount =
        Number(dose.centerApplicator) +
        Number(dose.leftApplicator) +
        Number(dose.rightApplicator);

      appliedDosesRef.current += dose.amount * applicatorsAmount;
      setAppliedDoses(appliedDosesRef.current);
    },
    [appliedDoses]
  );

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

  function updateApplicatorsStatus(responseDto: ResponseDto) {
    if (responseDto.centerApplicator != centerApplicatorAvailable.current) {
      setCenterApplicatorAvailable(responseDto.centerApplicator);
    }

    if (responseDto.leftApplicator != leftApplicatorAvailable.current) {
      setLeftApplicatorAvailable(responseDto.leftApplicator);
    }

    if (responseDto.rightApplicator != rightApplicatorAvailable.current) {
      setRightApplicatorAvailable(responseDto.rightApplicator);
    }
  }

  useFocusEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  });

  const doseCallback = useCallback(
    async (requestDto: RequestDto, responseDto: ResponseDto) => {
      let systematicDoses = 0;
      let appliedKg = 0;

      if (responseDto.status != "N") {
        let aux = Number(responseDto.status);
        if (aux == 0) {
          aux = 10;
        }
        systematicDoses += aux;
        systematicDoses = (systematicDoses * requestDto.doseWeightG) / 1000;
        addAppliedDosesCallback({
          amount: aux,
          centerApplicator: responseDto.centerApplicator,
          leftApplicator: responseDto.leftApplicator,
          rightApplicator: responseDto.rightApplicator,
        });
        if (requestDto.dose) {
          appliedKg = (requestDto.dose.amount * requestDto.doseWeightG) / 1000;
        }
      }

      // Subtracts dose amount
      if (responseDto.centerApplicator && centerApplicatorLoad.current > 0) {
        if (requestDto.dose && requestDto.dose.centerApplicator) {
          centerApplicatorLoad.current =
            centerApplicatorLoad.current - appliedKg;
        }
        if (systematicDoses > 0) {
          centerApplicatorLoad.current =
            centerApplicatorLoad.current - systematicDoses;
        }

        if (centerApplicatorLoad.current <= 0) {
          centerApplicatorLoad.current = 0;
          ShowToast({
            durationMs: 5000,
            severity: SeverityEnum.WARN,
            closeButton: false,
            title: "Reservatório central possivelmente vazio!",
          });
        }
      }

      // Subtracts dose amount
      if (responseDto.leftApplicator && leftApplicatorLoad.current > 0) {
        if (requestDto.dose && requestDto.dose.leftApplicator) {
          leftApplicatorLoad.current = leftApplicatorLoad.current - appliedKg;
        }
        if (systematicDoses > 0) {
          leftApplicatorLoad.current =
            leftApplicatorLoad.current - systematicDoses;
        }

        if (leftApplicatorLoad.current <= 0) {
          leftApplicatorLoad.current = 0;
          ShowToast({
            durationMs: 5000,
            severity: SeverityEnum.WARN,
            closeButton: false,
            title: "Reservatório esquerdo possivelmente vazio!",
          });
        }
      }

      // Subtracts dose amount
      if (responseDto.rightApplicator && rightApplicatorLoad.current > 0) {
        if (requestDto.dose && requestDto.dose.rightApplicator) {
          rightApplicatorLoad.current = rightApplicatorLoad.current - appliedKg;
        }
        if (systematicDoses > 0) {
          rightApplicatorLoad.current =
            rightApplicatorLoad.current - systematicDoses;
        }

        if (rightApplicatorLoad.current <= 0) {
          rightApplicatorLoad.current = 0;
          ShowToast({
            durationMs: 5000,
            severity: SeverityEnum.WARN,
            closeButton: false,
            title: "Reservatório direito possivelmente vazio!",
          });
        }
      }

      setApplicatorsLoadPercentage({
        center: calculateApplicatorsLoadPercentage(
          Instance.GetInstance().configCache.getCache().APPLICATION
            .CENTER_TANK_MAX_LOAD,
          centerApplicatorLoad.current
        ),
        left: calculateApplicatorsLoadPercentage(
          Instance.GetInstance().configCache.getCache().APPLICATION
            .LEFT_TANK_MAX_LOAD,
          leftApplicatorLoad.current
        ),
        right: calculateApplicatorsLoadPercentage(
          Instance.GetInstance().configCache.getCache().APPLICATION
            .RIGHT_TANK_MAX_LOAD,
          rightApplicatorLoad.current
        ),
      });

      // Resets applicator selection
      if (centerApplicatorAvailable.current) {
        setCenterApplicatorActive(true);
      }

      if (rightApplicatorAvailable.current) {
        setRightApplicatorActive(true);
      }

      if (leftApplicatorAvailable.current) {
        setLeftApplicatorActive(true);
      }
    },
    []
  );

  useFocusEffect(() => {
    async function trackPoint() {
      try {
        setRequestOnProgress(true);
        const requestDto = new RequestDto({
          activity:
            Instance.GetInstance().preExecutionConfigCache.getCache().activity,
          client:
            Instance.GetInstance().preExecutionConfigCache.getCache()
              .clientName,
          deviceName:
            Instance.GetInstance().preExecutionConfigCache.getCache()
              .deviceName,
          doseWeightG:
            Instance.GetInstance().configCache.getCache().APPLICATION
              .DOSE_WEIGHT_G,
          event: EventEnum.TrackPoint.name,
          maxVelocity:
            Instance.GetInstance().configCache.getCache().APPLICATION
              .MAX_VELOCITY,
          linesSpacing:
            Instance.GetInstance().configCache.getCache().LINE_SPACING,
          plot: Instance.GetInstance().preExecutionConfigCache.getCache().plot,
          poisonType: Instance.GetInstance().configCache.getCache().POISON_TYPE,
          project:
            Instance.GetInstance().preExecutionConfigCache.getCache()
              .projectName,
          streetsAmount:
            Instance.GetInstance().preExecutionConfigCache.getCache()
              .streetsAmount,
          tractorName:
            Instance.GetInstance().preExecutionConfigCache.getCache()
              .tractorName,
          weather:
            Instance.GetInstance().preExecutionConfigCache.getCache().weather,
          systematicMetersBetweenDose:
            Instance.GetInstance().configCache.getCache().SYSTEMATIC_DOSE
              .METERS_BETWEEN_DOSE,
        });
        const responseDto = await Instance.GetInstance().combateApp.request(
          requestDto,
          doseCallback
        );
        setVelocity(responseDto.gps.speed);
        updateApplicatorsStatus(responseDto);

        if (!applicatorsLoadPercentage) {
          if (leftApplicatorAvailable && !leftApplicatorActive) {
            setLeftApplicatorActive(true);
          }
          if (rightApplicatorAvailable && !rightApplicatorActive) {
            setRightApplicatorActive(true);
          }
          if (centerApplicatorAvailable && !centerApplicatorActive) {
            setCenterApplicatorActive(true);
          }

          setApplicatorsLoadPercentage({
            center: calculateApplicatorsLoadPercentage(
              Instance.GetInstance().configCache.getCache().APPLICATION
                .CENTER_TANK_MAX_LOAD,
              centerApplicatorLoad.current
            ),
            left: calculateApplicatorsLoadPercentage(
              Instance.GetInstance().configCache.getCache().APPLICATION
                .LEFT_TANK_MAX_LOAD,
              leftApplicatorLoad.current
            ),
            right: calculateApplicatorsLoadPercentage(
              Instance.GetInstance().configCache.getCache().APPLICATION
                .RIGHT_TANK_MAX_LOAD,
              rightApplicatorLoad.current
            ),
          });
        }
      } catch (err) {
        await Instance.GetInstance().errorHandler.handle(err);
      } finally {
        setRequestOnProgress(false);
      }
    }

    const interval = setInterval(() => {
      const length = promises.current.length;
      if (length < 2) {
        promises.current.push({
          type: EventEnum.TrackPoint.name,
          process: trackPoint,
        });
      }
    }, 5000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      const length = promises.current.length;
      if (!requestOnProgress.current && length > 0) {
        const reverted = promises.current.reverse();
        const promise = reverted.pop();
        promises.current = reverted.reverse();
        await promise.process();
      }
    });

    return () => clearInterval(interval);
  }, []);

  const onFinishButtonPress = useCallback((event: string) => {
    appliedDosesRef.current = 0;
    setAppliedDoses(0);
    let cache = Instance.GetInstance().preExecutionConfigCache.getCache();
    cache.centerApplicatorLoad = Number(
      centerApplicatorLoad.current.toFixed(2)
    );
    cache.leftApplicatorLoad = Number(leftApplicatorLoad.current.toFixed(2));
    cache.rightApplicatorLoad = Number(rightApplicatorLoad.current.toFixed(2));
    Instance.GetInstance().preExecutionConfigCache.update(cache);
    props.navigation.navigate("HomeScreen");
  }, []);

  const processDose = useCallback(
    async (
      preset: { NAME: string; DOSE_AMOUNT: number },
      callback: () => void
    ) => {
      setRequestOnProgress(true);

      try {
        const requestDto = new RequestDto({
          activity:
            Instance.GetInstance().preExecutionConfigCache.getCache().activity,
          client:
            Instance.GetInstance().preExecutionConfigCache.getCache()
              .clientName,
          deviceName:
            Instance.GetInstance().preExecutionConfigCache.getCache()
              .deviceName,
          doseWeightG:
            Instance.GetInstance().configCache.getCache().APPLICATION
              .DOSE_WEIGHT_G,
          event: preset.NAME,
          maxVelocity:
            Instance.GetInstance().configCache.getCache().APPLICATION
              .MAX_VELOCITY,
          linesSpacing:
            Instance.GetInstance().configCache.getCache().LINE_SPACING,
          plot: Instance.GetInstance().preExecutionConfigCache.getCache().plot,
          poisonType: Instance.GetInstance().configCache.getCache().POISON_TYPE,
          project:
            Instance.GetInstance().preExecutionConfigCache.getCache()
              .projectName,
          streetsAmount:
            Instance.GetInstance().preExecutionConfigCache.getCache()
              .streetsAmount,
          tractorName:
            Instance.GetInstance().preExecutionConfigCache.getCache()
              .tractorName,
          weather:
            Instance.GetInstance().preExecutionConfigCache.getCache().weather,
          systematicMetersBetweenDose:
            Instance.GetInstance().configCache.getCache().SYSTEMATIC_DOSE
              .METERS_BETWEEN_DOSE,
          dose: {
            amount: preset.DOSE_AMOUNT,
            centerApplicator:
              centerApplicatorActive.current &&
              centerApplicatorAvailable.current,
            leftApplicator:
              leftApplicatorActive.current && leftApplicatorAvailable.current,
            rightApplicator:
              rightApplicatorActive.current && rightApplicatorAvailable.current,
          },
        });

        const responseDto = await Instance.GetInstance().combateApp.request(
          requestDto,
          doseCallback
        );
        setVelocity(responseDto.gps.speed);

        updateApplicatorsStatus(responseDto);

        if (leftApplicatorAvailable && !leftApplicatorActive) {
          setLeftApplicatorActive(true);
        }
        if (rightApplicatorAvailable && !rightApplicatorActive) {
          setRightApplicatorActive(true);
        }
        if (centerApplicatorAvailable && !centerApplicatorActive) {
          setCenterApplicatorActive(true);
        }
      } catch (err) {
        await Instance.GetInstance().errorHandler.handle(err);
      } finally {
        setRequestOnProgress(false);
        callback();
      }
    },
    [
      leftApplicatorActive,
      rightApplicatorActive,
      centerApplicatorActive,
      rightApplicatorAvailable,
      centerApplicatorAvailable,
      leftApplicatorAvailable,
    ]
  );

  const onPresetPressed = useCallback(
    async (
      preset: { NAME: string; DOSE_AMOUNT: number },
      callback: () => void
    ) => {
      async function process() {
        await processDose(preset, callback);
      }

      for (let i = 0; i < promises.current.length; i++) {
        if (promises.current[i].type == EventEnum.TrackPoint.name) {
          promises.current.splice(i, 1);
        }
      }
      promises.current.push({
        process: process,
        type: EventEnum.Local.name,
      });
    },
    []
  );

  const onEventRegister = useCallback(
    (requestDto: RequestDto, callback: () => void) => {
      async function process() {
        setRequestOnProgress(true);
        try {
          await Instance.GetInstance().combateApp.request(
            requestDto,
            doseCallback
          );
        } catch (err) {
          await Instance.GetInstance().errorHandler.handle(err);
        } finally {
          setRequestOnProgress(false);
          callback();
        }
      }

      promises.current.push({
        process: process,
        type: EventEnum.Obstacle.name,
      });
    },

    [processDose]
  );

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Box
          height={"15%"}
          alignItems="center"
          justifyContent="center"
          width="100%"
        >
          <StatusBar
            velocity={velocity}
            applicatorsLoadPercentage={applicatorsLoadPercentage}
          />
        </Box>

        <Box height={"60%"} width={"100%"}>
          <PoisonAmountSelector onPresetPressed={onPresetPressed} />
        </Box>

        <Box
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="15%"
        >
          <ApplicatorSelector
            leftApplicatorActive={leftApplicatorActiveState}
            leftApplicatorAvailable={leftApplicatorAvailableState}
            rightApplicatorActive={rightApplicatorActiveState}
            rightApplicatorAvailable={rightApplicatorAvailableState}
            centerApplicatorActive={centerApplicatorActiveState}
            centerApplicatorAvailable={centerApplicatorAvailableState}
            onLeftApplicatorSelected={setLeftApplicatorActive}
            onCenterApplicatorSelected={setCenterApplicatorActive}
            onRightApplicatorSelected={setRightApplicatorActive}
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
                alignSelf: "center",
              }}
            >
              <Box
                style={{
                  width: 70,
                  height: 5,
                  borderRadius: 3,
                  backgroundColor: "white",
                  marginTop: 9,
                }}
              />
            </Box>
          )}
          backgroundStyle={{ backgroundColor: Theme().color.b400 }}
          style={{
            shadowColor: "#000",
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
            onFinishPressed={onFinishButtonPress}
            appliedDoses={appliedDoses}
          />
        </BottomSheet>
      </GestureHandlerRootView>
    </>
  );
}

export default ExecutionScreen;
