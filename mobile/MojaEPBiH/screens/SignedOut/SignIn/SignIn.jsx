import React from 'react';
import { View } from 'react-native';
import {
  Card, Button,
} from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import PropTypes from 'prop-types';

export default class SignIn extends React.Component {
    static navigationOptions = {
      title: 'SIGN IN',
    };

    static propTypes = {
      navigation: PropTypes.shape({}).isRequired,
    };

    render() {
      const { navigation } = this.props;
      return (
        <View style={{ paddingVertical: 20 }}>
          <Card>
            <TextField label="Email address" animationDuration={400} tintColor="#16489b" />
            <TextField secureTextEntry label="Password" animationDuration={400} tintColor="#16489b" />

            <Button
              buttonStyle={{ marginTop: 20 }}
              backgroundColor="#03A9F4"
              title="SIGN IN"
              onPress={() => navigation.navigate('SignedIn')}
            />
            <Button
              buttonStyle={{ marginTop: 20 }}
              backgroundColor="transparent"
              textStyle={{ color: '#bcbec1' }}
              title="SIGN UP"
              onPress={() => navigation.navigate('SignUp')}
            />
          </Card>
        </View>
      );
    }
}
