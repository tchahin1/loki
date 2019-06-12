import React from 'react';
import { View, Text } from 'react-native';
import { Header } from 'react-native-elements';
import PropTypes from 'prop-types';

import MenuButton from '../../../components/helpers/MenuButton';
import Colors from '../../../assets/colors/AppColorsEnum';

import createStyles from './QuestionsAndComplaints.styles';

const styles = createStyles();

class QuestionsAndComplaintsScreen extends React.Component {
  static navigationOptions = {
    title: 'Upiti i reklamacije',
    color: Colors.PRIMARY_BLUE,
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
          <Text>QuestionsAndComplaintsScreen</Text>
        </View>
      </View>
    );
  }
}

export default QuestionsAndComplaintsScreen;
