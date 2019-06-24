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
  header: {
    backgroundColor: Colors.PRIMARY_BLUE,
  },
  title: {
    color: Colors.PRIMARY_WHITE,
  },
  firstPart: {
    flex: 1,
    marginHorizontal: hp('2%'),
    marginTop: wp('4%'),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  container: {
    flex: 2 / 3,
    marginHorizontal: hp('2%'),
    marginVertical: wp('4%'),
    borderWidth: 1,
    justifyContent: 'space-around',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: wp('4%'),
    marginTop: hp('6%'),
  },
  picker: {
    width: wp('60%'),
    height: hp('6%'),
  },
  metricPlacesContainer: {
    flex: 1 / 3,
    borderWidth: 1,
    marginHorizontal: hp('2%'),
    marginVertical: wp('4%'),
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
};

export default function createStyles(overrides = {}) {
  return StyleSheet.create({ ...styles, ...overrides });
}
