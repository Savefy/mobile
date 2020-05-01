import React, { useCallback } from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';

import { actions } from '../redux/ducks/exemple';
import Envelope from '../components/Envelope';
import { FlatList } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
  },
  envelopeList: { paddingHorizontal: 16 },
  spacer: { width: 16 },
});

const ENVELOPES = [
  { category: 'Conta de luz', price: '125,50' },
  { category: 'Lazer', price: '125,50' },
  { category: 'Prostitutas', price: '125,50' },
  { category: 'Esporte', price: '125,50' },
  { category: 'Lazer', price: '125,50' },
  { category: 'Lazer', price: '125,50' },
];

const Spacer = () => <View style={styles.spacer} />;

function HomeScreen({ setData }) {
  const handleTeste = useCallback(() => {
    setData({ teste: 'nossa, funcionou' });
  }, [setData]);

  const renderItem = ({ item }) => <Envelope {...item} />;

  return (
    <View style={styles.homeScreen}>
      <View>
        <FlatList
          data={ENVELOPES}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.envelopeList}
          ItemSeparatorComponent={Spacer}
          horizontal
        />
      </View>
      <Text>Home Screen</Text>
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
