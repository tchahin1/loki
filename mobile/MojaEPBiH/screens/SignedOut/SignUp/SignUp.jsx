import React from 'react';
import {
  ImageBackground, KeyboardAvoidingView, Text, View,
} from 'react-native';
import {
  Card, Button, Input,
} from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import Background from '../../../assets/images/epbih.jpg';
import Colors from '../../../assets/colors/AppColorsEnum';
import createStyles from './SignUp.styles';


const styles = createStyles();

export default class SignUp extends React.Component {
  render() {
    return (
      <ImageBackground source={Background} style={styles.wrapper}>
        <View style={styles.wrapper}>
          <KeyboardAvoidingView
            behavior="position"
            style={styles.keyboard}
          >
            <View style={styles.inputsWrapper}>
              <TextField
                label="Korisničko ime"
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
              <TextField
                secureTextEntry
                label="Potvrdi šifru"
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
                title="REGISTRUJ SE"
                titleStyle={{ fontSize: 18 }}
                onPress={() => this.props.navigation.navigate('SignIn')}
              />
            </View>
            <View />
          </KeyboardAvoidingView>
        </View>
        <View style={{ justifyContent: 'flex-end' }}>
          <Button
            type="clear"
            title="PRIJAVI SE"
            titleStyle={styles.btnSignUpTitle}
            onPress={() => this.props.navigation.navigate('SignIn')}
          />
        </View>
      </ImageBackground>
    );
  }
}
