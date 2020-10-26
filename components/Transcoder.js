import React, { useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import {WSC_BASE_URL, API_KEY, ACCESS_KEY} from '../constants'
import request from '../WscApi';
import Stats from './Stats'
import Usage from './Usage'

const intialMetrics = {
  bytes: [],
  width: 0,
  height: 0,
  frameRate: 0,
  keyframeInterval: 0
}

export default function Transcoder({route, navigation}) {
  const {transcoder} = route.params;
  const {state} = route.params;
  const statsPollingInterval = useRef(null);
  const [uptimes,setUptimes] = useState([]);


  const [, setTick] = useState(0);
  const metrics = useRef({bytes: {in: [], out: []}});
  const [usage,setUsage] = useState({});

  // useEffect(() => {
  //   let endpoint = `transcoders/${transcoder.id}/uptimes`
  //   request('GET', endpoint).then((data) => {
  //     setUptimes(data.uptimes.reverse().slice(0,5));
  //
  //   });
  // },[]);

  useEffect(() => {
    let endpoint;

    if(state == "started"){
      endpoint = `transcoders/${transcoder.id}/stats`
      statsPollingInterval.current = setInterval(() => {
                                        request('GET', endpoint).then((data) => {
                                          metrics.current.bytes.in = [...metrics.current.bytes.in, data.transcoder.bytes_in_rate.value]
                                          metrics.current.bytes.out = [...metrics.current.bytes.out, data.transcoder.bytes_out_rate.value]
                                          metrics.current.width = data.transcoder.width.value
                                          metrics.current.height = data.transcoder.height.value
                                          metrics.current.frameRate = data.transcoder.frame_rate.value
                                          metrics.current.keyframeInterval = data.transcoder.keyframe_interval.value
                                          setTick(Math.random());
                                        });
                                      },1000);
    }
  },[state]);

  useEffect(() => {
    let endpoint;

    if(transcoder.id){
      endpoint = `usage/transcoders/${transcoder.id}`
      request('GET', endpoint).then((data) => {
        console.log(data);
        setUsage({
          archived: data.transcoder.archived,
          transcoderType: data.transcoder.transcoder_type,
          bytes: data.transcoder.bytes,
          seconds: data.transcoder.seconds,
        });
      });
    }
  },[transcoder]);

  if(state == "started"){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{transcoder.name} - {route.params.state}</Text>
        <Stats bytes={metrics.current.bytes} width={metrics.current.width} height={metrics.current.height} frameRate={metrics.current.frameRate} keyframeInterval={metrics.current.keyframeInterval} />
      </View>
    );
  }else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{transcoder.name} - {route.params.state}</Text>
        <Usage archived={usage.archived} transcoderType={usage.transcoderType} bytes={usage.bytes} seconds={usage.seconds} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
  },
});
