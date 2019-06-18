import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = {
  cameraBtn: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: hp('13%'),
    height: hp('13%'),
    borderRadius: 100 / 2,
    marginBottom: hp('3%'),
  },
};

export default function createStyles(overrides = {}) {
  return StyleSheet.create({ ...styles, ...overrides });
}
