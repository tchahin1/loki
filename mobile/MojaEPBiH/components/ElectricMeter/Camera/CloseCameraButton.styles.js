import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
    color: 'white',
  },
};

export default function createStyles(overrides = {}) {
  return StyleSheet.create({ ...styles, ...overrides });
}
