import React from 'react';
import {
  View,
  Modal,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import createStyles from './NotesModal.styles';

const styles = createStyles();

class NotesModal extends React.Component {
  static propTypes = {
    onRequestClose: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    onCloseButtonPress: PropTypes.func.isRequired,
    onSaveButtonPress: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      note: '',
    };
  }

  render() {
    const {
      onRequestClose,
      visible,
      onCloseButtonPress,
      onSaveButtonPress,
    } = this.props;
    const { note } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={onRequestClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.placeOfMeasurementModal}>
            <View style={styles.inputContainer}>
              <Text style={styles.modalTitle}>NAPOMENA</Text>
              <TextInput
                value={note}
                onChangeText={text => this.setState({ note: text })}
                multiline
                maxLength={40}
                numberOfLines={5}
                autoFocus
                underlineColorAndroid="transparent"
                style={styles.notesTxtInput}
              />
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.btnModal}
                onPress={onCloseButtonPress}
              >
                <Text style={styles.btnText}>Zatvori</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnModal}
                onPress={() => onSaveButtonPress(note)}
              >
                <Text style={styles.btnText}>Spremi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default NotesModal;
