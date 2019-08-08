import { createSwitchNavigator } from 'react-navigation';

import SignUpScreen from '../features/sign-up';
import SignInScreen from '../features/sign-in';
import Screen from './ScreenName';

const getRouteConfigMap = () => {
  const map = {};
  map[Screen.SIGN_UP] = SignUpScreen;
  map[Screen.SIGN_IN] = SignInScreen;
  return map;
};

const SignedOutNavigator = createSwitchNavigator(
  getRouteConfigMap(),
  {
    initialRouteName: Screen.SIGN_IN,
  },
);

export default SignedOutNavigator;
