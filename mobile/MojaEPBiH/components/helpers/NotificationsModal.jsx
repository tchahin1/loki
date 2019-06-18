import React from 'react';
import {
  Modal, Text, TouchableOpacity, View,
} from 'react-native';
import PropTypes from 'prop-types';

import createStyles from './styles/NotificationsModal.styles';

const styles = createStyles();

const NotificationsModal = (props) => {
  const {
    animationType,
    visible,
    transparent,
    onRequestClose,
    onSignOutPress,
  } = props;
  return (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={visible}
      onRequestClose={() => onRequestClose()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.notificationsMod}>
          <TouchableOpacity
            style={styles.signOutbtn}
            onPress={() => onSignOutPress()}
          >
            <Text>Odjavi se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

NotificationsModal.propTypes = {
  animationType: PropTypes.string.isRequired,
  transparent: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSignOutPress: PropTypes.func.isRequired,
};

export default NotificationsModal;
