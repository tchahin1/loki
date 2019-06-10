import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Modal,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Icon } from 'react-native-elements';

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

const styles = createStyles();

class HomeScreen extends React.Component {
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
      name: '',
      reference: '',
      number: '',
      errorText: '',
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

  validateFields = () => {
    const { reference, number } = this.state;
    const refCopy = reference;
    const reg = new RegExp('^[0-9]+$');
    const text = 'Polja nisu ipravno popunjena';
    refCopy.replace('-', '');
    const res = reference.split('-');
    if (res.length !== 3 || reference.length !== 19) {
      this.setState({ errorText: text });
      return;
    }
    if (res[0].length !== 5 || res[1].length !== 7 || res[2].length !== 5) {
      this.setState({ errorText: text });
      return;
    }
    if (!res[0].match(reg) || !res[1].match(reg) || !res[2].match(reg)) {
      this.setState({ errorText: text });
      return;
    }
    if (number.length !== 6 || !number.match(reg)) {
      this.setState({ errorText: text });
      return;
    }
    this.setState({ reference: refCopy, errorText: '' });
    this.setState({ openPlaceOfMeasurementMod: false });
  };

  render() {
    const { serverText, navigation } = this.props;
    const { current } = serverText;
    const {
      openNotMod,
      openPlaceOfMeasurementMod,
      name,
      reference,
      number,
      errorText,
    } = this.state;
    if (current === ServerTextEnum.WAITING.text) {
      return <ActivityIndicator size="small" color={Colors.PRIMARY_WHITE} />;
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.setState({ openNotMod: true })}>
            <Icon
              type="ionicon"
              name="ios-notifications"
              color={Colors.NOTICE_COLOR}
              size={50}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.btnsWrapper}>
          {MainMenuOptions.map((option, index) => (
            <TouchableOpacity key={index.toString()} style={styles.btn}>
              <Text style={styles.btnTxt}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Modal
          animationType="fade"
          transparent
          visible={openNotMod}
          onRequestClose={() => this.setState({ openNotMod: false })}
        >
          <View style={[styles.container, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]}>
            <View style={styles.notificationsMod}>
              <TouchableOpacity
                style={styles.signOutbtn}
                onPress={() => onSignOut().then(navigation.navigate('SignedOut'))}
              >
                <Text>Sign out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          onRequestClose={() => this.setState({ openPlaceOfMeasurementMod: false })}
          animationType="fade"
          transparent
          visible={openPlaceOfMeasurementMod}
        >
          <View style={[styles.container, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]}>
            <View style={styles.placeOfMeasurementMod}>
              <Text style={styles.modalTitle}>Dodaj mjerno mjesto</Text>
              <Text style={styles.label}>Naziv:</Text>
              <TextInput
                style={styles.txtInput}
                placeholder="npr. kuća, vikendica"
                value={name}
                onChangeText={text => this.setState({ name: text })}

              />
              <Text style={styles.label}>Broj računa/Referenca:</Text>
              <TextInput
                style={styles.txtInput}
                placeholder="xxxxx-xxxxxxx-xxxxx"
                value={reference}
                maxLength={19}
                onChangeText={text => this.setState({ reference: text })}
              />
              <Text style={styles.label}>Broj mjernog mjesta:</Text>
              <TextInput
                style={styles.txtInput}
                placeholder="xxxxxx"
                value={number}
                keyboardType="numeric"
                maxLength={6}
                onChangeText={text => this.setState({ number: text })}
              />
              <Text style={styles.err}>{errorText}</Text>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.modalBtn}
                  onPress={() => {
                    this.validateFields();
                  }}
                >
                  <Text style={{ fontSize: 16 }}>Dodaj</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalBtn}
                  onPress={() => this.setState({ openPlaceOfMeasurementMod: false })}
                >
                  <Text style={{ fontSize: 16 }}>Zatvori</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
