import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Header } from 'react-native-elements/src/index';
import PropTypes from 'prop-types';
import MenuButton from '../../components/helpers/MenuButton';
import NotificationsButton from '../../components/helpers/NotificationsButton';
import NotificationsModal from '../../components/helpers/NotificationsModal';
import { onSignOut } from '../../../Auth';
import Form from '../../components/questions-and-complaints/Form';
import LargeActivityIndicator from '../../components/large-activity-indicator/LargeActivityIndicator';
import createStyles from './QuestionsAndComplaints.styles';

import logoutUser from '../account/AccountActions';

const styles = createStyles();

class QuestionsAndComplaintsScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    user: PropTypes.string.isRequired,
    LogoutUser: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
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

  isLoading = () => {
    const { loading } = this.props;

    if (loading) {
      return (
        <LargeActivityIndicator />
      );
    }
    return null;
  }

  render() {
    const { navigation } = this.props;
    const {
      openNotMod,
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Header
          placement="left"
          containerStyle={styles.header}
          leftComponent={<MenuButton onPress={() => navigation.openDrawer()} />}
          centerComponent={{ text: 'UPITI I REKLAMACIJE', style: styles.title }}
          rightComponent={(
            <NotificationsButton
              onPress={() => this.setState({ openNotMod: true })}
            />
          )}
        />
        <Form
          navigation={navigation}
        />
        <NotificationsModal
          animationType="fade"
          transparent
          visible={openNotMod}
          onRequestClose={() => this.setState({ openNotMod: false })}
          onSignOutPress={this.onSignOutPressed}
        />
        {this.isLoading()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.signIn.user,
  username: state.signIn.id,
  loading: state.qac.loading,
});

export default connect(mapStateToProps, { LogoutUser: logoutUser })(QuestionsAndComplaintsScreen);
