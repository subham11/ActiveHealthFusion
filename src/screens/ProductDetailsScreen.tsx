// ProductDetailsScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons';

const { width: screenWidth } = Dimensions.get('window');

// Dummy data for demonstration.
// In a real app, you would pass this data via route params or fetch from an API.
const product = {
  id: 'prod-1',
  title: 'Ultra Boost Protein Bar',
  description:
    'This protein bar is designed for fitness enthusiasts, providing a perfect blend of protein and healthy carbohydrates.',
  images: [
    require('../assets/images/HealthAndNutrition.jpeg'),
    require('../assets/images/HealthAndNutrition.jpeg'),
    require('../assets/images/HealthAndNutrition.jpeg'),
  ],
  rating: 4.5,
  comments: [
    {
      id: 'c1',
      userName: 'Alice',
      userAvatar: require('../assets/images/users/UserProfile.jpg'),
      comment: 'Great taste and perfect for my workout!',
      rating: 5,
    },
    {
      id: 'c2',
      userName: 'Bob',
      userAvatar: require('../assets/images/users/UserProfile.jpg'),
      comment: 'Good protein content and easy on the stomach.',
      rating: 4,
    },
    {
      id: 'c3',
      userName: 'Charlie',
      userAvatar: require('../assets/images/users/UserProfile.jpg'),
      comment: 'A bit expensive, but quality is top-notch.',
      rating: 4,
    },
    {
      id: 'c4',
      userName: 'Diana',
      userAvatar: require('../assets/images/users/UserProfile.jpg'),
      comment: 'My favorite post-workout snack!',
      rating: 5,
    },
    {
      id: 'c5',
      userName: 'Edward',
      userAvatar: require('../assets/images/users/UserProfile.jpg'),
      comment: 'Decent bar with a nice texture.',
      rating: 4,
    },
  ],
};

// A simple component to render star ratings.
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  // For simplicity, we'll show 5 stars; filled stars based on rating.
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
  return <View style={{ flexDirection: 'row' }}>{stars}</View>;
};

const ProductDetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // In a real app, product details might come from route.params.
  // For demo, we're using the dummy product defined above.

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBackButton} onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} style={styles.content}>
        {/* Product Image Carousel */}
        <FlatList
          data={product.images}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image source={item} style={styles.carouselImage} resizeMode="cover" />
          )}
          style={styles.carousel}
        />

        {/* Star Ratings */}
        <View style={styles.ratingContainer}>
          <StarRating rating={product.rating} />
          <Text style={styles.ratingText}>{product.rating} / 5</Text>
        </View>

        {/* Product Title & Description */}
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
        </View>

        {/* Top 5 Comments */}
        <Text style={styles.commentsHeader}>Top Reviews</Text>
        <FlatList
          data={product.comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.commentCard}>
              <Image source={item.userAvatar} style={styles.commentAvatar} />
              <View style={styles.commentInfo}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentUser}>{item.userName}</Text>
                  <StarRating rating={item.rating} />
                </View>
                <Text style={styles.commentText}>{item.comment}</Text>
              </View>
            </View>
          )}
          scrollEnabled={false}
          contentContainerStyle={styles.commentsList}
        />
      </ScrollView>

      {/* Fixed Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomButton} onPress={() => { /* Add to Cart logic */ }}>
          <Text style={styles.bottomButtonText}>Add To Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.bottomButton, styles.buyNowButton]} onPress={() => { /* Buy Now logic */ }}>
          <Text style={styles.bottomButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  headerBackButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80, // space for bottom bar
  },
  carousel: {
    height: 250,
  },
  carouselImage: {
    width: screenWidth,
    height: 250,
    // Adding a subtle shadow for 3D effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  productInfo: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
  },
  commentsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  commentsList: {
    paddingHorizontal: 12,
  },
  commentCard: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    // Shadow for comment card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  commentInfo: {
    flex: 1,
    marginLeft: 8,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentUser: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  commentText: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  bottomButton: {
    flex: 1,
    backgroundColor: '#FF4500',
    paddingVertical: 12,
    marginHorizontal: 6,
    borderRadius: 8,
    alignItems: 'center',
    // Shadow for bottom buttons
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buyNowButton: {
    backgroundColor: '#FFA500',
  },
  bottomButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
