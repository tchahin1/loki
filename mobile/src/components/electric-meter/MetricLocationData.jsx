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
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements/src/index';
import NotesModal from './NotesModal';
import Screen from '../../navigation/ScreenName';
import Colors from '../../assets/colors/AppColorsEnum';
import createStyles from './MetricLocationData.styles';
import {
  largeTariffChanged,
  smallTariffChanged,
  photoChanged,
  noteChanged,
  saveMeasurement,
  clearInfoText,
  clearNote,
  initializeElectricMeter,
} from '../../features/electric-meter/ElectricMeterActions';

const styles = createStyles();
const statusOK = 'Brojilo uspješno očitano!';

class MetricLocationData extends React.Component {
  static propTypes = {
    places: PropTypes.instanceOf(Array).isRequired,
    flexStyle: PropTypes.number,
    navigation: PropTypes.shape({}).isRequired,
    largeTariff: PropTypes.string.isRequired,
    smallTariff: PropTypes.string.isRequired,
    currentPhoto: PropTypes.shape({}),
    username: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    infoText: PropTypes.string.isRequired,
    LargeTariffChanged: PropTypes.func.isRequired,
    SmallTariffChanged: PropTypes.func.isRequired,
    PhotoChanged: PropTypes.func.isRequired,
    currentPlace: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    NoteChanged: PropTypes.func.isRequired,
    SaveMeasurement: PropTypes.func.isRequired,
    ClearInfoText: PropTypes.func.isRequired,
    ClearNote: PropTypes.func.isRequired,
    InitializeElectricMeter: PropTypes.func.isRequired,
    notification: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    flexStyle: 2 / 3,
    currentPhoto: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      saveBtnDisabledOpacity: 0.4,
      err: '',
      openNotesModal: false,
      previousCamera: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;

    navigation.addListener('willFocus', this.load);
  }

  componentWillReceiveProps(nextProps) {
    const { ClearInfoText, navigation } = this.props;

    if (nextProps.infoText !== '') {
      Keyboard.dismiss();
      if (nextProps.infoText === statusOK) {
        Alert.alert(
          'INFO',
          nextProps.infoText,
          [
            { text: 'OK', onPress: () => navigation.navigate(Screen.HOME) },
          ],
          { cancelable: false },
        );
      } else {
        Alert.alert('INFO', nextProps.infoText);
      }
      ClearInfoText();
    }
  }

  load = () => {
    const { InitializeElectricMeter, places } = this.props;
    const { previousCamera } = this.state;

    if (places.length !== 0 && !previousCamera) {
      InitializeElectricMeter();
    }

    if (previousCamera) {
      this.setState({ previousCamera: !previousCamera });
    }
  }

  onLargeTariffChanged = (text) => {
    const { LargeTariffChanged } = this.props;

    this.setState({ err: '', saveBtnDisabledOpacity: 1 });
    LargeTariffChanged(text);
  }

  onSmallTariffChanged = (text) => {
    const { SmallTariffChanged } = this.props;

    this.setState({ err: '', saveBtnDisabledOpacity: 1 });
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
    const {
      largeTariff, smallTariff, currentPhoto, note, currentPlace, username,
      token, SaveMeasurement, notification, navigation,
    } = this.props;

    if (notification) {
      SaveMeasurement({
        largeTariff, smallTariff, currentPhoto, note, currentPlace, username, token,
      });
    } else {
      Alert.alert(
        'NO NOTIFICATION RECIEVED!',
        'You can\'t access this feature until you recieve a notification from the provider!',
        [
          { text: 'OK', onPress: () => navigation.navigate(Screen.HOME) },
        ],
        { cancelable: false },
      );
    }
  };

  saveNote = (note) => {
    this.setState({ openNotesModal: false, note });
    const { NoteChanged } = this.props;

    NoteChanged(note);
  };

  savePhoto = (photo) => {
    const { navigation, PhotoChanged } = this.props;

    PhotoChanged(photo);
    navigation.navigate('ElectricMeter');
  };

  clearNote = () => {
    const { ClearNote } = this.props;

    ClearNote();
    this.setState({ openNotesModal: false });
  }

  navigateToCamera = () => {
    const { navigation } = this.props;

    this.setState({ previousCamera: true });

    navigation.navigate(Screen.CAMERA,
      {
        savePhoto: this.savePhoto,
        onBackButtonPressScreen: Screen.ELECTRIC_METER,
      });
  }

  checkPhotoAndNoteIconColors() {
    const { note } = this.state;
    const { currentPhoto } = this.props;
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
    const { flexStyle } = this.props;
    const {
      saveBtnDisabledOpacity,
      err,
      openNotesModal,
    } = this.state;
    const { largeTariff, smallTariff, currentPhoto } = this.props;

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
            onPress={() => this.navigateToCamera()}
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
          onRequestClose={() => this.clearNote()}
          visible={openNotesModal}
          onCloseButtonPress={() => this.clearNote()}
          onSaveButtonPress={this.saveNote}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  largeTariff: state.electricMeter.largeTariff,
  smallTariff: state.electricMeter.smallTariff,
  currentPhoto: state.electricMeter.photo,
  note: state.electricMeter.note,
  currentPlace: state.electricMeter.selectedPlace,
  username: state.signIn.id,
  notification: state.home.notification,
  token: state.signIn.user,
  infoText: state.electricMeter.infoText,
  places: _.map(state.measurementPlaceModal.places, val => ({ ...val })),
});

export default connect(mapStateToProps,
  {
    LargeTariffChanged: largeTariffChanged,
    SmallTariffChanged: smallTariffChanged,
    PhotoChanged: photoChanged,
    NoteChanged: noteChanged,
    SaveMeasurement: saveMeasurement,
    ClearInfoText: clearInfoText,
    ClearNote: clearNote,
    InitializeElectricMeter: initializeElectricMeter,
  })(MetricLocationData);
