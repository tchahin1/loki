import React from 'react';
import { connect } from 'react-redux';
import {
  View, Text, Picker, TouchableOpacity, ScrollView,
} from 'react-native';
import { Header, Icon } from 'react-native-elements/src/index';
import _ from 'lodash';
import {
  Table, Row,
} from 'react-native-table-component';
import PropTypes from 'prop-types';
import MenuButton from '../../components/helpers/MenuButton';
import NotificationsButton from '../../components/helpers/NotificationsButton';
import NotificationsModal from '../../components/helpers/NotificationsModal';
import PlaceOfMeasurementModal from '../../components/helpers/PlaceOfMeasurementModal';
import Colors from '../../assets/colors/AppColorsEnum';
import { onSignOut } from '../../../Auth';
import createStyles from './Account.styles';
import logoutUser from './AccountActions';
import { placeChanged } from '../electric-meter/ElectricMeterActions';

const styles = createStyles();

class AccountScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    user: PropTypes.string.isRequired,
    LogoutUser: PropTypes.func.isRequired,
    places: PropTypes.instanceOf(Array).isRequired,
    PlaceChanged: PropTypes.func.isRequired,
    selectedPlace: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      openNotMod: false,
      flexStyle: 2 / 3,
      openPOM: false,
      tableHead: ['Head', 'Head2', 'Head3', 'Head4', 'Head5', 'Head6', 'Head7', 'Head8', 'Head9'],
      widthArr: [40, 60, 80, 100, 120, 140, 160, 180, 200],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { navigation } = this.props;

    if (nextProps.user === '') {
      onSignOut().then(navigation.navigate('SignedOut'));
    }
  }

  onSignOutPressed = () => {
    const { LogoutUser } = this.props;

    LogoutUser();
  }

  onPlaceChanged(item) {
    const { PlaceChanged } = this.props;

    PlaceChanged(item);
  }

  render() {
    const { navigation, places, selectedPlace } = this.props;
    const {
      openNotMod, openPOM, flexStyle, widthArr, tableHead,
    } = this.state;

    const tableData = [];
    for (let i = 0; i < 30; i += 1) {
      const rowData = [];
      for (let j = 0; j < 9; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }

    return (
      <View style={{ flex: 1 }}>
        <Header
          placement="left"
          containerStyle={styles.header}
          leftComponent={<MenuButton onPress={() => navigation.openDrawer()} />}
          centerComponent={{ text: 'PREGLED RAČUNA', style: styles.title }}
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
        <View style={styles.container} flexStyle={flexStyle}>
          <ScrollView horizontal>
            <View>
              <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                <Row
                  data={tableHead}
                  widthArr={widthArr}
                  style={styles.tableHeader}
                  textStyle={styles.text}
                />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                  {
                    tableData.map((rowData, index) => (
                      <Row
                        key={1}
                        data={rowData}
                        widthArr={widthArr}
                        style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                        textStyle={styles.tableText}
                      />
                    ))
                  }
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
          <NotificationsModal
            animationType="fade"
            transparent
            visible={openNotMod}
            onRequestClose={() => this.setState({ openNotMod: false })}
            onSignOutPress={this.onSignOutPressed}
          />
        </View>
        <PlaceOfMeasurementModal
          visible={openPOM}
          onRequestClose={() => {}}
          toggle={() => this.setState({ openPOM: false })}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.signIn.user,
  places: _.map(state.measurementPlaceModal.places, val => ({ ...val })),
  selectedPlace: state.electricMeter.selectedPlace,
});

export default connect(mapStateToProps, {
  LogoutUser: logoutUser, PlaceChanged: placeChanged,
})(AccountScreen);
