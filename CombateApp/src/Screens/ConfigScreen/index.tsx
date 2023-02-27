import { FormControl, Input, VStack } from 'native-base';
import React from 'react';

class ConfigScreen extends React.Component<{navigation: any}> {
	render() {
		return (
	
			<VStack width="100%" alignItems={"center"} justifyContent="center">
			<FormControl width={"60%"}>
			  <FormControl.Label _text={{
			  bold: true
			}}>Name</FormControl.Label>
			  <Input placeholder="John"/>
			  <FormControl.HelperText _text={{
			  fontSize: 'xs'
			}}>
				Name should contain atleast 3 character.
			  </FormControl.HelperText>
			  <FormControl.ErrorMessage _text={{
			  fontSize: 'xs'
			}}>
				Error Name
			  </FormControl.ErrorMessage>
			</FormControl>
		  </VStack>
		);
	}
}

export default ConfigScreen;
