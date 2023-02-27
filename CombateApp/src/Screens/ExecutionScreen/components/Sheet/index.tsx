import { Box, Button, Stack, Text } from 'native-base';
import React from 'react';
import { Theme } from '../../../../app/theme/theme';

class Sheet extends React.Component<{}> {

	constructor(props) {
		super(props);
	}

	render() {
		return (
	
					<Box alignItems="center" justifyContent="flex-end">
						<Box height={"85%"}>
							<Box height={"44%"} width="100%" alignItems="center" justifyContent="center" paddingLeft={2} paddingRight={2}>
								<Stack direction={"row"}>
									<Box background={Theme().color.b200} width="45%" height={"100%"} marginRight={2} borderRadius={20} alignItems="center" justifyContent="center">
										Tempo em execução
										<Text fontSize={35} fontWeight="bold">01:29</Text>
									</Box>
									<Box background={Theme().color.b200} width="55%"  height={"100%"} borderRadius={20}  alignItems="center" justifyContent="center">
										Latitude
										<Text fontSize={20} marginBottom={2} fontWeight="bold">-30.066916126</Text>
										Longitude
										<Text fontSize={20} marginBottom={2} fontWeight="bold">-30.066916126</Text>
									</Box>
								</Stack>
							</Box>
							<Box height={"44%"} width="100%" alignItems="center" justifyContent="center" paddingLeft={2} paddingRight={2}>
								<Stack direction={"row"}>
									<Box background={Theme().color.b200} width="45%" height={"100%"} marginRight={2} borderRadius={20} alignItems="center" justifyContent="center">
										Total aplicado
										<Stack direction={"row"} alignItems="baseline" justifyContent="center" >
											<Text fontSize={35} fontWeight="bold">20</Text>
											<Text fontSize={10}>Doses</Text>
										</Stack>
										<Stack direction={"row"} alignItems="baseline" justifyContent="center" >
											<Text fontSize={35} fontWeight="bold">1000</Text>
											<Text fontSize={10}>g</Text>
										</Stack>
									</Box>
									<Box background={Theme().color.b200} width="55%"  height={"100%"} borderRadius={20}  alignItems="center" justifyContent="center">
										<Text>Reservatórios</Text>
										<Stack direction={"row"} alignItems="center" justifyContent="center" height={"75%"}>
											<Box borderRadius={20} bgColor={Theme().color.sOk} width="30%" alignItems="center" justifyContent="center" marginRight={1}>
												<Text fontSize={10}>Esquerdo</Text>
												<Text fontSize={20} fontWeight="bold">100%</Text>
											</Box>

											<Box borderRadius={20} bgColor={Theme().color.sWarning} width="30%" alignItems="center" justifyContent="center"  marginRight={1}>
												<Text fontSize={10}>Central</Text>
												<Text fontSize={20} fontWeight="bold">50%</Text>
											</Box>

											<Box borderRadius={20} bgColor={Theme().color.sError} width="30%" alignItems="center" justifyContent="center">
												<Text fontSize={10}>Direito</Text>
												<Text fontSize={20} fontWeight="bold">10%</Text>
											</Box>
										</Stack>
									</Box>
								</Stack>
							</Box>
						</Box>

						<Box height={"15%"} justifyContent="center" alignItems="center" width={"100%"} marginBottom={1}>
							<Button borderRadius={10} width="60%" height="100%" _pressed={{opacity:0.8}} backgroundColor={Theme().color.sError}>Encerrar</Button>
						</Box>
					</Box>
		);
	}
}

export default Sheet;
