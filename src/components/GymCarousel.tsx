// GymCarousel.tsx
import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAward } from '@fortawesome/free-solid-svg-icons';

//import { CAROUSEL_DATA } from '../data'; // the 5-card array
const CAROUSEL_DATA = [
    {
      id: '1',
      title: 'BEST GYM',
      image: require('../assets/images/gym_01.png'),
      rating: 'CLEAN\nGOOD EQUIPMENT\nADVANCED TRAINERS',
    },
    {
      id: '2',
      title: 'BEST GYM',
      image: require('../assets/images/gym_01.png'),
      rating: 'CLEAN\nGOOD EQUIPMENT\nADVANCED TRAINERS',
    },
    {
      id: '3',
      title: 'BEST GYM',
      image: require('../assets/images/gym_01.png'),
      rating: 'CLEAN\nGOOD EQUIPMENT\nADVANCED TRAINERS',
    },
    {
      id: '4',
      title: 'BEST GYM',
      image: require('../assets/images/gym_01.png'),
      rating: 'CLEAN\nGOOD EQUIPMENT\nADVANCED TRAINERS',
    },
    {
      id: '5',
      title: 'BEST GYM',
      image: require('../assets/images/gym_01.png'),
      rating: 'CLEAN\nGOOD EQUIPMENT\nADVANCED TRAINERS',
    },
  ];
const { width: screenWidth } = Dimensions.get('window');

const CARD_WIDTH = Math.round(screenWidth * 0.7);  // Each card ~70% of screen width
const CARD_HEIGHT = Math.round(CARD_WIDTH * 1.4); // Adjust height to your design

// Scroll interpolator for fade effect
const scrollInterpolator = (index: number, carouselProps: any) => {
  const range = [index - 1, index, index + 1];
  const inputRange = range;
  const outputRange = range; // We just pass them along
  return { inputRange, outputRange };
};

// Slide interpolation for fade
const animatedStyles = (index: number, animatedValue: any, carouselProps: any) => {
  const opacity = animatedValue.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.3, 1, 0.3],
    extrapolate: 'clamp',
  });

  return { opacity };
};

const GymCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.cardContainer}>
        {/* "Medal" Icon in the top-left corner */}
        <View style={styles.medalWrapper}>
          <FontAwesomeIcon icon={faAward} size={30} color="#f39c12" />
          {/* Could also overlay a "1" or text if you want. */}
        </View>

        {/* Main image */}
        <Image source={item.image} style={styles.cardImage} resizeMode="cover" />

        {/* Title & bullet points */}
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.rating}>{item.rating}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={CAROUSEL_DATA}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={CARD_WIDTH}
        onSnapToItem={(index) => setActiveSlide(index)}
        // Fade animation:
        scrollInterpolator={scrollInterpolator}
        slideInterpolatedStyle={animatedStyles}
        useScrollView={true} // optionally use a normal ScrollView
      />

      {/* Pagination Dots */}
      <Pagination
        dotsLength={CAROUSEL_DATA.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.8}
      />
    </View>
  );
};

export default GymCarousel;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 12,
    // Optional shadow:
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
    position: 'relative',
  },
  medalWrapper: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 2,
  },
  cardImage: {
    width: '100%',
    height: '50%', // top half for the image
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 4,
  },
  rating: {
    fontSize: 14,
    color: '#333',
    // multiline bullet points or text
  },
  paginationContainer: {
    marginTop: 10,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#f39c12',
  },
  inactiveDotStyle: {
    backgroundColor: '#ccc',
  },
});
