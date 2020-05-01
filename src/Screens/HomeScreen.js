import React, { useCallback } from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';

import Envelope from '../assets/envelope.svg';
import { actions } from '../redux/ducks/exemple';

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function HomeScreen({ setData }) {
  const handleTeste = useCallback(() => {
    setData({ teste: 'nossa, funcionou' });
  }, [setData]);

  return (
    <View style={styles.homeScreen}>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Envelope width={100} height={100} />
      <Button onPress={handleTeste}>Teste</Button>
    </View>
  );
}

const mapStateToProps = ({ exemple }) => ({
  exemple,
});

const mapDispatchToProps = {
  setData: actions.setData,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
