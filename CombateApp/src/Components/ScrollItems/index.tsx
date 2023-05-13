import { ScrollView, Text } from 'native-base';
import { memo } from 'react';
import { SafeAreaView } from 'react-native';

function Item(props: { label: string }) {
  return <Text>{props.label}</Text>;
}

function ScrollItems(props: {
  items: Array<{ label: string; value: any }>;
  w: string | number;
  maxH: string | number;
}) {
  return (
    <SafeAreaView style={{ height: 100, width: 100 }}>
      <ScrollView>
        {props.items.map((item) => {
          return <Item key={Math.random().toString()} label={item.label} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
export default memo(ScrollItems);
