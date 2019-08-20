import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Picker,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import _ from 'lodash';
import { Header, Icon } from 'react-native-elements/src/index';
import PropTypes from 'prop-types';
import MenuButton from '../../components/helpers/MenuButton';
import NotificationsButton from '../../components/helpers/NotificationsButton';
import NotificationsModal from '../../components/helpers/NotificationsModal';
import PlaceOfMeasurementModal from '../../components/helpers/PlaceOfMeasurementModal';
import MetricLocationData from '../../components/electric-meter/MetricLocationData';
import { onSignOut } from '../../../Auth';
import Colors from '../../assets/colors/AppColorsEnum';
import createStyles from './ElectricMeter.styles';
import logoutUser from '../account/AccountActions';
import { fetchMeasurementPlaces } from '../../components/helpers/PlaceOfMeasurementModalActions';

const styles = createStyles();

// const dummyData = ['Mjerno mjesto 1', 'Mjerno mjesto 2'];

class ElectricMeterScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    user: PropTypes.string.isRequired,
    LogoutUser: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    FetchMeasurementPlaces: PropTypes.func.isRequired,
    places: PropTypes.instanceOf(Array).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      openNotMod: false,
      selected: '',
      keyboardDidShow: false,
      flexStyle: 2 / 3,
      openPOM: false,
    };
  }

  componentWillMount() {
    const { username, user, FetchMeasurementPlaces } = this.props;

    FetchMeasurementPlaces({ username, token: user });
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

  componentWillReceiveProps(nextProps) {
    const {
      navigation, places, username, user, FetchMeasurementPlaces,
    } = this.props;

    if (nextProps.user === '') {
      onSignOut().then(navigation.navigate('SignedOut'));
    }

    if (nextProps.places.length !== places.length) {
      FetchMeasurementPlaces({ username, token: user });
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  onSignOutPressed = () => {
    const { LogoutUser } = this.props;

    LogoutUser();
  }

  keyboardDidShow = () => {
    this.setState({ keyboardDidShow: true, flexStyle: 1 / 2 });
  };

  keyboardDidHide = () => {
    this.setState({ keyboardDidShow: false, flexStyle: 2 / 3 });
  };

  render() {
    const { navigation, places } = this.props;
    const {
      openNotMod,
      openPOM,
      selected,
      keyboardDidShow,
      flexStyle,
    } = this.state;
    return (
      <KeyboardAvoidingView
        style={styles.wrapper}
        behaviour="padding"
      >
        <Header
          placement="left"
          containerStyle={styles.header}
          leftComponent={<MenuButton onPress={() => navigation.openDrawer()} />}
          centerComponent={{ text: 'OČITANJE BROJILA', style: styles.title }}
          rightComponent={(
            <NotificationsButton
              onPress={() => this.setState({ openNotMod: true })}
            />
          )}
        />
        {!keyboardDidShow && (
          <View style={styles.metricPlacesContainer}>
            <Text style={styles.label}>Moja mjerna mjesta:</Text>
            <View style={styles.firstPart}>
              <Picker
                selectedValue={selected}
                style={styles.picker}
                onValueChange={itemValue => this.setState({ selected: itemValue })}
              >
                {places.map(data => (
                  <Picker.Item
                    key={data.id.toString()}
                    label={data.name}
                    value={data.name}
                  />
                ))}
              </Picker>
              <TouchableOpacity onPress={() => this.setState({ openPOM: true })}>
                <Icon
                  type="ionicon"
                  name="ios-add"
                  color={Colors.NOTICE_COLOR}
                  size={35}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <MetricLocationData
          flexStyle={flexStyle}
          navigation={navigation}
        />
        <NotificationsModal
          animationType="fade"
          transparent
          visible={openNotMod}
          onRequestClose={() => this.setState({ openNotMod: false })}
          onSignOutPress={this.onSignOutPressed}
        />
        <PlaceOfMeasurementModal
          visible={openPOM}
          onRequestClose={() => {}}
          toggle={() => this.setState({ openPOM: false })}
        />
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.signIn.user,
  username: state.signIn.id,
  places: _.map(state.measurementPlaceModal.places, val => ({ ...val })),
});

export default connect(mapStateToProps,
  {
    LogoutUser: logoutUser,
    FetchMeasurementPlaces: fetchMeasurementPlaces,
  })(ElectricMeterScreen);
