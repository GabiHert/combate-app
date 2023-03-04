import { FormControl, Input, ScrollView, VStack } from 'native-base';
import React from 'react';

function ConfigScreen(props: { navigation: any }) {
  return (
    <ScrollView w="100%" h="100%">
      <VStack width="100%" alignItems={'center'} justifyContent="center">
        <FormControl width={'60%'}>
          <FormControl.Label
            _text={{
              bold: true,
            }}
          >
            Name
          </FormControl.Label>
          <Input placeholder="John" />
          <FormControl.HelperText
            _text={{
              fontSize: 'xs',
            }}
          >
            Name should contain at least 3 character.
          </FormControl.HelperText>
          <FormControl.ErrorMessage
            _text={{
              fontSize: 'xs',
            }}
          >
            Error Name
          </FormControl.ErrorMessage>
        </FormControl>
      </VStack>
    </ScrollView>
  );
}

export default ConfigScreen;
