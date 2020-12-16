import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {Pressable} from 'react-native';
import React, {useState} from 'react';

export default function Figure({
  sizeOfSquare,
  onPress,
  figure,
  initialPosition,
}) {
  const [position, setPosition] = useState({
    x: initialPosition.x,
    y: initialPosition.y,
  });
  const x = useSharedValue(initialPosition.x * sizeOfSquare);
  const y = useSharedValue(initialPosition.y * sizeOfSquare);

  const startMovement = () => {
    console.log('start movement');
  };

  const endMovement = (newPosition) => {
    setPosition(newPosition);
    x.value = withTiming(newPosition.x * sizeOfSquare);
    y.value = withTiming(newPosition.y * sizeOfSquare);
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
      runOnJS(startMovement)();
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd: (_) => {
      const xIndex = calculatePosition(x.value);
      const yIndex = calculatePosition(y.value);

      runOnJS(endMovement)({x: xIndex, y: yIndex});
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
      <Animated.View
        style={[
          {
            width: sizeOfSquare,
            height: sizeOfSquare,
            backgroundColor: 'black',
          },
          animatedStyle,
        ]}>
        <Pressable
          onPress={handlePress}
          style={{width: sizeOfSquare, height: sizeOfSquare}}
        />
      </Animated.View>
    </PanGestureHandler>
  );
}
