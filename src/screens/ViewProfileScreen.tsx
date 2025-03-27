// ViewProfileScreen.tsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faCamera,
  faImages,
  faVideo,
  faClone,
} from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';

// Example types (adjust as needed)
type MediaType = 'singleImage' | 'multipleImages' | 'singleVideo' | 'multipleVideos';
interface TrainerMediaItem {
  id: string;
  type: MediaType;
  thumbnail: any; // local require(...) or remote URI
  // Possibly images?: any[]; videos?: any[];
}

interface TrainerProfile {
  id: string;
  username: string;
  fullName: string;
  rating: number;
  shortDescription: string;
  detailedDescription?: string;
  profileImage?: any;
  media?: TrainerMediaItem[];
}

const { width } = Dimensions.get('window');
const GRID_ITEM_SIZE = (width - 48) / 3; // for a 3-column layout

const ViewProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Expecting route.params.trainer to be passed in
  const { trainer } = route.params as { trainer: TrainerProfile };

  // Example star rating function
  const renderStarRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={/* or faStar if you prefer */ faCamera}
          size={16}
          color={i <= Math.floor(rating) ? '#FFB300' : '#ccc'}
          style={{ marginRight: 2 }}
        />
      );
    }
    return <View style={styles.starContainer}>{stars}</View>;
  };

  // Choose an icon based on media type
  const getOverlayIcon = (type: MediaType) => {
    switch (type) {
      case 'singleImage':
        return faCamera;
      case 'multipleImages':
        return faImages;
      case 'singleVideo':
        return faVideo;
      case 'multipleVideos':
        return faClone;
      default:
        return faCamera;
    }
  };

  // Render each media item in a grid
  const renderMediaItem = ({ item }: { item: TrainerMediaItem }) => {
    const overlayIcon = getOverlayIcon(item.type);
    return (
      <TouchableOpacity
        style={styles.mediaItem}
        onPress={() => {
          // Navigate to MediaDetails (or handle directly)
          navigation.navigate('MediaDetails', { mediaItem: item });
        }}
      >
        <Image source={item.thumbnail} style={styles.mediaImage} />
        <View style={styles.overlayIconContainer}>
          <FontAwesomeIcon icon={overlayIcon} size={16} color="#fff" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    // Wrap the entire screen in a LinearGradient
    <LinearGradient
      colors={['#FF5349', '#FFA500']}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon={faArrowLeft} size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Trainer Profile</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Profile Image */}
          {trainer.profileImage && (
            <View style={styles.profileImageContainer}>
              <Image
                source={trainer.profileImage}
                style={styles.profileImage}
                resizeMode="cover"
              />
            </View>
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

            {/* Demo data */}
            <Text style={styles.demoDataText}>Demo Data :5</Text>
          </View>

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
          <FlatList
          data={trainer?.videos}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.videoContainer}>
              {/* 
                If item.videoUrl is a local require(...) or remote URI, 
                pass it to react-native-video:
              */}
              <Video
                source={item.videoUrl} // e.g. require('../assets/videos/video.mp4') or { uri: 'https://...' }
                style={styles?.video}
                controls
                resizeMode="contain"
              />
              {/* Optional: If you want a thumbnail preview, you'd conditionally render an <Image> 
                  or set a poster in react-native-video. 
                  For example, poster={item.thumbnail} posterResizeMode="cover" 
              */}
            </View>
          )}
          // Additional styling if you want e.g. spacing between videos
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ViewProfileScreen;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  videoContainer: {
    width: width * 0.9, // each video takes full screen width
    height: 250,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    // No border bottom since we have a gradient background
    backgroundColor: 'transparent',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // White text to contrast the gradient
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 40, // extra padding
  },
  profileImageContainer: {
    alignSelf: 'center',
    width: '90%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    // Shadow for the profile image
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  fullName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff', // White text for contrast
    textAlign: 'center',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: '#fff',
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
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  detailsSection: {
    marginVertical: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 12,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  demoDataText: {
    marginTop: 6,
    fontSize: 14,
    color: '#fff',
  },
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
    borderRadius: 8,
    overflow: 'hidden',
    // Shadow styling
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
    backgroundColor: '#fff',
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
