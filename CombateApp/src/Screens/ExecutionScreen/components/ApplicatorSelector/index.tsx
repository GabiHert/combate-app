import { Box, Button, Stack, Text } from 'native-base';
import React from 'react';
import { Theme } from '../../../../app/theme/theme';

class ApplicatorSelector extends React.Component<{	applicator:{
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
}},{	applicator:{
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
}}> {

	constructor(props) {
		super(props);
		this.state = {...this.props}
	}

	onLeftApplicatorPress(){
		if (this.state.applicator.left.available){
			const state = this.state
			state.applicator.left.active = !state.applicator.left.active
			this.setState(state)
		}
	}

	onRightApplicatorPress(){
		if (this.state.applicator.right.available){
			const state = this.state
			state.applicator.right.active = !state.applicator.right.active
			this.setState(state)
		}
	}

	onCenterApplicatorPress(){
		if (this.state.applicator.center.available){
			const state = this.state
			state.applicator.center.active = !state.applicator.center.active
			this.setState(state)
		}
	}

	render() {
		return (
			<>
                	<Box width="85%" borderRadius={20} height="95%" bgColor={Theme().color.b400}>
						<Text alignSelf={"center"} color="white" position={"absolute"}>Dosadores</Text>
						<Stack  direction={"row"} alignItems="center" justifyContent="center" width="100%" paddingTop={"2"}>
							<Box width={"30%"} height="95%" alignItems="center" justifyContent="center">
								<Box width={"90%"} height="100%" alignItems="center" justifyContent="center" _text={{color:"white"}}>
								<Button isDisabled={!this.props.applicator.left.available}  onPressOut={()=>{this.onLeftApplicatorPress()}} _disabled={{opacity:0.5}} bgColor={this.state.applicator.left.active?Theme().color.sOk:Theme().color.b200} width="100%" height={"70%"} _text={{color:"black"}} borderRadius={50} _pressed={{opacity:0.8}}>Esquerdo</Button>
								</Box>
							</Box>

							<Box width={"30%"} height="95%" alignItems="center" justifyContent="center">
								<Box width={"90%"} height="100%" alignItems="center" justifyContent="center" _text={{color:"white"}}>
								<Button isDisabled={!this.props.applicator.center.available}  onPressOut={()=>{this.onCenterApplicatorPress()}} _disabled={{opacity:0.5}} bgColor={this.state.applicator.center.active?Theme().color.sOk:Theme().color.b200} width="100%" height={"70%"} borderRadius={50} _text={{color:"black"}} _pressed={{opacity:0.8}}>Central</Button>
								</Box>
							</Box>

							<Box width={"30%"} height="95%" alignItems="center" justifyContent="center">
								<Box width={"90%"} height="100%" alignItems="center" justifyContent="center" _text={{color:"white"}}>
								<Button isDisabled={!this.props.applicator.right.available}  onPressOut={()=>{this.onRightApplicatorPress()}} _disabled={{opacity:0.5}} bgColor={this.state.applicator.right.active?Theme().color.sOk:Theme().color.b200} width="100%" height={"70%"} borderRadius={50} _text={{color:"black"}} _pressed={{opacity:0.8}}>Direito</Button>
								</Box>
							</Box>
						</Stack>
					</Box>
            </>
		);
	}
}

export default ApplicatorSelector;
