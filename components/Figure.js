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
import FastImage from 'react-native-fast-image';

import {convertFigureToImagePath} from '../helpers/ImageProvider';

export default function Figure({
  squareWidth,
  squareHeight,
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
  const image = convertFigureToImagePath(figure);
  const [position, setPosition] = useState({
    x: initialPosition.x,
    y: initialPosition.y,
  });
  const [temporaryPosition, setTemporaryPosition] = useState({
    x: initialPosition.x,
    y: initialPosition.y,
  });
  const x = useSharedValue(initialPosition.x * squareWidth);
  const y = useSharedValue(initialPosition.y * squareHeight);
  const zIndex = useSharedValue(0);
  const scale = useSharedValue(1);

  const startMovement = (newPosition) => {
    startMoveFigure({figure, ...position});
    setTemporaryPosition(newPosition);
  };

  const endMovement = (newPosition) => {
    try {
      const shouldFight = endMoveFigure(newPosition, id);
      setPosition(newPosition);
      x.value = withTiming(newPosition.x * squareWidth);
      y.value = withTiming(newPosition.y * squareHeight);
    } catch (error) {
      console.log(error);
      x.value = withTiming(temporaryPosition.x * squareWidth);
      y.value = withTiming(temporaryPosition.y * squareHeight);
    }
  };

  const handlePress = () => {
    onPress({figure, ...position});
  };

  const calculatePosition = (pixelValue, width) => {
    'worklet';
    const index = Math.round(pixelValue / width);
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
      const xIndex = calculatePosition(x.value, squareWidth);
      const yIndex = calculatePosition(y.value, squareHeight);
      zIndex.value = 1000;
      scale.value = withTiming(1.1);

      runOnJS(startMovement)({x: xIndex, y: yIndex});
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd: (_) => {
      const xIndex = calculatePosition(x.value, squareWidth);
      const yIndex = calculatePosition(y.value, squareHeight);
      zIndex.value = 0;
      scale.value = withTiming(1);

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
        {
          scale: scale.value,
        },
      ],
      zIndex: isRemoved ? -10000 : y.value + zIndex.value + 100,
      opacity: isRemoved ? 0 : 1,
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
            width: squareWidth,
            height: squareHeight,
            position: 'absolute',
          },
          animatedStyle,
        ]}>
        <Pressable
          onPress={handlePress}
          style={{width: squareWidth, height: squareHeight}}>
          <FastImage
            source={image}
            tintColor={'black'}
            style={{
              position: 'absolute',
              width: squareWidth,
              height: squareWidth,
              transform: [
                {
                  translateY: '-7%',
                },
              ],
              opacity: 0.2,
            }}
          />
          <FastImage
            source={image}
            style={{
              width: squareWidth,
              height: squareWidth,
              transform: [
                // {scale: 0.8},
                {scale: figure === 'p' || figure === 'P' ? 1.05 : 1.05},
                {
                  translateY:
                    figure === 'p' || figure === 'P' ? '-9.5%' : '-9.5%',
                },
              ],
            }}
          />
        </Pressable>
      </Animated.View>
    </PanGestureHandler>
  );
}
