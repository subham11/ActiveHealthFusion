// MarketplaceScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {
  MARKETPLACE_CATEGORIES,
  MainCategory,
  SubCategory,
} from '../data/marketplaceData';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faShoppingBasket, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = 100;

const COLORS = {
  background: '#FFFFFF',
  sidebarBg: '#F8F8F8',
  orangeRed: '#FF4500',
  orange: '#FFA500',
  text: '#333',
};

type ViewMode = 'main' | 'detail';

const MarketplaceScreen = () => {
  // "main" view: left sidebar shows main categories; right panel shows subcategories of selectedCategory.
  // "detail" view: left sidebar shows subcategories of selectedCategory; right panel shows items of selectedSubCategory.
  const [viewMode, setViewMode] = useState<ViewMode>('main');
  const [selectedCategory, setSelectedCategory] = useState<MainCategory>(MARKETPLACE_CATEGORIES[0]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
  const navigation = useNavigation();

  // Track cart items
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Add item to cart
  const handleAddToCart = (item: any) => {
    setCartItems((prev) => [...prev, item]);
  };

  // Header with optional back button (visible in detail view) and a cart badge
  const renderHeader = () => (
    <View style={styles.header}>
      {viewMode === 'detail' && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            setViewMode('main');
            setSelectedSubCategory(null);
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={20} color={COLORS.text} />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>Marketplace</Text>
      <View style={styles.headerIcons}>
        {/* Notification Icon */}
        <TouchableOpacity style={styles.headerIconBtn}>
          <FontAwesomeIcon icon={faBell} size={24} color={COLORS.text} />
        </TouchableOpacity>
        {/* Cart Icon + Badge */}
        <TouchableOpacity style={[styles.headerIconBtn, { position: 'relative' }]} 
          onPress={() => navigation.navigate('ViewCart', { cartItems })}>
          <FontAwesomeIcon icon={faShoppingBasket} size={24} color={COLORS.text} />
          {cartItems.length > 0 && (
            <View style={styles.cartCountBadge}>
              <Text style={styles.cartCountText}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  // Left sidebar in main view: show main categories.
  const renderMainCategoryItem = ({ item }: { item: MainCategory }) => {
    const isActive = item.id === selectedCategory.id;
    return (
      <TouchableOpacity
        style={[styles.mainCategoryItem, isActive && styles.activeMainCategory]}
        onPress={() => {
          setSelectedCategory(item);
          setSelectedSubCategory(null);
        }}
      >
        <Image source={item.icon} style={styles.mainCategoryIcon} />
        <Text style={[styles.mainCategoryText, isActive && styles.activeMainCategoryText]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  // Left sidebar in detail view: show subcategories of the selected category.
  const renderDetailSidebarItem = ({ item }: { item: SubCategory }) => {
    const isActive = selectedSubCategory?.id === item.id;
    return (
      <TouchableOpacity
        style={[styles.detailSidebarItem, isActive && styles.activeDetailSidebarItem]}
        onPress={() => setSelectedSubCategory(item)}
      >
        {item.image ? (
          <Image source={item.image} style={styles.detailSidebarImage} />
        ) : (
          <View style={[styles.detailSidebarImage, { backgroundColor: '#ccc' }]} />
        )}
        <Text style={[styles.detailSidebarText, isActive && styles.activeDetailSidebarText]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  // In main view: right panel shows subcategories of selectedCategory.
  const renderSubCategoryItem = ({ item }: { item: SubCategory }) => (
    <TouchableOpacity
      style={styles.subCategoryItem}
      onPress={() => {
        setSelectedSubCategory(item);
        setViewMode('detail');
      }}
    >
      <View style={styles.subCategoryCircle}>
        {item.image ? (
          <Image source={item.image} style={styles.subCategoryImage} resizeMode="cover" />
        ) : (
          <View style={[styles.subCategoryImage, { backgroundColor: '#ccc' }]} />
        )}
      </View>
      <Text style={styles.subCategoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  // In detail view: right panel shows product items for the selected subcategory.
  const renderItemCard = ({ item }: { item: any }) => (
    <View style={styles.itemCard}>
      <Image source={item.image} style={styles.itemImage} resizeMode="cover" />
      <Text style={styles.itemTitle}>{item.title}</Text>
      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.addCartButton} onPress={() => handleAddToCart(item)}>
          <Text style={styles.buttonText}>Add To Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewDetailsButton} onPress={() => navigation.navigate('ProductDetails', { product: item })}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <View style={styles.contentContainer}>
        {/* Left Sidebar */}
        <View style={styles.sidebar}>
          {viewMode === 'main' ? (
            <FlatList
              data={MARKETPLACE_CATEGORIES}
              keyExtractor={(item) => item.id}
              renderItem={renderMainCategoryItem}
              contentContainerStyle={styles.sidebarList}
            />
          ) : (
            <FlatList
              data={selectedCategory.subCategories}
              keyExtractor={(item) => item.id}
              renderItem={renderDetailSidebarItem}
              contentContainerStyle={styles.sidebarList}
            />
          )}
        </View>

        {/* Right Panel */}
        <View style={styles.rightPanel}>
          {viewMode === 'main' ? (
            <FlatList
              key="main"
              data={selectedCategory.subCategories}
              keyExtractor={(item) => item.id}
              renderItem={renderSubCategoryItem}
              numColumns={3}
              contentContainerStyle={styles.subCategoryList}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <FlatList
              key="detail"
              data={selectedSubCategory?.items || []}
              keyExtractor={(item) => item.id}
              renderItem={renderItemCard}
              numColumns={2}
              contentContainerStyle={styles.itemsList}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No items available</Text>
              }
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MarketplaceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIconBtn: {
    marginLeft: 16,
    position: 'relative',
  },
  cartCountBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: 'red',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    backgroundColor: COLORS.sidebarBg,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  sidebarList: {
    paddingVertical: 8,
  },
  mainCategoryItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    // 3D Shadow styling
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  mainCategoryIcon: {
    width: 50,
    height: 50,
    marginBottom: 4,
  },
  mainCategoryText: {
    fontSize: 12,
    textAlign: 'center',
    color: COLORS.text,
  },
  activeMainCategory: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.orangeRed,
  },
  activeMainCategoryText: {
    color: COLORS.orangeRed,
    fontWeight: '600',
  },
  rightPanel: {
    flex: 1,
    padding: 8,
  },
  subCategoryList: {
    paddingBottom: 16,
  },
  subCategoryItem: {
    width: (width - SIDEBAR_WIDTH - 32) / 3,
    alignItems: 'center',
    marginBottom: 20,
    // 3D styling
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingVertical: 8,
  },
  subCategoryCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  subCategoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  subCategoryText: {
    fontSize: 12,
    color: COLORS.text,
    textAlign: 'center',
  },
  detailSidebarItem: {
    paddingVertical: 10,
    paddingHorizontal: 4,
    alignItems: 'center',
    // 3D styling
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  detailSidebarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 4,
  },
  detailSidebarText: {
    fontSize: 10,
    textAlign: 'center',
    color: COLORS.text,
  },
  activeDetailSidebarItem: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.orangeRed,
  },
  activeDetailSidebarText: {
    color: COLORS.orangeRed,
    fontWeight: '600',
  },
  itemsList: {
    paddingBottom: 16,
  },
  itemCard: {
    flex: 1,
    margin: 8,
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
  itemImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addCartButton: {
    flex: 1,
    backgroundColor: COLORS.orangeRed,
    paddingVertical: 6,
    marginRight: 4,
    borderRadius: 4,
    alignItems: 'center',
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  viewDetailsButton: {
    flex: 1,
    backgroundColor: COLORS.orange,
    paddingVertical: 6,
    marginLeft: 4,
    borderRadius: 4,
    alignItems: 'center',
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: COLORS.text,
  },
});
