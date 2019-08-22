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
import { placeChanged } from './ElectricMeterActions';

const styles = createStyles();

class ElectricMeterScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    user: PropTypes.string.isRequired,
    LogoutUser: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    FetchMeasurementPlaces: PropTypes.func.isRequired,
    places: PropTypes.instanceOf(Array).isRequired,
    PlaceChanged: PropTypes.func.isRequired,
    selectedPlace: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      openNotMod: false,
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
      navigation,
      places,
      PlaceChanged,
    } = this.props;

    if (nextProps.user === '') {
      onSignOut().then(navigation.navigate('SignedOut'));
    }

    if (places.length === 0 || nextProps.places.length !== places.length) {
      PlaceChanged(nextProps.places[0].id.toString());
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

  onPlaceChanged(item) {
    const { PlaceChanged } = this.props;

    PlaceChanged(item);
  }

  keyboardDidShow = () => {
    this.setState({ keyboardDidShow: true, flexStyle: 1 / 2 });
  };

  keyboardDidHide = () => {
    this.setState({ keyboardDidShow: false, flexStyle: 2 / 3 });
  };

  render() {
    const { navigation, places, selectedPlace } = this.props;
    const {
      openNotMod,
      openPOM,
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
                selectedValue={selectedPlace}
                style={styles.picker}
                onValueChange={itemValue => this.onPlaceChanged(itemValue)}
              >
                {places.map(data => (
                  <Picker.Item
                    key={data.id.toString()}
                    label={data.name}
                    value={data.id.toString()}
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
  selectedPlace: state.electricMeter.selectedPlace,
});

export default connect(mapStateToProps,
  {
    LogoutUser: logoutUser,
    FetchMeasurementPlaces: fetchMeasurementPlaces,
    PlaceChanged: placeChanged,
  })(ElectricMeterScreen);
