import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Colors from '../../assets/colors/AppColorsEnum';

const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  placeOfMeasurementModal: {
    alignSelf: 'center',
    backgroundColor: Colors.PRIMARY_WHITE,
    height: hp('45%'),
    width: wp('85%'),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    height: hp('30%'),
    width: wp('85%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    height: hp('5%'),
    width: wp('85%'),
    fontWeight: 'bold',
    fontSize: 19,
    textAlign: 'center',
  },
  notesTxtInput: {
    height: hp('23%'),
    width: wp('80%'),
    borderWidth: 1,
    borderColor: 'black',
    textAlignVertical: 'top',
    fontSize: 18,
  },
  btnContainer: {
    height: hp('11%'),
    width: wp('85%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btnModal: {
    height: hp('6%'),
    width: wp('30%'),
    borderWidth: 2,
    backgroundColor: Colors.PRIMARY_WHITE,
    borderColor: Colors.PRIMARY_BLUE,
    borderRadius: 1,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  btnText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
};

export default function createStyles(overrides = {}) {
  return StyleSheet.create({ ...styles, ...overrides });
}
