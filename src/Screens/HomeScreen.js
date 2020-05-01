import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

import Envelope from '../components/Envelope';
import { colors } from '../values/colors';
import { STATUS, ENVELOPES } from '../values/strings';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
  },
  envelopeList: { paddingHorizontal: 16 },
  spacer: { width: 16 },
  envelopeHeader: {
    fontSize: 24,
    color: colors.primary,
    paddingLeft: 16,
    paddingBottom: 8,
    fontFamily: 'Montserrat-Medium',
  },
  statusContainer: {
    backgroundColor: colors.primaryLight,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    paddingVertical: 16,
  },
  statusAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: colors.background,
  },
  status: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusName: {
    color: colors.accent,
  },
  statusFlatList: {
    paddingHorizontal: 16,
  },
  statusHeaderText: {
    fontSize: 19,
    paddingLeft: 16,
    fontFamily: 'Montserrat-SemiBold',
    paddingBottom: 4,
  },
  metasGrupoContainer: {
    backgroundColor: colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingLeft: 20,
    margin: 16,
    borderRadius: 15,
  },
  metaTitle: {
    color: colors.textOnSecondary,
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
  metaDescription: {
    color: colors.textDescription,
    fontFamily: 'Montserrat-Medium',
  },
});

const Spacer = () => <View style={styles.spacer} />;
const renderItem = ({ item }) => <Envelope {...item} />;

const renderStatusItem = ({ item }) => {
  return (
    <View style={styles.status}>
      <Image source={{ uri: item.photo }} style={styles.statusAvatar} />
      <Text numberOfLines={1} style={styles.statusName}>
        {item.name}
      </Text>
    </View>
  );
};

const StatusComponent = () => {
  return (
    <View style={styles.statusContainer}>
      <Text style={styles.statusHeaderText}>Dicas de quem entende</Text>
      <FlatList
        data={STATUS}
        renderItem={renderStatusItem}
        contentContainerStyle={styles.statusFlatList}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={Spacer}
        horizontal
      />
    </View>
  );
};

const EnvelopesComponent = () => {
  return (
    <>
      <Text style={styles.envelopeHeader}>Seus envelopes</Text>
      <FlatList
        data={ENVELOPES}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.envelopeList}
        ItemSeparatorComponent={Spacer}
        horizontal
      />
    </>
  );
};

const data = {
  data: [0.4],
};

const chartConfig = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(136, 191, 155, ${opacity})`,
};

const HomeScreen = () => {
  return (
    <View style={styles.homeScreen}>
      <View>
        <StatusComponent />
        <View style={styles.metasGrupoContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.metaTitle}>Meta do grupo XYZ</Text>
            <Text style={styles.metaDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ornare
              quis ligula non faucibus.
            </Text>
          </View>
          <View>
            <ProgressChart
              data={data}
              width={90}
              height={100}
              strokeWidth={10}
              radius={30}
              chartConfig={chartConfig}
              hideLegend
            />
          </View>
        </View>
        <EnvelopesComponent />
      </View>
    </View>
  );
};

export default HomeScreen;
