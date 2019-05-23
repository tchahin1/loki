import { StyleSheet } from 'react-native';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {
    width: 24,
    height: 24,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  contentContainer: {
    paddingTop: 30,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
};

export default function createStyles(overrides = {}) {
  return StyleSheet.create({ ...styles, ...overrides });
}
