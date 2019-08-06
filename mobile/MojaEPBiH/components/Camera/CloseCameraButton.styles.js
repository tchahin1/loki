import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Colors from '../../assets/colors/AppColorsEnum';

const styles = {
  closeBtn: {
    alignSelf: 'flex-start',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: hp('7%'),
    height: hp('7%'),
    borderRadius: 100 / 2,
    marginTop: hp('5%'),
    left: wp('85%'),
  },
  closeIcon: {
    color: Colors.PRIMARY_WHITE,
  },
};

export default function createStyles(overrides = {}) {
  return StyleSheet.create({ ...styles, ...overrides });
}
