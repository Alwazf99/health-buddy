import {View, Text, StyleSheet, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Colors} from '../utils/Constants';
import Background from '../components/HealthBuddy/Background';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Loading from '../components/HealthBuddy/Loading';
import BigHero6 from '../components/HealthBuddy/BigHero6';
import {playTTS} from '../utils/ttsListeners';
import SoundPlayer from 'react-native-sound-player';
import {playSound} from '../utils/voiceUtils';
import {prompt} from '../utils/data';
import Instructions from '../components/HealthBuddy/Instructions';
import Pedometer from '../components/Pedometer/Pedometer';

const HealthBuddyScreen = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [message, setMessage] = useState('');
  const [showPedometer, setShowPedometer] = useState(false);

  const blurOpacity = useSharedValue(0);

  const startBlur = () => {
    blurOpacity.value = withTiming(1, {duration: 2000});
  };

  useEffect(() => {
    const timer = setTimeout(startBlur, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleError = (error: string) => {
    playTTS('There was an error! Please try again.');
    startBlur();
    setMessage('');
    setShowLoader(true);
    SoundPlayer.stop();
    setShowInstructions(false);
    console.log(error);
  };

  const handleResponse = async (
    type: string,
    promptText: string,
    sound: string,
  ) => {
    try {
      if (type === 'meditation') {
        playTTS('Focus on your breath!');
        playSound(sound);
        setMessage('meditation');
        return;
      }

      // if (type === 'happiness') {
      //   setTimeout(() => {
      //     playSound(sound);
      //   }, 5000);
      // } else {
      //   playSound(sound);
      // }
      setMessage(type);
      //unBlur()
      setShowLoader(true);
    } catch (error: any) {
      handleError(error);
    } finally {
      setShowLoader(false);
    }
  };

  const onOptionPressHandler = (type: string) => {
    setShowInstructions(true);
    if (type === 'pedometer') {
      setShowPedometer(true);
      setShowLoader(false);
      return;
    }

    switch (type) {
      case 'happiness':
        handleResponse(type, prompt.joke, 'laugh');
        break;
      case 'motivation':
        handleResponse(type, prompt.motivation, 'motivation');
        break;
      case 'health':
        handleResponse(type, prompt.health, 'meditation');
        break;
      case 'meditation':
        handleResponse(type, prompt.health, 'meditation');
        break;
      default:
        handleError('There was no type like that.');
    }
  };

  const blurStyle = useAnimatedStyle(() => {
    return {
      opacity: blurOpacity.value,
    };
  });

  // const unBlur = () => {
  //   Animated.timing(blurOpacity, {
  //     toValue: 0,
  //     duration: 2000,
  //     useNativeDriver: false,
  //   }).start();
  // };

  return (
    <View style={styles.container}>
      {message && (
        <Instructions
          onCross={() => {
            startBlur();
            setMessage('');
            setShowLoader(true);
            setShowInstructions(false);
            SoundPlayer.stop();
          }}
          message={message}
        />
      )}

      {showPedometer && (
        <Pedometer
          onCross={() => {
            startBlur();
            setMessage('');
            setShowLoader(true);
            setShowInstructions(false);
            setShowPedometer(false);
            SoundPlayer.stop();
          }}
          message={message}
        />
      )}
      {showLoader && (
        <View style={styles.loaderContainer}>
          <Loading />
        </View>
      )}

      {!showInstructions && <BigHero6 onPress={onOptionPressHandler} />}
      <Background blurOpacity={blurOpacity} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondry,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    position: 'absolute',
  },
});

export default HealthBuddyScreen;
