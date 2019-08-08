import { createStackNavigator } from 'react-navigation';

import CameraScreen from '../Camera';
import FailureReportScreen from './FailureReport';
import SharedRoute from '../../../assets/enum/routes/SharedRoute';
import HomeRoute from '../../../assets/enum/routes/HomeRoute';

function getRouteConfigMap() {
  const map = {};
  map[SharedRoute.CAMERA] = {
    screen: CameraScreen,
    navigationOptions: {
      header: null,
    },
  };
  map[HomeRoute.FAILURE_REPORT] = {
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
