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
    width: 80,
    height: 80,
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
    contents: {
      compras: [
        {
          image:
            'https://joveminvestidor.com.br/wp-content/uploads/2019/11/600px-Thiago_Nigro_fundador_do_canal_O_Primo_Rico.png',
          title: 'Como economizar nas compras do mercado',
          resume: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
        },
        {
          image:
            'https://joveminvestidor.com.br/wp-content/uploads/2019/11/600px-Thiago_Nigro_fundador_do_canal_O_Primo_Rico.png',
          title: 'Como economizar nas compras do mercado',
          resume: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
        },
      ],
      investimentos: [
        {
          image:
            'https://joveminvestidor.com.br/wp-content/uploads/2019/11/600px-Thiago_Nigro_fundador_do_canal_O_Primo_Rico.png',
          title: 'Melhores investimentos para 2020',
          resume: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
        },
      ],
      extra: [
        {
          image:
            'https://joveminvestidor.com.br/wp-content/uploads/2019/11/600px-Thiago_Nigro_fundador_do_canal_O_Primo_Rico.png',
          title: '5 opções de renda extra',
          resume: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
        },
      ],
      termos: [
        {
          image:
            'https://joveminvestidor.com.br/wp-content/uploads/2019/11/600px-Thiago_Nigro_fundador_do_canal_O_Primo_Rico.png',
          title: 'O que é Taxa Selic?',
          resume: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
        },
      ],
    },
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
            uri: item.image,
          }}
          style={styles.contentIcon}
        />
        <View style={styles.contentColumn}>
          <Text style={styles.contentTitle}>{item.title}</Text>
          <Text numberOfLines={4} style={styles.resumeContent}>
            {item.resume}
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
      case 'extra':
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
          <FlatList data={contents[key]} renderItem={this._renderContent} />
        </View>
      </View>
    );
  }
}

export default ContentVisualizationScreen;
