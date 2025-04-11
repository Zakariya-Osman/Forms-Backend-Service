import React from 'react';
import { View, StyleSheet } from 'react-native';

interface TabBarBackgroundProps {
  children: React.ReactNode;
}

const TabBarBackground: React.FC<TabBarBackgroundProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.background} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  background: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default TabBarBackground;