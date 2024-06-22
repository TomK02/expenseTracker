import React, { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { GlobalTheme } from '../../themes/constants';

interface ButtonProps extends PropsWithChildren {
  style?: ViewStyle;
  mode?: 'flat';
  onPress: () => void;
}

function Button({ mode, style, onPress, children }: ButtonProps) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}>
        <View style={[styles.button, mode === 'flat' && styles.flat]}>
          <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalTheme.colors.primary500,
  },
  flat: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  flatText: {
    color: GlobalTheme.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalTheme.colors.primary100,
    borderRadius: 4,
  },
});
