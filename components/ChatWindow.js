import {View, StyleSheet, Dimensions, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import ManPlayer from './../assets/015-chess-player.png';

const squareWidth = (Dimensions.get('window').width - 30) / 3;

export default function ChatWindow({
  chessboardSquareWidth,
  chessboardSquareHeight,
  onPressSquare,
  currentPossibleMoves,
}) {
  return (
    <View style={styles.wrapper}>
      <FastImage
        source={ManPlayer}
        style={{height: squareWidth, width: squareWidth}}
      />
      <View style={styles.cloud}>
        <Text>Woah! Looking cool, Joker!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cloud: {
    borderRadius: 15,
    borderWidth: 3.3,
    borderColor: 'black',
    margin: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    maxWidth: squareWidth * 2 - 10,
    justifyContent: 'center',
    left: 0,
  },
});
