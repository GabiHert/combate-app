import { Button, FormControl, Modal } from 'native-base';
import { memo, useCallback, useState } from 'react';
import { appConfig } from '../../../../app/config/app-config';
import { Instance } from '../../../../app/instance/instance';
import { mapStringToItemArray } from '../../../../app/parser/map-string-to-item-array';
import { Theme } from '../../../../app/theme/theme';
import SelectInput from '../../../../Components/SelectInput';
import { RequestDto } from '../../../../../src/internal/core/dto/request-dto';

function EventRegisterModal(props: { isOpen: boolean; onClose: () => void;
  onEventRegister:(requestDto:RequestDto,callback:()=>void)=>void
}) {
  const [event, setEvent] = useState<string>();
  const [registerEventInProgress, setRegisterEventInProgress] = useState(false);
  const [eventError, setEventError] = useState<string>();
  const onEventChange = useCallback(
    (event: string) => {
      setEvent(event);
    },
    [setEvent]
  );

  const register = useCallback(async () => {
    try {
      const errorMessage = Instance.GetInstance().validator.validateEventForm(event);
      setEventError(errorMessage);
      if (!errorMessage) {
        const requestDto = new RequestDto({
          applicatorsAmount:
            Instance.GetInstance().preExecutionConfigCache.getCache().applicatorsAmount,
          client: Instance.GetInstance().preExecutionConfigCache.getCache().clientName,
          deviceName: Instance.GetInstance().preExecutionConfigCache.getCache().deviceName,
          doseWeightG: Instance.GetInstance().configCache.getCache().APPLICATION.DOSE_WEIGHT_G,
          event,
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
        await Instance.GetInstance().combateApp.request(requestDto);
        
      }
    } catch (err) {
      await Instance.GetInstance().errorHandler.handle(err)
    } finally {
 
    }
  }, [event, registerEventInProgress]);

  const onClose = useCallback(() => {
    setEventError('');
    props.onClose();
  }, []);
  

  async function onRegisterPress(){
    setRegisterEventInProgress(true);
     props.onEventRegister({
      applicatorsAmount:
        Instance.GetInstance().preExecutionConfigCache.getCache().applicatorsAmount,
      client: Instance.GetInstance().preExecutionConfigCache.getCache().clientName,
      deviceName: Instance.GetInstance().preExecutionConfigCache.getCache().deviceName,
      doseWeightG: Instance.GetInstance().configCache.getCache().APPLICATION.DOSE_WEIGHT_G,
      event,
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
    },()=>{
      props.onClose();
      setRegisterEventInProgress(false);
    })
  }
  
  return (
    <Modal isOpen={props.isOpen} onClose={onClose}>
      <Modal.Content maxWidth="500px" maxH={'500px'}>
        <Modal.CloseButton />
        <Modal.Header
          _text={{
            fontWeight: 'bold',
            fontSize: Theme().font.size.xl(appConfig.screen),
          }}
        >
          Sinalizar Evento
        </Modal.Header>
        <Modal.Body h={'100%'}>
          <FormControl.Label
            mt={5}
            _text={{ fontWeight: 'bold', fontSize: Theme().font.size.m(appConfig.screen) }}
          >
            Tipo de evento
          </FormControl.Label>
          <SelectInput
            errorMessage={eventError}
            onItemSelected={onEventChange}
            w={'100%'}
            h={20}
            title="Selecione tipo de evento que foi encontrado"
            placeholder=""
            items={mapStringToItemArray(Instance.GetInstance().configCache.getCache().EVENTS)}
          />
        </Modal.Body>
        <Modal.Footer
          _text={{ color: Theme().color.sError, position: 'absolute', left: 12, right: 0 }}
        >
          <Button
            isLoading={registerEventInProgress}
            isLoadingText={'Registrando'}
            _pressed={{ opacity: 0.8 }}
            bgColor={Theme().color.sWarning}
            _text={{
              color: Theme().color.b400,
              fontSize: Theme().font.size.m(appConfig.screen),
            }}
            borderRadius={20}
            onPress={onRegisterPress}
            h={20}
            w={40}
          >
            Registrar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export default memo(EventRegisterModal);
