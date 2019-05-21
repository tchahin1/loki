import { StyleSheet } from 'react-native';

const baseStyles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
};

export default function createStyles(overrides = {}) {
  return StyleSheet.create({ ...baseStyles, ...overrides });
}
