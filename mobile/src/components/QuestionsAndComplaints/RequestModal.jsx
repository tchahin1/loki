import React from 'react';
import {
  View,
  Modal,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import createStyles from './RequestModal.styles';

const styles = createStyles();

class RequestModal extends React.Component {
  static propTypes = {
    onRequestClose: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    onCloseButtonPress: PropTypes.func.isRequired,
    onSendButtonPress: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      request: '',
    };
  }

  render() {
    const {
      onRequestClose,
      visible,
      onCloseButtonPress,
      onSendButtonPress,
    } = this.props;
    const { request } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={onRequestClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.requestModal}>
            <View style={styles.inputContainer}>
              <Text style={styles.modalTitle}>ZAHTJEV</Text>
              <TextInput
                value={request}
                onChangeText={text => this.setState({ request: text })}
                multiline
                maxLength={40}
                numberOfLines={5}
                autoFocus
                underlineColorAndroid="transparent"
                style={styles.requestTxtInput}
              />
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.btnModal}
                onPress={onCloseButtonPress}
              >
                <Text style={styles.btnText}>Odustani</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnModal}
                disabled={request === ''}
                onPress={() => onSendButtonPress(request)}
              >
                <Text style={styles.btnText}>Pošalji</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default RequestModal;
