import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  KeyboardAvoidingView,
  Slider,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Header, Icon } from 'react-native-elements/src/index';
import PropTypes from 'prop-types';
import MenuButton from '../../components/helpers/MenuButton';
import NotificationsButton from '../../components/helpers/NotificationsButton';
import NotificationsModal from '../../components/helpers/NotificationsModal';
import LargeActivityIndicator from '../../components/large-activity-indicator/LargeActivityIndicator';
import { onSignOut } from '../../../Auth';
import Colors from '../../assets/colors/AppColorsEnum';
import createStyles from './FailureReport.styles';
import logoutUser from '../account/AccountActions';
import {
  noteChanged, photoChanged, sendFailureReport, sliderValueChanged,
  initializeFailureReport, resetStatus, updateGPSLocation,
} from './FailureReportActions';

const styles = createStyles();

class FailureReportScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    failure: PropTypes.string.isRequired,
    currentPhoto: PropTypes.shape({}),
    anonymus: PropTypes.number.isRequired,
    token: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    location: PropTypes.shape({}).isRequired,
    LogoutUser: PropTypes.func.isRequired,
    NoteChanged: PropTypes.func.isRequired,
    PhotoChanged: PropTypes.func.isRequired,
    SendFailureReport: PropTypes.func.isRequired,
    SliderValueChanged: PropTypes.func.isRequired,
    InitializeFailureReport: PropTypes.func.isRequired,
    ResetStatus: PropTypes.func.isRequired,
    UpdateGPSLocation: PropTypes.func.isRequired,
  };

  static defaultProps = {
    currentPhoto: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      openNotMod: false,
      sendBtnDisabledOpacity: 0.4,
      flexFirstPart: 1 / 4,
      flexSecondPart: 1 / 2,
      previousCamera: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;

    navigation.addListener('willFocus', this.load);

    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
  }

  componentWillReceiveProps(nextProps) {
    const { navigation, ResetStatus } = this.props;

    if (nextProps.token === '') {
      onSignOut().then(navigation.navigate('SignedOut'));
    }

    if (nextProps.status === 'OK') {
      Alert.alert('INFO', 'Uspješno prijavljen kvar!');
      ResetStatus();
    } else if (nextProps.status === 'ERROR') {
      Alert.alert('GREŠKA', 'Nešto nije uredu, pokušajte ponovo!');
      ResetStatus();
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  onSignOutPressed = () => {
    const { LogoutUser } = this.props;

    LogoutUser();
  }

  setFailureText = (text) => {
    const { NoteChanged } = this.props;

    if (text === '') {
      this.setState({ sendBtnDisabledOpacity: 0.4 });
    } else {
      this.setState({ sendBtnDisabledOpacity: 1 });
    }
    NoteChanged(text);
  }

  setPhotoIconColors() {
    const { failure, currentPhoto, loading } = this.props;
    let cameraColor = Colors.PRIMARY_WHITE;
    let cameraIconColor = 'black';

    if (loading) {
      cameraColor = Colors.PRIMARY_WHITE;
      cameraIconColor = 'black';
    } else if (failure !== '' && currentPhoto !== null) {
      cameraColor = Colors.PRIMARY_BLUE;
      cameraIconColor = Colors.PRIMARY_WHITE;
    } else if (failure === '' && currentPhoto !== null) {
      cameraColor = Colors.PRIMARY_BLUE;
      cameraIconColor = Colors.PRIMARY_WHITE;
    } else if (failure !== '' && currentPhoto === null) {
      cameraColor = Colors.PRIMARY_WHITE;
      cameraIconColor = 'black';
    }

    return {
      cameraColor,
      cameraIconColor,
    };
  }

  load = () => {
    const { InitializeFailureReport } = this.props;
    const { previousCamera } = this.state;

    if (previousCamera === false) {
      InitializeFailureReport();
    }

    if (previousCamera === true) this.setState({ previousCamera: !previousCamera });
  }

  keyboardDidShow = () => {
    this.setState({
      flexFirstPart: 1 / 8,
      flexSecondPart: 1 / 4,
    });
  }

  keyboardDidHide = () => {
    this.setState({
      flexFirstPart: 1 / 4,
      flexSecondPart: 1 / 2,
    });
  }

  savePhoto = (photo) => {
    const { navigation, PhotoChanged } = this.props;

    this.setState({ sendBtnDisabledOpacity: 1 });
    PhotoChanged(photo);
    navigation.navigate('FailureReport');
  }

  geoSuccess = (position) => {
    const { UpdateGPSLocation } = this.props;

    UpdateGPSLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
  }

  geoFailure = (err) => {
    console.log(err);
  }

  navigateToCamera = () => {
    const { navigation } = this.props;

    this.setState({ previousCamera: true });

    navigation.navigate('Camera',
      {
        savePhoto: this.savePhoto,
        onBackButtonPressScreen: 'FailureReport',
      });
  }

  onSliderValueChange = (value) => {
    const { SliderValueChanged } = this.props;

    SliderValueChanged(value);
  }

  saveData = () => {
    const {
      SendFailureReport, currentPhoto, failure, anonymus, token, username, location,
    } = this.props;

    const geoOptions = {
      enableHighAccuracy: true,
      timeOut: 20000,
      maximumAge: 60 * 60 * 2,
    };

    global.navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoFailure, geoOptions);

    if (anonymus === 0) {
      SendFailureReport({
        currentPhoto, failure, token, username, location,
      });
    } else {
      SendFailureReport({
        currentPhoto, failure, token, username: '', location,
      });
    }
    Keyboard.dismiss();
    this.setState({ sendBtnDisabledOpacity: 0.4 });
  }

  isLoading = () => {
    const { loading } = this.props;

    if (loading) {
      return (
        <LargeActivityIndicator />
      );
    }
    return null;
  }

  render() {
    const {
      navigation, failure, anonymus,
    } = this.props;
    const {
      openNotMod,
      sendBtnDisabledOpacity,
      flexFirstPart,
      flexSecondPart,
    } = this.state;

    return (
      <KeyboardAvoidingView
        style={styles.wrapper}
        behaviour="position"
      >
        <Header
          placement="left"
          containerStyle={styles.header}
          leftComponent={<MenuButton onPress={() => navigation.openDrawer()} />}
          centerComponent={{ text: 'PRIJAVA KVARA', style: styles.title }}
          rightComponent={(
            <NotificationsButton
              onPress={() => this.setState({ openNotMod: true })}
            />
          )}
        />
        <View style={[styles.sliderContainer, { flex: flexFirstPart }]}>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Anonimna prijava</Text>
          </View>
          <Slider
            step={1}
            style={styles.slider}
            value={anonymus}
            onValueChange={this.onSliderValueChange}
            maximumTrackTintColor={Colors.PRIMARY_BLUE}
            thumbTintColor={Colors.PRIMARY_BLUE}
            minimumTrackTintColor={Colors.NOTICE_COLOR}
          />
        </View>
        <View style={[styles.txtInputContainer, { flex: flexSecondPart }]}>
          <TextInput
            placeholder="opiši kvar..."
            value={failure}
            onChangeText={text => this.setFailureText(text)}
            style={styles.txtInput}
            multiline
          />
        </View>
        <View style={[styles.btnsWrapper, { flex: flexFirstPart }]}>
          <TouchableOpacity
            style={[styles.btnIcon, { backgroundColor: this.setPhotoIconColors().cameraColor }]}
            onPress={() => this.navigateToCamera()}
          >
            <Icon
              type="ionicon"
              name="ios-camera"
              size={30}
              color={this.setPhotoIconColors().cameraIconColor}
            />

          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnSend, { opacity: sendBtnDisabledOpacity }]}
            disabled={failure === ''}
            onPress={this.saveData}
          >
            <Text style={styles.btnTxt}>Spremi</Text>
          </TouchableOpacity>

        </View>
        <NotificationsModal
          animationType="fade"
          transparent
          visible={openNotMod}
          onRequestClose={() => this.setState({ openNotMod: false })}
          onSignOutPress={this.onSignOutPressed}
        />
        {this.isLoading()}
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  token: state.signIn.user,
  username: state.signIn.id,
  failure: state.failureReport.note,
  currentPhoto: state.failureReport.photo,
  anonymus: state.failureReport.anonymus,
  status: state.failureReport.status,
  loading: state.failureReport.loading,
  location: state.failureReport.location,
});

export default connect(mapStateToProps, {
  LogoutUser: logoutUser,
  NoteChanged: noteChanged,
  PhotoChanged: photoChanged,
  SendFailureReport: sendFailureReport,
  SliderValueChanged: sliderValueChanged,
  InitializeFailureReport: initializeFailureReport,
  ResetStatus: resetStatus,
  UpdateGPSLocation: updateGPSLocation,
})(FailureReportScreen);
