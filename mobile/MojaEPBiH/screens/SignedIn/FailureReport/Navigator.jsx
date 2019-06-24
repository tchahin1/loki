import { createStackNavigator } from 'react-navigation';

import CameraScreen from '../Camera';
import FailureReportScreen from './FailureReport';

const FailureReportNavigator = createStackNavigator({
  Camera: {
    screen: CameraScreen,
    navigationOptions: {
      header: null,
    },
  },
  FailureReport: {
    screen: FailureReportScreen,
    navigationOptions: {
      title: 'Očitanje brojila',
      header: null,
    },
  },
}, {
  initialRouteName: 'FailureReport',
});

export default FailureReportNavigator;
