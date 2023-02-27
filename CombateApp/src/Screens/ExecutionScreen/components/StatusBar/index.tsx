import { Box, Stack } from "native-base";
import React from "react";
import { Theme } from "../../../../app/theme/theme";

class StatusBar extends React.Component<{}> {

	constructor(props) {super(props);	}

	render() {
		return (
			<>
                <Stack direction="row" alignItems="center" justifyContent="center"  bgColor={Theme().color.b400} width="100%" borderRadius={50} height="95%">

                <Box width={"22%"} height="95%" alignItems="center" justifyContent="center">
                <Box width={"90%"} height="100%" alignItems="center" justifyContent="center" _text={{color:"white"}}>
                Dosadores							
                <Box bgColor={Theme().color.sWarning} borderRadius={50} alignItems="center" justifyContent="center" width="100%" height={"70%"}>
                    USO
                </Box>
                </Box>
                </Box>

                <Box width={"22%"} height="95%" alignItems="center" justifyContent="center">
                <Box width={"90%"} height="100%" alignItems="center" justifyContent="center" _text={{color:"white"}}>
                    GPS
                    <Box bgColor={Theme().color.sOk} borderRadius={50} alignItems="center" justifyContent="center" width="100%" height={"70%"}>
                    OK
                    </Box>
                </Box>
                </Box>

                <Box width={"22%"} height="95%" alignItems="center" justifyContent="center">
                <Box width={"90%"} height="100%" alignItems="center" justifyContent="center" _text={{color:"white"}}>
                    Bluetooth
                    <Box bgColor={Theme().color.sError} borderRadius={50} alignItems="center" justifyContent="center" width="100%" height={"70%"}>
                    ERROR
                    </Box>
                </Box>
                </Box>

                <Box width={"22%"} height="95%" alignItems="center" justifyContent="center">
                <Box width={"90%"} height="100%" alignItems="center" justifyContent="center" _text={{color:"white"}}>
                    Velocidade
                    <Box alignItems="center"  justifyContent="center" width="100%" height={"70%"} _text={{fontSize:50,color:"white", textAlign:"center"}}>
                    10
                    </Box>

                </Box>
                </Box>

                </Stack>
            </>
		);
	}
}

export default StatusBar;
