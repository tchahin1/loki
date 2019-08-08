import { createSwitchNavigator } from 'react-navigation';
import SignedIn from './src/screens/SignedIn/Navigator';
import SignedOut from './src/screens/SignedOut/Navigator';
import LandingRoute from './src/assets/enum/routes/LandingRoute';

const getRouteConfigMap = () => {
  const map = {};
  map[LandingRoute.SIGNED_IN] = SignedIn;
  map[LandingRoute.SIGNED_OUT] = SignedOut;
  return map;
};

const createRootNavigator = (signedIn = false) => createSwitchNavigator(
  getRouteConfigMap(),
  {
    initialRouteName: signedIn ? LandingRoute.SIGNED_IN : LandingRoute.SIGNED_OUT,
  },
);

export default createRootNavigator;
