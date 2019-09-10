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
  title: {
    color: Colors.PRIMARY_WHITE,
  },
  wrapper: {
    flex: 1,
  },
  sliderContainer: {
    flex: 1 / 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: wp('1%'),
    paddingLeft: wp('1.5%'),
  },
  slider: {
    width: wp('15%'),
    height: hp('15%'),
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtInputContainer: {
    flex: 1 / 2,
    width: wp('97%'),
    borderWidth: 1,
    marginHorizontal: wp('1.5%'),
    height: hp('97%'),
  },
  txtInput: {
    fontSize: 19,
    marginHorizontal: wp('1%'),
    textAlignVertical: 'top',
    width: wp('100%'),
    height: hp('100%'),
  },
  btnsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1 / 4,
    alignItems: 'center',
    paddingHorizontal: hp('1%'),
  },
  btnIcon: {
    height: hp('6%'),
    width: wp('15%'),
    borderWidth: 2,
    borderColor: Colors.PRIMARY_BLUE,
    borderRadius: 1,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSend: {
    height: hp('6%'),
    width: wp('35%'),
    borderWidth: 2,
    backgroundColor: Colors.PRIMARY_WHITE,
    borderColor: Colors.PRIMARY_BLUE,
    borderRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  btnTxt: {
    fontSize: 17,
    fontWeight: 'bold',
  },
};

export default function createStyles(overrides = {}) {
  return StyleSheet.create({ ...styles, ...overrides });
}
