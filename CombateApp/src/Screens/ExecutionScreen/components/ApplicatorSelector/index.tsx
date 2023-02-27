import { Box, Button, Stack, Text } from 'native-base';
import React from 'react';
import { Theme } from '../../../../app/theme/theme';

class ApplicatorSelector extends React.Component<{}> {

	constructor(props) {super(props);}

	render() {
		return (
			<>
                	<Box width="85%" borderRadius={20} height="95%" bgColor={Theme().color.b400}>
						<Text alignSelf={"center"} color="white" position={"absolute"}>Dosadores</Text>
						<Stack  direction={"row"} alignItems="center" justifyContent="center" width="100%" paddingTop={"2"}>
							<Box width={"30%"} height="95%" alignItems="center" justifyContent="center">
								<Box width={"90%"} height="100%" alignItems="center" justifyContent="center" _text={{color:"white"}}>
								<Button bgColor={Theme().color.b200} width="100%" height={"70%"} _text={{color:"black"}} borderRadius={50} _pressed={{opacity:0.8}}>Esquerdo</Button>
								</Box>
							</Box>

							<Box width={"30%"} height="95%" alignItems="center" justifyContent="center">
								<Box width={"90%"} height="100%" alignItems="center" justifyContent="center" _text={{color:"white"}}>
								<Button bgColor={Theme().color.b200} width="100%" height={"70%"} borderRadius={50} _text={{color:"black"}} _pressed={{opacity:0.8}}>Central</Button>
								</Box>
							</Box>

							<Box width={"30%"} height="95%" alignItems="center" justifyContent="center">
								<Box width={"90%"} height="100%" alignItems="center" justifyContent="center" _text={{color:"white"}}>
								<Button bgColor={Theme().color.b200} width="100%" height={"70%"} borderRadius={50} _text={{color:"black"}} _pressed={{opacity:0.8}}>Direito</Button>
								</Box>
							</Box>
						</Stack>
					</Box>
            </>
		);
	}
}

export default ApplicatorSelector;
