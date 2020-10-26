import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import TranscoderList from './TranscoderList'


export default function Landing(props) {
  const [query,setQuery] = useState("")

  console.log(props);

  return (
    <View style={styles.container}>
      <TextInput style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, padding: 5, margin: 5 }} placeholder="Search" onChangeText={text => setQuery(text)}></TextInput>
      <Text style={styles.header}>Started</Text>
      <TranscoderList transcoders={props.transcoders.started.filter((transcoder) => (transcoder.name.includes(query) || transcoder.id.includes(query)))} navigation={props.navigation} state="started"/>
      <Text style={styles.header}>Stopped</Text>
      <TranscoderList transcoders={props.transcoders.stopped.filter((transcoder) => (transcoder.name.includes(query) || transcoder.id.includes(query)))} navigation={props.navigation} state="stopped"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headers: {
    fontSize: 25,
    fontWeight: "bold"
  }
});
