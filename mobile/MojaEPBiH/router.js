import {
  createSwitchNavigator,
} from 'react-navigation';
import SignedIn from './screens/SignedIn/Navigator';
import SignedOut from './screens/SignedOut/Navigator';

const createRootNavigator = (signedIn = false) => createSwitchNavigator(
  {
    SignedIn,
    SignedOut,
  },
  {
    initialRouteName: signedIn ? 'SignedIn' : 'SignedOut',
  },
);

export default createRootNavigator;
