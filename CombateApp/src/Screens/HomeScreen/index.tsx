import React from 'react';
import {Dimensions, ImageBackground, Pressable, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Config} from '../../app/config/config';
import {Theme} from '../../app/theme/theme';
import RoundedButton from '../../Components/RoundedButton';
import style from './style';
const image = require('../../app/assets/homebackground.png');

class HomeScreen extends React.Component<{
	navigation: any;
	startButtonPressed: boolean;
}> {
	constructor(props) {
		super(props);
		this.state = {
			startButtonPressed: true,
			dimensions: {
				width: Dimensions.get('window').width,
				height: Dimensions.get('window').height,
			},
		};

		console.log(this.state);
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
					<Pressable
						style={{
							transform: [
								{
									translateY:
										this.state.dimensions.height - 1350,
								},
								{translateX: this.state.dimensions.width - 350},
							],
						}}
						onPressOut={() => {
							this.onSettingsButtonPressed();
						}}>
						<Icon name="settings" size={30} color="black" />
					</Pressable>
					<RoundedButton
						colorPressIn={Theme().color.b100}
						colorPressOut={Theme().color.b200}
						opacityPressIn={10}
						opacityPressOut={100}
						text={Config().LABELS.PT_BT.HOME_SCREEN.START_BUTTON}
						onPressOut={() => {
							this.onStartButtonPressed();
						}}
					/>
					<Text
						style={{
							transform: [
								{
									translateY:
										this.state.dimensions.height - 600,
								},
							],
							...style.versionText,
						}}>
						{Config().APPLICATION.VERSION}
					</Text>
				</ImageBackground>
			</SafeAreaView>
		);
	}
}

export default HomeScreen;
