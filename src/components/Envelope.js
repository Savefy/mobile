import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import EnvelopeSVG from '../assets/envelope.svg';
import { colors } from '../values/colors';
import { ProgressChart } from 'react-native-chart-kit';

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
  percente: {
    position: 'absolute',
    top: 5,
    right: 0,
  },
});

const chartConfig = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const Envelope = ({ title, valueGoal, percent }) => {
  return (
    <View style={styles.envelopeContainer}>
      <EnvelopeSVG width={100} height={100} />
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.moneyText}>{valueGoal}</Text>
      <View style={styles.percente}>
        <ProgressChart
          data={{ data: [percent] }}
          width={30}
          height={25}
          strokeWidth={3}
          radius={10}
          chartConfig={chartConfig}
          hideLegend
        />
      </View>
    </View>
  );
};

export default Envelope;
