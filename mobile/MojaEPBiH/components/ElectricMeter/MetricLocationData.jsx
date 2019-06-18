import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

import NotesModal from './NotesModal';

import createStyles from './MetricLocationData.styles';

const styles = createStyles();

class MetricLocationData extends React.Component {
  static propTypes = {
    flexStyle: PropTypes.number,
  };

  static defaultProps = {
    flexStyle: 2 / 3,
  };

  constructor(props) {
    super(props);

    this.state = {
      largeTariff: '',
      smallTariff: '',
      saveBtnDisabledOpacity: 0.4,
      err: '',
      openNotesModal: false,
    };
  }

  validateFields = () => {
    const reg = new RegExp('^[0-9]+$');
    const { largeTariff, smallTariff } = this.state;

    if (!largeTariff.match(reg) || !smallTariff.match(reg)) {
      this.setState({
        err: 'Polja velika i mala tarifa mogu sadržavati samo cifre',
        saveBtnDisabledOpacity: 0.4,
      });
      return;
    }

    this.saveData();
  };

  saveData = () => {
    // save data to database
    Alert.alert('INFO', 'Brojilo uspješno očitano!');
  };

  saveNote = () => {
    this.setState({ openNotesModal: false });
    // save data to database
  };

  render() {
    const { flexStyle, navigation } = this.props;
    const {
      largeTariff,
      smallTariff,
      saveBtnDisabledOpacity,
      err,
      openNotesModal,
    } = this.state;
    return (
      <View style={[styles.container, { flex: flexStyle }]}>
        <View style={styles.inputsWrapper}>
          <View style={styles.vtInput}>
            <Text style={styles.labelInput}>Velika tarifa:</Text>
            <TextInput
              value={largeTariff}
              onChangeText={text => this.setState({
                largeTariff: text,
                err: '',
                saveBtnDisabledOpacity: 1,
              })}
              underlineColorAndroid="transparent"
              keyboardType="numeric"
              style={styles.txtInput}
            />
          </View>
          <View style={styles.mtInput}>
            <Text style={styles.labelInput}>Mala tarifa:</Text>
            <TextInput
              value={smallTariff}
              onChangeText={text => this.setState({
                smallTariff: text,
                err: '',
                saveBtnDisabledOpacity: 1,
              })}
              underlineColorAndroid="transparent"
              keyboardType="numeric"
              style={styles.txtInput}
            />
          </View>
          <Text style={styles.err}>{err}</Text>
        </View>
        <View style={styles.btnsWrapper}>
          <TouchableOpacity
            style={styles.btnIcon}
            onPress={() => navigation.navigate('Camera')}
          >
            <Icon
              type="ionicon"
              name="ios-camera"
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnIcon}
          >
            <Icon
              type="ionicon"
              name="ios-chatboxes"
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnSave, { opacity: saveBtnDisabledOpacity }]}
            disabled={largeTariff === '' || smallTariff === '' || err !== ''}
            onPress={this.validateFields}
          >
            <Text style={styles.btnTxt}>Spremi</Text>
          </TouchableOpacity>
        </View>
        <NotesModal
          onRequestClose={() => this.setState({ openNotesModal: false })}
          visible={openNotesModal}
          onCloseButtonPress={() => this.setState({ openNotesModal: false })}
          onSaveButtonPress={this.saveNote}
        />
      </View>
    );
  }
}

export default MetricLocationData;
