import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from './components/Landing'
import Transcoder from './components/Transcoder'
import request from './WscApi'

const Stack = createStackNavigator();

export default function App() {

  const [startedTranscoders,setStartedTranscoders] = useState([]);
  const [stoppedTranscoders,setStoppedTranscoders] = useState([]);
  const transcoders = {started: startedTranscoders, stopped: stoppedTranscoders}

  useEffect(() => {
    let endpoint;
    endpoint = 'transcoders?filter[0][field]=state&filter[0][eq]=started';
    request('GET', endpoint).then((data) => {
      setStartedTranscoders(data.transcoders);
    });
    endpoint = 'transcoders?filter[0][field]=state&filter[0][eq]=stopped';
    request('GET', endpoint).then((data) => {
      setStoppedTranscoders(data.transcoders);
    });
  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Transcoders">
          {props => <Landing {...props} transcoders={transcoders} />}
        </Stack.Screen>
        <Stack.Screen name="Transcoder" component={Transcoder} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  headers: {
    fontSize: 25,
    fontWeight: "bold"
  }
});
