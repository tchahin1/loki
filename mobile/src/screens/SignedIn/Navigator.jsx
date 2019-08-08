import { createDrawerNavigator } from 'react-navigation';

import HomeScreen from './Home';
import FailureReportScreen from './FailureReport/Navigator';
import QuestionsAndComplaintsScreen from './QuestionsAndComplaints';
import ConsumptionReviewScreen from './ConsumptionReview';
import AccountScreen from './Account';
import EServiceScreen from './EService';
import CalculatorScreen from './Calculator';
import InfoScreen from './Information';
import ElectricMeterScreen from './ElectricMeter/Navigator';
import HomeRoute from '../../assets/enum/routes/HomeRoute';

const getRouteConfigMap = () => {
  const map = {};
  map[HomeRoute.HOME] = {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Početna',
    },
  };
  map[HomeRoute.ELECTRIC_METER] = {
    screen: ElectricMeterScreen,
    navigationOptions: {
      title: 'Očitanje brojila',
    },
  };
  map[HomeRoute.FAILURE_REPORT] = {
    screen: FailureReportScreen,
    navigationOptions: {
      title: 'Prijava kvara',
    },
  };
  map[HomeRoute.QUESTIONS_AND_COMPLAINTS] = {
    screen: QuestionsAndComplaintsScreen,
    navigationOptions: {
      title: 'Upiti i reklamacije',
    },
  };
  map[HomeRoute.CONSUMPTION_REVIEW] = {
    screen: ConsumptionReviewScreen,
    navigationOptions: {
      title: 'Pregled potrošnje',
    },
  };
  map[HomeRoute.ACCOUNT] = {
    screen: AccountScreen,
    navigationOptions: {
      title: 'Pregled računa',
    },
  };
  map[HomeRoute.E_SERVICE] = {
    screen: EServiceScreen,
    navigationOptions: {
      title: 'E-Usluge',
    },
  };
  map[HomeRoute.CALCULATOR] = {
    screen: CalculatorScreen,
    navigationOptions: {
      title: 'Kalkulator',
    },
  };
  map[HomeRoute.INFORMATION] = {
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
    initialRouteName: HomeRoute.HOME,
  },
);

export default SignedInNavigator;
