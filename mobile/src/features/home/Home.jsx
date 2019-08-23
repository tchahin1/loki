import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Header } from 'react-native-elements/src/index';
import api from '../../api/network.config';
import createStyles from './Home.styles';
import {
  receivedTextFromServerAction,
  serverUnavailableAction,
  waitingForServerAction,
} from '../../actions/ServerTextActions';
import ServerTextEnum from '../../assets/enum/ServerTextEnum';
import MainMenuOptions from '../../assets/enum/MainMenuOptions';
import Colors from '../../assets/colors/AppColorsEnum';
import { getToken, onSignOut } from '../../../Auth';
import PlaceOfMeasurementModal from '../../components/helpers/PlaceOfMeasurementModal';
import NotificationsButton from '../../components/helpers/NotificationsButton';
import NotificationsModal from '../../components/helpers/NotificationsModal';
import logoutUser from '../account/AccountActions';
import { initializePlaceOfMeasurementModal } from '../../components/helpers/PlaceOfMeasurementModalActions';
import { initializeElectricMeter } from '../electric-meter/ElectricMeterActions';

const styles = createStyles();

class HomeScreen extends React.Component {
  static propTypes = {
    serverText: PropTypes.shape({}).isRequired,
    serverUnavailable: PropTypes.func.isRequired,
    waitingForServer: PropTypes.func.isRequired,
    receivedTextFromServer: PropTypes.func.isRequired,
    navigation: PropTypes.shape({}).isRequired,
    user: PropTypes.string.isRequired,
    LogoutUser: PropTypes.func.isRequired,
    InitializePlaceOfMeasurementModal: PropTypes.func.isRequired,
    InitializeElectricMeter: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      token: '',
      openNotMod: false,
      openPlaceOfMeasurementMod: false,
    };
  }

  componentWillMount() {
    getToken().then(token => this.setState({ token }, () => this.fetchServerText()));
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

  fetchServerText = () => {
    const {
      waitingForServer,
      receivedTextFromServer,
      serverUnavailable,
    } = this.props;
    const { token } = this.state;
    waitingForServer();
    fetch(`${api}/hello`, {
      method: 'GET',
      headers: {
        privateKey: token,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      response.text().then((text) => {
        receivedTextFromServer(text);
      });
    }).catch(() => {
      serverUnavailable();
    });
  };

  togglePlaceOfMeasurementModal = () => {
    const { openPlaceOfMeasurementMod } = this.state;
    const { InitializePlaceOfMeasurementModal } = this.props;

    InitializePlaceOfMeasurementModal();
    this.setState({ openPlaceOfMeasurementMod: !openPlaceOfMeasurementMod });
  };

  openMenu = (option) => {
    const { navigation, InitializeElectricMeter } = this.props;

    switch (option.key) {
      case 'ElectricMeter':
        InitializeElectricMeter();
        break;
      default:
        console.log('');
    }

    navigation.navigate(option.key);
  }

  render() {
    const { serverText } = this.props;
    const { current } = serverText;
    const {
      openNotMod,
      openPlaceOfMeasurementMod,
    } = this.state;

    if (current === ServerTextEnum.WAITING.text) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Colors.PRIMARY_WHITE} />
        </View>
      );
    }
    return (
      <View style={styles.wrapper}>
        <Header
          containerStyle={styles.header}
          rightComponent={(
            <NotificationsButton
              onPress={() => this.setState({ openNotMod: true })}
            />
          )}
        />
        <View style={styles.container}>
          <View style={styles.btnsWrapper}>
            {MainMenuOptions.map((option, index) => (
              <TouchableOpacity
                key={index.toString()}
                style={styles.btnIcon}
                onPress={() => this.openMenu(option)}
              >
                <Text style={styles.btnTxt}>{option.value}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <NotificationsModal
            animationType="fade"
            transparent
            visible={openNotMod}
            onRequestClose={() => this.setState({ openNotMod: false })}
            onSignOutPress={this.onSignOutPressed}
          />
          <PlaceOfMeasurementModal
            visible={openPlaceOfMeasurementMod}
            onRequestClose={() => {}}
            toggle={this.togglePlaceOfMeasurementModal}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  serverText: state.serverText,
  user: state.signIn.user,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    serverUnavailable: serverUnavailableAction,
    waitingForServer: waitingForServerAction,
    receivedTextFromServer: receivedTextFromServerAction,
    LogoutUser: logoutUser,
    InitializePlaceOfMeasurementModal: initializePlaceOfMeasurementModal,
    InitializeElectricMeter: initializeElectricMeter,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
