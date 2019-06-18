import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import createStyles from './SavePhotoButton.styles';

const styles = createStyles();

const SavePhotoButton = ({ savePhoto }) => (
  <TouchableOpacity style={styles.cameraBtn} onPress={savePhoto}>
    <Icon name="check" type="entypo" size={35} />
  </TouchableOpacity>
);


SavePhotoButton.propTypes = {
  savePhoto: PropTypes.func.isRequired,
};

export default SavePhotoButton;
