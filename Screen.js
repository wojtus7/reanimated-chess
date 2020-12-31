import {findKey} from 'lodash';
import {View, Dimensions, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Figure from './components/Figure';
import Chessboard from './components/Chessboard';
import {status, move, moves} from 'js-chess-engine';
import {
  convertIndexToName,
  convertFENtoFigures,
  convertFENtoIdOnBoard,
} from './helpers/Converters';

const squareWidth = Dimensions.get('window').width / 8;

export default function AnimatedStyleUpdateExample() {
  const [startLocation, setStartLocation] = useState(undefined);
  const [gameState, setGameState] = useState(
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  );
  const [currentMoveColor, setCurrentMoveColor] = useState('w');
  const [figuresState, setFiguresState] = useState(convertFENtoIdOnBoard());
  const [currentPossibleMoves, setCurrentPossibleMoves] = useState([]);

  const checkAvailableMoves = (location) => {
    console.log(moves(gameState)[convertIndexToName(location)] || []);
    setCurrentPossibleMoves(
      moves(gameState)[convertIndexToName(location)] || [],
    );
  };

  const pressSquare = (location) => {
    checkAvailableMoves(location);
  };

  const startMoveFigure = (location) => {
    checkAvailableMoves(location);
    setStartLocation(location);
  };

  const endMoveFigure = (newLocation, id) => {
    setCurrentPossibleMoves([]);
    const oldGameState = gameState;
    const actualizedGameState = move(
      gameState,
      convertIndexToName(startLocation),
      convertIndexToName(newLocation),
    );
    if (status(oldGameState).pieces[convertIndexToName(newLocation)]) {
      console.log('hit');
      const newFiguresState = figuresState;
      const foundKey = findKey(figuresState, {
        x: newLocation.x,
        y: newLocation.y,
      });
      newFiguresState[foundKey].removed = true;
      newFiguresState[id].x = newLocation.x;
      newFiguresState[id].y = newLocation.y;
      setFiguresState(newFiguresState);
    } else {
      const newFiguresState = figuresState;
      newFiguresState[id].x = newLocation.x;
      newFiguresState[id].y = newLocation.y;
      setFiguresState(newFiguresState);
    }

    setGameState(actualizedGameState);
    setCurrentMoveColor(actualizedGameState.split(' ')[1]);
  };

  const figures = convertFENtoFigures();

  return (
    <View style={styles.container}>
      <Chessboard
        chessboardSquareSize={squareWidth}
        onPressSquare={pressSquare}
        currentPossibleMoves={currentPossibleMoves}
      />
      {figures.map(({figure, x, y, isWhite, id}) => (
        <Figure
          sizeOfSquare={squareWidth}
          onPress={pressSquare}
          startMoveFigure={startMoveFigure}
          endMoveFigure={endMoveFigure}
          figure={figure}
          initialPosition={{x, y}}
          isWhite={isWhite}
          currentMove={currentMoveColor}
          key={id}
          id={id}
          isRemoved={figuresState[id].removed}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    top: 100,
  },
});
