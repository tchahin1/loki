import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements/src/index';
import PropTypes from 'prop-types';

import createStyles from './TakePhotoButton.styles';

const styles = createStyles();

const TakePhotoButton = ({ takePicture }) => (
  <TouchableOpacity style={styles.cameraBtn} onPress={takePicture}>
    <Icon name="ios-camera" type="ionicon" size={45} />
  </TouchableOpacity>
);


TakePhotoButton.propTypes = {
  takePicture: PropTypes.func.isRequired,
};

export default TakePhotoButton;
