import React from 'react';
import { View, Text } from 'react-native';
import { Header } from 'react-native-elements';
import PropTypes from 'prop-types';

import MenuButton from '../../../components/helpers/MenuButton';

import createStyles from './EService.styles';

const styles = createStyles();

class EServiceScreen extends React.Component {
  static navigationOptions = {
    title: 'E-Usluge',
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
          <Text>EServiceScreen</Text>
        </View>
      </View>
    );
  }
}

export default EServiceScreen;
