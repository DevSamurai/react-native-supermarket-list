import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Main = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TODO LIST DEVSAMURAI</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Helvetica',
    fontSize: 28,
    fontWeight: '600',
  },
});

export default Main;
