import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';

const windowWidth = Dimensions.get('window').width / 8;

export default function Figure({sizeOfSquare}) {
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const startMovement = () => {
    console.log('start movement');
  };

  const endMovement = (position) => {
    console.log(position);
  };

  const calculatePosition = (pixelValue) => {
    'worklet';
    const index = Math.round(pixelValue / sizeOfSquare);
    if (index >= 0 && index < 8) {
      return index;
    } else {
      return index < 0 ? 0 : 7;
    }
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
      runOnJS(startMovement)();
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd: (_) => {
      const xIndex = calculatePosition(x.value);
      const yIndex = calculatePosition(y.value);

      x.value = withTiming(xIndex * sizeOfSquare);
      y.value = withTiming(yIndex * sizeOfSquare);

      runOnJS(endMovement)({xIndex, yIndex});
      // x.value = withTiming(0);
      // x.value = withTiming(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value,
        },
        {
          translateY: y.value,
        },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.chessman, animatedStyle]} />
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  chessman: {width: windowWidth, height: windowWidth, backgroundColor: 'black'},
});
