import React, { useCallback, useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, RefreshControl } from 'react-native';

import {} from '@react-navigation/core';
import { Appbar, Card, IconButton, FAB } from 'react-native-paper';
import axios from 'axios';

import { colors } from '../values/colors';

const { Header, Content } = Appbar;

const styles = StyleSheet.create({
  font: {
    fontFamily: 'Montserrat-SemiBold',
  },
  headerText: {
    fontSize: 19,
    fontFamily: 'Montserrat-SemiBold',
    paddingBottom: 4,
  },
  card: {
    backgroundColor: colors.primary,
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },
  groupDescription: {
    color: colors.textOnSecondary,
  },
  editIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
  },
  cardTitle: {
    margin: 0,
    padding: 0,
  },
});

const KEY_EXTRACTOR = (item) => String(item.id);

const EditGroupButton = ({ item, navigation }) => {
  const handleOnPress = useCallback(
    () => navigation.navigate('NewGroup', { group: item }),
    [navigation, item],
  );

  return (
    <IconButton
      icon="pencil"
      size={24}
      color={colors.textOnSecondary}
      style={styles.editIcon}
      onPress={handleOnPress}
    />
  );
};

const GroupsScreen = ({ navigation }) => {
  const [fetching, setFetching] = useState(false);
  const [groups, setGroups] = useState([]);

  const renderItem = useCallback(
    ({ item }) => {
      const { title, description } = item;
      return (
        <View style={styles.card}>
          <View style={styles.cardTitle}>
            <Text>{title}</Text>
          </View>
          <View style={styles.cardTitle}>
            <Text style={styles.groupDescription}>{description}</Text>
          </View>
          <EditGroupButton navigation={navigation} item={item} />
        </View>
      );
    },
    [navigation],
  );

  const handleRefreshGroups = useCallback(async () => {
    try {
      setFetching(true);
      const { data } = await axios.get('/users/1/groups');
      setGroups(data.data);
    } catch (ex) {
      console.warn(ex);
    } finally {
      setFetching(false);
    }
  }, []);

  const handleNewEnvelope = useCallback(() => {
    navigation.navigate('NewGroup');
  }, [navigation]);

  useEffect(() => {
    handleRefreshGroups();
  }, [handleRefreshGroups]);

  return (
    <View style={styles.container}>
      <Header>
        <Content title="Grupos" titleStyle={styles.HeaderText} />
      </Header>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={fetching}
            onRefresh={handleRefreshGroups}
          />
        }
        data={groups}
        keyExtractor={KEY_EXTRACTOR}
        renderItem={renderItem}
      />
      <FAB icon="plus" style={styles.fab} onPress={handleNewEnvelope} />
    </View>
  );
};

export default GroupsScreen;
