import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { IconProps } from 'react-native-vector-icons/Icon';

function FontAwesomeIcons(
  props: React.JSX.IntrinsicAttributes &
    React.JSX.IntrinsicClassAttributes<Icon> &
    Readonly<IconProps>,
) {
  return <Icon {...props} />;
}

export default FontAwesomeIcons;
