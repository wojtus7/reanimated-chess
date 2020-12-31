import {View, StyleSheet, Pressable, Text} from 'react-native';
import React from 'react';
import {convertIndexToName} from '../helpers/Converters';

export default function Figure({
  chessboardSquareSize,
  onPressSquare,
  currentPossibleMoves,
}) {
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
          <View
            style={[
              componentStyle,
              {
                borderColor: currentPossibleMoves.includes(
                  convertIndexToName({x: j, y: i}),
                )
                  ? 'green'
                  : 'transparent',
                borderWidth: 2,
              },
            ]}>
            <Text style={styles.text}>{convertIndexToName({x: j, y: i})}</Text>
          </View>
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
  wrapper: {position: 'absolute'},
  row: {flexDirection: 'row'},
  text: {opacity: 0.3},
});
