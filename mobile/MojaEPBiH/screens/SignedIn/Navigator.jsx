import { createDrawerNavigator } from 'react-navigation';
import HomeScreen from './Home';

const SignedInNavigator = createDrawerNavigator({
  Home: HomeScreen,
},
{
  initialRouteName: 'Home',
});


export default SignedInNavigator;
