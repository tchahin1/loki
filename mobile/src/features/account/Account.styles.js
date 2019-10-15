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
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  tableHeader: {
    height: 50,
    backgroundColor: '#537791',
  },
  tableText: {
    textAlign: 'center',
    fontWeight: '100',
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 40,
    backgroundColor: '#E7E6E1',
  },
  firstPart: {
    flex: 1,
    marginHorizontal: hp('2%'),
    marginTop: wp('4%'),
    justifyContent: 'space-between',
    flexDirection: 'row',
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
    marginHorizontal: hp('1%'),
    marginVertical: wp('4%'),
  },
};

export default function createStyles(overrides = {}) {
  return StyleSheet.create({ ...styles, ...overrides });
}
