import {View, Dimensions, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Figure from './components/Figure';
import Chessboard from './components/Chessboard';
import {Game} from 'js-chess-engine';
import {convertIndexToName, convertNameToIndex} from './helpers/Converters';

const squareWidth = Dimensions.get('window').width / 8;

export default function AnimatedStyleUpdateExample() {
  const [startLocation, setStartLocation] = useState(undefined);
  const game = new Game();

  const checkAvailableMoves = (location) => {
    console.log(game.moves(convertIndexToName(location)));
  };

  const pressSquare = (location) => {
    checkAvailableMoves(location);
  };

  const startMoveFigure = (location) => {
    checkAvailableMoves(location);
    game.moves(convertIndexToName(location));
    setStartLocation(location);
  };

  const endMoveFigure = (location) => {
    game.move(convertIndexToName(startLocation), convertIndexToName(location));
  };

  return (
    <View style={styles.container}>
      <Chessboard
        chessboardSquareSize={squareWidth}
        onPressSquare={pressSquare}
      />
      <Figure
        sizeOfSquare={squareWidth}
        onPress={pressSquare}
        startMoveFigure={startMoveFigure}
        endMoveFigure={endMoveFigure}
        figure={'P'}
        initialPosition={{x: 4, y: 6}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100,
  },
});
