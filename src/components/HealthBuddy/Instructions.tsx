import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Instructions = () => {
  return (
    <View>
      <Text style={styles.container}>Instructions</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    width: '90%',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 10,
    shadowColor: '#000',
    borderRadius: 10,
    color: 'black',
  },
  logo: {
    width: 50,
    height: 40,
    alignSelf: 'center',
    marginVertical: 10,
  },
  cross: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default Instructions;
