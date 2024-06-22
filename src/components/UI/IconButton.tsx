import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import FontAwesomeIcons from '../FontAwesomeIcons';

interface IconButtonProps {
  icon: string;
  size: number;
  color?: string;
  onPress: () => void;
}

function IconButton({ icon, size, color, onPress }: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}>
      <View style={styles.buttonContainer}>
        <FontAwesomeIcons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});
