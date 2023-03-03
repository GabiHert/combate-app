import BottomSheet from '@gorhom/bottom-sheet';
import { Box, Button } from 'native-base';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Severity, SeverityEnum } from '../../api/core/enum/severity';
import { Theme } from '../../app/theme/theme';
import ApplicatorSelector from './components/ApplicatorSelector';
import PoisonAmountSelector from './components/PoisonAmountSelector';
import Sheet from './components/Sheet';
import StatusBar from './components/StatusBar';
import style from './style';

class ExecutionScreen extends React.Component<{navigation: any,route:any},
{
	applicator:{
		left:{
			load:number,
			available:boolean,
			active:boolean
		},
		center:{
			load:number,
			available:boolean,
			active:boolean
		},
		right:{
			load:number,
			available:boolean,
			active:boolean
		}
	}
	
	dose:{amount:number,},

	status:{
		gps:Severity,
		applicators:Severity,
		bluetooth:Severity,
	},

	velocity:number


}> {
	bottomSheetRef: React.RefObject<BottomSheet>;
	snapPoints: any;
	handleSheetChanges: any;
	constructor(props) {
		super(props);
		console.log(this.props.route)
		this.bottomSheetRef = React.createRef();
		this.snapPoints = ['3.5%', '20%', '52%'];
		this.state = {
			applicator:{
				center:{load:0, active:false,available:false},
				left:{load:0, active:false,available:false},
				right:{load:0, active:false,available:true}//todo: it should be `false`. It is true only for testing purposes
			},
			dose:{amount:0},
			status:{
				applicators: SeverityEnum.WARN,
				bluetooth: SeverityEnum.WARN,
				gps:SeverityEnum.WARN 
			},
			velocity:0
		}
		this.state.applicator.center.load = this.props.route.params.applicator.center.load
		this.state.applicator.left.load = this.props.route.params.applicator.left.load
		this.state.applicator.right.load = this.props.route.params.applicator.right.load

	}

	onFinishButtonPress(){
		this.props.navigation.navigate("HomeScreen");
	}

	onDoseAmountChange(amount:number){
		const state = this.state
		state.dose.amount = amount 
		this.setState(state)
	}

	onDoseButtonPress(){
		//todo: call backend
	}
	


	render() {
		return (
			<GestureHandlerRootView style={{flex: 1}}>
				<Box height={"15%"} alignItems="center" justifyContent="center" width="100%">
					<StatusBar velocity={this.state.velocity} applicatorStatus={this.state.status.applicators} gpsStatus={this.state.status.gps} bluetoothStatus={this.state.status.bluetooth}/>
				</Box>

				<Box height={"45%"}>
					<PoisonAmountSelector onDoseAmountChange={(amount:number)=>{this.onDoseAmountChange(amount)}}/>
				</Box>

				
				<Box alignItems="center" justifyContent="center" width="100%"height="20%">
					<Button onPressOut={()=>{this.onDoseButtonPress()}} width="60%" borderRadius={10} height="80%" bgColor={Theme().color.b200} _pressed={{opacity:0.8}} _text={{color:"black"}}>Dosar</Button>
				</Box>
				
				<Box alignItems="center" justifyContent="center" width="100%"height="15%">
					<ApplicatorSelector	applicator={this.state.applicator} />
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

					<Sheet onFinishPressed={()=>{this.onFinishButtonPress()}}/>
					
				</BottomSheet>
			</GestureHandlerRootView>
		);
	}
}

export default ExecutionScreen;
