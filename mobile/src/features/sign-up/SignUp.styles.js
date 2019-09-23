import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Colors from '../../assets/colors/AppColorsEnum';

const styles = {
  wrapper: {
    flex: 1,
  },
  inputsWrapper: {
    marginRight: wp('4%'),
    marginLeft: wp('4%'),
  },
  btnSignUp: {
    backgroundColor: Colors.PRIMARY_BLUE,
    marginTop: hp('5%'),
    height: hp('8%'),
    width: wp('92%'),
  },
  btnWrapper: {
    marginRight: wp('4%'),
    marginLeft: wp('4%'),
    alignItems: 'center',
  },
  title: {
    fontSize: 60,
    color: Colors.PRIMARY_WHITE,
  },
  btnSignInTitle: {
    fontSize: 20,
    color: Colors.NOTICE_COLOR,
  },
  titleWrapper: {
    alignItems: 'center',
    marginTop: hp('15%'),
  },
  error: {
    color: Colors.NOTICE_COLOR,
    fontWeight: 'bold',
    fontSize: 18,
  },
};

export default function createStyles(overrides = {}) {
  return StyleSheet.create({ ...styles, ...overrides });
}
