import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../assets/colors/AppColorsEnum';

const styles = {
  header: {
    backgroundColor: Colors.PRIMARY_BLUE,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
  },
  inputsWrapper: {
    marginRight: wp('4%'),
    marginLeft: wp('4%'),
    marginTop: hp('5%'),
    paddingTop: hp('2%'),
  },
  btnSignIn: {
    backgroundColor: Colors.PRIMARY_BLUE,
    marginTop: hp('10%'),
    height: hp('8%'),
    width: wp('100%'),
  },
  btnWrapper: {
    alignItems: 'center',
  },
  title: {
    color: Colors.PRIMARY_WHITE,
  },
  btnSignUpTitle: {
    fontSize: 20,
    color: Colors.NOTICE_COLOR,
  },
  error: {
    color: Colors.NOTICE_COLOR,
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: -50,
  },
};

export default function createStyles(overrides = {}) {
  return StyleSheet.create({ ...styles, ...overrides });
}
