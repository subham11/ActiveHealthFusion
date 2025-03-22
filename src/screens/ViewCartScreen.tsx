// ViewCartScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// Define a type for a product item.
// Make sure your marketplaceData.ts uses a matching interface.
interface ProductItem {
  id: string;
  title: string;
  image: any;
  price: number;
}

// Define the route parameters for ViewCartScreen.
interface ViewCartRouteParams {
  cartItems: ProductItem[];
}

const ViewCartScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // Extract cartItems from route parameters.
  const { cartItems } = route.params as ViewCartRouteParams;

  // Calculate the total price.
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  // Render each cart item.
  const renderCartItem = ({ item }: { item: ProductItem }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.cartItemImage} />
      <View style={styles.cartItemInfo}>
        <Text style={styles.cartItemTitle}>{item.title}</Text>
        <Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      {/* Cart Items List */}
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={renderCartItem}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* Footer with total price and checkout button */}
      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => {
              // Handle checkout here.
            }}
          >
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ViewCartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
  listContent: {
    padding: 12,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    // 3D shadow styling
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  cartItemInfo: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  cartItemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  cartItemPrice: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#FF4500',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
