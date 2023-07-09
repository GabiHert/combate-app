import { Button, FormControl, Modal } from 'native-base';
import { memo, useCallback, useState } from 'react';
import { appConfig } from '../../../../app/config/app-config';
import { Instance } from '../../../../app/instance/instance';
import { mapStringToItemArray } from '../../../../app/parser/map-string-to-item-array';
import { Theme } from '../../../../app/theme/theme';
import SelectInput from '../../../../Components/SelectInput';
import { CONSTANTS } from '../../../../internal/config/config';
import { RequestDto } from '../../../../internal/core/dto/request-dto';
import { EventEnum } from '../../../../internal/core/enum/event';
import UnderForestModal from '../UnderForestModal';

function FinishExecutionModal(props: {
  isOpen: boolean;
  onClose: () => void;
  onFinishExecutionPress: () => void;
  onEventRegister:(requestDto:RequestDto,callback:()=>void)=>void
}) {
  const [event, setEvent] = useState<string>();
  const [underForestModalVisible, setUnderForestModalVisible] = useState(false);
  const [underForest, setUnderForest] = useState<string>();
  const [eventError, setEventError] = useState<string>();
  const [registerEventInProgress, setRegisterEventInProgress] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onUnderForestModalClose = useCallback(() => {
    setUnderForestModalVisible(false);
  }, [setUnderForestModalVisible]);

  const onOkPress = useCallback( (
    callback:()=>void
  ) => {
    setUnderForestModalVisible(false);
    setLoading(true);

    props.onEventRegister({
      applicatorsAmount:
      Instance.GetInstance().preExecutionConfigCache.getCache().applicatorsAmount,
      client: Instance.GetInstance().preExecutionConfigCache.getCache().clientName,
      deviceName: Instance.GetInstance().preExecutionConfigCache.getCache().deviceName,
      doseWeightG: Instance.GetInstance().configCache.getCache().APPLICATION.DOSE_WEIGHT_G,
      event: EventEnum.EndTrackPoint.name,
      linesSpacing: Instance.GetInstance().configCache.getCache().LINE_SPACING,
      maxVelocity: Instance.GetInstance().configCache.getCache().APPLICATION.MAX_VELOCITY,
      plot: Instance.GetInstance().preExecutionConfigCache.getCache().plot,
      poisonType: Instance.GetInstance().configCache.getCache().POISON_TYPE,
      project: Instance.GetInstance().preExecutionConfigCache.getCache().projectName,
      streetsAmount: Instance.GetInstance().preExecutionConfigCache.getCache().streetsAmount,
      tractorName: Instance.GetInstance().preExecutionConfigCache.getCache().tractorName,
      weather: Instance.GetInstance().preExecutionConfigCache.getCache().weather,
    },()=>{
      callback();
      setLoading(false);
    })
  }, []);

  const onUnderForestModalOkPress = useCallback(
    async (underForest: string) => {
      setUnderForest(underForest);

      setUnderForestModalVisible(false);
      onOkPress(()=>{})
    },
    [setUnderForest, setUnderForestModalVisible]
  );

  const onFinishPressed = useCallback( () =>{
      setRegisterEventInProgress(true);
      const errorMessage = Instance.GetInstance().validator.validateFinishExecutionForm(event);
      if (!errorMessage) {
        if (event == CONSTANTS.FINISHED_WORK_REASON_NAME) {
          setUnderForestModalVisible(true);
        } else {
          onOkPress(()=>{props.onFinishExecutionPress();});
        }
      } else {
        setEventError(errorMessage);
      }
  }, [event, eventError, setUnderForestModalVisible]);

  const onClose = useCallback(() => {
    setEventError('');
    props.onClose();
  }, [setEventError]);

  return (
    <Modal isOpen={props.isOpen} onClose={onClose}>
      <UnderForestModal
        isOpen={underForestModalVisible}
        onClose={onUnderForestModalClose}
        onOkPress={onUnderForestModalOkPress}
      />
      <Modal.Content maxWidth="500px" maxH={'500px'}>
        <Modal.CloseButton />
        <Modal.Header
          _text={{
            fontWeight: 'bold',
            fontSize: Theme().font.size.xl(appConfig.screen),
          }}
        >
          Finalizar execução
        </Modal.Header>
        <Modal.Body h={'100%'}>
          <FormControl.Label
            mt={5}
            _text={{ fontWeight: 'bold', fontSize: Theme().font.size.m(appConfig.screen) }}
          >
            Motivo da parada
          </FormControl.Label>
          <SelectInput
            onItemSelected={setEvent}
            w={'100%'}
            h={20}
            title="Descreva o motivo do fim da execução"
            placeholder=""
            items={mapStringToItemArray(
              Instance.GetInstance().configCache.getCache().STOP_REASONS_EVENTS
            )}
            errorMessage={eventError}
          />
        </Modal.Body>
        <Modal.Footer
          _text={{ color: Theme().color.sError, position: 'absolute', left: 12, right: 0 }}
        >
          <Button
            _pressed={{ opacity: 0.8 }}
            bgColor={Theme().color.sError}
            _text={{
              color: Theme().color.b500,
              fontSize: Theme().font.size.m(appConfig.screen),
            }}
            borderRadius={20}
            onPress={onFinishPressed}
            h={20}
            w={40}
            isLoading={loading}
            isLoadingText={'Finalizando'}
          >
            Finalizar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export default memo(FinishExecutionModal);
