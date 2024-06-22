import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { GlobalTheme } from '../../themes/constants';

function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalTheme.colors.primary700,
  },
});
