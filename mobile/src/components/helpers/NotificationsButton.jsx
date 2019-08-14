import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements/src/index';
import PropTypes from 'prop-types';
import Colors from '../../assets/colors/AppColorsEnum';

const NotificationsButton = props => (
  <TouchableOpacity onPress={() => props.onPress()}>
    <Icon
      type="ionicon"
      name="ios-notifications"
      color={Colors.NOTICE_COLOR}
      size={30}
    />
  </TouchableOpacity>
);

NotificationsButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default NotificationsButton;
