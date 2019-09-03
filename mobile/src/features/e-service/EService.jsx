import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Header } from 'react-native-elements/src/index';
import PropTypes from 'prop-types';
import MenuButton from '../../components/helpers/MenuButton';
import NotificationsButton from '../../components/helpers/NotificationsButton';
import NotificationsModal from '../../components/helpers/NotificationsModal';
import { onSignOut } from '../../../Auth';
import createStyles from './EService.styles';

import logoutUser from '../account/AccountActions';

const styles = createStyles();

class EServiceScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    user: PropTypes.string.isRequired,
    LogoutUser: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      openNotMod: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { navigation } = this.props;

    if (nextProps.user === '') {
      onSignOut().then(navigation.navigate('SignedOut'));
    }
  }

  onSignOutPressed = () => {
    const { LogoutUser } = this.props;

    LogoutUser();
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
          centerComponent={{ text: 'E-USLUGE', style: styles.title }}
          rightComponent={(
            <NotificationsButton
              onPress={() => this.setState({ openNotMod: true })}
            />
          )}
        />
        <View style={styles.container}>
          <Text>EServiceScreen</Text>
          <NotificationsModal
            animationType="fade"
            transparent
            visible={openNotMod}
            onRequestClose={() => this.setState({ openNotMod: false })}
            onSignOutPress={this.onSignOutPressed}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.signIn.user,
});

export default connect(mapStateToProps, { LogoutUser: logoutUser })(EServiceScreen);
