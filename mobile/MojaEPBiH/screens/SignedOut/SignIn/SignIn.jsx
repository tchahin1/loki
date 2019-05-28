import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import { Button } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import PropTypes from 'prop-types';

import Colors from '../../../assets/colors/AppColorsEnum';
import Background from '../../../assets/images/epbih.jpg';
import createStyles from './SignIn.styles';
import Inputs from '../../../assets/enum/LoginInputsEnum';


const styles = createStyles();

export default class SignIn extends React.Component {
    static propTypes = {
      navigation: PropTypes.shape({}).isRequired,
    };

    constructor(props) {
      super(props);

      this.state = {
        username: '',
        password: '',
      };
    }

    render() {
      const { navigation } = this.props;
      const { LABELS } = Inputs;
      const { username, password } = this.state;
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
                  value={username}
                  onChangeText={text => this.setState({ username: text })}
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
                  value={password}
                  onChangeText={text => this.setState({ password: text })}
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
                <Button
                  buttonStyle={styles.btnSignIn}
                  title="PRIJAVI SE"
                  disabled={!username || !password}
                  titleStyle={{ fontSize: 18 }}
                  onPress={() => navigation.navigate('SignedIn')}
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
