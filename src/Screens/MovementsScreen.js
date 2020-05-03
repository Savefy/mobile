import React, { PureComponent } from 'react';
import { FlatList, StyleSheet, View, Text, RefreshControl } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Appbar, Card } from 'react-native-paper';
import moment from 'moment-timezone';
import axios from 'axios';

import { colors } from '../values/colors';
import { maskDecimal } from '../helpers/masks';

const { Header, Content } = Appbar;

const styles = StyleSheet.create({
  flatList: {
    paddingVertical: 16,
    paddingRight: 8,
  },
  font: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  subtitleFont: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
  },
  dateFont: {
    fontSize: 16,
    opacity: 0.8,
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
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const KEY_EXTRACTOR = (item) => String(item.id);

class MovementsScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      movements: [],
      fetching: false,
    };
  }

  componentDidMount() {
    this._requestMovements();
  }

  _requestMovements = async () => {
    try {
      this.setState({ fetching: true });
      const { data } = await axios.get('/users/1/movements');

      this.setState({ movements: data.data });
    } catch (ex) {
      console.warn(ex);
    } finally {
      this.setState({ fetching: false });
    }
  };

  _formatSubtitle = (type, value) => {
    const operation = type === 'debit' ? '-' : '+';
    return `${operation} R$${maskDecimal(value)}`;
  };

  _renderCategory = (category) => {
    let iconName;
    if (category === 'educação') {
      iconName = 'book-multiple';
    } else if (category === 'outros') {
      iconName = 'dots-horizontal-circle-outline';
    } else if (category === 'alimentação') {
      iconName = 'food';
    } else if (category === 'casa') {
      iconName = 'home';
    } else if (category === 'saúde') {
      iconName = 'hospital';
    } else if (category === 'transporte') {
      iconName = 'bus';
    } else {
      iconName = 'cash';
    }
    return <MaterialCommunityIcons name={iconName} size={32} />;
  };

  _renderDate = (date) => {
    return (
      <View style={styles.dateContainer}>
        <Text style={styles.dateFont}>{moment(date).format('DD/MM')}</Text>
        <Text style={styles.dateFont}>{moment(date).format('HH:mm')}</Text>
      </View>
    );
  };

  _renderMovementItem = (item) => {
    const { type, value, date, title, category } = item.item;
    const subtitle = this._formatSubtitle(type, value);
    return (
      <View>
        <View style={styles.timeLine}>
          <View>
            <View style={styles.balloonTriangle} />
            <Card style={styles.balloon}>
              <Card.Title
                title={title}
                titleStyle={styles.font}
                subtitleStyle={styles.subtitleFont}
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
    const { movements, fetching } = this.state;
    return (
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={fetching}
            onRefresh={this._requestMovements}
          />
        }
        data={movements}
        contentContainerStyle={styles.flatList}
        renderItem={this._renderMovementItem}
        keyExtractor={KEY_EXTRACTOR}
      />
    );
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
