import {View, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import Bush from './Bush';

const widthPercent = Dimensions.get('window').width / 100;

export default function GrassBottom({chessboardHeight}) {
  return (
    <View
      style={[styles.wrapper, {height: chessboardHeight + 80}]}
      pointerEvents={'none'}>
      <View style={{}} />
      <Bush x={0} y={widthPercent * 83} />
      <Bush x={2} y={widthPercent * 12} />
      <Bush x={-4} y={widthPercent * 55} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: '#fff',
    top: 60,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
  },
  differentArea: {
    backgroundColor: '#60d9a7',
  },
});
