import {View, StyleSheet, Dimensions, Text} from 'react-native';
import React, {useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import Check from './../assets/021-target-outline.png';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withDelay,
  withSequence,
} from 'react-native-reanimated';

const Icon = ({isOverlay}) => (
  <View style={{flexDirection: 'column', alignItems: 'center'}}>
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        transform: [{rotateY: isOverlay ? '180deg' : '0deg'}],
      }}>
      <FastImage
        tintColor={'white'}
        source={Check}
        style={{
          position: 'absolute',
          height: 200,
          width: 200,
          opacity: 1,
        }}
      />
      <FastImage
        source={Check}
        style={{height: 200, width: 200, opacity: isOverlay ? 0.4 : 1}}
      />
      <View
        style={{
          height: 50,
          backgroundColor: 'white',
          paddingHorizontal: 20,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          width: 110,
          top: -5,
          left: 4,
        }}>
        <Text
          style={{
            lineHeight: 50,
            fontSize: 20,
            fontFamily: 'Chalkduster',
            width: 110,
            color: isOverlay ? 'white' : 'black',
          }}>
          Check
        </Text>
      </View>
    </View>
  </View>
);

export default function CheckInfo({chessboardHeight, isCheck}) {
  const rotation = useSharedValue(0);
  const bump = useSharedValue(0);
  const fly = useSharedValue(0);

  useEffect(() => {
    if (isCheck) {
      rotation.value = withTiming(200, {duration: 2000});
      bump.value = withDelay(
        2000,
        withSequence(
          withTiming(0.1, {duration: 300}),
          withTiming(0, {duration: 250}),
        ),
      );
      fly.value = withDelay(2800, withTiming(1, {duration: 700}));
      setTimeout(() => {
        rotation.value = 0;
        bump.value = 0;
        fly.value = 0;
      }, 4000);
    }
  }, [bump, fly, isCheck, rotation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: rotation.value,
      transform: [{scale: 1 + bump.value + fly.value * 1.5}],
      opacity: 1 - fly.value,
      overflow: 'hidden',
      alignItems: 'flex-start',
    };
  });

  const animatedOverlay = useAnimatedStyle(() => {
    return {
      width: 200 - rotation.value,
      transform: [{translateX: -200 + rotation.value * 2}],
      opacity: rotation.value / 30,
      overflow: 'hidden',
      alignItems: 'flex-start',
    };
  });

  return (
    <View
      style={[styles.wrapper, {height: chessboardHeight}]}
      pointerEvents={'none'}>
      <Animated.View
        style={{
          zIndex: 2000,
          position: 'absolute',
          width: 200,
          top: 0,
        }}>
        <Animated.View style={animatedOverlay}>
          <Icon isOverlay />
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={{
          position: 'absolute',
          width: 200,
          alignItems: 'flex-start',
          top: 0,
        }}>
        <Animated.View style={animatedStyle}>
          <Icon />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    top: 120,
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
