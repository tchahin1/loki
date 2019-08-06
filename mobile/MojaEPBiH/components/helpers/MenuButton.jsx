import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import Colors from '../../assets/colors/AppColorsEnum';

const MenuButton = props => (
  <TouchableOpacity onPress={() => props.onPress()}>
    <Icon
      name="ios-menu"
      type="ionicon"
      color={Colors.PRIMARY_WHITE}
      size={30}
    />
  </TouchableOpacity>
);

MenuButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default MenuButton;
