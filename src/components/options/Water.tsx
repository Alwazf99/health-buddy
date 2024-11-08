import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import {circleRadius} from '../../utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {useWaterStore} from '../../state/waterStore';
import {playTTS} from '../../utils/ttsListeners';
import {playSound} from '../../utils/voiceUtils';

const Water = () => {
  const {waterDrinkStamps, addWaterIntake} = useWaterStore();

  const totalSegments = 8;
  const completedSegments = waterDrinkStamps.length;

  const handlePress = async () => {
    //playSound('ting2');
    if (completedSegments < totalSegments) {
      const timestamp = new Date().toISOString();
      addWaterIntake(timestamp);
    } else {
      playTTS('You have completed your daily water intake!');
    }
  };

  const containerStyle = [
    styles.container,
    completedSegments === totalSegments && styles.conatinerCompleted,
  ];
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Icon name="water" color="#1ca3ec" size={RFValue(32)} />
      <View style={styles.segmentContainer}>
        {Array.from({length: totalSegments}).map((_, index) => (
          <View
            key={index}
            style={[
              styles.segment,
              {
                backgroundColor:
                  completedSegments === totalSegments
                    ? '#00D100'
                    : index < completedSegments
                    ? '#1ca3ec'
                    : '#eee',
                transform: [
                  {rotate: `${(index * 360) / totalSegments}deg`},
                  {translateX: circleRadius / 2 - 5},
                ],
              },
            ]}
          />
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: circleRadius,
    width: circleRadius,
    borderRadius: circleRadius,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    shadowOffset: {width: 1, height: 1},
    elevation: 10,
    shadowRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
  },
  conatinerCompleted: {
    shadowColor: 'yellow',
    elevation: 10,
  },
  segmentContainer: {
    position: 'absolute',
    height: circleRadius,
    width: circleRadius,
    borderRadius: circleRadius / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  segment: {
    position: 'absolute',
    width: 8,
    height: 4,
    borderRadius: 2,
  },
});

export default Water;
