import { Box, Button, IconButton, Text } from 'native-base';
import React from 'react';
import { ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Config } from '../../app/config/config';
import { Theme } from '../../app/theme/theme';
import style from './style';
const image = require('../../app/assets/homebackground.png');

class HomeScreen extends React.Component<{
	navigation: any;
},{	startButtonPressed: boolean;}> {
	constructor(props) {
		super(props);
	}
	onStartButtonPressed() {
		this.props.navigation.navigate('ExecutionScreen');
	}

	onSettingsButtonPressed() {
		this.props.navigation.navigate('ConfigScreen');
	}
	render() {
		return (
			<SafeAreaView>
				<ImageBackground
					resizeMode="cover"
					source={image}
					style={style.container}>
					<IconButton
					style={{alignSelf:"flex-end"}}
					_icon={{as: Icon ,name:"settings", size:30,color:"black"}}
					onPressOut={() => {
						this.onSettingsButtonPressed();
					}}>
					</IconButton>

					<Box width={"100%"} height={"90%"} justifyContent="center" alignItems="center">

						<Button _pressed={{opacity:0.8}} bgColor={Theme().color.b200}  _text={{color:"black",fontSize:25}} onPressOut={()=>{this.onStartButtonPressed()}}  width="40%" height="15%" borderRadius={50}>
							{Config().LABELS.PT_BT.HOME_SCREEN.START_BUTTON}
						</Button>
					
					</Box>

					<Box width={"100%"} height={"5%"} justifyContent="center" alignItems="center">
							<Text color="white" fontSize={20}> {Config().APPLICATION.VERSION}</Text>
					</Box>

				</ImageBackground>
			</SafeAreaView>
		);
	}
}

export default HomeScreen;
