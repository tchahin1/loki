import React from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';
import createStyles from './LargeActivityIndicator.styles';

const styles = createStyles();

const LargeActivityIndicator = () => (
  <View style={styles.loading} pointerEvents="none">
    <ActivityIndicator size={60} color="white" />
  </View>
);

export default LargeActivityIndicator;
