import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Colors from '../../../assets/colors/AppColorsEnum';

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: hp('8%'),
    width: wp('95%'),
    marginTop: hp('3%'),
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btnsWrapper: {
    marginVertical: wp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    height: hp('10%'),
    width: wp('92%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: Colors.PRIMARY_WHITE,
    fontSize: 20,
  },
  notificationsMod: {
    alignSelf: 'center',
    backgroundColor: Colors.PRIMARY_WHITE,
    height: hp('10%'),
    width: wp('70%'),
    flexDirection: 'column',
  },
  signOutbtn: {
    alignSelf: 'flex-end',
    width: wp('70%'),
    height: hp('10%'),
    borderWidth: 1,
    borderColor: Colors.PRIMARY_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
};

export default function createStyles(overrides = {}) {
  return StyleSheet.create({ ...styles, ...overrides });
}
