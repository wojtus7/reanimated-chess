import {View, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import Figure from './components/Figure';
import Chessboard from './components/Chessboard';

const windowWidth = Dimensions.get('window').width / 8;

export default function AnimatedStyleUpdateExample() {
  const pressSquare = (squareOjb) => {
    console.log(squareOjb);
  };

  return (
    <View style={styles.container}>
      <Chessboard
        chessboardSquareSize={windowWidth}
        onPressSquare={pressSquare}
      />
      <Figure
        sizeOfSquare={windowWidth}
        onPress={pressSquare}
        figure={'P'}
        initialPosition={{x: 4, y: 1}}
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
