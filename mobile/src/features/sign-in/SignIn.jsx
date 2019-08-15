import React from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator, ImageBackground, KeyboardAvoidingView, Text, View,
} from 'react-native';
import { Button } from 'react-native-elements/src/index';
import { TextField } from 'react-native-material-textfield';
import PropTypes from 'prop-types';
import Colors from '../../assets/colors/AppColorsEnum';
import Background from '../../assets/images/epbih.jpg';
import createStyles from './SignIn.styles';
import Inputs from '../../assets/enum/LoginInputsEnum';
import ScreenName from '../../navigation/ScreenName';
import { usernameChanged, passwordChanged, loginUser } from './SignInActions';


const styles = createStyles();

class SignIn extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    user: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    UsernameChanged: PropTypes.func.isRequired,
    PasswordChanged: PropTypes.func.isRequired,
    LoginUser: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const { navigation } = this.props;

    if (nextProps.user !== '' && nextProps.user !== undefined) {
      navigation.navigate(ScreenName.HOME);
    }
  }

  onUsernameChange = (text) => {
    const { UsernameChanged } = this.props;

    UsernameChanged(text);
  }

  onPasswordChange = (text) => {
    const { PasswordChanged } = this.props;

    PasswordChanged(text);
  }

  onButtonPress = () => {
    const { username, password, LoginUser } = this.props;

    LoginUser({ username, password });
  }

  renderLoading() {
    const { isLoading } = this.props;

    if (isLoading) {
      return <ActivityIndicator size="small" color={Colors.PRIMARY_WHITE} />;
    }

    return null;
  }

  render() {
    const { navigation } = this.props;
    const { LABELS } = Inputs;
    const {
      username, password, error,
    } = this.props;

    return (
      <ImageBackground source={Background} style={styles.wrapper}>
        <View style={styles.wrapper}>
          <KeyboardAvoidingView
            behavior="position"
            style={styles.keyboard}
          >
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>Moja EP</Text>
            </View>
            <View style={styles.inputsWrapper}>
              <TextField
                label={LABELS.USERNAME}
                onChangeText={this.onUsernameChange}
                value={username}
                animationDuration={100}
                tintColor={Colors.PRIMARY_WHITE}
                textColor={Colors.PRIMARY_WHITE}
                baseColor={Colors.PRIMARY_WHITE}
                lineWidth={2}
                activeLineWidth={3.5}
                fontSize={18}
                labelFontSize={15}
              />
              <TextField
                secureTextEntry
                label={LABELS.PASSWORD}
                onChangeText={this.onPasswordChange}
                value={password}
                animationDuration={100}
                tintColor={Colors.PRIMARY_WHITE}
                textColor={Colors.PRIMARY_WHITE}
                baseColor={Colors.PRIMARY_WHITE}
                lineWidth={2}
                activeLineWidth={3.5}
                fontSize={18}
                labelFontSize={15}
              />
            </View>
            <View style={styles.btnWrapper}>
              {this.renderLoading()}
              <Text style={styles.error}>{error}</Text>
              <Button
                buttonStyle={styles.btnSignIn}
                title="PRIJAVI SE"
                disabled={!{ username } || !{ password }}
                titleStyle={{ fontSize: 18 }}
                onPress={this.onButtonPress}
              />
            </View>
            <View />
          </KeyboardAvoidingView>
        </View>
        <View style={{ justifyContent: 'flex-end' }}>
          <Button
            type="clear"
            title="REGISTRUJ SE"
            titleStyle={styles.btnSignUpTitle}
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  username: state.signIn.username,
  password: state.signIn.password,
  error: state.signIn.error,
  isLoading: state.signIn.isLoading,
  user: state.signIn.user,
});

export default connect(mapStateToProps,
  {
    UsernameChanged: usernameChanged,
    PasswordChanged: passwordChanged,
    LoginUser: loginUser,
  })(SignIn);
