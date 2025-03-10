import React from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
// Example: using Ionicons from Expo; you can use any icon library you prefer
// import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Sample data array
// Replace the imageUrl with your own image links
const data = [
  { id: '1', imageUrl: require('../assets/images/Profile.jpg') },
  { id: '2', imageUrl: require('../assets/images/Profile.jpg') },
  { id: '3', imageUrl: require('../assets/images/Profile.jpg') },
  { id: '4', imageUrl: require('../assets/images/Profile.jpg') },
  { id: '5', imageUrl: require('../assets/images/Profile.jpg') },
];

const HorizontalProfileList = () => {
    // Renders each circular image with an overlaid trophy icon
    const renderItem = ({ item }: { item: { id: string; imageUrl: string } }) => (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.circularImage} />
        {/* <Ionicons name="trophy" size={32} color="gold" style={styles.trophyIcon} /> */}
      </View>
    );
  
    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    );
  };
  
  export default HorizontalProfileList;

  const styles = StyleSheet.create({
    listContent: {
      // Add padding or margin to your horizontal list as needed
      paddingHorizontal: 16,
    },
    itemContainer: {
      width: 100,
      height: 100,
      marginRight: 16,
      position: 'relative', // Important for absolute-positioned icon
      alignItems: 'center',
      justifyContent: 'center',
    },
    circularImage: {
      width: '100%',
      height: '100%',
      borderRadius: 50, // half of width/height for a circle
    },
    trophyIcon: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      // Optional: add some offset or styling
    },
  });
  