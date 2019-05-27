import {createSwitchNavigator} from 'react-navigation';

import SignUpScreen from './SignUp';
import SignInScreen from './SignIn';

const SignedOutNavigator = createSwitchNavigator({
  SignUp: SignUpScreen,
  SignIn: SignInScreen,
},
{
  initialRouteName: 'SignIn',
});


export default SignedOutNavigator;
