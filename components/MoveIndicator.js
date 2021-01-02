import {View, StyleSheet, Dimensions, Text} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

const squareWidth = (Dimensions.get('window').width - 30) / 3;

export default function MoveIndicator({isVisible}) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      opacity.value = withTiming(1, {duration: 200});
    } else {
      opacity.value = withTiming(0, {duration: 200});
    }
  }, [isVisible, opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: 1,
        },
      ],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          margin: 5,
          borderRadius: 5,
          borderWidth: 2,
          borderColor: '#000',
          backgroundColor: '#8ee2cf',
        },
        animatedStyle,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cloud: {
    borderRadius: 15,
    borderWidth: 3.3,
    borderColor: 'black',
    margin: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    maxWidth: squareWidth * 2 - 10,
    justifyContent: 'center',
    left: 0,
  },
});
