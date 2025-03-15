import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const CAROUSEL_HEIGHT = 350;

const images = [
  require('../assets/images/Image_01.jpeg'),
  require('../assets/images/Image_02.jpeg'),
  require('../assets/images/Image_03.jpeg'),
  require('../assets/images/Image_04.jpeg'),
];

const FADE_DURATION = 500;       // Duration for fade in/out in ms
const INTERVAL_DURATION = 3000;    // Time between auto-slide in ms

const FadeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const flatListRef = useRef<FlatList>(null);

  // Auto-advance timer: clears and restarts when currentIndex changes.
  useEffect(() => {
    const timer = setInterval(() => {
      autoScroll();
    }, INTERVAL_DURATION);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const autoScroll = () => {
    // Fade out the current view
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: FADE_DURATION,
      useNativeDriver: true,
    }).start(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      // Fade in the new view
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: FADE_DURATION,
        useNativeDriver: true,
      }).start();
    });
  };

  // When the user swipes manually, update the index and reset opacity.
  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / screenWidth);
    setCurrentIndex(index);
    fadeAnim.setValue(1);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={{ width: screenWidth, height: CAROUSEL_HEIGHT }}>
      <Image source={item} style={styles.image} resizeMode="cover" />
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        renderItem={renderItem}
        style={{ opacity: fadeAnim }}
      />
      <View style={styles.dotContainer}>
        {images.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, { opacity: i === currentIndex ? 1 : 0.4 }]}
          />
        ))}
      </View>
    </View>
  );
};

export default FadeCarousel;

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: CAROUSEL_HEIGHT,
    backgroundColor: '#eee',
  },
  image: {
    width: screenWidth,
    height: CAROUSEL_HEIGHT,
  },
  dotContainer: {
    position: 'absolute',
    bottom: 10,
    width: screenWidth,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 4,
  },
});
