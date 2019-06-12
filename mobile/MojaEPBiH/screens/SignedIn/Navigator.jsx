import { createDrawerNavigator } from 'react-navigation';

import HomeScreen from './Home';
import ElectricMeterScreen from './ElectricMeter';
import FailureReportScreen from './FailureReport';
import QuestionsAndComplaintsScreen from './QuestionsAndComplaints';
import ConsumptionReviewScreen from './ConsumptionReview';
import AccountScreen from './Account';
import EServiceScreen from './EService';
import CalculatorScreen from './Calculator';
import InfoScreen from './Information';


const SignedInNavigator = createDrawerNavigator({
  Home: HomeScreen,
  ElectricMeter: ElectricMeterScreen,
  FailureReport: FailureReportScreen,
  QuestionsAndComplaints: QuestionsAndComplaintsScreen,
  ConsumptionReview: ConsumptionReviewScreen,
  Account: AccountScreen,
  EService: EServiceScreen,
  Calculator: CalculatorScreen,
  Information: InfoScreen,
},
{
  initialRouteName: 'Home',
});


export default SignedInNavigator;
