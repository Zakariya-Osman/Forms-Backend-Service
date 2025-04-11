import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface IconSymbolProps {
  name: string;
  size?: number;
  color?: string;
}

const IconSymbol: React.FC<IconSymbolProps> = ({ name, size = 24, color = 'black' }) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name={name} size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IconSymbol;