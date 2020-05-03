import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, RefreshControl } from 'react-native';

import {} from '@react-navigation/core';

import { Appbar, ProgressBar, IconButton, FAB } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';

import { ENVELOPES } from '../values/strings';
import { colors } from '../values/colors';
import Envelope from '../assets/envelope.svg';
import moment from 'moment-timezone';
import { maskDecimal } from '../helpers/masks';

const { Header, Content } = Appbar;

const styles = StyleSheet.create({
  envelopeItem: {
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
  },
  envelopeTitle: {
    fontSize: 16,
    color: colors.textOnPrimary,
    fontFamily: 'Montserrat-SemiBold',
  },
  headerTitle: {
    color: colors.textOnPrimary,
    textAlign: 'center',
  },
  spacer: {
    height: 16,
  },
  flatListConteiner: {
    paddingTop: 16,
    paddingBottom: 90,
  },
  envelopeDeadline: {
    fontSize: 14,
    opacity: 0.7,
    color: colors.textOnPrimary,
    fontFamily: 'Montserrat-Medium',
  },
  editButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  envelopeValue: {
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    color: colors.background,
    textAlign: 'right',
  },
  progressBar: {
    marginTop: 6,
    marginBottom: 2,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  envelopeContainer: {
    flex: 1,
  },
});

const Spacer = () => <View style={styles.spacer} />;

const EditEnvelopeButton = ({ item, navigation, onSuccess }) => {
  const handleOnPress = useCallback(
    () =>
      navigation.navigate('NewEnvelope', {
        envelope: item,
        onSuccess,
      }),
    [navigation, item, onSuccess],
  );

  return (
    <IconButton
      icon="pencil"
      style={styles.editButton}
      color={colors.background}
      onPress={handleOnPress}
    />
  );
};

const NewEnvelopeFAB = ({ navigation, onSuccess }) => {
  const handleNewEnvelope = useCallback(() => {
    navigation.navigate('NewEnvelope', {
      onSuccess,
    });
  }, [navigation, onSuccess]);

  return <FAB style={styles.fab} icon="plus" onPress={handleNewEnvelope} />;
};

const EnvelopesScreen = ({ navigation }) => {
  const [fetching, setFetching] = useState(false);
  const [envelopes, setEnvelopes] = useState(undefined);

  const requestEnvelopes = useCallback(async () => {
    try {
      setFetching(true);
      const response = await axios.get('/users/1/goals');
      const { data } = response;
      setEnvelopes(data.data);
    } catch (ex) {
      console.warn(ex);
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    requestEnvelopes();
  }, [requestEnvelopes]);

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <>
          <View style={styles.envelopeItem}>
            <Envelope width={80} height={80} />
            <View style={styles.envelopeContainer}>
              <Text style={styles.envelopeTitle}>{item.title}</Text>
              <Text style={styles.envelopeDeadline}>
                De {moment(item.createdAt).format('DD/MM/YYYY')} até{' '}
                {moment(item.accomplishAt).format('DD/MM/YYYY')}
              </Text>
              <ProgressBar
                style={styles.progressBar}
                progress={item.percent}
                color={colors.textOnPrimary}
              />
              <Text style={styles.envelopeValue}>
                R$ {maskDecimal(item.valueGoal / 100)}
              </Text>
            </View>
            <EditEnvelopeButton
              item={item}
              navigation={navigation}
              onSuccess={requestEnvelopes}
            />
          </View>
        </>
      );
    },
    [navigation, requestEnvelopes],
  );

  return (
    <>
      <Header style={styles.header}>
        <Content titleStyle={styles.headerTitle} title="Envelopes" />
      </Header>
      <FlatList
        data={envelopes}
        refreshControl={
          <RefreshControl refreshing={fetching} onRefresh={requestEnvelopes} />
        }
        renderItem={renderItem}
        ItemSeparatorComponent={Spacer}
        contentContainerStyle={styles.flatListConteiner}
      />
      <NewEnvelopeFAB navigation={navigation} onSuccess={requestEnvelopes} />
    </>
  );
};

export default EnvelopesScreen;
