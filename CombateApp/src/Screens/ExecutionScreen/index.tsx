import BottomSheet from '@gorhom/bottom-sheet';
import React from 'react';
import { Text, View } from 'react-native';
import { Theme } from '../../app/theme/theme';
import style from './style';

class ExecutionScreen extends React.Component<{navigation: any}> {
  bottomSheetRef: React.RefObject<BottomSheet>;
  snapPoints: any;
  handleSheetChanges: any;
  constructor(props) {
    super(props);
    this.bottomSheetRef = React.createRef();
    this.snapPoints = ['20%', '50%'];
  }

  render() {
    return (
      <BottomSheet
        ref={this.bottomSheetRef}
        index={0}
        snapPoints={this.snapPoints}
        onChange={this.handleSheetChanges}
        //enablePanDownToClose={true}
        handleComponent={() => (
          <View style={style.closeLineContainer}>
            <View style={style.closeLine} />
          </View>
        )}
        backgroundStyle={{backgroundColor: Theme().color.b400}}
        style={style.bottomSheet}>
        <View style={style.divider} />
        <View style={style.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    );
  }
}

export default ExecutionScreen;
