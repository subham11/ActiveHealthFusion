// AnimatedTitle.tsx
import React, { useRef, useEffect } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';

interface AnimatedTitleProps {
  text: string;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ text }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in on mount
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // If you also want to fade out on unmount, do something like:
    // return () => {
    //   Animated.timing(fadeAnim, {
    //     toValue: 0,
    //     duration: 800,
    //     useNativeDriver: true,
    //   }).start();
    // };

  }, [fadeAnim]);

  return (
    <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
      {text}
    </Animated.Text>
  );
};

export default AnimatedTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
