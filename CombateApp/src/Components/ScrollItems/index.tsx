import { Center, Divider, HStack, ScrollView } from 'native-base';
import { FlatList, SafeAreaView } from 'react-native';
import { Text } from 'react-native-svg';
import { Theme } from '../../app/theme/theme';

function Item(props: { label: string }) {
  return <HStack></HStack>;
}

function ScrollItems(props: {
  items: Array<{ label: string; value: any }>;
  w: string | number;
  maxH: string | number;
}) {
  return (
    <SafeAreaView
      style={{
        width: props.w,
        maxHeight: props.maxH,
      }}
    >
      <FlatList
        data={props.items}
        renderItem={({ item }) => <Item label={item.label} />}
        keyExtractor={(item) => ''}
      />
    </SafeAreaView>
  );
}
export default ScrollItems;
