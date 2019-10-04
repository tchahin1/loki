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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    width: wp('60%'),
    height: hp('6%'),
  },
  firstPart: {
    flex: 1,
    marginHorizontal: hp('2%'),
    marginTop: wp('4%'),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: wp('4%'),
    marginTop: hp('2%'),
  },
  metricPlacesContainer: {
    flex: 1 / 3,
    borderWidth: 1,
    marginHorizontal: hp('1%'),
    marginVertical: wp('4%'),
    height: hp('100%'),
  },
  btnReq: {
    backgroundColor: 'gray',
    marginTop: hp('0%'),
    marginHorizontal: wp('1%'),
    height: hp('8%'),
  },
};

export default function createStyles(overrides = {}) {
  return StyleSheet.create({ ...styles, ...overrides });
}
