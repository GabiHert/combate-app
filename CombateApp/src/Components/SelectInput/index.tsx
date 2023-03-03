import { FormControl, Select, WarningOutlineIcon } from "native-base";
import React from "react";


class SelectInput extends React.Component<{
    title:string;
    errorMessage?:string;
    placeholder:string;
    items:Array<{value:string;label:string;}>
}> {

    constructor(props:any){
        super(props);
    }

	render() {
		return (
            <FormControl w="60%"  isRequired isInvalid={this.props.errorMessage!=undefined&&this.props.errorMessage!=""}>
            <FormControl.Label _text={{fontWeight:"bold", fontSize:15}}>{this.props.title}</FormControl.Label>
            <Select borderRadius={20}  placeholder={this.props.placeholder} mt="1">
                {
                    this.props.items.map((item)=>{
                        return <Select.Item key={item.label} label={item.label} value={item.value}/>
                    })
                }
            </Select>
            {
                this.props.errorMessage!=undefined&&this.props.errorMessage!=""?
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {this.props.errorMessage}
                </FormControl.ErrorMessage>
                :  ""
            }
   
            </FormControl>

		);
	}
}

export default SelectInput;



