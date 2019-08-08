import { createSwitchNavigator } from 'react-navigation';

import SignUpScreen from './SignUp';
import SignInScreen from './SignIn';
import GuestRoute from '../../assets/enum/routes/GuestRoute';

const getRouteConfigMap = () => {
  const map = {};
  map[GuestRoute.SIGN_UP] = SignUpScreen;
  map[GuestRoute.SIGN_IN] = SignInScreen;
  return map;
};

const SignedOutNavigator = createSwitchNavigator(
  getRouteConfigMap(),
  {
    initialRouteName: GuestRoute.SIGN_IN,
  },
);


export default SignedOutNavigator;
