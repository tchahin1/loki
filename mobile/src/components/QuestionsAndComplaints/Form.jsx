import React from 'react';
import {
  View,
  Text,
  Picker,
  TextInput,
  ScrollView,
  Keyboard,
  Dimensions,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from 'react-native-elements/src/index';

import EDSubsidiaries from '../../assets/enum/EDSubsidiaries';
import RequestModal from './RequestModal';

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
      legalName: '',
      surname: '',
      address: '',
      code: '',
      email: '', // get email address of currently logged user
      phone: '',
      keyboardDidShow: false,
      scrollEnabled: false,
      height: Dimensions.get('window').height,
      openReqModal: false,
      err: '',
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

  sendRequest = () => {
    // connect with backend
    this.setState({ openReqModal: false });
    Alert.alert('INFO', 'Uspješno ste poslali zahtjev!');
  };

  disableButton = () => {
    const {
      customerType,
      name,
      surname,
      email,
      address,
      legalName,
    } = this.state;

    return (customerType === customerTypes[0]
      && (name === '' || surname === '' || email === '' || address === ''))
      || (customerType === customerTypes[1]
      && (legalName === '' || email === '' || address === ''));
  };

  validateFields = () => {
    const {
      customerType,
      name,
      surname,
      email,
      code,
      phone,
      legalName,
    } = this.state;

    const numReg = new RegExp('^[0-9]+$');
    const letReg = new RegExp('^[a-zA-Z]+$');
    const emailReg = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);


    if (customerType === customerTypes[0]
      && (!phone.match(numReg)
        || !name.match(letReg)
        || !surname.match(letReg)
        || !email.match(emailReg)
        || !code.match(new RegExp('^[0-9]*$')))) {
      this.setState({ err: 'Polja nisu ispravno popunjena' });
      return;
    }
    if (customerType === customerTypes[1]
      && (!phone.match(numReg)
        || !legalName.match(letReg)
        || !email.match(emailReg)
        || !code.match(new RegExp('^[0-9]*$')))) {
      this.setState({ err: 'Polja nisu ispravno popunjena' });
      return;
    }

    this.setState({ openReqModal: true });
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
      openReqModal,
      legalName,
      err,
    } = this.state;

    return (
      <View style={styles.container}>
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
                  onChangeText={text => this.setState({ name: text, err: '' })}
                  placeholder="Ime*"
                  style={[styles.textInput, { marginTop: 0 }]}
                />
                <TextInput
                  value={surname}
                  onChangeText={text => this.setState({ surname: text, err: '' })}
                  placeholder="Prezime*"
                  style={styles.textInput}
                />
              </View>
              )}
              {customerType === customerTypes[1] && (
              <TextInput
                value={legalName}
                onChangeText={text => this.setState({ legalName: text, err: '' })}
                placeholder="Naziv*"
                style={[styles.textInput, { marginTop: hp('4%') }]}
              />
              )}
              <TextInput
                value={address}
                onChangeText={text => this.setState({ address: text, err: '' })}
                placeholder="Adresa*"
                style={styles.textInput}
              />
              <TextInput
                value={email}
                onChangeText={text => this.setState({ email: text, err: '' })}
                placeholder="E-mail*"
                style={styles.textInput}
              />
              <TextInput
                value={code}
                onChangeText={text => this.setState({ code: text, err: '' })}
                placeholder="Šifra mjernog mjesta"
                style={styles.textInput}
                keyboardType="numeric"
              />
              <TextInput
                value={phone}
                onChangeText={text => this.setState({ phone: text, err: '' })}
                placeholder="Broj telefona"
                style={styles.textInput}
                keyboardType="numeric"
              />
              <Text style={styles.reqText}>Polja označena sa * su obavezna</Text>
              <Text style={styles.error}>{err}</Text>
              <Button
                buttonStyle={styles.btnReq}
                title="Napiši zahtjev"
                titleStyle={{ fontSize: 18 }}
                onPress={this.validateFields}
                disabled={this.disableButton()}
              />
            </View>
          </ScrollView>
          <RequestModal
            onRequestClose={() => {}}
            visible={openReqModal}
            onCloseButtonPress={() => this.setState({ openReqModal: false })}
            onSendButtonPress={this.sendRequest}
          />
        </View>
      </View>
    );
  }
}

export default Form;
