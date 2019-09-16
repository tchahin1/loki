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
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from 'react-native-elements/src/index';
import EDSubsidiaries from '../../assets/enum/EDSubsidiaries';
import createStyles from './Form.styles';
import {
  nameChanged, legalNameChanged, surnameChanged, addressChanged, initialize,
  codeChanged, phoneChanged, emailChanged, requestChanged, sendQACForm, resetQACStatus,
} from '../../features/questions-and-complaints/QuestionsAndComplaintsActions';

const styles = createStyles();

const customerTypes = ['Fizičko lice', 'Pravno lice'];

class Form extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    name: PropTypes.string.isRequired,
    legalName: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    request: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    NameChanged: PropTypes.func.isRequired,
    LegalNameChanged: PropTypes.func.isRequired,
    SurnameChanged: PropTypes.func.isRequired,
    AddressChanged: PropTypes.func.isRequired,
    CodeChanged: PropTypes.func.isRequired,
    EmailChanged: PropTypes.func.isRequired,
    PhoneChanged: PropTypes.func.isRequired,
    RequestChanged: PropTypes.func.isRequired,
    SendQACForm: PropTypes.func.isRequired,
    Initialize: PropTypes.func.isRequired,
    ResetStatus: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      subsidiary: 0,
      customerType: 0,
      keyboardDidShow: false,
      height: Dimensions.get('window').height,
      err: '',
      screenHeight: 0,
      scrollEnabled: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;

    navigation.addListener('willFocus', this.load);

    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );

    this.setState({ scrollEnabled: true });
  }

  componentWillReceiveProps(nextProps) {
    const { ResetStatus } = this.props;

    if (nextProps.status === 'OK') {
      Alert.alert('INFO', 'Uspješno ste poslali zahtjev!');
      ResetStatus();
    } else if (nextProps.status === 'ERROR') {
      Alert.alert('GREŠKA', 'Nešto nije uredu, pokušajte ponovo!');
      ResetStatus();
    }
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
    const { screenHeight, height } = this.state;
    this.setState({
      keyboardDidShow: false,
      height: Dimensions.get('window').height,
    });
    this.scroll.scrollTo({ x: 0, y: 0, animated: true });

    if (screenHeight > (height - 200)) {
      this.setState({ scrollEnabled: true });
    } else {
      this.setState({ scrollEnabled: false });
    }
  };

  sendRequest = () => {
    const {
      name,
      surname,
      email,
      address,
      code,
      phone,
      legalName,
      request,
      token,
      SendQACForm,
    } = this.props;

    const { customerType, subsidiary } = this.state;

    SendQACForm({
      customerType,
      subsidiary,
      name,
      legalName,
      surname,
      address,
      code,
      email,
      phone,
      request,
      token,
    });
  };

  disableButton = () => {
    const {
      customerType,
    } = this.state;

    const {
      name,
      surname,
      email,
      address,
      legalName,
      request,
    } = this.props;

    return (customerType === 0
      && (name === '' || surname === '' || email === '' || address === '' || request === ''))
      || (customerType === 1
      && (legalName === '' || email === '' || address === '' || request === ''));
  };

  validateFields = () => {
    const {
      name,
      surname,
      email,
      // code,
      phone,
      legalName,
    } = this.props;
    const { customerType } = this.state;

    const numReg = new RegExp('^[0-9]+$');
    const letReg = new RegExp('^[a-zA-Z]+$');
    const emailReg = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);


    if (customerType === 0
      && (!phone.match(numReg)
        || !name.match(letReg)
        || !surname.match(letReg)
        || !email.match(emailReg))) {
      // || !code.match(new RegExp('^[0-9]*$')))) {
      this.setState({ err: 'Polja nisu ispravno popunjena' });
    } else if (customerType === 1
      && (!phone.match(numReg)
        || !legalName.match(letReg)
        || !email.match(emailReg))) {
      // || !code.match(new RegExp('^[0-9]*$')))) {
      this.setState({ err: 'Polja nisu ispravno popunjena' });
    } else {
      this.setState({ err: '' });
      this.sendRequest();
    }
  };

  load = () => {
    const { Initialize } = this.props;

    Initialize();
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  }

  onNameChange = (text) => {
    const { NameChanged } = this.props;

    NameChanged(text);
  }

  onLegalNameChange = (text) => {
    const { LegalNameChanged } = this.props;

    LegalNameChanged(text);
  }

  onSurnameChange = (text) => {
    const { SurnameChanged } = this.props;

    SurnameChanged(text);
  }

  onAddressChange = (text) => {
    const { AddressChanged } = this.props;

    AddressChanged(text);
  }

  onCodeChange = (text) => {
    const { CodeChanged } = this.props;

    CodeChanged(text);
  }

  onEmailChange = (text) => {
    const { EmailChanged } = this.props;

    EmailChanged(text);
  }

  onPhoneChange = (text) => {
    const { PhoneChanged } = this.props;

    PhoneChanged(text);
  }

  onRequestChange = (text) => {
    const { RequestChanged } = this.props;

    RequestChanged(text);
  }

  render() {
    const {
      subsidiary,
      customerType,
      scrollEnabled,
      keyboardDidShow,
      height,
      err,
    } = this.state;

    const {
      name,
      surname,
      email,
      address,
      code,
      phone,
      legalName,
      request,
    } = this.props;

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
              <Picker.Item key={index.toString()} label={option} value={index} />
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
              <Picker.Item key={index.toString()} label={item} value={index} />
            ))}
          </Picker>
        </View>
        )}
        <View style={keyboardDidShow
          ? [styles.scrollContainerNoFlex, { height }] : [styles.scrollContainer, { height }]}
        >
          <ScrollView
            contentContainerStyle={[styles.inputsContainer]}
            style={keyboardDidShow ? { flex: 1, marginBottom: 30 } : { flex: 1, marginBottom: 10 }}
            keyboardShouldPersistTaps="always"
            scrollEnabled={scrollEnabled}
            ref={(ref) => { this.scroll = ref; }}
            onContentSizeChange={this.onContentSizeChange}
          >
            <View style={styles.txtInputs}>
              {customerType === 0 && (
              <View>
                <TextInput
                  value={name}
                  onChangeText={text => this.onNameChange(text)}
                  placeholder="Ime*"
                  style={[styles.textInput, { marginTop: 0 }]}
                />
                <TextInput
                  value={surname}
                  onChangeText={text => this.onSurnameChange(text)}
                  placeholder="Prezime*"
                  style={styles.textInput}
                />
              </View>
              )}
              {customerType === 1 && (
              <TextInput
                value={legalName}
                onChangeText={text => this.onLegalNameChange(text)}
                placeholder="Naziv*"
                style={[styles.textInput, { marginTop: hp('4%') }]}
              />
              )}
              <TextInput
                value={address}
                onChangeText={text => this.onAddressChange(text)}
                placeholder="Adresa*"
                style={styles.textInput}
              />
              <TextInput
                value={email}
                onChangeText={text => this.onEmailChange(text)}
                placeholder="E-mail*"
                style={styles.textInput}
              />
              <TextInput
                value={code}
                onChangeText={text => this.onCodeChange(text)}
                placeholder="Šifra mjernog mjesta"
                style={styles.textInput}
                keyboardType="numeric"
              />
              <TextInput
                value={phone}
                onChangeText={text => this.onPhoneChange(text)}
                placeholder="Broj telefona"
                style={styles.textInput}
                keyboardType="numeric"
              />
              <Text style={styles.reqText}>Polja označena sa * su obavezna</Text>
              <Text style={styles.error}>{err}</Text>
              <TextInput
                placeholder="Zahtjev.."
                value={request}
                onChangeText={text => this.onRequestChange(text)}
                multiline
                autoFocus
                underlineColorAndroid="transparent"
                style={styles.requestTxtInput}
              />
              <Button
                buttonStyle={styles.btnReq}
                title="Pošalji zahtjev"
                titleStyle={{ fontSize: 18 }}
                onPress={this.validateFields}
                disabled={this.disableButton()}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  token: state.signIn.user,
  username: state.signIn.id,
  name: state.qac.name,
  legalName: state.qac.legalName,
  surname: state.qac.surname,
  address: state.qac.address,
  code: state.qac.code,
  email: state.qac.email,
  phone: state.qac.phone,
  request: state.qac.request,
  status: state.qac.status,
});

export default connect(mapStateToProps, {
  NameChanged: nameChanged,
  LegalNameChanged: legalNameChanged,
  SurnameChanged: surnameChanged,
  CodeChanged: codeChanged,
  AddressChanged: addressChanged,
  PhoneChanged: phoneChanged,
  EmailChanged: emailChanged,
  RequestChanged: requestChanged,
  SendQACForm: sendQACForm,
  Initialize: initialize,
  ResetStatus: resetQACStatus,
})(Form);
