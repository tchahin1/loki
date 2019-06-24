import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Colors from '../../assets/colors/AppColorsEnum';

const styles = {
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
  txtInputContainer: {
    borderBottomWidth: 1,
    height: hp('5%'),
    width: wp('68%'),
    fontSize: 16,
  },
};

export default function createStyles(overrides = {}) {
  return StyleSheet.create({ ...styles, ...overrides });
}
