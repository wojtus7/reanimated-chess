import {View, StyleSheet, Pressable, Text} from 'react-native';
import React from 'react';
import {convertIndexToName} from '../helpers/Converters';
import MoveIndicator from './MoveIndicator';

export default function Figure({
  chessboardSquareWidth,
  chessboardSquareHeight,
  onPressSquare,
  currentPossibleMoves,
}) {
  const chessboardSquares = [];

  for (let i = 0; i < 8; i++) {
    const lineComponents = [];
    for (let j = 0; j < 8; j++) {
      const componentStyle = {
        height: chessboardSquareHeight,
        width: chessboardSquareWidth,
        backgroundColor: (j + i) % 2 === 0 ? '#fbf1cf' : '#4e5660',
      };
      lineComponents.push(
        <Pressable
          key={`square_${i}_${j}`}
          onPress={() => onPressSquare({x: j, y: i})}>
          <View style={componentStyle}>
            <MoveIndicator
              isVisible={currentPossibleMoves.includes(
                convertIndexToName({x: j, y: i}),
              )}
            />
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
  wrapper: {position: 'absolute', borderRadius: 10, overflow: 'hidden'},
  row: {flexDirection: 'row'},
  text: {opacity: 0, position: 'absolute'},
});
