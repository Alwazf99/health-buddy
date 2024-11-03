import {View, StyleSheet, Image} from 'react-native';
import React, {FC, useEffect} from 'react';
import {Colors, Fonts, lightColors} from '../utils/Constants';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {screenHeight, screenWidth} from '../utils/Scaling';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../components/global/CustomText';
import LottieView from 'lottie-react-native';
import {initializeTtsListeners, playTTS} from '../utils/ttsListeners';
import {resetAndNavigate} from '../utils/NavigationUtils';
import {playSound} from '../utils/voiceUtils';

const bottomColors = [...lightColors].reverse();

const SplashScreen: FC = () => {
  const healthBuddyAnimation = useSharedValue(screenHeight * 0.8);
  const messageContainerAnimation = useSharedValue(screenHeight * 0.8);

  const launchAnimation = async () => {
    messageContainerAnimation.value = screenHeight * 0.001;
    //playSound('ting2');
    setTimeout(() => {
      healthBuddyAnimation.value = -screenHeight * 0.02;
      playTTS('Hello World! I am your Healthbuddy.');
    }, 600);

    setTimeout(() => {
      resetAndNavigate('HealthBuddyScreen');
    }, 4000);
  };

  useEffect(() => {
    launchAnimation();
    initializeTtsListeners();
  }, []);

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(healthBuddyAnimation.value, {
            duration: 1500,
          }),
        },
      ],
    };
  });

  const messageContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(messageContainerAnimation.value, {
            duration: 1200,
          }),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, animatedImageStyle]}>
        <Image
          source={require('../assets/images/launch.png')}
          style={styles.img}
        />
      </Animated.View>

      <Animated.View style={[styles.gradientContainer, messageContainerStyle]}>
        <LinearGradient colors={bottomColors} style={styles.gradient}>
          <View style={styles.textContainer}>
            <CustomText fontSize={34} fontFamily={Fonts.Theme}>
              HEALTHBUDDY!
            </CustomText>
            <LottieView
              source={require('../assets/animations/sync.json')}
              style={{height: 130, width: 280}}
              autoPlay={true}
              loop
            />
            <CustomText>
              Synchronizing best configurations for you...
            </CustomText>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 20,
    padding: 20,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 1,
    shadowRadius: 2,
    alignItems: 'center',
    shadowColor: Colors.border,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    alignItems: 'flex-end',
  },
  imageContainer: {
    width: screenWidth - 20,
    height: screenHeight * 0.9,
  },

  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  gradientContainer: {
    position: 'absolute',
    height: '35%',
    bottom: 0,
    width: '100%',
  },
  gradient: {
    paddingTop: 30,
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;
