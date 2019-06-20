import React from 'react';
import { View, Text } from 'react-native';
import { Header } from 'react-native-elements';
import PropTypes from 'prop-types';

import MenuButton from '../../../components/helpers/MenuButton';
import NotificationsButton from '../../../components/helpers/NotificationsButton';
import NotificationsModal from '../../../components/helpers/NotificationsModal';
import { onSignOut } from '../../../Auth';

import createStyles from './ConsumptionReview.styles';


const styles = createStyles();

class ConsumptionReviewScreen extends React.Component {

  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      openNotMod: false,
    };
  }

  render() {
    const { navigation } = this.props;
    const { openNotMod } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Header
          placement="left"
          containerStyle={styles.header}
          leftComponent={<MenuButton onPress={() => navigation.openDrawer()} />}
          centerComponent={{ text: 'PREGLED POTROŠNJE', style: styles.title }}
          rightComponent={(
            <NotificationsButton
              onPress={() => this.setState({ openNotMod: true })}
            />
          )}
        />
        <View style={styles.container}>
          <Text>ConsumptionReviewScreen</Text>
          <NotificationsModal
            animationType="fade"
            transparent
            visible={openNotMod}
            onRequestClose={() => this.setState({ openNotMod: false })}
            onSignOutPress={() => onSignOut().then(navigation.navigate('SignedOut'))}
          />
        </View>
      </View>
    );
  }
}

export default ConsumptionReviewScreen;
