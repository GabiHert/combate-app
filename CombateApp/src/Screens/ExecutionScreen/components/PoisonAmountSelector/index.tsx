import { Box, Button, IconButton, Stack, Text } from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Theme } from '../../../../app/theme/theme';


class PoisonAmountSelector extends React.Component<{}> {

	constructor(props) {super(props);	}

	render() {
		return (
            <Stack direction="row" width="100%" alignItems={"center"} justifyContent={"center"} height="100%">
                <Box width="40%" height={"100%"} alignItems={"center"} justifyContent={"center"}>
                    <Stack direction="column" width="90%" height={"90%"} borderRadius={20} alignItems={"center"} justifyContent={"center"} backgroundColor={Theme().color.b300} marginLeft={2}>
                            <Text fontSize={15} height={"20%"}  marginBottom={1} color={"black"}>Doses</Text>
                            <IconButton width="100%"  height={"5%"} bgColor={"transparent"} _pressed={{opacity:0.8}} _icon={{as:Icon,name:"keyboard-arrow-up",size:250,color:Theme().color.b200}}/>
                            <Text fontSize={90} fontWeight="bold" color={"black"}>99</Text>
                            <IconButton width="100%" height={"20%"}  bgColor={"transparent"} _pressed={{opacity:0.8}} _icon={{as:Icon,name:"keyboard-arrow-down",size:250,color:Theme().color.b200}}/>
                    </Stack>
                </Box>

                <Box width="60%"  height="100%" alignItems="center" justifyContent="center" paddingRight={3} paddingLeft={5} >
                    <Stack direction={"column"}  alignItems="center" justifyContent="center" height="85%" width="100%"  borderRadius={20} backgroundColor={Theme().color.b300}>
                        <Text style={{color:"black",fontSize:15,textAlign:"center",marginBottom:10}}>Presets</Text>
                        <Button marginBottom={5}  bgColor={Theme().color.b200} width="90%" height={"15%"} _text={{color:"black"}} _pressed={{opacity:0.8}}>TESTE</Button>
                        <Button marginBottom={5} bgColor={Theme().color.b200} width="90%" height={"15%"} _text={{color:"black"}} _pressed={{opacity:0.8}}>TESTE</Button>
                        <Button marginBottom={5} bgColor={Theme().color.b200} width="90%" height={"15%"} _text={{color:"black"}} _pressed={{opacity:0.8}}>TESTE</Button>
                        <Button bgColor={Theme().color.b200} width="90%" height={"15%"} _text={{color:"black"}} >TESTE</Button>
                    </Stack>
                </Box>		
            </Stack>
		);
	}
}

export default PoisonAmountSelector;
