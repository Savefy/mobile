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
  },
  moneyText: {
    textAlign: 'center',
    color: colors.background,
    fontSize: 24,
  },
});

const Envelope = ({ category, price }) => {
  return (
    <View style={styles.envelopeContainer}>
      <EnvelopeSVG width={100} height={100} />
      <Text style={styles.titleText}>{category}</Text>
      <Text style={styles.moneyText}>{price}</Text>
    </View>
  );
};

export default Envelope;
