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
      <Chessboard chessboardSquareSize={windowWidth} onPress={pressSquare} />
      <Figure sizeOfSquare={windowWidth} onPress={pressSquare} />
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
