// SearchScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faTimesCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import { SPORTS_CATEGORIES_DATA } from '../data/sportsData';

const { width, height } = Dimensions.get('window');

const SEARCH_USER_TYPES = ['Users', 'Nutritionists', 'Trainers'];

const BASE_FILTER_CATEGORIES = [
  'Quick Filters',
  'Size',
  'Color',
  'Brand',
  'Country of Origin',
  'Price Range',
  'Discount',
  'Rating',
  'Delivery Time',
  'Body Shape',
  'Pattern',
  'Closure',
  'Multipack Set',
];

const FILTER_OPTIONS: Record<string, { label: string; checked: boolean }[]> = {
  'Quick Filters': [
    { label: 'Top Brands', checked: false },
    { label: 'Top Rated', checked: false },
    { label: 'Luxe', checked: false },
    { label: 'Hot Trends', checked: false },
    { label: 'Myntra Unique', checked: false },
    { label: 'Global Brands', checked: false },
    { label: 'Rising Star', checked: false },
  ],
  Size: [
    { label: 'XS', checked: false },
    { label: 'S', checked: false },
    { label: 'M', checked: false },
    { label: 'L', checked: false },
    { label: 'XL', checked: false },
    { label: 'XXL', checked: false },
  ],
  Color: [
    { label: 'Red', checked: false },
    { label: 'Blue', checked: false },
    { label: 'Green', checked: false },
  ],
  Brand: [
    { label: 'Brand A', checked: false },
    { label: 'Brand B', checked: false },
    { label: 'Brand C', checked: false },
  ],
  'Country of Origin': [
    { label: 'India', checked: false },
    { label: 'China', checked: false },
    { label: 'Other', checked: false },
  ],
  'Price Range': [
    { label: 'Under 1000', checked: false },
    { label: '1000-2000', checked: false },
    { label: 'Above 2000', checked: false },
  ],
  Discount: [
    { label: '10% and above', checked: false },
    { label: '20% and above', checked: false },
    { label: '30% and above', checked: false },
    { label: '40% and above', checked: false },
    { label: '50% and above', checked: false },
    { label: '60% and above', checked: false },
    { label: '70% and above', checked: false },
    { label: '80% and above', checked: false },
    { label: '90% and above', checked: false },
  ],
  Rating: [],
  'Delivery Time': [],
  'Body Shape': [],
  Pattern: [],
  Closure: [],
  'Multipack Set': [],
};

const SORT_OPTIONS = [
  'Price: High to Low',
  'Popularity',
  'Discount',
  'Price: Low to High',
  'Customer Rating',
];

const SPORTS_FILTER_CATEGORY = 'Sports';

/**
 * Media item type
 * singleImage | multipleImages | singleVideo | multipleVideos
 */
type MediaType = 'singleImage' | 'multipleImages' | 'singleVideo' | 'multipleVideos';

interface TrainerMediaItem {
  id: string;
  type: MediaType;
  thumbnail: any; // local require(...) or remote URI
}

interface TrainerProfile {
  id: string;
  username: string;
  fullName: string;
  rating: number;
  shortDescription: string;
  profileImage: any;
  media?: TrainerMediaItem[];
}

// Updated dummy trainer profiles including a video placeholder
const DUMMY_TRAINER_PROFILES: TrainerProfile[] = [
  {
    id: 'tr1',
    username: 'johndoe',
    fullName: 'John Doe',
    rating: 4.5,
    shortDescription: 'Expert in weightlifting and strength training with 10+ years experience.',
    profileImage: require('../assets/images/Image_01.jpeg'),
    media: [
      {
        id: 'm1',
        type: 'singleImage',
        thumbnail: require('../assets/images/Image_01.jpeg'),
      },
      {
        id: 'm2',
        type: 'multipleImages',
        thumbnail: require('../assets/images/Image_01.jpeg'), // The new video placeholder
      },
      {
        id: 'm3',
        type: 'singleVideo',
        thumbnail: require('../assets/images/Image_01.jpeg'), // The new video placeholder
      },
      {
        id: 'm4',
        type: 'multipleVideos',
        thumbnail: require('../assets/images/Image_01.jpeg'), // The new video placeholder
      },
      {
        id: 'm5',
        type: 'singleVideo',
        thumbnail: require('../assets/images/Image_01.jpeg'), // The new video placeholder
      },
    ],
  },
  {
    id: 'tr2',
    username: 'janesmith',
    fullName: 'Jane Smith',
    rating: 4.0,
    shortDescription: 'Certified trainer specializing in bodyweight exercises and flexibility.',
    profileImage: require('../assets/images/Image_01.jpeg'),
    // For demonstration, no media array here
  },
  {
    id: 'tr3',
    username: 'mikejohnson',
    fullName: 'Mike Johnson',
    rating: 5.0,
    shortDescription: 'Passionate about bodybuilding and helping clients reach their potential.',
    profileImage: require('../assets/images/Image_01.jpeg'),
  },
  {
    id: 'tr4',
    username: 'alicebrown',
    fullName: 'Alice Brown',
    rating: 4.2,
    shortDescription: 'Focuses on cardiovascular fitness and personalized training programs.',
    profileImage: require('../assets/images/Image_01.jpeg'),
  },
];

// A simple StarRating component
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        size={14}
        color={i <= Math.floor(rating) ? '#FFB300' : '#ccc'}
        style={{ marginRight: 2 }}
      />
    );
  }
  return <View style={{ flexDirection: 'row' }}>{stars}</View>;
};

// const { width, height } = Dimensions.get('window');

const SearchScreen: React.FC = () => {
  const navigation = useNavigation();

  // Search bar state.
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState(SEARCH_USER_TYPES[0]);
  const [searchText, setSearchText] = useState('');

  // Modal states.
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState('');

  // Filter state.
  const [activeFilterCategory, setActiveFilterCategory] = useState<string>(BASE_FILTER_CATEGORIES[0]);
  const [filterData, setFilterData] = useState(FILTER_OPTIONS);

  // Sports accordion state.
  const [openSportsCategories, setOpenSportsCategories] = useState<Record<string, boolean>>({});
  const [selectedSports, setSelectedSports] = useState<Record<string, boolean>>({});

  // Trainer search results state.
  const [trainerResults, setTrainerResults] = useState<TrainerProfile[]>([]);

  // Merge filter categories
  const mergedFilterCategories = selectedUserType === 'Trainers'
    ? [...BASE_FILTER_CATEGORIES, SPORTS_FILTER_CATEGORY]
    : BASE_FILTER_CATEGORIES;

  const handleClearAllFilters = () => {
    const resetData: Record<string, { label: string; checked: boolean }[]> = {};
    for (const cat of Object.keys(filterData)) {
      resetData[cat] = filterData[cat].map(opt => ({ ...opt, checked: false }));
    }
    setFilterData(resetData);
    setOpenSportsCategories({});
    setSelectedSports({});
  };

  const handleApplyFilters = () => {
    setFilterModalVisible(false);
  };

  // Base sub-filter item
  const renderSubFilterItem = ({ item }: { item: { label: string; checked: boolean } }) => (
    <TouchableOpacity
      style={styles.subFilterItem}
      onPress={() =>
        setFilterData(prev => {
          const newOptions = prev[activeFilterCategory].map(opt =>
            opt.label === item.label ? { ...opt, checked: !opt.checked } : opt
          );
          return { ...prev, [activeFilterCategory]: newOptions };
        })
      }
    >
      <View style={styles.subFilterRadioCircle}>
        {item.checked && <View style={styles.subFilterRadioFill} />}
      </View>
      <Text style={styles.subFilterLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  // Sports Accordion with checkboxes
  const SportsAccordion: React.FC = () => {
    return (
      <ScrollView>
        {SPORTS_CATEGORIES_DATA.map(cat => (
          <View key={cat.Category} style={styles.accordionItem}>
            <TouchableOpacity
              onPress={() =>
                setOpenSportsCategories(prev => ({
                  ...prev,
                  [cat.Category]: !prev[cat.Category],
                }))
              }
              style={styles.accordionHeader}
            >
              <Text style={styles.accordionHeaderText}>{cat.Category}</Text>
            </TouchableOpacity>
            {openSportsCategories[cat.Category] && (
              <View style={styles.accordionContent}>
                {cat.Subcategories.map(sub => (
                  <View key={sub.Subcategory} style={styles.subCategoryContainer}>
                    <Text style={styles.subCategoryTitle}>{sub.Subcategory}</Text>
                    {sub.Sports.map(sport => {
                      const key = `${cat.Category}-${sub.Subcategory}-${sport}`;
                      const isSelected = selectedSports[key] || false;
                      return (
                        <TouchableOpacity
                          key={sport}
                          style={styles.sportItemContainer}
                          onPress={() =>
                            setSelectedSports(prev => ({
                              ...prev,
                              [key]: !prev[key],
                            }))
                          }
                        >
                          <View style={styles.checkbox}>
                            {isSelected && <View style={styles.checkboxFill} />}
                          </View>
                          <Text style={styles.sportItemText}>{sport}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    );
  };

  // On pressing search
  const handleSearchSubmit = () => {
    if (searchText.trim().length < 3) {
      console.log('Please enter at least 3 characters to search.');
      setTrainerResults([]);
    } else if (selectedUserType === 'Trainers') {
      // For demo, show all DUMMY_TRAINER_PROFILES
      setTrainerResults(DUMMY_TRAINER_PROFILES);
    } else {
      setTrainerResults([]);
    }
  };

  // Render trainer profile item
  const renderTrainerProfile = ({ item }: { item: TrainerProfile }) => (
    <TouchableOpacity
      style={styles.trainerCard}
      onPress={() => navigation.navigate('ViewProfile', { trainer: item })}
    >
      <Image source={item.profileImage} style={styles.trainerImage} />
      <View style={styles.trainerInfo}>
        <Text style={styles.trainerUsername}>{item.username}</Text>
        <Text style={styles.trainerFullName}>{item.fullName}</Text>
        <StarRating rating={item.rating} />
        <Text style={styles.trainerDescription}>{item.shortDescription}</Text>
        <Text style={styles.viewMoreText}>View More</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text style={styles.dropdownText}>{selectedUserType}</Text>
          <FontAwesomeIcon icon={faChevronDown} size={16} color="#333" />
        </TouchableOpacity>
        {dropdownVisible && (
          <View style={styles.dropdownList}>
            {SEARCH_USER_TYPES.map(type => (
              <TouchableOpacity
                key={type}
                style={styles.dropdownListItem}
                onPress={() => {
                  setSelectedUserType(type);
                  setDropdownVisible(false);
                }}
              >
                <Text style={styles.dropdownListItemText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <TextInput
          style={styles.searchInput}
          placeholder={`Search ${selectedUserType}...`}
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            if (text.trim().length < 3) {
              setTrainerResults([]);
            }
          }}
          returnKeyType="search"
          onSubmitEditing={handleSearchSubmit}
        />
      </View>

      {/* Trainer Results */}
      {selectedUserType === 'Trainers' && trainerResults.length > 0 && (
        <FlatList
          data={trainerResults}
          keyExtractor={(item) => item.id}
          renderItem={renderTrainerProfile}
          style={styles.trainerList}
          contentContainerStyle={{ padding: 8 }}
        />
      )}

      {/* If no trainer results, show demo text */}
      {trainerResults.length === 0 && (
        <View style={{ flex: 1 }}>
          <Text style={styles.demoText}>
            (Demo) Searching for "{searchText}" in "{selectedUserType}"
          </Text>
        </View>
      )}

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bottomBarButton}
          onPress={() => setSortModalVisible(true)}
        >
          <Text style={styles.bottomBarButtonText}>Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomBarButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <Text style={styles.bottomBarButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Sort Modal */}
      <Modal
        visible={sortModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSortModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.sortModalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderTitle}>Sort By</Text>
              <TouchableOpacity onPress={() => setSortModalVisible(false)}>
                <FontAwesomeIcon icon={faTimesCircle} size={24} color="#333" />
              </TouchableOpacity>
            </View>
            {SORT_OPTIONS.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.sortOptionItem}
                onPress={() => setSelectedSortOption(option)}
              >
                <View
                  style={[
                    styles.sortOptionRadio,
                    { borderColor: selectedSortOption === option ? '#FF4500' : '#ccc' },
                  ]}
                >
                  {selectedSortOption === option && <View style={styles.sortOptionRadioFill} />}
                </View>
                <Text style={styles.sortOptionLabel}>{option}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalFooterButton}
                onPress={() => setSortModalVisible(false)}
              >
                <Text style={styles.modalFooterButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Filter Modal */}
      <Modal
        visible={filterModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.filterModalContainer}>
            {/* Header */}
            <View style={styles.filterModalHeader}>
              <Text style={styles.filterModalHeaderTitle}>Filters</Text>
              <TouchableOpacity onPress={handleClearAllFilters}>
                <Text style={styles.clearAllText}>CLEAR ALL</Text>
              </TouchableOpacity>
            </View>
            {/* Body: Two columns - left: filter categories; right: subfilters */}
            <View style={styles.filterModalBody}>
              <View style={styles.filterCategoryList}>
                <FlatList
                  data={
                    selectedUserType === 'Trainers'
                      ? [...BASE_FILTER_CATEGORIES, SPORTS_FILTER_CATEGORY]
                      : BASE_FILTER_CATEGORIES
                  }
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => {
                    const isActive = item === activeFilterCategory;
                    return (
                      <TouchableOpacity
                        style={[styles.filterCategoryItem, isActive && styles.activeFilterCategoryItem]}
                        onPress={() => setActiveFilterCategory(item)}
                      >
                        <Text
                          style={[
                            styles.filterCategoryText,
                            isActive && styles.activeFilterCategoryText,
                          ]}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
              <View style={styles.filterSubList}>
                {activeFilterCategory === SPORTS_FILTER_CATEGORY ? (
                  <SportsAccordion />
                ) : (
                  <FlatList
                    data={filterData[activeFilterCategory]}
                    keyExtractor={(item) => item.label}
                    renderItem={({ item }) => renderSubFilterItem({ item })}
                  />
                )}
              </View>
            </View>
            {/* Footer */}
            <View style={styles.filterModalFooter}>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Text style={styles.closeButtonText}>CLOSE</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleApplyFilters}>
                <Text style={styles.applyButtonText}>APPLY</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  /***********************
   * Search Bar
   ***********************/
  searchBarContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdown: {
    width: 120,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
    borderRadius: 4,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: { fontSize: 14, color: '#333' },
  dropdownList: {
    position: 'absolute',
    top: 48,
    left: 8,
    width: 120,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 999,
  },
  dropdownListItem: { padding: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  dropdownListItemText: { fontSize: 14, color: '#333' },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  /***********************
   * Demo Text
   ***********************/
  demoText: {
    marginTop: 16,
    marginHorizontal: 16,
    fontSize: 16,
    color: '#666',
  },
  /***********************
   * Trainer Profiles
   ***********************/
  trainerList: { backgroundColor: '#fff' },
  trainerCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 12,
    borderRadius: 8,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  trainerImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  trainerInfo: { flex: 1, justifyContent: 'center' },
  trainerUsername: { fontSize: 14, color: '#FF4500', fontWeight: 'bold' },
  trainerFullName: { fontSize: 16, fontWeight: 'bold', color: '#333', marginVertical: 4 },
  trainerDescription: { fontSize: 14, color: '#666', marginBottom: 4 },
  viewMoreText: { fontSize: 14, color: '#FF4500', fontWeight: 'bold' },
  /***********************
   * Bottom Bar
   ***********************/
  bottomBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  bottomBarButton: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  bottomBarButtonText: { fontSize: 16, color: '#FF4500', fontWeight: 'bold' },
  /***********************
   * Sort Modal
   ***********************/
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  sortModalContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  modalHeaderTitle: { fontSize: 18, fontWeight: 'bold' },
  sortOptionItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  sortOptionRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortOptionRadioFill: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FF4500' },
  sortOptionLabel: { fontSize: 14, color: '#333' },
  modalFooter: { marginTop: 16, alignItems: 'flex-end' },
  modalFooterButton: { backgroundColor: '#FF4500', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  modalFooterButtonText: { color: '#fff', fontWeight: 'bold' },
  /***********************
   * Filter Modal
   ***********************/
  filterModalContainer: {
    backgroundColor: '#fff',
    height: height * 0.9,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  filterModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterModalHeaderTitle: { fontSize: 18, fontWeight: 'bold' },
  clearAllText: { color: '#FF4500', fontWeight: 'bold' },
  filterModalBody: { flexDirection: 'row', flex: 1 },
  filterCategoryList: { width: 120, borderRightWidth: 1, borderRightColor: '#eee' },
  filterCategoryItem: { padding: 12 },
  activeFilterCategoryItem: { backgroundColor: '#fff', borderLeftWidth: 4, borderLeftColor: '#FF4500' },
  filterCategoryText: { fontSize: 14, color: '#333' },
  activeFilterCategoryText: { color: '#FF4500', fontWeight: 'bold' },
  filterSubList: { flex: 1, padding: 12 },
  subFilterItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  subFilterRadioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subFilterRadioFill: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FF4500' },
  subFilterLabel: { fontSize: 14, color: '#333' },
  filterModalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  closeButtonText: { fontSize: 16, color: '#666', fontWeight: 'bold' },
  applyButtonText: { fontSize: 16, color: '#FF4500', fontWeight: 'bold' },
  /***********************
   * Sports Accordion Styles
   ***********************/
  accordionItem: { marginBottom: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  accordionHeader: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#f9f9f9' },
  accordionHeaderText: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  accordionContent: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#fff' },
  subCategoryContainer: { marginBottom: 8 },
  subCategoryTitle: { fontSize: 13, fontWeight: 'bold', color: '#FF4500', marginBottom: 4 },
  sportItemContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 3,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxFill: { width: 10, height: 10, backgroundColor: '#FF4500' },
  sportItemText: { fontSize: 13, color: '#555' },
});
