import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function Stats(props) {

  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.column}>Bytes in:</Text>
        <Text style={styles.column}>{props.bytes.in.slice(-1)[0]}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.column}>Bytes out:</Text>
        <Text style={styles.column}>{props.bytes.out.slice(-1)[0]}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.column}>Width:</Text>
        <Text style={styles.column}>{props.width}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.column}>Height:</Text>
        <Text style={styles.column}>{props.height}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.column}>Frame Rate:</Text>
        <Text style={styles.column}>{props.frameRate}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.column}>Keyframe Interval:</Text>
        <Text style={styles.column}>{props.keyframeInterval}</Text>
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
