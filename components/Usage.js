import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function Stats(props) {

  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.column}>Archived:</Text>
        <Text style={styles.column}>{props.archived ? "Yup" : "Nope"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.column}>Transcoder Type:</Text>
        <Text style={styles.column}>{props.transcoderType}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.column}>Bytes:</Text>
        <Text style={styles.column}>{props.bytes}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.column}>Seconds:</Text>
        <Text style={styles.column}>{props.seconds}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: 300,
    height: 50,
    backgroundColor: '#d2d2d2',
    justifyContent: 'center',
  },
  column: {
    width: 100,
    height: 200,
    justifyContent: 'center',
    marginTop: 10
  }
});
