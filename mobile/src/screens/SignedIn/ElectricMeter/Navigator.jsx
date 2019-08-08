import { createStackNavigator } from 'react-navigation';

import CameraScreen from '../Camera';
import ElectricMeterScreen from './ElectricMeter';
import SharedRoute from '../../../assets/enum/routes/SharedRoute';
import HomeRoute from '../../../assets/enum/routes/HomeRoute';

const getRouteConfigMap = () => {
  const map = {};
  map[SharedRoute.CAMERA] = {
    screen: CameraScreen,
    navigationOptions: {
      header: null,
    },
  };
  map[HomeRoute.ELECTRIC_METER] = {
    screen: ElectricMeterScreen,
    navigationOptions: {
      title: 'Očitanje brojila',
      header: null,
    },
  };
  return map;
};

const ElectricMeterNavigator = createStackNavigator(
  getRouteConfigMap(),
  {
    initialRouteName: 'ElectricMeter',
  },
);

export default ElectricMeterNavigator;
