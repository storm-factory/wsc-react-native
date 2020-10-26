import React, {useState} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';


const truncateName = (name) => {
  if (name.length > 20) {
    return name.substring(0, 20) + "...";
} else {
    return name;
}
};

const Item = ({id,name, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={styles.text}>{id} - {truncateName(name)}</Text>
  </TouchableOpacity>
);

export default function TranscoderList(props) {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <View style={styles.container}>
      <FlatList
        data={props.transcoders}
        style={styles.list}
        renderItem={({item}) => <Item name={item.name} id={item.id} onPress={() => props.navigation.navigate('Transcoder', { transcoder: item, state: props.state })}/>}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 300,
    width: 300
  },
  item: {
    display: 'flex',
    marginBottom: 5,
  },
  text: {
    fontSize: 20,
  },
  list: {
    backgroundColor: '#d2d2d2',
  }
});
