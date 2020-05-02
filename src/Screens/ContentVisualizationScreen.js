import React, { PureComponent } from 'react';

import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { colors } from '../values/colors';

const { Header, Content, Action } = Appbar;

const styles = StyleSheet.create({
  appBarText: {
    color: colors.background,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 19,
    textAlign: 'center',
    paddingBottom: 4,
  },
});

class ContentVisualizationScreen extends PureComponent {
  constructor(props) {
    super(props);
  }

  _back = () => {
    const { navigation } = this.props;

    navigation.goBack();
  };

  render() {
    return (
      <View>
        <Header>
          <Action
            color={colors.background}
            icon="arrow-left"
            size={15}
            onPress={this._back}
          />
          <Content title="Compras Teste" titleStyle={styles.appBarText} />
        </Header>
      </View>
    );
  }
}

export default ContentVisualizationScreen;
