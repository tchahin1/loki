import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { Header } from 'react-native-elements/src/index';
import PropTypes from 'prop-types';
import MenuButton from '../../components/helpers/MenuButton';
import NotificationsButton from '../../components/helpers/NotificationsButton';
import NotificationsModal from '../../components/helpers/NotificationsModal';
import { onSignOut } from '../../../Auth';
import createStyles from './ConsumptionReview.styles';
import logoutUser from '../account/AccountActions';

const styles = createStyles();

class ConsumptionReviewScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    user: PropTypes.string.isRequired,
    LogoutUser: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      openNotMod: false,
      isVisible: false,
      pointRect: {
        x: 0, y: 0, width: 0, height: 0,
      },
      value: 0,
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

  render() {
    const { navigation } = this.props;
    const {
      openNotMod, isVisible, pointRect, value,
    } = this.state;

    console.log(pointRect, isVisible, value);

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
        <View style={styles.container}>
          <Text>Line Chart</Text>
          <View style={{ marginLeft: wp('-8%') }}>
            <LineChart
              data={{
                labels: ['Jan', 'Feb', 'Mart', 'April', 'Maj', 'Juni',
                  'Juli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dec'],
                datasets: [{
                  data: [
                    78, 23, 44, 56, 88, 23, 12, 18, 22, 65, 73, 10,
                  ],
                  color: (opacity = 0.2) => `rgba(0, 255, 0, ${opacity})`,
                },
                {
                  data: [
                    31, 44, 55, 61, 32, 13, 75, 51, 91, 33, 12, 1,
                  ],
                  color: (opacity = 0.2) => `rgba(0, 0, 255, ${opacity})`,
                }],
              }}
              width={Dimensions.get('window').width} // from react-native
              height={220}
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
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              onDataPointClick={obj => showMessage({
                message: obj.getColor() === 'rgba(0, 255, 0, 0.2)' ? 'Velika tarifa' : 'Mala tarifa',
                description: `${obj.value}kWh`,
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
          <NotificationsModal
            animationType="fade"
            transparent
            visible={openNotMod}
            onRequestClose={() => this.setState({ openNotMod: false })}
            onSignOutPress={this.onSignOutPressed}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.signIn.user,
});

export default connect(mapStateToProps, { LogoutUser: logoutUser })(ConsumptionReviewScreen);
