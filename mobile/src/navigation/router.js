import { createSwitchNavigator } from 'react-navigation';

import SignedInNavigator from './SignedInNavigator';
import SignedOutNavigator from './SignedOutNavigator';
import Navigator from './NavigatorName';

const getRouteConfigMap = () => {
  const map = {};
  map[Navigator.SIGNED_IN] = SignedInNavigator;
  map[Navigator.SIGNED_OUT] = SignedOutNavigator;
  return map;
};

const createRootNavigator = (signedIn = false) => createSwitchNavigator(
  getRouteConfigMap(),
  {
    initialRouteName: signedIn ? Navigator.SIGNED_IN : Navigator.SIGNED_OUT,
  },
);

export default createRootNavigator;
