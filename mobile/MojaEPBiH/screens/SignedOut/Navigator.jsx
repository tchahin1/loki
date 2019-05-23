import { createStackNavigator } from 'react-navigation';

import SignUpScreen from './SignUp';
import SignInScreen from './SignIn';

const SignedOutNavigator = createStackNavigator({
  SignUp: SignUpScreen,
  SignIn: SignInScreen,
},
{
  initialRouteName: 'SignIn',
  headerLayoutPreset: 'center',
});


export default SignedOutNavigator;
