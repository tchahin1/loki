import React from 'react';
import { connect } from 'react-redux';
import {
  View, Text, Dimensions, TouchableOpacity, Picker,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { Header, Icon, Button } from 'react-native-elements/src/index';
import _ from 'lodash';
import PropTypes from 'prop-types';
import MenuButton from '../../components/helpers/MenuButton';
import Colors from '../../assets/colors/AppColorsEnum';
import NotificationsButton from '../../components/helpers/NotificationsButton';
import NotificationsModal from '../../components/helpers/NotificationsModal';
import PlaceOfMeasurementModal from '../../components/helpers/PlaceOfMeasurementModal';
import { onSignOut } from '../../../Auth';
import createStyles from './ConsumptionReview.styles';
import logoutUser from '../account/AccountActions';
import { placeChanged } from '../electric-meter/ElectricMeterActions';
import { fetchMeasurementPlaces } from '../../components/helpers/PlaceOfMeasurementModalActions';
import { fetchConsumptionData } from './ConsumptionReviewActions';

const styles = createStyles();
let place = 0;
const currentYear = new Date().getFullYear();
let chartTitle = '';

class ConsumptionReviewScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    email: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    LogoutUser: PropTypes.func.isRequired,
    places: PropTypes.instanceOf(Array).isRequired,
    years: PropTypes.instanceOf(Array).isRequired,
    selectedPlace: PropTypes.string.isRequired,
    PlaceChanged: PropTypes.func.isRequired,
    FetchMeasurementPlaces: PropTypes.func.isRequired,
    lowTariffData: PropTypes.instanceOf(Array).isRequired,
    highTariffData: PropTypes.instanceOf(Array).isRequired,
    xCoordinatesData: PropTypes.instanceOf(Array).isRequired,
    FetchConsumptionData: PropTypes.func.isRequired,
    selectedYear: PropTypes.number.isRequired,
    yearArray: PropTypes.instanceOf(Array).isRequired,
    dates: PropTypes.instanceOf(Array).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      openNotMod: false,
      flexStyle: 2 / 3,
      openPOM: false,
      previousPOM: false,
    };
  }

  componentWillMount() {
    const { email, user, FetchMeasurementPlaces } = this.props;

    FetchMeasurementPlaces({ email, token: user });
  }

  componentDidMount() {
    const { navigation } = this.props;

    navigation.addListener('willFocus', this.load);
  }

  componentWillReceiveProps(nextProps) {
    const {
      navigation, places, selectedPlace, PlaceChanged,
    } = this.props;

    if (nextProps.user === '') {
      onSignOut().then(navigation.navigate('SignedOut'));
    }

    if ((places.length === 0 || nextProps.places.length !== places.length) && selectedPlace === '' && nextProps.places.length !== 0) {
      PlaceChanged(nextProps.places[0].id.toString());
      place = nextProps.places[0].id;
    }
  }

  onPlaceChanged(item) {
    const {
      PlaceChanged, FetchConsumptionData, user, email,
    } = this.props;

    PlaceChanged(item);
    FetchConsumptionData({
      email, token: user, placeId: Number(item), year: Number(currentYear),
    });
  }

  yearSelected = (year) => {
    const {
      selectedPlace, user, email, FetchConsumptionData,
    } = this.props;

    if (selectedPlace === '') {
      FetchConsumptionData({
        email, token: user, placeId: place, year,
      });
    } else {
      FetchConsumptionData({
        email, token: user, placeId: selectedPlace, year,
      });
    }
  }

  load = () => {
    const {
      selectedPlace, user, email, FetchConsumptionData,
    } = this.props;
    const { previousPOM } = this.state;

    if (!previousPOM) {
      if (selectedPlace === null || selectedPlace === undefined || selectedPlace === '') {
        setTimeout(() => FetchConsumptionData({
          email, token: user, placeId: place, year: Number(currentYear),
        }), 500);
      } else {
        setTimeout(() => FetchConsumptionData({
          email, token: user, placeId: selectedPlace, year: Number(currentYear),
        }), 500);
      }
    }

    if (previousPOM) {
      this.setState({ previousPOM: !previousPOM });
    }
  }

  renderButtons = () => {
    const { years, yearArray, selectedYear } = this.props;

    if (years.length === 1) {
      return (
        <Button
          buttonStyle={[styles.btnReq, { width: wp('94%') }]}
          title={`${years[0]}.`}
          disabled={selectedYear === years[0]}
          disabledStyle={[styles.btnReq, { width: wp('94%'), backgroundColor: Colors.NOTICE_COLOR }]}
          titleStyle={{ fontSize: 18, color: 'white' }}
          disabledTitleStyle={{ fontSize: 18, color: 'white' }}
          onPress={() => this.yearSelected(years[0])}
        />
      );
    }

    if (years.length === 2) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Button
            buttonStyle={[styles.btnReq, { width: wp('46%') }]}
            title={`${years[1]}.`}
            disabled={selectedYear === years[1]}
            disabledStyle={[styles.btnReq, { width: wp('46%'), backgroundColor: Colors.NOTICE_COLOR }]}
            titleStyle={{ fontSize: 18, color: 'white' }}
            disabledTitleStyle={{ fontSize: 18, color: 'white' }}
            onPress={() => this.yearSelected(years[1])}
          />
          <Button
            buttonStyle={[styles.btnReq, { width: wp('46%') }]}
            title={`${years[0]}.`}
            disabled={selectedYear === years[0]}
            disabledStyle={[styles.btnReq, { width: wp('46%'), backgroundColor: Colors.NOTICE_COLOR }]}
            titleStyle={{ fontSize: 18, color: 'white' }}
            disabledTitleStyle={{ fontSize: 18, color: 'white' }}
            onPress={() => this.yearSelected(years[0])}
          />
        </View>
      );
    }

    if (years.length >= 3) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <View style={{ borderWidth: 0 }}>
            <Button
              buttonStyle={[styles.btnReq, { width: wp('30%') }]}
              title="..."
              titleStyle={{ fontSize: 18, color: 'white' }}
            />
            <Picker
              style={{
                position: 'absolute', top: 0, width: 1000, height: 1000,
              }}
              onValueChange={(itemValue, itemIndex) => this.yearSelected(itemValue, itemIndex)}
              itemStyle={{ textAlign: 'center' }}
            >
              <Picker.Item label="Odaberi godinu.." style={{ position: 'center' }} />
              {yearArray.map(data => (
                <Picker.Item
                  key={data.toString()}
                  label={`${data}.`}
                  value={data.toString()}
                />
              ))}
            </Picker>
          </View>
          <Button
            buttonStyle={[styles.btnReq, { width: wp('30%') }]}
            title={`${years[1]}.`}
            titleStyle={{ fontSize: 18, color: 'white' }}
            disabled={selectedYear === years[1]}
            disabledStyle={[styles.btnReq, { width: wp('30%'), backgroundColor: Colors.NOTICE_COLOR }]}
            disabledTitleStyle={{ fontSize: 18, color: 'white' }}
            onPress={() => this.yearSelected(years[1])}
          />
          <Button
            buttonStyle={[styles.btnReq, { width: wp('30%') }]}
            title={`${years[0]}.`}
            titleStyle={{ fontSize: 18, color: 'white' }}
            disabled={selectedYear === years[0]}
            disabledStyle={[styles.btnReq, { width: wp('30%'), backgroundColor: Colors.NOTICE_COLOR }]}
            disabledTitleStyle={{ fontSize: 18, color: 'white' }}
            onPress={() => this.yearSelected(years[0])}
          />
        </View>
      );
    }

    return null;
  }

  renderChartTitle = () => {
    const { selectedYear } = this.props;

    if (selectedYear !== 0) {
      chartTitle = `Potrošnja za ${selectedYear} godinu:`;
    } else {
      chartTitle = '';
    }
    return chartTitle;
  }

  onSignOutPressed = () => {
    const { LogoutUser } = this.props;

    LogoutUser();
  }

  render() {
    const {
      navigation, places, selectedPlace, lowTariffData, highTariffData, xCoordinatesData, dates,
    } = this.props;
    const {
      openNotMod, flexStyle, openPOM,
    } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <Header
          placement="left"
          containerStyle={styles.header}
          leftComponent={<MenuButton onPress={() => navigation.openDrawer()} />}
          centerComponent={{ text: 'PREGLED POTROŠNJE', style: styles.title }}
          rightComponent={(
            <NotificationsButton
              onPress={() => this.setState({ openNotMod: true })}
            />
          )}
        />
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
            <TouchableOpacity onPress={() => this.setState({ openPOM: true, previousPOM: true })}>
              <Icon
                type="ionicon"
                name="ios-add"
                color={Colors.NOTICE_COLOR}
                size={35}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginLeft: wp('2%') }}>
          {this.renderButtons()}
        </View>
        <View style={styles.container} flexStyle={flexStyle}>
          <Text style={{ fontSize: 18, marginTop: -10 }}>{this.renderChartTitle()}</Text>
          <View style={{ marginLeft: wp('-8%') }}>
            <LineChart
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
                datasets: [{
                  data: highTariffData,
                  color: (opacity = 0.2) => `rgba(0, 255, 0, ${opacity})`,
                  xCoordinatesArray: xCoordinatesData,
                },
                {
                  data: lowTariffData,
                  color: (opacity = 0.2) => `rgba(0, 0, 255, ${opacity})`,
                  xCoordinatesArray: xCoordinatesData,
                }],
              }}
              width={Dimensions.get('window').width} // from react-native
              height={250}
              chartConfig={{
                backgroundColor: 'white',
                backgroundGradientFrom: 'white',
                backgroundGradientTo: 'white',
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 0.3) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              withShadow={false}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              onDataPointClick={obj => showMessage({
                message: obj.getColor() === 'rgba(0, 255, 0, 0.2)' ? 'Velika tarifa' : 'Mala tarifa',
                description: `Za ${dates[obj.index]} je ${obj.value}kWh`,
                type: 'info',
                position: 'center',
                floating: true,
                icon: 'info',
                backgroundColor: obj.getColor(0.9),
              })
            }
            />
            <FlashMessage duration={1000} style={{ width: wp('90%'), marginLeft: wp('10%') }} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row', marginLeft: wp('-1%') }}>
              <Button
                buttonStyle={{ backgroundColor: 'rgba(0, 255, 0, 1)', width: 4, height: 4 }}
                disabled
                disabledStyle={{ backgroundColor: 'rgba(0, 255, 0, 1)', width: 4, height: 4 }}
              />
              <Text style={{ marginLeft: wp('2%') }}>Velika tarifa</Text>
            </View>
            <View style={{ flexDirection: 'row', marginLeft: wp('5%') }}>
              <Button
                buttonStyle={{ backgroundColor: 'blue', width: 4, height: 4 }}
                disabled
                disabledStyle={{ backgroundColor: 'blue', width: 4, height: 4 }}
              />
              <Text style={{ marginLeft: wp('2%') }}>Mala tarifa</Text>
            </View>
          </View>
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
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  email: state.signIn.id,
  user: state.signIn.user,
  places: _.map(state.measurementPlaceModal.places, val => ({ ...val })),
  years: state.consumption.years,
  lowTariffData: state.consumption.LTData,
  highTariffData: state.consumption.HTData,
  xCoordinatesData: state.consumption.xCoordinatesData,
  selectedPlace: state.electricMeter.selectedPlace,
  selectedYear: state.consumption.selectedYear,
  yearArray: state.consumption.yearPickerData,
  dates: state.consumption.dates,
});

export default connect(mapStateToProps, {
  LogoutUser: logoutUser,
  PlaceChanged: placeChanged,
  FetchMeasurementPlaces: fetchMeasurementPlaces,
  FetchConsumptionData: fetchConsumptionData,
})(ConsumptionReviewScreen);
