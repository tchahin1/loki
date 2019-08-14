import React from 'react';
import {
  View,
  Text,
  Picker,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
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
import { connect } from 'react-redux';
import { logoutUser } from '../account/AccountActions';

const styles = createStyles();

const dummyData = ['Mjerno mjesto 1', 'Mjerno mjesto 2'];

class ElectricMeterScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
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

  keyboardDidShow = () => {
    this.setState({ keyboardDidShow: true, flexStyle: 1 / 2 });
  };

  keyboardDidHide = () => {
    this.setState({ keyboardDidShow: false, flexStyle: 2 / 3 });
  };

  onSignOutPressed() {
    this.props.logoutUser();
  }

  componentWillReceiveProps(nextProps) {
    const { navigation } = this.props;

    if(nextProps.user === '') {
      onSignOut().then(navigation.navigate('SignedOut'));
    }
  }

  render() {
    const { navigation } = this.props;
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
                {dummyData.map((data, index) => (
                  <Picker.Item
                    key={index.toString()}
                    label={data}
                    value={data}
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
          onSignOutPress={this.onSignOutPressed.bind(this)}
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

const mapStateToProps = state => {
  return {
    user: state.signIn.user
  };
};

export default connect(mapStateToProps, {logoutUser})(ElectricMeterScreen);
