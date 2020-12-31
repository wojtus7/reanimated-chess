import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {Pressable, Text} from 'react-native';
import React, {useState} from 'react';

export default function Figure({
  sizeOfSquare,
  onPress,
  figure,
  initialPosition,
  startMoveFigure,
  endMoveFigure,
  isWhite,
  currentMove,
  isRemoved,
  id,
}) {
  const [position, setPosition] = useState({
    x: initialPosition.x,
    y: initialPosition.y,
  });
  const [temporaryPosition, setTemporaryPosition] = useState({
    x: initialPosition.x,
    y: initialPosition.y,
  });
  const x = useSharedValue(initialPosition.x * sizeOfSquare);
  const y = useSharedValue(initialPosition.y * sizeOfSquare);

  const startMovement = (newPosition) => {
    startMoveFigure({figure, ...position});
    setTemporaryPosition(newPosition);
  };

  const endMovement = (newPosition) => {
    try {
      endMoveFigure(newPosition, id);
      setPosition(newPosition);
      x.value = withTiming(newPosition.x * sizeOfSquare);
      y.value = withTiming(newPosition.y * sizeOfSquare);
    } catch (error) {
      console.log(error);
      x.value = withTiming(temporaryPosition.x * sizeOfSquare);
      y.value = withTiming(temporaryPosition.y * sizeOfSquare);
    }
  };

  const handlePress = () => {
    onPress({figure, ...position});
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
      const xIndex = calculatePosition(x.value);
      const yIndex = calculatePosition(y.value);

      runOnJS(startMovement)({x: xIndex, y: yIndex});
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd: (_) => {
      const xIndex = calculatePosition(x.value);
      const yIndex = calculatePosition(y.value);

      runOnJS(endMovement)({x: xIndex, y: yIndex, id});
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
    <PanGestureHandler
      onGestureEvent={gestureHandler}
      enabled={
        !isRemoved &&
        ((isWhite && currentMove === 'w') || (!isWhite && currentMove === 'b'))
      }>
      <Animated.View
        style={[
          {
            opacity: isRemoved ? 0 : 1,
            width: sizeOfSquare,
            height: sizeOfSquare,
            backgroundColor: isWhite ? 'gray' : 'black',
            position: 'absolute',
            zIndex: isRemoved
              ? -100
              : (isWhite && currentMove === 'w') ||
                (!isWhite && currentMove === 'b')
              ? 11
              : 10,
          },
          animatedStyle,
        ]}>
        <Pressable
          onPress={handlePress}
          style={{width: sizeOfSquare, height: sizeOfSquare}}>
          <Text style={{color: 'white'}}>{figure}</Text>
        </Pressable>
      </Animated.View>
    </PanGestureHandler>
  );
}
