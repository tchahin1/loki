import { StyleSheet } from 'react-native';
import Colors from '../../assets/colors/AppColorsEnum';

const styles = {
  header: {
    backgroundColor: Colors.PRIMARY_BLUE,
  },
  title: {
    color: Colors.PRIMARY_WHITE,
  },
};

export default function createStyles(overrides = {}) {
  return StyleSheet.create({ ...styles, ...overrides });
}
