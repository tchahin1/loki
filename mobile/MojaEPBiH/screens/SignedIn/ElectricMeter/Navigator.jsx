import { createStackNavigator } from 'react-navigation';

import CameraScreen from '../Camera';
import ElectricMeterScreen from './ElectricMeter';

const ElectricMeterNavigator = createStackNavigator({
  Camera: {
    screen: CameraScreen,
    navigationOptions: {
      header: null,
    },
  },
  ElectricMeter: {
    screen: ElectricMeterScreen,
    navigationOptions: {
      title: 'Očitanje brojila',
      header: null,
    },
  },
}, {
  initialRouteName: 'ElectricMeter',
});

export default ElectricMeterNavigator;
