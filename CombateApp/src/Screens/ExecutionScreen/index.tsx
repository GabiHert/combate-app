import BottomSheet from '@gorhom/bottom-sheet';
import React from 'react';
import { Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Theme } from '../../app/theme/theme';
import StatusIndicator from '../../Components/StatusIndicator';
import style from './style';
class ExecutionScreen extends React.Component<{navigation: any}> {
  bottomSheetRef: React.RefObject<BottomSheet>;
  snapPoints: any;
  handleSheetChanges: any;
  constructor(props) {
    super(props);
    this.bottomSheetRef = React.createRef();
    this.snapPoints = ['4%', '20%', '50%'];
  }

  render() {
    return (
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={style.statusBarContainer}>
          <View style={style.statusBar}>
            <StatusIndicator
              label="Dosadores"
              status={{name: 'teste', color: 'yellow'}}
              marginLeft="3%"
            />
            <StatusIndicator
              label="Bluetooth"
              status={{name: 'teste', color: 'yellow'}}
              marginLeft="3%"
            />
            <StatusIndicator
              label="GPS"
              status={{name: 'teste', color: 'yellow'}}
              marginLeft="3%"
            />
            <View style={style.velocityContainer}>
              <Text style={style.velocityLabel}>Velocity</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={style.velocity}>10 </Text>
                <Text
                  style={{
                    color: 'white',
                    marginTop: '40%',
                  }}>
                  Km/h
                </Text>
              </View>
            </View>
          </View>
        </View>

        <BottomSheet
          ref={this.bottomSheetRef}
          index={0}
          snapPoints={this.snapPoints}
          onChange={this.handleSheetChanges}
          handleComponent={() => (
            <View style={style.closeLineContainer}>
              <View style={style.closeLine} />
            </View>
          )}
          backgroundStyle={{backgroundColor: Theme().color.b400}}
          style={style.bottomSheet}>
          <View style={style.contentContainer}>
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheet>
      </GestureHandlerRootView>
    );
  }
}

export default ExecutionScreen;
