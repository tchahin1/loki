import React from 'react';
import { View } from 'react-native';
import {
  Card, Button, Input,
} from 'react-native-elements';

export default class SignUp extends React.Component {
  static navigationOptions = {
    title: 'SIGN UP',
  };

  render() {
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card>
          <Input placeholder="Email address..." />
          <Input secureTextEntry placeholder="Password..." />
          <Input secureTextEntry placeholder="Confirm Password..." />

          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="SIGN UP"
          />
        </Card>
      </View>
    );
  }
}
