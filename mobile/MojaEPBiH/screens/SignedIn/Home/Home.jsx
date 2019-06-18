import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Header } from 'react-native-elements';

import api from '../../../network.config';
import createStyles from './Home.styles';
import {
  receivedTextFromServerAction,
  serverUnavailableAction,
  waitingForServerAction,
} from '../../../actions/ServerTextActions';
import ServerTextEnum from '../../../assets/enum/ServerTextEnum';
import { MainMenuOptions } from '../../../assets/enum/MainMenuOptions';
import Colors from '../../../assets/colors/AppColorsEnum';
import { getToken, onSignOut } from '../../../Auth';
import PlaceOfMeasurementModal from '../../../components/helpers/PlaceOfMeasurementModal';
import NotificationsButton from '../../../components/helpers/NotificationsButton';
import NotificationsModal from '../../../components/helpers/NotificationsModal';

const styles = createStyles();

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Početna',
  };

  static propTypes = {
    serverText: PropTypes.shape({}).isRequired,
    serverUnavailable: PropTypes.func.isRequired,
    waitingForServer: PropTypes.func.isRequired,
    receivedTextFromServer: PropTypes.func.isRequired,
    navigation: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      token: '',
      openNotMod: false,
      openPlaceOfMeasurementMod: true,
    };
  }

  componentWillMount() {
    getToken().then(token => this.setState({ token }, () => this.fetchServerText()));
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
    this.setState({ openPlaceOfMeasurementMod: !openPlaceOfMeasurementMod });
  };

  render() {
    const { serverText, navigation } = this.props;
    const { current } = serverText;
    const {
      openNotMod,
      openPlaceOfMeasurementMod,
    } = this.state;

    if (current === ServerTextEnum.WAITING.text) {
      return <ActivityIndicator size="small" color={Colors.PRIMARY_WHITE} />;
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
                onPress={() => navigation.navigate(option.key)}
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
            onSignOutPress={() => onSignOut().then(navigation.navigate('SignedOut'))}
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

const mapStateToProps = (state) => {
  const { serverText } = state;
  return { serverText };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    serverUnavailable: serverUnavailableAction,
    waitingForServer: waitingForServerAction,
    receivedTextFromServer: receivedTextFromServerAction,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
