import { createStackNavigator } from 'react-navigation';

import CameraScreen from '../camera';
import FailureReportScreen from './FailureReport';
import Screen from '../../navigation/ScreenName';

function getRouteConfigMap() {
  const map = {};
  map[Screen.CAMERA] = {
    screen: CameraScreen,
    navigationOptions: {
      header: null,
    },
  };
  map[Screen.FAILURE_REPORT] = {
    screen: FailureReportScreen,
    navigationOptions: {
      title: 'Očitanje brojila',
      header: null,
    },
  };
  return map;
}

const FailureReportNavigator = createStackNavigator(
  getRouteConfigMap(), {
    initialRouteName: 'FailureReport',
  },
);

export default FailureReportNavigator;
