import { createDrawerNavigator } from 'react-navigation';

import HomeScreen from '../features/home';
import FailureReportScreen from '../features/failure-report/Navigator';
import QuestionsAndComplaintsScreen from '../features/questions-and-complaints';
import ConsumptionReviewScreen from '../features/consumption-review';
import AccountScreen from '../features/account';
import EServiceScreen from '../features/e-service';
import CalculatorScreen from '../features/calculator';
import InfoScreen from '../features/information';
import ElectricMeterScreen from '../features/electric-meter/Navigator';
import Screen from './ScreenName';

const getRouteConfigMap = () => {
  const map = {};
  map[Screen.HOME] = {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Početna',
    },
  };
  map[Screen.ELECTRIC_METER] = {
    screen: ElectricMeterScreen,
    navigationOptions: {
      title: 'Očitanje brojila',
    },
  };
  map[Screen.FAILURE_REPORT] = {
    screen: FailureReportScreen,
    navigationOptions: {
      title: 'Prijava kvara',
    },
  };
  map[Screen.QUESTIONS_AND_COMPLAINTS] = {
    screen: QuestionsAndComplaintsScreen,
    navigationOptions: {
      title: 'Upiti i reklamacije',
    },
  };
  map[Screen.CONSUMPTION_REVIEW] = {
    screen: ConsumptionReviewScreen,
    navigationOptions: {
      title: 'Pregled potrošnje',
    },
  };
  map[Screen.ACCOUNT] = {
    screen: AccountScreen,
    navigationOptions: {
      title: 'Pregled računa',
    },
  };
  map[Screen.E_SERVICE] = {
    screen: EServiceScreen,
    navigationOptions: {
      title: 'E-Usluge',
    },
  };
  map[Screen.CALCULATOR] = {
    screen: CalculatorScreen,
    navigationOptions: {
      title: 'Kalkulator',
    },
  };
  map[Screen.INFORMATION] = {
    screen: InfoScreen,
    navigationOptions: {
      title: 'Ostale informacije',
    },
  };
  return map;
};

const SignedInNavigator = createDrawerNavigator(
  getRouteConfigMap(),
  {
    initialRouteName: Screen.HOME,
  },
);

export default SignedInNavigator;
