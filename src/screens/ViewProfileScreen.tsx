// ViewProfileScreen.tsx
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faCamera,
  faImages,
  faVideo,
  faClone,
  faStar
} from '@fortawesome/free-solid-svg-icons'; // Example icons
import { TrainerProfile, TrainerMediaItem } from '../types/TrainerProfile'; // or inline define
import { DUMMY_MEDIA } from '../types/TrainerMediaItem';

const { width } = Dimensions.get('window');
const GRID_ITEM_SIZE = (width - 48) / 3; // e.g. 3 columns with some padding

const ViewProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Assume route.params.trainer has a media array:
  const { trainer } = route.params as {
    trainer: TrainerProfile & { media?: TrainerMediaItem[] };
  };

  const renderStarRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar} // or faStar if you prefer
          size={16}
          color={i <= Math.floor(rating) ? '#FFB300' : '#ccc'}
          style={{ marginRight: 2 }}
        />
      );
    }
    return <View style={styles.starContainer}>{stars}</View>;
  };

  // Decide which icon to show in top-left based on media type
  const getOverlayIcon = (type: string) => {
    switch (type) {
      case 'singleImage':
        return faCamera;         // Single image icon
      case 'multipleImages':
        return faImages;         // Multiple images icon
      case 'singleVideo':
        return faVideo;          // Single video icon
      case 'multipleVideos':
        // Example: a 'clone' icon or something to indicate multiple
        return faClone;          
      default:
        return faCamera;
    }
  };

  const renderMediaItem = ({ item }: { item: TrainerMediaItem }) => {
    const overlayIcon = getOverlayIcon(item.type);
    return (
      <TouchableOpacity style={styles.mediaItem} onPress={() => {
        // Handle media item tap, e.g. open gallery or video
      }}>
        <Image source={item.thumbnail} style={styles.mediaImage} />
        <View style={styles.overlayIconContainer}>
          <FontAwesomeIcon icon={overlayIcon} size={16} color="#fff" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trainer Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Image */}
        {trainer.profileImage && (
          <Image
            source={trainer.profileImage}
            style={styles.profileImage}
            resizeMode="cover"
          />
        )}
        <Text style={styles.fullName}>{trainer.fullName}</Text>
        <Text style={styles.username}>@{trainer.username}</Text>
        {renderStarRating(trainer.rating)}
        <Text style={styles.shortDescription}>{trainer.shortDescription}</Text>

        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>About Trainer</Text>
          <Text style={styles.sectionContent}>
            {trainer.detailedDescription || 'No additional details available.'}
          </Text>
        </View>
        <Text>{`Demo Data :${trainer?.media?.length}`}</Text>
        {/* Media Grid */}
        {trainer.media && trainer.media.length > 0 && (
          <View style={styles.mediaGridSection}>
            <Text style={styles.sectionTitle}>Photos & Videos</Text>
            <FlatList
              data={trainer.media}
              keyExtractor={(item) => item.id}
              renderItem={renderMediaItem}
              numColumns={3}
              scrollEnabled={false} // let parent ScrollView handle scrolling
              contentContainerStyle={styles.mediaGrid}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 40, // extra padding
  },
  profileImage: {
    width: width * 0.9,
    height: 200,
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 16,
    // Shadow styling
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  fullName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  shortDescription: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 16,
  },
  detailsSection: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  /****************************
   * Media Grid
   ****************************/
  mediaGridSection: {
    marginTop: 16,
  },
  mediaGrid: {
    paddingVertical: 8,
  },
  mediaItem: {
    width: GRID_ITEM_SIZE,
    height: GRID_ITEM_SIZE,
    marginRight: 8,
    marginBottom: 8,
    position: 'relative',
    backgroundColor: '#eee',
    borderRadius: 6,
    overflow: 'hidden',
  },
  mediaImage: {
    width: '100%',
    height: '100%',
  },
  overlayIconContainer: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 4,
  },
});
