import React from 'react';
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
import { Header, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import MenuButton from '../../../components/helpers/MenuButton';
import NotificationsButton from '../../../components/helpers/NotificationsButton';
import NotificationsModal from '../../../components/helpers/NotificationsModal';
import { onSignOut } from '../../../Auth';
import Colors from '../../../assets/colors/AppColorsEnum';

import createStyles from './FailureReport.styles';

const styles = createStyles();

class FailureReportScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      openNotMod: false,
      failure: '',
      currentPhoto: null,
      sendBtnDisabledOpacity: 0.4,
      flexFirstPart: 1 / 4,
      flexSecondPart: 1 / 2,
    };
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  setFailureText = (text) => {
    if (text === '') {
      this.setState({ sendBtnDisabledOpacity: 0.4 });
    } else {
      this.setState({ sendBtnDisabledOpacity: 1 });
    }

    this.setState({ failure: text });
  };

  setPhotoIconColors() {
    const { note, currentPhoto } = this.state;
    let cameraColor = Colors.PRIMARY_WHITE;
    let cameraIconColor = 'black';

    if (note !== '' && currentPhoto !== null) {
      cameraColor = Colors.PRIMARY_BLUE;
      cameraIconColor = Colors.PRIMARY_WHITE;
    } else if (note === '' && currentPhoto !== null) {
      cameraColor = Colors.PRIMARY_BLUE;
      cameraIconColor = Colors.PRIMARY_WHITE;
    } else if (note !== '' && currentPhoto === null) {
      cameraColor = Colors.PRIMARY_WHITE;
      cameraIconColor = 'black';
    }

    return {
      cameraColor,
      cameraIconColor,
    };
  }

  keyboardDidShow = () => {
    this.setState({
      flexFirstPart: 1 / 8,
      flexSecondPart: 1 / 4,
    });
  };

  keyboardDidHide = () => {
    this.setState({
      flexFirstPart: 1 / 4,
      flexSecondPart: 1 / 2,
    });
  };

  savePhoto = (photo) => {
    const { navigation } = this.props;

    this.setState({ currentPhoto: photo, sendBtnDisabledOpacity: 1 });
    navigation.navigate('FailureReport');
    // save data to database
  };

  saveData = () => {
    // save data to database
    Keyboard.dismiss();
    Alert.alert('INFO', 'Uspješno prijavljen kvar!');
  };


  render() {
    const { navigation } = this.props;
    const {
      openNotMod,
      failure,
      currentPhoto,
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
            maximumTrackTintColor={Colors.PRIMARY_BLUE}
            thumbTintColor={Colors.PRIMARY_BLUE}
            minimumTrackTintColor={Colors.PRIMARY_BLUE}
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
            onPress={() => navigation.navigate('Camera',
              {
                savePhoto: this.savePhoto,
                onBackButtonPressScreen: 'FailureReport',
              })}
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
            disabled={failure === '' && currentPhoto === null}
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
          onSignOutPress={() => onSignOut().then(navigation.navigate('SignedOut'))}
        />
      </KeyboardAvoidingView>
    );
  }
}

export default FailureReportScreen;
