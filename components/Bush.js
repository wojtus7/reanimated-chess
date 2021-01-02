import React, {useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import Grass from './../assets/grass.png';
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
  withSequence,
} from 'react-native-reanimated';

export default function Bush({x, y}) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    const timeout = Math.random() * 7000;
    rotation.value = withRepeat(
      withSequence(
        withTiming(0, {duration: timeout}),
        withTiming(0.6, {duration: 1200}),
        withTiming(0, {duration: 1200}),
      ),
      false,
    );
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: rotation.value,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          top: x,
          left: y - 25,
          position: 'absolute',
        },
        animatedStyle,
      ]}>
      <FastImage
        source={Grass}
        style={{
          height: 50,
          width: 50,
          zIndex: -10,
        }}
        resizeMode={'contain'}
      />
    </Animated.View>
  );
}
