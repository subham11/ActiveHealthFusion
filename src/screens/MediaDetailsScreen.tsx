// MediaDetailsScreen.tsx
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// If using react-native-video, import Video from 'react-native-video';

const { width, height } = Dimensions.get('window');

type MediaType = 'singleImage' | 'multipleImages' | 'singleVideo' | 'multipleVideos';

// Example extension of TrainerMediaItem with possible extra fields
interface TrainerMediaItem {
  id: string;
  type: MediaType;
  thumbnail: any;       // The main thumbnail
  images?: any[];       // For multipleImages
  videos?: any[];       // For multipleVideos
  // For singleVideo, you might have videoUrl?: string
  // For singleImage, you might just rely on thumbnail
}

const MediaDetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // We assume route.params.mediaItem is the item passed from ViewProfileScreen
  const { mediaItem } = route.params as { mediaItem: TrainerMediaItem };

  // Renders a single image full-screen
  const renderSingleImage = () => {
    return (
      <View style={styles.centeredContainer}>
        <Image source={mediaItem.thumbnail} style={styles.fullMedia} resizeMode="contain" />
      </View>
    );
  };

  // Renders multiple images in a horizontal scroll or carousel
  const renderMultipleImages = () => {
    if (!mediaItem.images || mediaItem.images.length === 0) {
      // fallback: if none provided, just show the thumbnail
      return renderSingleImage();
    }
    return (
      <FlatList
        data={mediaItem.images}
        keyExtractor={(item, index) => `img-${index}`}
        horizontal
        pagingEnabled
        renderItem={({ item: img }) => (
          <View style={styles.centeredContainer}>
            <Image source={img} style={styles.fullMedia} resizeMode="contain" />
          </View>
        )}
      />
    );
  };

  // Renders a single video
  // For a real solution, you'd use react-native-video or a webview, etc.
  const renderSingleVideo = () => {
    return (
      <View style={styles.centeredContainer}>
        {/* 
          If using react-native-video:
            <Video
              source={mediaItem.videoUrl}
              style={styles.fullMedia}
              controls
              resizeMode="contain"
            />
        */}
        <Image source={mediaItem.thumbnail} style={styles.fullMedia} />
        <Text style={styles.demoText}>
          (Demo) Single video placeholder - you might use react-native-video here
        </Text>
      </View>
    );
  };

  // Renders multiple videos in a horizontal carousel
  const renderMultipleVideos = () => {
    if (!mediaItem.videos || mediaItem.videos.length === 0) {
      // fallback
      return renderSingleVideo();
    }
    return (
      <FlatList
        data={mediaItem.videos}
        keyExtractor={(item, index) => `vid-${index}`}
        horizontal
        pagingEnabled
        renderItem={({ item: vid }) => (
          <View style={styles.centeredContainer}>
            {/* 
              For a real solution with react-native-video:
                <Video source={vid.videoUrl} style={styles.fullMedia} controls />
            */}
            <Image source={vid.thumbnail} style={styles.fullMedia} />
            <Text style={styles.demoText}>
              (Demo) Video placeholder
            </Text>
          </View>
        )}
      />
    );
  };

  // Decide which rendering function to use
  const renderMediaContent = () => {
    switch (mediaItem.type) {
      case 'singleImage':
        return renderSingleImage();
      case 'multipleImages':
        return renderMultipleImages();
      case 'singleVideo':
        return renderSingleVideo();
      case 'multipleVideos':
        return renderMultipleVideos();
      default:
        return <Text>Unknown media type</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Media Details</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderMediaContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MediaDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
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
  centeredContainer: {
    width: width,
    height: height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullMedia: {
    width: width,
    height: '100%',
  },
  demoText: {
    position: 'absolute',
    bottom: 20,
    fontSize: 16,
    color: '#333',
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 8,
    borderRadius: 4,
  },
});
