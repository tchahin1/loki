import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Colors from '../../../assets/colors/AppColorsEnum';

const styles = {
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: Colors.PRIMARY_BLUE,
  },
  btnsWrapper: {
    marginVertical: wp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnIcon: {
    height: hp('10%'),
    width: wp('92%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: Colors.PRIMARY_WHITE,
    fontSize: 20,
  },
};

export default function createStyles(overrides = {}) {
  return StyleSheet.create({ ...styles, ...overrides });
}
