import {
  AddIcon,
  Box,
  DeleteIcon,
  Divider,
  FormControl,
  HStack,
  IconButton,
  Text,
  TextArea,
  WarningOutlineIcon,
} from 'native-base';
import { memo } from 'react';
import { appConfig } from '../../../../app/config/app-config';
import { Theme } from '../../../../app/theme/theme';

function ItemListInput(props: {
  items: Array<{ id: string; name: string }>;
  onAddItemPress: () => void;
  onDeleteItemRequested: (id: string) => void;
  title: string;
  errorMessage?: string;
}) {
  return (
    <>
      <HStack w={'50%'} space={2} alignItems={'center'} justifyContent={'center'}>
        <FormControl isInvalid={props.errorMessage && props.errorMessage != ''}>
          <FormControl.Label
            _text={{
              fontWeight: 'bold',
              fontSize: Theme().font.size.l(appConfig.screen),
            }}
          >
            {props.title}
          </FormControl.Label>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon />}>
            {props.errorMessage}
          </FormControl.ErrorMessage>
        </FormControl>

        <IconButton
          position={'absolute'}
          right={-20}
          onPress={props.onAddItemPress}
          icon={<AddIcon />}
          size={Theme().font.size.l(appConfig.screen)}
          _icon={{ color: Theme().color.b500 }}
          m={2}
          background={Theme().color.sOk}
          h={Theme().font.size.l(appConfig.screen) * 1.5}
          w={Theme().font.size.l(appConfig.screen) * 1.5}
          _pressed={{ opacity: 0.8 }}
        />
      </HStack>

      {props.items.length > 0
        ? props.items.map((item) => {
            return (
              <>
                <Divider key={item.id} w="50%" />
                <HStack space={2} alignItems={'center'} justifyContent={'center'}>
                  <Text p={5} w={'50%'}>
                    {item.name}
                  </Text>
                  <IconButton
                    icon={<DeleteIcon />}
                    size={Theme().font.size.l(appConfig.screen)}
                    _icon={{ color: Theme().color.sError }}
                    background="transparent"
                    _pressed={{ opacity: 0.8 }}
                    onPress={() => {
                      props.onDeleteItemRequested(item.id);
                    }}
                  />
                </HStack>
              </>
            );
          })
        : ''}

      <Divider w="50%" />
    </>
  );
}

export default memo(ItemListInput);
