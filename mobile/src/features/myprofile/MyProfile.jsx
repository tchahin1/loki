import React from 'react';
import { connect } from 'react-redux';
import {
  Text, View, ScrollView, KeyboardAvoidingView, Keyboard,
} from 'react-native';
import { Header, Button } from 'react-native-elements/src/index';
import { TextField } from 'react-native-material-textfield';
import PropTypes from 'prop-types';
import MenuButton from '../../components/helpers/MenuButton';
import NotificationsButton from '../../components/helpers/NotificationsButton';
import NotificationsModal from '../../components/helpers/NotificationsModal';
import LargeActivityIndicator from '../../components/large-activity-indicator/LargeActivityIndicator';
import Colors from '../../assets/colors/AppColorsEnum';
import Inputs from '../../assets/enum/LoginInputsEnum';
import { onSignOut } from '../../../Auth';
import createStyles from './MyProfile.styles';
import logoutUser from '../account/AccountActions';
import {
  initializeMyProfile, profileConfirmPasswordChanged, profileEmailChanged, profileNameChanged,
  profilePasswordChanged, profileSurnameChanged, editUser, fetchUserData,
} from './MyProfileActions';

const styles = createStyles();

class MyProfileScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    user: PropTypes.string.isRequired,
    LogoutUser: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    confirmPass: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    InitializeMyProfile: PropTypes.func.isRequired,
    ProfileConfirmPasswordChanged: PropTypes.func.isRequired,
    ProfileEmailChanged: PropTypes.func.isRequired,
    ProfileNameChanged: PropTypes.func.isRequired,
    ProfilePasswordChanged: PropTypes.func.isRequired,
    ProfileSurnameChanged: PropTypes.func.isRequired,
    EditUser: PropTypes.func.isRequired,
    FetchUserData: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      openNotMod: false,
      error: {
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPass: '',
      },
      scrollEnabled: false,
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
    const { navigation } = this.props;

    if (nextProps.user === '') {
      onSignOut().then(navigation.navigate('SignedOut'));
    }
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
    this.keyboardDidShowListener.remove();
  }

  keyboardDidShow = () => {
    this.setState({
      scrollEnabled: true,
    });
  };

  keyboardDidHide = () => {
    this.setState({
      scrollEnabled: false,
    });
    this.scroll.scrollTo({ x: 0, y: 0, animated: true });
  };

  onSignOutPressed = () => {
    const { LogoutUser } = this.props;

    LogoutUser();
  }

  onNameChange = (text) => {
    const { ProfileNameChanged } = this.props;

    ProfileNameChanged(text);
  }

  onSurnameChange = (text) => {
    const { ProfileSurnameChanged } = this.props;

    ProfileSurnameChanged(text);
  }

  onPasswordChange = (text) => {
    const { ProfilePasswordChanged } = this.props;

    ProfilePasswordChanged(text);
  }

  onEmailChange = (text) => {
    const { ProfileEmailChanged } = this.props;

    ProfileEmailChanged(text);
  }

  onConfirmPasswordChange = (text) => {
    const { ProfileConfirmPasswordChanged } = this.props;

    ProfileConfirmPasswordChanged(text);
  }

  load = () => {
    const { InitializeMyProfile } = this.props;
    const { FetchUserData, email, user } = this.props;

    InitializeMyProfile();
    FetchUserData({ username: email, token: user });
  }

  onButtonPress = () => {
    const {
      name, surname, password, email, confirmPass, EditUser, id,
    } = this.props;

    EditUser({
      name, surname, password, email, confirmPass, id,
    });
  }

  changeAndValidateValues = (input, value) => {
    const { password, confirmPass } = this.props;
    const { error } = this.state;
    const { ERRORS, LABELS } = Inputs;
    const errors = {
      name: error.name,
      surname: error.surname,
      email: error.email,
      password: error.password,
      confirmPass: error.confirmPass,
    };

    switch (input) {
      case LABELS.NAME: {
        const regExp = new RegExp(/^[a-zA-Z]+$/);
        this.onNameChange(value);
        if (value.length < 2) {
          errors.name = ERRORS.NAME_ERR;
        } else if (!value.match(regExp)) {
          errors.name = 'Ime nije validno';
        } else {
          errors.name = '';
        }
        break;
      }

      case LABELS.SURNAME: {
        const regExp = new RegExp(/^[a-zA-Z]+$/);
        this.onSurnameChange(value);
        if (value.length < 2) {
          errors.surname = ERRORS.SURNAME_ERR;
        } else if (!value.match(regExp)) {
          errors.surname = 'Prezime nije validno';
        } else {
          errors.surname = '';
        }
        break;
      }

      case LABELS.EMAIL: {
        const regExp = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9-]+\.[a-zA-Z]{1,}){0,61}[a-zA-Z0-9]$/);
        this.onEmailChange(value);
        if (!value.match(regExp)) {
          errors.email = ERRORS.EMAIL_ERR;
        } else {
          errors.email = '';
        }
        break;
      }

      case LABELS.PASSWORD: {
        const regExp = new RegExp(/(?=^.{6,}$)((?=.*\d)*)((?=.*[a-z])*)((?=.*[A-Z])*)((?=.*[!@#$%^&amp;*()_+}{&quot;&quot;:;'?/&gt;.&lt;,])*).*$/);
        this.onPasswordChange(value);
        if (value.length < 6) {
          errors.password = ERRORS.PASS_LENGTH_ERR;
        } else if (!value.match(regExp)) {
          errors.password = 'Password nije validan !';
        } else if (value !== confirmPass && confirmPass !== '') {
          errors.password = '';
          errors.confirmPass = ERRORS.PASS_CONFIRM_ERR;
        } else if (value === confirmPass) {
          errors.confirmPass = '';
        } else {
          errors.password = '';
        }
        break;
      }

      case LABELS.CONFIRM_PASS:
        this.onConfirmPasswordChange(value);
        if (value !== password && value !== '') {
          errors.confirmPass = ERRORS.PASS_CONFIRM_ERR;
        } else {
          errors.confirmPass = '';
        }
        break;

      default: break;
    }
    this.setState({ error: errors });
  };

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
    const { navigation } = this.props;
    const { LABELS } = Inputs;
    const {
      name, password, surname, email, confirmPass,
    } = this.props;
    const {
      openNotMod, error, scrollEnabled,
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Header
          placement="left"
          containerStyle={styles.header}
          leftComponent={<MenuButton onPress={() => navigation.openDrawer()} />}
          centerComponent={{ text: 'MOJ PROFIL', style: styles.title }}
          rightComponent={(
            <NotificationsButton
              onPress={() => this.setState({ openNotMod: true })}
            />
          )}
        />
        <View style={{ flex: 1, padding: 10 }}>
          <KeyboardAvoidingView
            style={{
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}
            behavior="padding"
          >
            <ScrollView
              style={styles.inputsWrapper}
              keyboardShouldPersistTaps="always"
              scrollEnabled={scrollEnabled}
              ref={(ref) => { this.scroll = ref; }}
            >
              <TextField
                label={LABELS.NAME}
                onChangeText={text => this.changeAndValidateValues(LABELS.NAME, text)}
                value={name}
                animationDuration={100}
                tintColor={Colors.BLACK}
                textColor={Colors.BLACK}
                baseColor={Colors.BLACK}
                lineWidth={2}
                activeLineWidth={3.5}
                fontSize={18}
                labelFontSize={15}
                error={error.name}
                errorColor={Colors.NOTICE_COLOR}
              />
              <TextField
                label={LABELS.SURNAME}
                onChangeText={text => this.changeAndValidateValues(LABELS.SURNAME, text)}
                value={surname}
                animationDuration={100}
                tintColor={Colors.BLACK}
                textColor={Colors.BLACK}
                baseColor={Colors.BLACK}
                lineWidth={2}
                activeLineWidth={3.5}
                fontSize={18}
                labelFontSize={15}
                error={error.surname}
                errorColor={Colors.NOTICE_COLOR}
              />
              <TextField
                label={LABELS.EMAIL}
                onChangeText={text => this.changeAndValidateValues(LABELS.EMAIL, text)}
                value={email}
                animationDuration={100}
                tintColor={Colors.BLACK}
                textColor={Colors.BLACK}
                baseColor={Colors.BLACK}
                lineWidth={2}
                activeLineWidth={3.5}
                fontSize={18}
                labelFontSize={15}
                error={error.email}
                errorColor={Colors.NOTICE_COLOR}
              />
              <TextField
                secureTextEntry
                label={LABELS.PASSWORD}
                onChangeText={text => this.changeAndValidateValues(LABELS.PASSWORD, text)}
                value={password}
                animationDuration={100}
                tintColor={Colors.BLACK}
                textColor={Colors.BLACK}
                baseColor={Colors.BLACK}
                lineWidth={2}
                activeLineWidth={3.5}
                fontSize={18}
                labelFontSize={15}
                error={error.password}
                errorColor={Colors.NOTICE_COLOR}
              />
              <TextField
                secureTextEntry
                label={LABELS.CONFIRM_PASS}
                onChangeText={text => this.changeAndValidateValues(LABELS.CONFIRM_PASS, text)}
                value={confirmPass}
                animationDuration={100}
                tintColor={Colors.BLACK}
                textColor={Colors.BLACK}
                baseColor={Colors.BLACK}
                lineWidth={2}
                activeLineWidth={3.5}
                fontSize={18}
                labelFontSize={15}
                error={error.confirmPass}
                errorColor={Colors.NOTICE_COLOR}
              />
              <View style={styles.btnWrapper}>
                <Text style={styles.error}>{error.name}</Text>
                <Button
                  buttonStyle={styles.btnSignIn}
                  title="SPREMI PROMJENE"
                  disabled={
                      name === '' || password === '' || surname === '' || email === '' || confirmPass === ''
                      || error.name !== '' || error.password !== '' || error.surname !== '' || error.email !== ''
                      || error.confirmPass !== ''
                    }
                  titleStyle={{ fontSize: 18, marginLeft: -50 }}
                  onPress={this.onButtonPress}
                />
              </View>
            </ScrollView>
            {this.isLoading()}
          </KeyboardAvoidingView>
        </View>
        <NotificationsModal
          animationType="fade"
          transparent
          visible={openNotMod}
          onRequestClose={() => this.setState({ openNotMod: false })}
          onSignOutPress={this.onSignOutPressed}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  name: state.profile.name,
  surname: state.profile.surname,
  password: state.profile.password,
  email: state.profile.email,
  confirmPass: state.profile.confirmPass,
  user: state.signIn.user,
  loading: state.profile.isLoading,
  id: state.profile.id,
});

export default connect(mapStateToProps, {
  LogoutUser: logoutUser,
  InitializeMyProfile: initializeMyProfile,
  ProfileConfirmPasswordChanged: profileConfirmPasswordChanged,
  ProfileEmailChanged: profileEmailChanged,
  ProfileNameChanged: profileNameChanged,
  ProfileSurnameChanged: profileSurnameChanged,
  ProfilePasswordChanged: profilePasswordChanged,
  EditUser: editUser,
  FetchUserData: fetchUserData,
})(MyProfileScreen);
