import React from 'react';
import { connect } from 'react-redux';
import {
  ImageBackground,
  KeyboardAvoidingView,
  View,
  Alert,
  ActivityIndicator,
  Text,
} from 'react-native';
import { Button } from 'react-native-elements/src/index';
import { TextField } from 'react-native-material-textfield';
import PropTypes from 'prop-types';
import Background from '../../assets/images/epbih.jpg';
import Colors from '../../assets/colors/AppColorsEnum';
import Inputs from '../../assets/enum/LoginInputsEnum';
import Screen from '../../navigation/ScreenName';
import createStyles from './SignUp.styles';
import {
  initializeRegistration,
  signupNameChanged,
  signupSurnameChanged,
  signupPasswordChanged,
  signupEmailChanged,
  signupConfirmPasswordChanged,
  registerUser,
} from './SignUpActions';

const styles = createStyles();

class SignUp extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    confirmPass: PropTypes.string.isRequired,
    userExistsErr: PropTypes.string.isRequired,
    successFlag: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    InitializeRegistration: PropTypes.func.isRequired,
    SignupNameChanged: PropTypes.func.isRequired,
    SignupSurnameChanged: PropTypes.func.isRequired,
    SignupPasswordChanged: PropTypes.func.isRequired,
    SignupEmailChanged: PropTypes.func.isRequired,
    SignupConfirmPasswordChanged: PropTypes.func.isRequired,
    RegisterUser: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      error: {
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPass: '',
      },
    };
  }

  componentWillMount() {
    const { InitializeRegistration } = this.props;

    InitializeRegistration();
  }

  componentWillReceiveProps(nextProps) {
    const { navigation } = this.props;

    if (nextProps.successFlag) {
      Alert.alert(
        'INFO',
        'Uspješno ste registrovani na MOJAEP!',
        [
          { text: 'UREDU', onPress: () => navigation.navigate('SignIn') },
        ],
        { cancelable: false },
      );
    }
  }

  onNameChange = (text) => {
    const { SignupNameChanged } = this.props;

    SignupNameChanged(text);
  }

  onSurnameChange = (text) => {
    const { SignupSurnameChanged } = this.props;

    SignupSurnameChanged(text);
  }

  onPasswordChange = (text) => {
    const { SignupPasswordChanged } = this.props;

    SignupPasswordChanged(text);
  }

  onEmailChange = (text) => {
    const { SignupEmailChanged } = this.props;

    SignupEmailChanged(text);
  }

  onConfirmPasswordChange = (text) => {
    const { SignupConfirmPasswordChanged } = this.props;

    SignupConfirmPasswordChanged(text);
  }

  onButtonPress = () => {
    const {
      name, surname, password, email, confirmPass, RegisterUser,
    } = this.props;

    RegisterUser({
      name, surname, password, email, confirmPass,
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
        const regExp = new RegExp(/^(?=.*\d)*(?=.*[a-zA-Z]).{2,}$/);
        this.onUsernameChange(value);
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
        const regExp = new RegExp(/^(?=.*\d)*(?=.*[a-zA-Z]).{2,}$/);
        this.onUsernameChange(value);
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
        /* const regExp =
        new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@
        ((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|
        (([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/); */
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

  clearFields() {
    const { InitializeRegistration } = this.props;
    const { navigation } = this.props;

    InitializeRegistration();
    navigation.navigate(Screen.SIGN_IN);
  }

  render() {
    const { LABELS } = Inputs;
    const { error } = this.state;
    const {
      email, name, surname, password, confirmPass, isLoading, userExistsErr, successFlag,
    } = this.props;

    return (
      <ImageBackground source={Background} style={styles.wrapper}>
        <View style={styles.wrapper}>
          <KeyboardAvoidingView
            behavior="position"
            style={{ flexDirection: 'column' }}
          >
            <View style={styles.inputsWrapper}>
              <TextField
                label={LABELS.NAME}
                value={name}
                onChangeText={text => this.changeAndValidateValues(LABELS.NAME, text)}
                animationDuration={100}
                tintColor={Colors.PRIMARY_WHITE}
                textColor={Colors.PRIMARY_WHITE}
                baseColor={Colors.PRIMARY_WHITE}
                lineWidth={2}
                activeLineWidth={3.5}
                fontSize={18}
                labelFontSize={15}
                error={error.name}
                errorColor={Colors.NOTICE_COLOR}
              />
              <TextField
                label={LABELS.SURNAME}
                value={surname}
                onChangeText={text => this.changeAndValidateValues(LABELS.SURNAME, text)}
                animationDuration={100}
                tintColor={Colors.PRIMARY_WHITE}
                textColor={Colors.PRIMARY_WHITE}
                baseColor={Colors.PRIMARY_WHITE}
                lineWidth={2}
                activeLineWidth={3.5}
                fontSize={18}
                labelFontSize={15}
                error={error.surname}
                errorColor={Colors.NOTICE_COLOR}
              />
              <TextField
                label={LABELS.EMAIL}
                value={email}
                onChangeText={text => this.changeAndValidateValues(LABELS.EMAIL, text)}
                animationDuration={100}
                tintColor={Colors.PRIMARY_WHITE}
                textColor={Colors.PRIMARY_WHITE}
                baseColor={Colors.PRIMARY_WHITE}
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
                value={password}
                onChangeText={text => this.changeAndValidateValues(LABELS.PASSWORD, text)}
                animationDuration={100}
                tintColor={Colors.PRIMARY_WHITE}
                textColor={Colors.PRIMARY_WHITE}
                baseColor={Colors.PRIMARY_WHITE}
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
                value={confirmPass}
                onChangeText={text => this.changeAndValidateValues(LABELS.CONFIRM_PASS, text)}
                animationDuration={100}
                tintColor={Colors.PRIMARY_WHITE}
                textColor={Colors.PRIMARY_WHITE}
                baseColor={Colors.PRIMARY_WHITE}
                lineWidth={2}
                activeLineWidth={3.5}
                fontSize={18}
                labelFontSize={15}
                error={error.confirmPass}
                errorColor={Colors.NOTICE_COLOR}
              />
            </View>
            <View style={styles.btnWrapper}>
              {isLoading
                ? <ActivityIndicator size="small" color={Colors.PRIMARY_WHITE} /> : null
              }
              <Text style={styles.error}>{userExistsErr}</Text>
              <Button
                buttonStyle={styles.btnSignUp}
                title="REGISTRUJ SE"
                titleStyle={{ fontSize: 18 }}
                disabled={
                  error.name !== ''
                  || error.surname === ''
                  || error.email !== ''
                  || error.password !== ''
                  || error.confirmPass !== ''
                  || name === ''
                  || surname === ''
                  || password === ''
                  || email === ''
                  || confirmPass === ''
                }
                onPress={this.onButtonPress}
              />
            </View>
            <View />
          </KeyboardAvoidingView>
        </View>
        <View style={{ justifyContent: 'flex-end' }}>
          <Button
            type="clear"
            title="PRIJAVI SE"
            titleStyle={styles.btnSignInTitle}
            onPress={() => this.clearFields(successFlag)}
          />
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  name: state.signUp.name,
  surname: state.signUp.surname,
  password: state.signUp.password,
  email: state.signUp.email,
  confirmPass: state.signUp.confirmPass,
  userExistsErr: state.signUp.error,
  isLoading: state.signUp.isLoading,
  successFlag: state.signUp.success,
});

export default connect(mapStateToProps,
  {
    InitializeRegistration: initializeRegistration,
    SignupConfirmPasswordChanged: signupConfirmPasswordChanged,
    SignupEmailChanged: signupEmailChanged,
    SignupPasswordChanged: signupPasswordChanged,
    SignupNameChanged: signupNameChanged,
    SignupSurnameChanged: signupSurnameChanged,
    RegisterUser: registerUser,
  })(SignUp);
