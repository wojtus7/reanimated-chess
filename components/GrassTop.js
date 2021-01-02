import {View, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import Bush from './Bush';

const widthPercent = Dimensions.get('window').width / 100;

export default function GrassTop({chessboardHeight}) {
  return (
    <View style={styles.wrapper} pointerEvents={'none'}>
      <Bush x={chessboardHeight / 2 + 15} y={widthPercent * 1} />
      <Bush x={chessboardHeight / 2 - 15} y={widthPercent * 99} />

      <Bush x={chessboardHeight + 10} y={widthPercent * 83} />
      <Bush x={chessboardHeight + 20} y={widthPercent * 49} />
      <Bush x={chessboardHeight + 15} y={widthPercent * 14} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    top: 60,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
