import React from 'react';
import { View, Text } from 'react-native';
import { Header } from 'react-native-elements';
import PropTypes from 'prop-types';

import MenuButton from '../../../components/helpers/MenuButton';

import createStyles from './Account.styles';

const styles = createStyles();

class AccountScreen extends React.Component {
  static navigationOptions = {
    title: 'Pregled računa',
  };

  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header
          containerStyle={styles.header}
          leftComponent={<MenuButton onPress={() => navigation.openDrawer()} />}
        />
        <View style={styles.container}>
          <Text>AccountScreen</Text>
        </View>
      </View>
    );
  }
}

export default AccountScreen;
