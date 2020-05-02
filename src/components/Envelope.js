import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import EnvelopeSVG from '../assets/envelope.svg';
import { colors } from '../values/colors';

const styles = StyleSheet.create({
  envelopeContainer: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    padding: 16,
    flex: 0,
  },
  titleText: {
    textAlign: 'center',
    color: colors.accent,
    fontFamily: 'Montserrat-Medium',
  },
  moneyText: {
    textAlign: 'center',
    color: colors.background,
    fontSize: 24,
    fontFamily: 'Montserrat-Medium',
  },
});

const Envelope = ({ title, valueGoal }) => {
  return (
    <View style={styles.envelopeContainer}>
      <EnvelopeSVG width={100} height={100} />
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.moneyText}>{valueGoal}</Text>
    </View>
  );
};

export default Envelope;
