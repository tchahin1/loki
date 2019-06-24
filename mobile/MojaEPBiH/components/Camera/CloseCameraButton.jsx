import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import createStyles from './CloseCameraButton.styles';

const styles = createStyles();

const CloseCameraButton = ({ closeCamera }) => (
  <TouchableOpacity style={styles.closeBtn} onPress={closeCamera}>
    <Icon name="ios-close" type="ionicon" size={45} iconStyle={styles.closeIcon} />
  </TouchableOpacity>
);


CloseCameraButton.propTypes = {
  closeCamera: PropTypes.func.isRequired,
};

export default CloseCameraButton;
