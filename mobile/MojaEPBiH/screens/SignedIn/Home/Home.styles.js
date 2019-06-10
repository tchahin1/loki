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
  placeOfMeasurementMod: {
    alignSelf: 'center',
    backgroundColor: Colors.PRIMARY_WHITE,
    height: hp('48%'),
    width: wp('70%'),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    width: wp('70%'),
    marginTop: hp('1%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: wp('2%'),
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
  txtInput: {
    borderBottomWidth: 1,
    height: hp('5%'),
    width: wp('68%'),
    fontSize: 16,
  },
  label: {
    marginTop: hp('2%'),
    fontSize: 16,
  },
  modalBtn: {
    height: hp('5%'),
    width: wp('30%'),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  err: {
    color: Colors.NOTICE_COLOR,
  },

};

export default function createStyles(overrides = {}) {
  return StyleSheet.create({ ...styles, ...overrides });
}
