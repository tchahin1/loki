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
import { Button } from 'react-native-elements';

import { EDSubsidiaries } from '../../assets/enum/EDSubsidiaries';
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

  sendRequest = (request) => {
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
      && (name === '' || surname === '' || email === '' || address === '')) || (customerType === customerTypes[1]
      && (legalName === '' || email === '' || address === ''));
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
                  onChangeText={text => this.setState({ name: text })}
                  placeholder="Ime*"
                  style={[styles.textInput, { marginTop: 0 }]}
                />
                <TextInput
                  value={surname}
                  onChangeText={text => this.setState({ surname: text })}
                  placeholder="Prezime*"
                  style={styles.textInput}
                />
              </View>
              )}
              {customerType === customerTypes[1] && (
              <TextInput
                value={name}
                onChangeText={text => this.setState({ legalName: text })}
                placeholder="Naziv*"
                style={[styles.textInput, { marginTop: hp('4%') }]}
              />
              )}
              <TextInput
                value={address}
                onChangeText={text => this.setState({ address: text })}
                placeholder="Adresa*"
                style={styles.textInput}
              />
              <TextInput
                value={email}
                onChangeText={text => this.setState({ email: text })}
                placeholder="E-mail*"
                style={styles.textInput}
              />
              <TextInput
                value={code}
                onChangeText={text => this.setState({ code: text })}
                placeholder="Šifra mjernog mjesta"
                style={styles.textInput}
                keyboardType="numeric"
              />
              <TextInput
                value={phone}
                onChangeText={text => this.setState({ phone: text })}
                placeholder="Broj telefona"
                style={styles.textInput}
                keyboardType="numeric"
              />
              <Text style={styles.reqText}>Polja označena sa * su obavezna</Text>
              <Button
                buttonStyle={styles.btnReq}
                title="Napiši zahtjev"
                titleStyle={{ fontSize: 18 }}
                onPress={() => this.setState({ openReqModal: true })}
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
