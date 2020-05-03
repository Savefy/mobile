import React, { PureComponent } from 'react';
import { Appbar, Card } from 'react-native-paper';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../values/colors';
import LoseIcon from '../assets/lose.svg';
import CardIcon from '../assets/debit-card.svg';
import InvestmentIcon from '../assets/investment.svg';
import ManagementIcon from '../assets/management.svg';

const ContentCard = Card.Content;
const { Header, Content } = Appbar;

const styles = StyleSheet.create({
  appBarText: {
    color: colors.textOnPrimary,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    fontSize: 18,
  },
  card: {
    backgroundColor: colors.primary,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  cardsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '15%',
  },
  cardsCol: {
    flexDirection: 'column',
    paddingLeft: '6%',
    paddingRight: '6%',
  },
  cardsSection: {
    marginTop: '15%',
  },
  subtitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    textAlign: 'center',
  },
});

class Cards extends PureComponent {
  constructor(props) {
    super(props);
  }

  _showContent = (key) => {
    const { navigation } = this.props;

    navigation.navigate('VisualizarConteudo', {
      key: key,
    });
  };

  render() {
    return (
      <View style={styles.cardsSection}>
        <View style={styles.cardsRow}>
          <View style={styles.cardsCol}>
            <Card
              style={styles.card}
              onPress={() => this._showContent('compras')}>
              <ContentCard>
                <View>
                  <CardIcon width={110} height={110} />
                </View>
              </ContentCard>
            </Card>
            <Text style={styles.subtitle}>Compras</Text>
          </View>
          <View style={styles.cardsCol}>
            <Card
              style={styles.card}
              onPress={() => this._showContent('investimentos')}>
              <ContentCard>
                <View>
                  <ManagementIcon width={110} height={110} />
                </View>
              </ContentCard>
            </Card>
            <Text style={styles.subtitle}>Investimentos</Text>
          </View>
        </View>
        <View style={styles.cardsRow}>
          <View style={styles.cardsCol}>
            <Card
              style={styles.card}
              onPress={() => this._showContent('rendaExtra')}>
              <ContentCard>
                <View>
                  <LoseIcon width={110} height={110} />
                </View>
              </ContentCard>
            </Card>
            <Text style={styles.subtitle}>Renda extra</Text>
          </View>
          <View style={styles.cardsCol}>
            <Card
              style={styles.card}
              onPress={() => this._showContent('termos')}>
              <ContentCard>
                <View>
                  <InvestmentIcon width={110} height={110} />
                </View>
              </ContentCard>
            </Card>
            <Text style={styles.subtitle}>Terminologias</Text>
          </View>
        </View>
      </View>
    );
  }
}

class ContentScreen extends PureComponent {
  render() {
    return (
      <View>
        <Header>
          <Content
            title="Conteúdos que podem ajudar"
            titleStyle={styles.appBarText}
          />
        </Header>
        <Cards navigation={this.props.navigation} />
      </View>
    );
  }
}

export default ContentScreen;
