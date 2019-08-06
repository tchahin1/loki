import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Colors from '../../assets/colors/AppColorsEnum';

const styles = {
  container: {
    flex: 2 / 3,
    marginHorizontal: hp('1%'),
    marginVertical: wp('4%'),
    borderWidth: 1,
    justifyContent: 'space-around',
  },
  inputsWrapper: {
    marginVertical: wp('2%'),
    marginHorizontal: hp('3%'),
    justifyContent: 'space-around',
  },
  btnsWrapper: {
    flexDirection: 'row',
    marginVertical: wp('6%'),
    marginTop: hp('2%'),
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
    marginTop: hp('2%'),
    marginLeft: wp('5%'),
  },
  btnSave: {
    height: hp('6%'),
    width: wp('35%'),
    borderWidth: 2,
    backgroundColor: Colors.PRIMARY_WHITE,
    borderColor: Colors.PRIMARY_BLUE,
    borderRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2%'),
    marginLeft: wp('12%'),
    elevation: 3,
  },
  btnTxt: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  txtInput: {
    height: hp('7%'),
    width: wp('38%'),
    textAlign: 'center',
    fontSize: 22,
    borderColor: 'black',
    borderBottomWidth: 1,
    paddingLeft: wp('2%'),
  },
  vtInput: {
    marginTop: hp('8%'),
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1 / 2,
    justifyContent: 'space-around',
  },
  mtInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1 / 2,
    justifyContent: 'space-around',
    marginTop: hp('12%'),
  },
  labelInput: {
    width: wp('30%'),
    fontSize: 18,
    fontWeight: 'bold',
  },
  err: {
    color: Colors.NOTICE_COLOR,
    marginTop: hp('1%'),
    textAlign: 'center',
  },
};

export default function createStyles(overrides = {}) {
  return StyleSheet.create({ ...styles, ...overrides });
}
