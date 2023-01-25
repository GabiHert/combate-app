import React from 'react';
import { Text, View } from 'react-native';
import style from './style';

export default class StatusIndicator extends React.Component<{
  label: string;
  status: {color: string; name: string};
  marginRight?: number | string;
  marginLeft?: number | string;
}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          marginLeft: this.props.marginLeft,
          marginRight: this.props.marginRight,
          ...style.statusIndicatorContainer,
        }}>
        <Text style={style.label}>{this.props.label}</Text>
        <View
          style={{
            backgroundColor: this.props.status.color,
            ...style.statusIndicator,
          }}>
          <Text style={style.status}>{this.props.status.name}</Text>
        </View>
      </View>
    );
  }
}
