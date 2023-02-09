import React from 'react';
import {Pressable, Text} from 'react-native';
import style from './style';

export default class RoundedButton extends React.Component<
	{
		text: string;
		colorPressIn: string;
		colorPressOut: string;
		onPressIn?: any;
		onPressOut?: any;
		opacityPressIn: number;
		opacityPressOut: number;
	},
	{pressed: boolean}
> {
	constructor(props) {
		super(props);
		this.state = {pressed: false};
	}

	render() {
		if (this.state.pressed) {
			return (
				<Pressable
					onPressIn={() => {
						this.setState({pressed: true});
						if (this.props.onPressIn) {
							this.props.onPressIn();
						}
					}}
					style={{
						...style.button,
						...{opacity: this.props.opacityPressIn},
						backgroundColor: this.props.colorPressIn,
					}}>
					<Text style={style.buttonText}>{this.props.text}</Text>
				</Pressable>
			);
		} else {
			return (
				<Pressable
					onPressOut={() => {
						this.setState({pressed: false});
						if (this.props.onPressOut) {
							this.props.onPressOut();
						}
					}}
					style={{
						...style.button,
						...{opacity: this.props.opacityPressOut},
						backgroundColor: this.props.colorPressOut,
					}}>
					<Text style={style.buttonText}>{this.props.text}</Text>
				</Pressable>
			);
		}
	}
}
