import BottomSheet from '@gorhom/bottom-sheet';
import { Box, Button, IconButton, Stack } from 'native-base';
import React from 'react';
import { Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Theme } from '../../app/theme/theme';
import style from './style';

class ExecutionScreen extends React.Component<{navigation: any}> {
	bottomSheetRef: React.RefObject<BottomSheet>;
	snapPoints: any;
	handleSheetChanges: any;
	constructor(props) {
		super(props);
		this.bottomSheetRef = React.createRef();
		this.snapPoints = ['3.5%', '20%', '50%'];
	}

	render() {
		return (
			<GestureHandlerRootView style={{flex: 1}}>
				<Box height={"15%"} alignItems="center" justifyContent="center" width="100%">
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
				</Box>

				<Stack direction="row" width="100%" alignItems={"center"} justifyContent={"center"} height="50%" bgColor={"black"}>

					<Box width="40%" height={"100%"} alignItems={"center"} justifyContent={"center"}>
						<Stack direction="column" width="90%" height={"75%"} borderRadius={10} alignItems={"center"} justifyContent={"center"} backgroundColor={Theme().color.b300} marginLeft={2}>
							<IconButton width="50%" height="10%" bgColor={"transparent"} _pressed={{opacity:0.8}} _icon={{as:Icon,name:"keyboard-arrow-up",size:270,color:Theme().color.b200}}/>
							<Text style={{color:"black",fontSize:110, fontWeight:"bold",width:"100%",textAlign:"center"}}>99</Text>
							<IconButton width="50%" height="10%" bgColor={"transparent"} _pressed={{opacity:0.8}} _icon={{as:Icon,name:"keyboard-arrow-down",size:270,color:Theme().color.b200}}/>
						</Stack>
					</Box>

					<Box width="60%"  height="100%" alignItems="center" justifyContent="center" paddingRight={3} paddingLeft={5} >
						<Stack direction={"column"}  alignItems="center" justifyContent="center" height="75%" width="100%"  borderRadius={20} backgroundColor={Theme().color.b300}>
							<Text style={{color:"black",fontSize:15,textAlign:"center",marginBottom:10}}>Presets</Text>
							<Button marginBottom={5}  bgColor={Theme().color.b200} width="90%" height={"15%"} _text={{color:"black"}} _pressed={{opacity:0.8}}>TESTE</Button>
							<Button marginBottom={5} bgColor={Theme().color.b200} width="90%" height={"15%"} _text={{color:"black"}} _pressed={{opacity:0.8}}>TESTE</Button>
							<Button marginBottom={5} bgColor={Theme().color.b200} width="90%" height={"15%"} _text={{color:"black"}} _pressed={{opacity:0.8}}>TESTE</Button>
							<Button bgColor={Theme().color.b200} width="90%" height={"15%"} _text={{color:"black"}} >TESTE</Button>
						</Stack>
					</Box>
				
				</Stack>

				
				<Box alignItems="center" justifyContent="center" width="100%"height="20%">
					<Button width="50%" borderRadius={10} height="80%" bgColor={Theme().color.b200} _pressed={{opacity:0.8}} _text={{color:"black"}}>Dosar</Button>
				</Box>
				
				<Box alignItems="center" justifyContent="center" width="100%"height="15%">
					<Box width="85%" borderRadius={50} height="95%" bgColor={Theme().color.b400} _text={{textAlign:"center",height:4}}>
						Dosadores
						<Stack  direction={"row"} alignItems="center" justifyContent="center" width="100%" >
							<Box width={"30%"} height="95%" alignItems="center" justifyContent="center">
							<Box width={"90%"} height="100%" alignItems="center" justifyContent="center" _text={{color:"white"}}>
							<Button bgColor={Theme().color.b200} width="100%" height={"70%"} _text={{color:"black"}} _pressed={{opacity:0.8}}>TESTE</Button>
							</Box>
							</Box>

							<Box width={"30%"} height="95%" alignItems="center" justifyContent="center">
							<Box width={"90%"} height="100%" alignItems="center" justifyContent="center" _text={{color:"white"}}>
							<Button bgColor={Theme().color.b200} width="100%" height={"70%"} _text={{color:"black"}} _pressed={{opacity:0.8}}>TESTE</Button>
							</Box>
							</Box>

							<Box width={"30%"} height="95%" alignItems="center" justifyContent="center">
							<Box width={"90%"} height="100%" alignItems="center" justifyContent="center" _text={{color:"white"}}>
							<Button bgColor={Theme().color.b200} width="100%" height={"70%"} _text={{color:"black"}} _pressed={{opacity:0.8}}>TESTE</Button>
							</Box>
							</Box>
						</Stack>
					</Box>
				</Box>
		

				<BottomSheet
					ref={this.bottomSheetRef}
					index={0}
					snapPoints={this.snapPoints}
					onChange={this.handleSheetChanges}
					handleComponent={() => (
						<Box style={style.closeLineContainer}>
							<Box style={style.closeLine} />
						</Box>
					)}
					backgroundStyle={{backgroundColor: Theme().color.b400}}
					style={style.bottomSheet}>
					<View style={style.contentContainer}>
						<Text>Awesome 🎉</Text>
					</View>
				</BottomSheet>
			</GestureHandlerRootView>
		);
	}
}

export default ExecutionScreen;
