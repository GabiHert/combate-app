import { FormControl, Slider } from "native-base";
import React from "react";
import { Theme } from "../../app/theme/theme";

class SlideInput extends React.Component<{
   disabled:boolean
   step:number
   defaultValue:number
   minValue:number
   maxValue:number
   onChangeEnd:(value:number) => void
   title:string
   unit?:string
},{value:number}> {
    
    constructor(props:any){
        super(props);
        this.state = {value:0}
    }

    onChange(value:number){
        this.setState({value:value})
    }

	render() {
		return (
            <FormControl isDisabled={this.props.disabled}  justifyContent={"center"} alignItems={"center"}>
            <FormControl.Label  _text={{fontWeight:"bold",fontSize:15}}>{this.props.title}</FormControl.Label>
            <FormControl.Label textAlign={"center"} _text={{fontWeight:"normal",fontSize:12}} >{this.state.value}{this.props.unit?" "+this.props.unit.toString():""}</FormControl.Label>
                <Slider w="60%"  onChange={(value:number)=>{this.onChange(value)}}  onChangeEnd={(value:number)=>{this.props.onChangeEnd(value)}} defaultValue={this.props.defaultValue} minValue={this.props.minValue} maxValue={this.props.maxValue} step={this.props.step} isDisabled={this.props.disabled}>
                <Slider.Track>
                <Slider.FilledTrack bgColor={Theme().color.b200} />
                </Slider.Track>
                <Slider.Thumb  bgColor={Theme().color.b200}/>
            </Slider>
          </FormControl>


		);
	}
}

export default SlideInput;



