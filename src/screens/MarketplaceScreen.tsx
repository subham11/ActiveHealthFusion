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
import { MARKETPLACE_CATEGORIES, MainCategory, SubCategory } from '../data/marketplaceData';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

const { width } = Dimensions.get('window');

// Example color palette to match your screenshots
const COLORS = {
  background: '#FFFFFF',  // main background
  sidebarBg: '#F8F8F8',   // left sidebar background
  orange: '#FFA500',
  orangeRed: '#FF4500',
  text: '#333',
  // etc.
};

const MarketplaceScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<MainCategory>(MARKETPLACE_CATEGORIES[0]);

  const renderMainCategoryItem = ({ item }: { item: MainCategory }) => {
    const isActive = item.id === selectedCategory.id;
    return (
      <TouchableOpacity
        style={[styles.mainCategoryItem, isActive && styles.activeMainCategory]}
        onPress={() => setSelectedCategory(item)}
      >
        <Image source={item.icon} style={styles.mainCategoryIcon} />
        <Text style={[styles.mainCategoryText, isActive && styles.activeMainCategoryText]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSubCategoryItem = ({ item }: { item: SubCategory }) => {
    return (
      <View style={styles.subCategoryItem}>
        <View style={styles.subCategoryCircle}>
          <Image source={item.image} style={styles.subCategoryImage} resizeMode="cover" />
        </View>
        <Text style={styles.subCategoryText}>{item.name}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        {/* Right side icons (e.g., cart, notifications) */}
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIconBtn}>
            {/* <Image source={require('../assets/icons/notification.png')} style={styles.headerIcon} /> */}
            <FontAwesomeIcon icon={faBell} size={24} color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn}>
            {/* <Image source={require('../assets/icons/cart.png')} style={styles.headerIcon} /> */}
            <FontAwesomeIcon icon={faShoppingBasket} size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentContainer}>
        {/* Left Sidebar */}
        <View style={styles.sidebar}>
          <FlatList
            data={MARKETPLACE_CATEGORIES}
            keyExtractor={(item) => item.id}
            renderItem={renderMainCategoryItem}
            contentContainerStyle={styles.sidebarList}
          />
        </View>

        {/* Right Panel for subcategories */}
        <View style={styles.subCategoryContainer}>
          <FlatList
            data={selectedCategory.subCategories}
            keyExtractor={(item) => item.id}
            renderItem={renderSubCategoryItem}
            numColumns={3}
            contentContainerStyle={styles.subCategoryList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MarketplaceScreen;

const SIDEBAR_WIDTH = 100;

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
  },
  headerIcon: {
    width: 24,
    height: 24,
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
    backgroundColor: '#FFF',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.orangeRed,
  },
  activeMainCategoryText: {
    color: COLORS.orangeRed,
    fontWeight: '600',
  },
  subCategoryContainer: {
    flex: 1,
    padding: 8,
  },
  subCategoryList: {
    paddingBottom: 16,
  },
  subCategoryItem: {
    width: (width - SIDEBAR_WIDTH - 32) / 3, // 3 columns + some spacing
    alignItems: 'center',
    marginBottom: 20,
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
});
