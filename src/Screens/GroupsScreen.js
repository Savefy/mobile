import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';

import {} from '@react-navigation/core';
import { Appbar, Card, IconButton, FAB } from 'react-native-paper';

import { groups } from './dataGroups';
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
    borderRadius: 16,
  },
  groupDescription: {
    color: colors.textOnSecondary,
  },
  editIcon: {
    paddingRight: 16,
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
});

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
  const renderItem = useCallback(
    ({ item }) => {
      const { title, description } = item;
      return (
        <Card style={styles.card}>
          <Card.Title
            title={title}
            right={(props) => (
              <EditGroupButton navigation={navigation} {...props} item={item} />
            )}
          />
          <Card.Content>
            <Text style={styles.groupDescription}>{description}</Text>
          </Card.Content>
        </Card>
      );
    },
    [navigation],
  );

  const renderList = useCallback(() => {
    return (
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    );
  }, [renderItem]);

  const handleNewEnvelope = useCallback(() => {
    navigation.navigate('NewGroup');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Header>
        <Content title="Grupos" titleStyle={styles.HeaderText} />
      </Header>
      {renderList()}
      <FAB icon="plus" style={styles.fab} onPress={handleNewEnvelope} />
    </View>
  );
};

export default GroupsScreen;
