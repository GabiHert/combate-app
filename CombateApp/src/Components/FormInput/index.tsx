import { FormControl, Input, WarningOutlineIcon } from "native-base";
import React from "react";
import { KeyboardTypeOptions } from "react-native";
import { Theme } from "../../app/theme/theme";


class FormInput extends React.Component<{
    title:string;
    description:string;
    errorMessage:string;
    placeholder:string;
    keyboardType?:KeyboardTypeOptions;
}> {

    constructor(props:any){
        super(props);

    }

	render() {
		return (

            <FormControl width={"60%"} isInvalid={this.props.errorMessage!=undefined&&this.props.errorMessage!=""}>
                <FormControl.Label _text={{bold: true, fontSize:15}}>{this.props.title}</FormControl.Label>
                <Input  keyboardType={this.props.keyboardType} borderRadius={20} placeholder={this.props.placeholder} _invalid={{borderColor:Theme().color.sError, borderWidth:3}} borderWidth={1.5}/>
                {this.props.errorMessage?
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon/>}>
                         {this.props.errorMessage}
                    </FormControl.ErrorMessage> :
                   <FormControl.HelperText _text={{fontSize: 'xs' }}>
                      {this.props.description}
                   </FormControl.HelperText>
                }
         
            
            </FormControl>
		);
	}
}

export default FormInput;



