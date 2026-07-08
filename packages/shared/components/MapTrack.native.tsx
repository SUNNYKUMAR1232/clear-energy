import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { StyleSheet } from 'react-native';

export function MapTrack() {
  return (
    <Svg viewBox="0 0 390 256" style={StyleSheet.absoluteFill}>
      <Path d="M40 200 Q 130 180 180 140 T 280 90 T 350 50" stroke="#0F766E" strokeWidth="3" fill="none" strokeDasharray="6 4" />
      <Circle cx="40" cy="200" r="8" fill="#10b981" stroke="white" strokeWidth="3" />
      <Circle cx="180" cy="140" r="6" fill="#0F766E" />
      <Circle cx="280" cy="90" r="6" fill="#0F766E" />
      <Circle cx="350" cy="50" r="8" fill="#0F766E" stroke="white" strokeWidth="3" />
    </Svg>
  );
}
