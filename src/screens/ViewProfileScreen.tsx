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
  Dimensions 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons';

const { width } = Dimensions.get('window');

interface TrainerProfile {
  id: string;
  username: string;
  fullName: string;
  rating: number;
  shortDescription: string;
  detailedDescription?: string;
  profileImage: any; // e.g., require('../assets/images/Image_01.jpeg')
}

interface RouteParams {
  trainer: TrainerProfile;
}

const ViewProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { trainer } = route.params as RouteParams;

  const renderStarRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          size={16}
          color={i <= Math.floor(rating) ? '#FFB300' : '#ccc'}
          style={{ marginRight: 2 }}
        />
      );
    }
    return <View style={styles.starContainer}>{stars}</View>;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trainer Profile</Text>
      </View>
      
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
    paddingBottom: 40, // extra padding for bottom space
  },
  profileImage: {
    width: width * 0.9,
    height: 200,
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 16,
    // Shadow styling for a 3D effect
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
});
