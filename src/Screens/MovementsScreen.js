import React, { PureComponent } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Appbar, Card } from 'react-native-paper';
import moment from 'moment-timezone';

import { moviments } from './testeData';
import { colors } from '../values/colors';
import { maskDecimal } from '../helpers/masks';

const { Header, Content } = Appbar;

const styles = StyleSheet.create({
  font: {
    fontFamily: 'Montserrat-SemiBold',
  },
  HeaderText: {
    fontSize: 19,
    paddingLeft: 16,
    fontFamily: 'Montserrat-SemiBold',
    paddingBottom: 4,
  },
  balloon: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    height: 80,
    marginLeft: 20,
    marginRight: 8,
    borderLeftColor: colors.primary,
    elevation: 0,
  },
  timeLine: {
    height: 100,
    borderLeftColor: colors.accent,
    borderLeftWidth: 4,
    marginLeft: 16,
  },
  balloonTriangle: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 30,
    marginLeft: 10,
    backgroundColor: colors.primary,
    transform: [{ rotate: '45deg' }],
  },
  timeLinePoint: {
    position: 'absolute',
    left: 11,
    top: 33,
    padding: 5,
    zIndex: 1,
    width: 8,
    height: 8,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.background,
    backgroundColor: colors.accent,
  },
  dateMovement: {
    padding: 8,
  },
});

class MovementsScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _formatSubtitle = (type, value) => {
    const operation = type === 'debit' ? '-' : '+';
    return `${operation} R$${maskDecimal(value)}`;
  };

  _renderCategory = (category) => {
    let iconName;
    if (category === 'ALIMENTACAO') {
      iconName = 'food';
    } else if (category === 'SAUDE') {
      iconName = 'heart-pulse';
    } else if (category === 'TRANSPORTE') {
      iconName = 'bus';
    } else if (category === 'CASA') {
      iconName = 'home';
    } else if (category === 'EDUCACAO') {
      iconName = 'book-multiple';
    } else {
      iconName = 'settings-helper';
    }
    return <MaterialCommunityIcons name={iconName} size={32} />;
  };

  _renderDate = (date) => {
    return (
      <View>
        <Text style={styles.font}>{moment(date).format('DD/MM')}</Text>
        <Text style={styles.font}>{moment(date).format('HH:mm')}</Text>
      </View>
    );
  };

  _renderMovementItem = (item) => {
    const { type, value, date, name, category } = item.item;
    const subtitle = this._formatSubtitle(type, value);
    return (
      <View>
        <View style={styles.timeLine}>
          <View>
            <View style={styles.balloonTriangle} />
            <Card style={styles.balloon}>
              <Card.Title
                title={name}
                titleStyle={styles.font}
                subtitleStyle={styles.font}
                subtitle={subtitle}
                right={() => this._renderDate(date)}
                rightStyle={styles.dateMovement}
                left={() => this._renderCategory(category)}
              />
            </Card>
          </View>
        </View>
        <View style={styles.timeLinePoint} />
      </View>
    );
  };

  _renderList = () => {
    return <FlatList data={moviments} renderItem={this._renderMovementItem} />;
  };

  render() {
    return (
      <View>
        <Header>
          <Content title="Movimentações" titleStyle={styles.HeaderText} />
        </Header>
        <View style={styles.container}>{this._renderList()}</View>
      </View>
    );
  }
}

export default MovementsScreen;
