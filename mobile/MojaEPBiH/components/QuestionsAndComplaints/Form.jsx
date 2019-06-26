import React from 'react';
import {
  View,
  Text,
  Picker,
  TextInput,
  ScrollView,
  Keyboard,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Button } from 'react-native-elements';
import { EDSubsidiaries } from '../../assets/enum/EDSubsidiaries';

import createStyles from './Form.styles';

const styles = createStyles();

const customerTypes = ['Fizičko lice', 'Pravno lice'];

class Form extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      subsidiary: EDSubsidiaries[0],
      customerType: customerTypes[0],
      name: '',
      surname: '',
      address: '',
      code: '',
      email: '', // get email address of currently logged user
      phone: '',
      keyboardDidShow: false,
      scrollEnabled: false,
      height: Dimensions.get('window').height,
    };
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow = (e) => {
    this.setState({
      keyboardDidShow: true,
      scrollEnabled: true,
      height: Dimensions.get('window').height - e.endCoordinates.height,
    });
  };

  keyboardDidHide = () => {
    this.setState({
      keyboardDidShow: false,
      scrollEnabled: false,
      height: Dimensions.get('window').height,
    });
    this.scroll.scrollTo({ x: 0, y: 0, animated: true });
  };

  render() {
    const {
      subsidiary,
      customerType,
      name,
      surname,
      email,
      address,
      code,
      phone,
      keyboardDidShow,
      scrollEnabled,
      height,
    } = this.state;

    return (
      <View
        behaviour="padding"
        style={styles.container}
      >
        {!keyboardDidShow && (
        <View style={styles.pickersContainer}>
          <Text style={styles.text}>ED podružnica:</Text>
          <Picker
            selectedValue={subsidiary}
            onValueChange={itemValue => this.setState({ subsidiary: itemValue })}
            style={styles.picker}
          >
            {EDSubsidiaries.map((option, index) => (
              <Picker.Item key={index.toString()} label={option} value={option} />
            ))}
          </Picker>
          <Text style={styles.text}>Tip kupca:</Text>
          <Picker
            selectedValue={customerType}
            onValueChange={(itemValue) => {
              this.setState({ customerType: itemValue });
            }}
            style={styles.picker}
          >
            {customerTypes.map((item, index) => (
              <Picker.Item key={index.toString()} label={item} value={item} />
            ))}
          </Picker>
        </View>
        )}
        <View style={[styles.scrollContainer, { height }]}>
          <ScrollView
            contentContainerStyle={[styles.inputsContainer]}
            keyboardShouldPersistTaps="always"
            scrollEnabled={scrollEnabled}
            ref={(ref) => { this.scroll = ref; }}
          >
            <View style={styles.txtInputs}>
              {customerType === customerTypes[0] && (
              <View>
                <TextInput
                  value={name}
                  onChangeText={text => this.setState({ name: text })}
                  placeholder="Ime*"
                  style={styles.textInput}
                />
                <TextInput
                  value={surname}
                  onChangeText={text => this.setState({ surname: text })}
                  placeholder="Prezime*"
                  style={[styles.textInput, { marginTop: hp('2%') }]}
                />
              </View>
              )}
              {customerType === customerTypes[1] && (
              <TextInput
                value={name}
                onChangeText={text => this.setState({ name: text })}
                placeholder="Naziv*"
                style={styles.textInput}
              />
              )}
              <TextInput
                value={address}
                onChangeText={text => this.setState({ address: text })}
                placeholder="Adresa*"
                style={[styles.textInput, { marginTop: hp('2%') }]}
              />
              <TextInput
                value={email}
                onChangeText={text => this.setState({ email: text })}
                placeholder="E-mail*"
                style={[styles.textInput, { marginTop: hp('2%') }]}
              />
              <TextInput
                value={code}
                onChangeText={text => this.setState({ code: text })}
                placeholder="Šifra mjernog mjesta"
                style={[styles.textInput, { marginTop: hp('2%') }]}
                keyboardType="numeric"
              />
              <TextInput
                value={phone}
                onChangeText={text => this.setState({ phone: text })}
                placeholder="Broj telefona"
                style={[styles.textInput, { marginTop: hp('2%') }]}
                keyboardType="numeric"
              />
              <Text style={styles.reqText}>Polja označena sa * su obavezna</Text>
              <Button
                buttonStyle={styles.btnSignIn}
                title="Napiši zahtjev"
                titleStyle={{ fontSize: 18 }}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Form;
