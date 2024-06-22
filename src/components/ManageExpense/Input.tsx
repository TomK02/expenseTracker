import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { GlobalTheme } from '../../themes/constants';

interface InputProps {
  label: string;
  textInputConfig?: TextInputProps;
  style?: ViewStyle;
  invalid?: boolean;
}

function Input({ label, textInputConfig, style, invalid }: InputProps) {
  let inputStyles: StyleProp<TextStyle> = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalTheme.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalTheme.colors.primary100,
    color: GlobalTheme.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: GlobalTheme.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalTheme.colors.error50,
  },
});
