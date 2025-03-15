import React, { useRef, useState, useEffect } from 'react';
import { View, Animated, StyleSheet, TouchableOpacity, Image } from 'react-native';

const images = [
  require('../assets/images/Image_01.jpeg'),
  require('../assets/images/Image_02.jpeg'),
  require('../assets/images/Image_03.jpeg'),
  require('../assets/images/Image_04.jpeg'),
];

const FADE_DURATION = 500;     // Fade in/out duration in ms
const INTERVAL_DURATION = 5000;  // Time between slides in ms

const FadeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const intervalId = setInterval(() => {
      fadeOutAndNext();
    }, INTERVAL_DURATION);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const fadeOutAndNext = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: FADE_DURATION,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: FADE_DURATION,
        useNativeDriver: true,
      }).start();
    });
  };

  const handlePress = () => {
    fadeOutAndNext();
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.9} style={{width
        : '100%', height: '100%'
      }}>
        <Image
          source={images[currentIndex]}
          style={styles.image}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* Dots for pagination */}
      <View style={styles.dotContainer}>
        {images.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { opacity: i === currentIndex ? 1 : 0.4 },
            ]}
          />
        ))}
      </View>
    </Animated.View>
  );
};

export default FadeCarousel;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 250, // Adjust as needed
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  dotContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 4,
  },
});
