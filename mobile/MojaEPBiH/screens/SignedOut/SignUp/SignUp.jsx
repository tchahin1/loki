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
import { Button } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import PropTypes from 'prop-types';

import api from '../../../network.config';

import Background from '../../../assets/images/epbih.jpg';
import Colors from '../../../assets/colors/AppColorsEnum';
import Inputs from '../../../assets/enum/LoginInputsEnum';

import createStyles from './SignUp.styles';

const styles = createStyles();

export default class SignUp extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPass: '',
      error: {
        username: '',
        email: '',
        password: '',
        confirmPass: '',
      },
      isLoading: false,
      userExistsErr: '',
    };
  }

  changeAndValidateValues = (input, value) => {
    this.setState({ userExistsErr: '' });

    const { password, error } = this.state;
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
        this.setState({ username: value });
        if (value.length < 4) {
          errors.username = ERRORS.USERNAME_ERR;
        } else {
          errors.username = '';
        }
        break;

      case LABELS.EMAIL:
        const regExp = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        this.setState({ email: value });
        if (!value.match(regExp)) {
          errors.email = ERRORS.EMAIL_ERR;
        } else {
          errors.email = '';
        }
        break;

      case LABELS.PASSWORD:
        this.setState({ password: value });
        if (value.length < 6) {
          errors.password = ERRORS.PASS_LENGTH_ERR;
        } else {
          errors.password = '';
        }
        break;

      case LABELS.CONFIRM_PASS:
        this.setState({ confirmPass: value });
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

  registerUser = () => {
    const { navigation } = this.props;
    const {
      username,
      email,
      password,
      confirmPass,
    } = this.state;
    const { ERRORS } = Inputs;

    this.setState({ isLoading: true });

    fetch(`${api}/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        passwordRepeated: confirmPass,
      }),
    }).then((response) => {
      this.setState({ isLoading: false });

      if (response.ok) {
        Alert.alert(
          'INFO',
          'Uspješno ste registrovani na MOJAEP!',
          [
            { text: 'UREDU', onPress: () => navigation.navigate('SignIn') },
          ],
          { cancelable: false },
        );
      } else {
        Keyboard.dismiss();
        this.setState({ userExistsErr: ERRORS.USER_EXISTS_ERR });
      }
    });
  };

  render() {
    const { navigation } = this.props;
    const { LABELS } = Inputs;
    const {
      username,
      password,
      email,
      confirmPass,
      error,
      isLoading,
      userExistsErr,
    } = this.state;

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
                onPress={this.registerUser}
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
