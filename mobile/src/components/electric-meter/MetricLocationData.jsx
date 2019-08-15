import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements/src/index';
import NotesModal from './NotesModal';
import Colors from '../../assets/colors/AppColorsEnum';
import createStyles from './MetricLocationData.styles';
import {
  largeTariffChanged,
  smallTariffChanged,
} from '../../features/electric-meter/ElectricMeterActions';

const styles = createStyles();

class MetricLocationData extends React.Component {
  static propTypes = {
    flexStyle: PropTypes.number,
    navigation: PropTypes.shape({}).isRequired,
    largeTariff: PropTypes.string.isRequired,
    smallTariff: PropTypes.string.isRequired,
    LargeTariffChanged: PropTypes.func.isRequired,
    SmallTariffChanged: PropTypes.func.isRequired,
  };

  static defaultProps = {
    flexStyle: 2 / 3,
  };

  constructor(props) {
    super(props);

    this.state = {
      saveBtnDisabledOpacity: 0.4,
      err: '',
      openNotesModal: false,
      note: '',
      currentPhoto: null,
    };
  }

  onLargeTariffChanged = (text) => {
    const { LargeTariffChanged } = this.props;

    // this.setState({ saveBtnDisabledOpacity: 1 });
    LargeTariffChanged(text);
  }

  onSmallTariffChanged = (text) => {
    const { SmallTariffChanged } = this.props;

    // this.setState({ saveBtnDisabledOpacity: 1 });
    SmallTariffChanged(text);
  }

  validateFields = () => {
    const reg = new RegExp('^[0-9]+$');
    const { largeTariff, smallTariff } = this.props;

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
    Keyboard.dismiss();
    Alert.alert('INFO', 'Brojilo uspješno očitano!');
  };

  saveNote = (note) => {
    this.setState({ openNotesModal: false, note });
    // save data to database
  };

  savePhoto = (photo) => {
    const { navigation } = this.props;

    this.setState({ currentPhoto: photo });
    navigation.navigate('ElectricMeter');
    // save data to database
  };

  checkPhotoAndNoteIconColors() {
    const { note, currentPhoto } = this.state;
    let noteColor = Colors.PRIMARY_WHITE;
    let cameraColor = Colors.PRIMARY_WHITE;
    let noteIconColor = 'black';
    let cameraIconColor = 'black';

    if (note !== '' && currentPhoto !== null) {
      noteColor = Colors.PRIMARY_BLUE;
      cameraColor = Colors.PRIMARY_BLUE;
      noteIconColor = Colors.PRIMARY_WHITE;
      cameraIconColor = Colors.PRIMARY_WHITE;
    } else if (note === '' && currentPhoto !== null) {
      noteColor = Colors.PRIMARY_WHITE;
      cameraColor = Colors.PRIMARY_BLUE;
      noteIconColor = 'black';
      cameraIconColor = Colors.PRIMARY_WHITE;
    } else if (note !== '' && currentPhoto === null) {
      noteColor = Colors.PRIMARY_BLUE;
      cameraColor = Colors.PRIMARY_WHITE;
      noteIconColor = Colors.PRIMARY_WHITE;
      cameraIconColor = 'black';
    }

    return {
      noteColor,
      cameraColor,
      noteIconColor,
      cameraIconColor,
    };
  }


  render() {
    const { flexStyle, navigation } = this.props;
    const {
      saveBtnDisabledOpacity,
      err,
      openNotesModal,
      currentPhoto,
    } = this.state;
    const { largeTariff, smallTariff } = this.props;

    return (
      <View style={[styles.container, { flex: flexStyle }]}>
        <View style={styles.inputsWrapper}>
          <View style={styles.vtInput}>
            <Text style={styles.labelInput}>Velika tarifa:</Text>
            <TextInput
              value={largeTariff}
              onChangeText={this.onLargeTariffChanged}
              underlineColorAndroid="transparent"
              keyboardType="numeric"
              style={styles.txtInput}
            />
          </View>
          <View style={styles.mtInput}>
            <Text style={styles.labelInput}>Mala tarifa:</Text>
            <TextInput
              value={smallTariff}
              onChangeText={this.onSmallTariffChanged}
              underlineColorAndroid="transparent"
              keyboardType="numeric"
              style={styles.txtInput}
            />
          </View>
          <Text style={styles.err}>{err}</Text>
        </View>
        <View style={styles.btnsWrapper}>
          <TouchableOpacity
            style={[styles.btnIcon,
              {
                backgroundColor: this.checkPhotoAndNoteIconColors().cameraColor,
              }]}
            onPress={() => navigation.navigate('Camera',
              {
                savePhoto: this.savePhoto,
                onBackButtonPressScreen: 'ElectricMeter',
              })}
          >
            <Icon
              type="ionicon"
              name="ios-camera"
              size={30}
              color={this.checkPhotoAndNoteIconColors().cameraIconColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnIcon,
              {
                backgroundColor: this.checkPhotoAndNoteIconColors().noteColor,
              }]}
            onPress={() => this.setState({ openNotesModal: true })}
          >
            <Icon
              type="ionicon"
              name="ios-chatboxes"
              size={25}
              color={this.checkPhotoAndNoteIconColors().noteIconColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnSave, { opacity: saveBtnDisabledOpacity }]}
            disabled={largeTariff === '' || smallTariff === '' || err !== '' || currentPhoto === null}
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

const mapStateToProps = state => ({
  largeTariff: state.electricMeter.largeTariff,
  smallTariff: state.electricMeter.smallTariff,
});

export default connect(mapStateToProps,
  {
    LargeTariffChanged: largeTariffChanged,
    SmallTariffChanged: smallTariffChanged,
  })(MetricLocationData);
