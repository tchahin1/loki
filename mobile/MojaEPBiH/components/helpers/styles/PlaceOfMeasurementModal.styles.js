import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Colors from '../../../assets/colors/AppColorsEnum';

const styles = {
  label: {
    marginTop: hp('2%'),
    fontSize: 16,
  },
  modalBtn: {
    height: hp('5%'),
    width: wp('30%'),
    borderWidth: 2,
    backgroundColor: 'white',
    borderColor: Colors.PRIMARY_BLUE,
    borderRadius: 1,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: 'white',
    height: hp('48%'),
    width: wp('85%'),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    width: wp('85%'),
    marginTop: hp('1%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: wp('2%'),
  },
  txtInput: {
    borderBottomWidth: 1,
    height: hp('5%'),
    width: wp('80%'),
    fontSize: 16,
  },
};

export default function createStyles(overrides = {}) {
  return StyleSheet.create({ ...styles, ...overrides });
}
