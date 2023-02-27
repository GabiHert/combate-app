import BottomSheet from '@gorhom/bottom-sheet';
import { Box, Button } from 'native-base';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Theme } from '../../app/theme/theme';
import ApplicatorSelector from './components/ApplicatorSelector';
import PoisonAmountSelector from './components/PoisonAmountSelector';
import Sheet from './components/Sheet';
import StatusBar from './components/StatusBar';
import style from './style';

class ExecutionScreen extends React.Component<{navigation: any}> {
	bottomSheetRef: React.RefObject<BottomSheet>;
	snapPoints: any;
	handleSheetChanges: any;
	constructor(props) {
		super(props);
		this.bottomSheetRef = React.createRef();
		this.snapPoints = ['3.5%', '20%', '52%'];
	}

	render() {
		return (
			<GestureHandlerRootView style={{flex: 1}}>
				<Box height={"15%"} alignItems="center" justifyContent="center" width="100%">
					<StatusBar/>
				</Box>

				<Box height={"45%"}>
					<PoisonAmountSelector/>
				</Box>

				
				<Box alignItems="center" justifyContent="center" width="100%"height="20%">
					<Button width="60%" borderRadius={10} height="80%" bgColor={Theme().color.b200} _pressed={{opacity:0.8}} _text={{color:"black"}}>Dosar</Button>
				</Box>
				
				<Box alignItems="center" justifyContent="center" width="100%"height="15%">
					<ApplicatorSelector/>
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

					<Sheet/>
					
				</BottomSheet>
			</GestureHandlerRootView>
		);
	}
}

export default ExecutionScreen;
