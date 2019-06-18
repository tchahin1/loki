import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Colors from '../../../assets/colors/AppColorsEnum';

const styles = {
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
