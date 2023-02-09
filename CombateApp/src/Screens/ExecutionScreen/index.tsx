import BottomSheet from '@gorhom/bottom-sheet';
import { Box, Button } from 'native-base';
import React from 'react';
import { Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Theme } from '../../app/theme/theme';
import StatusIndicator from '../../Components/StatusIndicator';
import style from './style';
class ExecutionScreen extends React.Component<{navigation: any}> {
	bottomSheetRef: React.RefObject<BottomSheet>;
	snapPoints: any;
	handleSheetChanges: any;
	constructor(props) {
		super(props);
		this.bottomSheetRef = React.createRef();
		this.snapPoints = ['4%', '20%', '50%'];
	}

	render() {
		return (
			<GestureHandlerRootView style={{flex: 1}}>
				<Box style={style.statusBarContainer}>
					<Box style={style.statusBar}>
						<StatusIndicator
							label="Dosadores"
							status={{name: 'teste', color: 'yellow'}}
							marginLeft="3%"
						/>
						<StatusIndicator
							label="Bluetooth"
							status={{name: 'teste', color: 'yellow'}}
							marginLeft="3%"
						/>
						<StatusIndicator
							label="GPS"
							status={{name: 'teste', color: 'yellow'}}
							marginLeft="3%"
						/>
						<Box style={style.velocityContainer}>
							<Text style={style.velocityLabel}>Velocity</Text>
							<Box style={{flexDirection: 'row'}}>
								<Text style={style.velocity}>10 </Text>
								<Text
									style={{
										color: 'white',
										marginTop: '40%',
									}}>
									Km/h
								</Text>
							</Box>
						</Box>
					</Box>
				</Box>
				<Box alignItems="center" width="100%" height="60%">
				</Box>
				<Box alignItems="center"  justifyContent="center" style={style.doseButtonContainer}>
							<Button width="50%" height="95%" bgColor={Theme().color.b200} _pressed={{opacity:0.8}} _text={style.doseButtonLabel}>Dosar</Button>
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
