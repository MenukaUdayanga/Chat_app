import React from 'react';
import {View, Text} from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

export default function Login() {
  return (
    <View
      style={{
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 100,
        width: 100,
        backgroundColor: '#e4eaf5',
        borderRadius: 15,
      }}>
      <SkypeIndicator color="#15bd1d" />
    </View>
  );
}
