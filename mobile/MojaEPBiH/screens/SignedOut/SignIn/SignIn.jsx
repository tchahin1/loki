import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import { Button } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import PropTypes from 'prop-types';

import Colors from '../../../assets/colors/AppColorsEnum';
import Background from '../../../assets/images/epbih.jpg';
import createStyles from './SignIn.styles';


const styles = createStyles();

export default class SignIn extends React.Component {
    static navigationOptions = {
      header: null,
      title: 'SIGN IN',
    };

    static propTypes = {
      navigation: PropTypes.shape({}).isRequired,
    };

    render() {
      const { navigation } = this.props;
      return (
        <ImageBackground source={Background} style={styles.wrapper}>

          <KeyboardAvoidingView
            style={styles.wrapper}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
          >
            <View style={{ justifyContent: 'flex-end', flex: 1 }}>
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>Moja EP</Text>
              </View>
              <View style={styles.inputsWrapper}>
                <TextField
                  label="E-mail"
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
                  label="Šifra"
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
                  titleStyle={{ fontSize: 18 }}
                  onPress={() => navigation.navigate('SignedIn')}
                />
              </View>
              <View style={{ flex: 1 }} />
            </View>
          </KeyboardAvoidingView>
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
