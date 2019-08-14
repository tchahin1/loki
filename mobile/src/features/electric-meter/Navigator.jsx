import { createStackNavigator } from 'react-navigation';

import CameraScreen from '../camera';
import ElectricMeterScreen from './ElectricMeter';
import Screen from '../../navigation/ScreenName';

const getRouteConfigMap = () => {
  const map = {};
  map[Screen.CAMERA] = {
    screen: CameraScreen,
    navigationOptions: {
      header: null,
    },
  };
  map[Screen.ELECTRIC_METER] = {
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
