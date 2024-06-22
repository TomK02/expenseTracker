import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GlobalTheme } from '../../themes/constants';

interface ErrorOverlayProps {
  message: string;
}

function ErrorOverlay({ message }: ErrorOverlayProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalTheme.colors.primary700,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
