import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Icon } from 'react-native-elements';

import api from '../../network.config';
import createStyles from './Home.styles';
import {
  receivedTextFromServerAction,
  serverUnavailableAction,
  waitingForServerAction,
} from '../../actions/ServerTextActions';
import ServerTextEnum from '../../assets/enum/ServerTextEnum';
import Colors from '../../assets/colors/AppColorsEnum';
import { MainMenuOptions } from '../../assets/enum/MainMenuOptions';

const styles = createStyles();

class HomeScreen extends React.Component {
  static propTypes = {
    serverText: PropTypes.shape({}).isRequired,
    serverUnavailable: PropTypes.func.isRequired,
    waitingForServer: PropTypes.func.isRequired,
    receivedTextFromServer: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      token: '',
      openNotModal: false,
    };
  }

  componentWillMount() {
    this.fetchServerText();
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

  render() {
    const { serverText } = this.props;
    const { current } = serverText;
    const { openNotModal } = this.state;
    if (current === ServerTextEnum.WAITING.text) {
      return <ActivityIndicator size="small" color={Colors.PRIMARY_WHITE} />;
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.setState({ openNotModal: true })}>
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
          visible={openNotModal}
          onRequestClose={() => this.setState({ openNotModal: false })}
        >
          <View style={[styles.container, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]}>
            <View style={styles.modal}>
              <TouchableOpacity style={styles.signOutbtn}>
                <Text>Sign out</Text>
              </TouchableOpacity>
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
