import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Modal,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import createStyles from './NotesModal.styles';
import { noteChanged } from '../../features/electric-meter/ElectricMeterActions';

const styles = createStyles();

class NotesModal extends React.Component {
  static propTypes = {
    onRequestClose: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    onCloseButtonPress: PropTypes.func.isRequired,
    onSaveButtonPress: PropTypes.func.isRequired,
    note: PropTypes.string.isRequired,
    NoteChanged: PropTypes.func.isRequired,
  };

  onNoteChanged = (note) => {
    const { NoteChanged } = this.props;

    NoteChanged(note);
  }

  render() {
    const {
      onRequestClose,
      visible,
      onCloseButtonPress,
      onSaveButtonPress,
      note,
    } = this.props;
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
                onChangeText={this.onNoteChanged}
                multiline
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
                style={note === '' ? [styles.btnModal, { opacity: 0.4 }] : [styles.btnModal, { opacity: 1 }]}
                onPress={() => onSaveButtonPress(note)}
                disabled={note === ''}
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

const mapStateToProps = state => ({
  note: state.electricMeter.note,
});

export default connect(mapStateToProps, { NoteChanged: noteChanged })(NotesModal);
