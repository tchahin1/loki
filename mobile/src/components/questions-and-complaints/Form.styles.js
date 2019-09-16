import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Colors from '../../assets/colors/AppColorsEnum';

const styles = {
  container: {
    flex: 1,
    marginTop: hp('4%'),
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  scrollContainerNoFlex: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickersContainer: {
    width: wp('97%'),
    alignSelf: 'flex-start',
    marginHorizontal: wp('1.5%'),
  },
  picker: {
    width: wp('97%'),
  },
  text: {
    width: wp('97%'),
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputsContainer: {
    width: wp('97%'),
    alignItems: 'center',
    height: hp('77%'),
  },
  textInput: {
    borderBottomWidth: 1,
    width: wp('90%'),
    height: hp('5%'),
    fontSize: 16,
    marginTop: hp('2%'),
  },
  txtInputs: {
    width: wp('97%'),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  reqText: {
    fontSize: 10,
    alignSelf: 'flex-start',
    marginLeft: wp('2%'),
    marginTop: hp('1%'),
  },
  btnReq: {
    backgroundColor: Colors.PRIMARY_BLUE,
    marginTop: hp('3%'),
    height: hp('8%'),
    width: wp('92%'),
    alignSelf: 'flex-end',
  },
  error: {
    color: Colors.NOTICE_COLOR,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  inputContainer: {
    height: hp('30%'),
    width: wp('97%'),
    alignItems: 'center',
  },
  requestTxtInput: {
    height: hp('20%'),
    width: wp('92%'),
    borderWidth: 1,
    borderColor: 'black',
    textAlignVertical: 'top',
    fontSize: 18,
    paddingLeft: 5,
  },
};

export default function createStyles(overrides = {}) {
  return StyleSheet.create({ ...styles, ...overrides });
}
