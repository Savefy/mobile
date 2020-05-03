import axios from 'axios';
import React, { PureComponent } from 'react';

import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { Appbar } from 'react-native-paper';
import { colors } from '../values/colors';

const { Header, Content, BackAction } = Appbar;

const styles = StyleSheet.create({
  appBarText: {
    color: colors.textOnPrimary,
    textAlign: 'center',
    marginLeft: -60,
  },
  container: {
    marginTop: '8%',
  },
  contentCard: {
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: '5%',
  },
  contentColumn: {
    flex: 1,
  },
  contentIcon: {
    width: 90,
    height: 90,
    marginRight: 10,
  },
  contentTitle: {
    fontSize: 16,
    color: colors.textOnPrimary,
    fontFamily: 'Montserrat-SemiBold',
  },
  resumeContent: {
    fontSize: 14,
    color: colors.textOnPrimary,
    fontFamily: 'Montserrat-Medium',
  },
});

class ContentVisualizationScreen extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    contents: [],
  };

  componentDidMount = () => {
    const { key } = this.props.route.params;
    axios
      .get('/contents', { params: { category: key } })
      .then((response) => {
        this.setState({
          contents: response.data.data,
        });
      })
      .catch((error) => {
        console.log('Erro: ', error);
      });
  };

  _back = () => {
    const { navigation } = this.props;

    navigation.goBack();
  };

  _renderContent = ({ item }) => {
    return (
      <View style={styles.contentCard}>
        <Image
          source={{
            uri: item.imageUrl,
          }}
          style={styles.contentIcon}
        />
        <View style={styles.contentColumn}>
          <Text style={styles.contentTitle}>{item.title}</Text>
          <Text numberOfLines={4} style={styles.resumeContent}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  _formatTitle = (title) => {
    switch (title) {
      case 'compras':
        return 'Compras';
      case 'investimentos':
        return 'Investimentos';
      case 'rendaExtra':
        return 'Renda extra';
      case 'termos':
        return 'Terminologias';
      default:
        return title;
    }
  };

  render() {
    const { contents } = this.state;
    const { key } = this.props.route.params;
    return (
      <View>
        <Header>
          <BackAction color={colors.textOnPrimary} onPress={this._back} />
          <Content
            title={this._formatTitle(key)}
            titleStyle={styles.appBarText}
          />
        </Header>
        <View style={styles.container}>
          <FlatList data={contents} renderItem={this._renderContent} />
        </View>
      </View>
    );
  }
}

export default ContentVisualizationScreen;
