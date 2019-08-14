import React from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  View,
  Alert,
  ActivityIndicator,
  Keyboard,
  Text,
} from 'react-native';
import { Button } from 'react-native-elements/src/index';
import { TextField } from 'react-native-material-textfield';
import PropTypes from 'prop-types';
import Background from '../../assets/images/epbih.jpg';
import Colors from '../../assets/colors/AppColorsEnum';
import Inputs from '../../assets/enum/LoginInputsEnum';
import createStyles from './SignUp.styles';
import {connect} from 'react-redux';
import { 
  initializeRegistration,
  signupUsernameChanged, 
  signupPasswordChanged, 
  signupEmailChanged, 
  signupConfirmPasswordChanged , 
  registerUser } from './SignUpActions';

const styles = createStyles();

class SignUp extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      error: {
        username: '',
        email: '',
        password: '',
        confirmPass: '',
      }
    };
  }

  changeAndValidateValues = (input, value) => {
    this.setState({ userExistsErr: '' });

    const { password, confirmPass } = this.props;
    const { error } = this.state;
    const { ERRORS, LABELS } = Inputs;
    const errors = {
      username: error.username,
      email: error.email,
      password: error.password,
      confirmPass: error.confirmPass,
    };

    this.setState({ userExistsErr: '' });

    switch (input) {
      case LABELS.USERNAME:
        this.onUsernameChange(value);
        if (value.length < 4) {
          errors.username = ERRORS.USERNAME_ERR;
        } else {
          errors.username = '';
        }
        break;

      case LABELS.EMAIL: {
        const regExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        this.onEmailChange(value);
        if (!value.match(regExp)) {
          errors.email = ERRORS.EMAIL_ERR;
        } else {
          errors.email = '';
        }
        break;
      }

      case LABELS.PASSWORD:
        this.onPasswordChange(value);
        if (value.length < 6) {
          errors.password = ERRORS.PASS_LENGTH_ERR;
        }
        else if(value !== confirmPass) {
          errors.password = '';
          errors.confirmPass = ERRORS.PASS_CONFIRM_ERR;
        }
        else if(value === confirmPass) {
          errors.password = '';
          errors.confirmPass = '';
        }
        else {
          errors.password = '';
        }
        break;

      case LABELS.CONFIRM_PASS:
        this.onConfirmPasswordChange(value);
        if (value !== password) {
          errors.confirmPass = ERRORS.PASS_CONFIRM_ERR;
        } else {
          errors.confirmPass = '';
        }
        break;

      default: break;
    }
    this.setState({ error: errors });
  };

  onUsernameChange(text) {
    this.props.signupUsernameChanged(text);
  }

  onPasswordChange(text) {
      this.props.signupPasswordChanged(text);
  }

  onEmailChange(text) {
    this.props.signupEmailChanged(text);
  }

  onConfirmPasswordChange(text) {
      this.props.signupConfirmPasswordChanged(text);
  }

  onButtonPress() {
      const { username, password, email, confirmPass } = this.props;

      this.props.registerUser({username, password, email, confirmPass});
  }

  componentWillMount(){
      this.props.initializeRegistration(this.props.successFlag);
  }

  componentWillReceiveProps(nextProps){
    const { navigation } = this.props;

    if(nextProps.successFlag){
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

  render() {
    const { LABELS } = Inputs;
    const { error } = this.state;
    const { navigation } = this.props;
    const{email, username, password, confirmPass, isLoading, userExistsErr} = this.props;

    return (
      <ImageBackground source={Background} style={styles.wrapper}>
        <View style={styles.wrapper}>
          <KeyboardAvoidingView
            behavior="position"
            style={{ flexDirection: 'column' }}
          >
            <View style={styles.inputsWrapper}>
              <TextField
                label={LABELS.USERNAME}
                value={username}
                onChangeText={text => this.changeAndValidateValues(LABELS.USERNAME, text)}
                animationDuration={100}
                tintColor={Colors.PRIMARY_WHITE}
                textColor={Colors.PRIMARY_WHITE}
                baseColor={Colors.PRIMARY_WHITE}
                lineWidth={2}
                activeLineWidth={3.5}
                fontSize={18}
                labelFontSize={15}
                error={error.username}
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
                  error.username !== ''
                  || error.email !== ''
                  || error.password !== ''
                  || error.confirmPass !== ''
                  || username === ''
                  || password === ''
                  || email === ''
                  || confirmPass === ''
                }
                onPress={this.onButtonPress.bind(this)}
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
            onPress={() => navigation.navigate('SignIn')}
          />
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.signUp.username,
    password: state.signUp.password,
    email: state.signUp.email,
    confirmPass: state.signUp.confirmPass,
    userExistsErr: state.signUp.error,
    isLoading: state.signUp.isLoading,
    successFlag: state.signUp.success
  };
};

export default connect(mapStateToProps, 
    {initializeRegistration, signupConfirmPasswordChanged, signupEmailChanged, signupPasswordChanged, signupUsernameChanged, registerUser})(SignUp);
