import React from 'react';
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import createStyles from './styles/PlaceOfMeasurementModal.styles';

const styles = createStyles();

class PlaceOfMeasurementModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      reference: '',
      number: '',
      errorText: '',
    };
  }

  validateFields = () => {
    const { name, reference, number } = this.state;
    const { toggle } = this.props;
    const refCopy = reference;
    const reg = new RegExp('^[0-9]+$');
    const text = 'Polja nisu ipravno popunjena';
    const res = reference.split('-');
    refCopy.replace('-', '');

    if (name.length === 0) {
      this.setState({ errorText: text });
      return;
    }
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

    // Save data to database

    toggle();
  };

  render() {
    const {
      name,
      reference,
      number,
      errorText,
    } = this.state;
    const { visible, onRequestClose, toggle } = this.props;
    return (
      <Modal
        visible={visible}
        onRequestClose={onRequestClose}
        animationType="fade"
        transparent
      >
        <View style={styles.modalContainer}>
          <View style={styles.placeOfMeasurementMod}>
            <Text style={styles.modalTitle}>Dodaj mjerno mjesto</Text>
            <Text style={styles.label}>Naziv:</Text>
            <TextInput
              style={styles.txtInput}
              placeholder="npr. kuća, vikendica"
              value={name}
              onChangeText={text => this.setState({ name: text, errorText: '' })}

            />
            <Text style={styles.label}>Broj računa/Referenca:</Text>
            <TextInput
              style={styles.txtInput}
              placeholder="xxxxx-xxxxxxx-xxxxx"
              value={reference}
              maxLength={19}
              onChangeText={text => this.setState({ reference: text, errorText: '' })}
            />
            <Text style={styles.label}>Broj mjernog mjesta:</Text>
            <TextInput
              style={styles.txtInput}
              placeholder="xxxxxx"
              value={number}
              keyboardType="numeric"
              maxLength={6}
              onChangeText={text => this.setState({ number: text, errorText: '' })}
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
                onPress={toggle}
              >
                <Text style={{ fontSize: 16 }}>Zatvori</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default PlaceOfMeasurementModal;
