import {View, StyleSheet, Pressable} from 'react-native';
import React from 'react';

export default function Figure({chessboardSquareSize, onPressSquare}) {
  const chessboardSquares = [];

  for (let i = 0; i < 8; i++) {
    const lineComponents = [];
    for (let j = 0; j < 8; j++) {
      const componentStyle = {
        height: chessboardSquareSize,
        width: chessboardSquareSize,
        backgroundColor:
          (j + i) % 2 === 0 ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.2)',
      };
      lineComponents.push(
        <Pressable
          key={`square_${i}_${j}`}
          onPress={() => onPressSquare({x: j, y: i})}>
          <View style={componentStyle} />
        </Pressable>,
      );
    }
    chessboardSquares.push(
      <View key={`chessRow_${i}`} style={styles.row}>
        {lineComponents}
      </View>,
    );
  }

  return <View style={styles.wrapper}>{chessboardSquares}</View>;
}

const styles = StyleSheet.create({
  wrapper: {position: 'absolute', top: 100},
  row: {flexDirection: 'row'},
});
