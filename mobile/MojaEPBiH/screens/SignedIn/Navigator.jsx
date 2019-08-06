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

const SignedInNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Početna',
    },
  },
  ElectricMeter: {
    screen: ElectricMeterScreen,
    navigationOptions: {
      title: 'Očitanje brojila',
    },
  },
  FailureReport: {
    screen: FailureReportScreen,
    navigationOptions: {
      title: 'Prijava kvara',
    },
  },
  QuestionsAndComplaints: {
    screen: QuestionsAndComplaintsScreen,
    navigationOptions: {
      title: 'Upiti i reklamacije',
    },
  },
  ConsumptionReview: {
    screen: ConsumptionReviewScreen,
    navigationOptions: {
      title: 'Pregled potrošnje',
    },
  },
  Account: {
    screen: AccountScreen,
    navigationOptions: {
      title: 'Pregled računa',
    },
  },
  EService: {
    screen: EServiceScreen,
    navigationOptions: {
      title: 'E-Usluge',
    },
  },
  Calculator: {
    screen: CalculatorScreen,
    navigationOptions: {
      title: 'Kalkulator',
    },
  },
  Information: {
    screen: InfoScreen,
    navigationOptions: {
      title: 'Ostale informacije',
    },
  },
},
{
  initialRouteName: 'Home',
});


export default SignedInNavigator;
