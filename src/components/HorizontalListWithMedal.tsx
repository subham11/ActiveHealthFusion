import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// Choose an icon that looks like a medal or award
import { faAward } from '@fortawesome/free-solid-svg-icons';

const data = [
  {
    id: '1',
    image: require('../assets/images/users/Doc_01.jpg'),
    label: 'BEST NUTRITIONIST',
  },
  {
    id: '2',
    image: require('../assets/images/users/Doc_01.jpg'),
    label: 'BEST NUTRITIONIST',
  },
  {
    id: '3',
    image: require('../assets/images/users/Doc_01.jpg'),
    label: 'BEST NUTRITIONIST',
  },
  {
    id: '4',
    image: require('../assets/images/users/Doc_01.jpg'),
    label: 'BEST NUTRITIONIST',
  },
  {
    id: '5',
    image: require('../assets/images/users/Doc_01.jpg'),
    label: 'BEST NUTRITIONIST',
  },
];

const ITEM_WIDTH = 120; // Adjust as needed
const ITEM_HEIGHT = 160; // Adjust as needed

const HorizontalListWithMedal: React.FC = () => {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.itemContainer} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        {/* Rounded Rectangle Image */}
        <Image source={item.image} style={styles.image} resizeMode="cover" />
        {/* Medal Icon in top-left corner */}
        <View style={styles.medalIconWrapper}>
          <FontAwesomeIcon icon={faAward} size={24} color="#f1c40f" />
          {/* Optional: you could overlay a number "1" in top-left, 
              but you'd typically do that with a small text on top of the medal */}
        </View>
      </View>
      <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      horizontal
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.flatListContent}
    />
  );
};

export default HorizontalListWithMedal;

const styles = StyleSheet.create({
  flatListContent: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    marginRight: 16,
  },
  imageContainer: {
    position: 'relative',
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 12, // Round corners
    overflow: 'hidden',
    backgroundColor: '#eee', // Fallback background
  },
  image: {
    width: '100%',
    height: '100%',
  },
  medalIconWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 4, // Some padding so the icon isn't flush with the edges
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});
