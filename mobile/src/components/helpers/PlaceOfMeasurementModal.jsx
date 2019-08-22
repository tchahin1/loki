import React from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import createStyles from './styles/PlaceOfMeasurementModal.styles';
import {
  placeNameChanged,
  referenceChanged,
  placeNumberChanged,
  savePlaceDetails,
  initializePlaceOfMeasurementModal,
  fetchMeasurementPlaces,
} from './PlaceOfMeasurementModalActions';

const styles = createStyles();

class PlaceOfMeasurementModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    reference: PropTypes.string.isRequired,
    PlaceNameChanged: PropTypes.func.isRequired,
    ReferenceChanged: PropTypes.func.isRequired,
    PlaceNumberChanged: PropTypes.func.isRequired,
    SavePlaceDetails: PropTypes.func.isRequired,
    InitializePlaceOfMeasurementModal: PropTypes.func.isRequired,
    FetchMeasurementPlaces: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      errorText: '',
    };
  }

  componentWillMount() {
    const { InitializePlaceOfMeasurementModal, status } = this.props;

    if (status === 'OK') {
      InitializePlaceOfMeasurementModal();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { status } = nextProps;
    const {
      InitializePlaceOfMeasurementModal,
      FetchMeasurementPlaces, username, token,
    } = this.props;

    if (status === 'OK') {
      InitializePlaceOfMeasurementModal();
      FetchMeasurementPlaces({ username, token });
    }
  }

  onPlaceNameChanged = (text) => {
    const { PlaceNameChanged } = this.props;

    PlaceNameChanged(text);
  }

  onReferenceChanged = (text) => {
    const { ReferenceChanged } = this.props;

    ReferenceChanged(text);
  }

  onPlaceNumberChanged = (text) => {
    const { PlaceNumberChanged } = this.props;

    PlaceNumberChanged(text);
  }

  validateFields = () => {
    const {
      name, reference, number, SavePlaceDetails, token, username,
    } = this.props;
    const { errorText } = this.state;
    const { toggle } = this.props;
    let refCopy = reference;
    const reg = new RegExp('^[0-9]+$');
    const text = 'Polja nisu ispravno popunjena';
    const res = reference.split('-');
    refCopy = res[0] + res[1] + res[2];

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
    if (number.length < 6 || !number.match(reg)) {
      this.setState({ errorText: text });
      return;
    }

    this.setState({ errorText: '' });

    SavePlaceDetails({
      name, reference: refCopy, number, token, username,
    });

    if (errorText === '') toggle();
  };

  render() {
    const { errorText } = this.state;
    const {
      visible, onRequestClose, toggle, name, number, reference,
    } = this.props;
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
              style={styles.txtInputContainer}
              placeholder="npr. kuća, vikendica"
              value={name}
              onChangeText={this.onPlaceNameChanged}

            />
            <Text style={styles.label}>Broj računa/Referenca:</Text>
            <TextInput
              style={styles.txtInputContainer}
              placeholder="xxxxx-xxxxxxx-xxxxx"
              value={reference}
              maxLength={19}
              onChangeText={this.onReferenceChanged}
            />
            <Text style={styles.label}>Broj mjernog mjesta:</Text>
            <TextInput
              style={styles.txtInputContainer}
              placeholder="xxxxxxx"
              value={number}
              keyboardType="numeric"
              minLength
              maxLength={7}
              onChangeText={this.onPlaceNumberChanged}
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

const mapStateToProps = state => ({
  name: state.measurementPlaceModal.placeName,
  reference: state.measurementPlaceModal.reference,
  number: state.measurementPlaceModal.placeNumber,
  token: state.signIn.user,
  status: state.measurementPlaceModal.status,
  username: state.signIn.id,
});

export default connect(mapStateToProps,
  {
    PlaceNameChanged: placeNameChanged,
    ReferenceChanged: referenceChanged,
    PlaceNumberChanged: placeNumberChanged,
    SavePlaceDetails: savePlaceDetails,
    InitializePlaceOfMeasurementModal: initializePlaceOfMeasurementModal,
    FetchMeasurementPlaces: fetchMeasurementPlaces,
  })(PlaceOfMeasurementModal);
