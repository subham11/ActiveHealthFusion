// GradientBackground.tsx
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

interface GradientBackgroundProps {
  children?: React.ReactNode;
  style?: any;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={['#FF5349','#FFA500', '#FF0000']} // Example gradient colors
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        {children}
      </LinearGradient>
    </View>
  );
};

export default GradientBackground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    width: width,
  },
});
