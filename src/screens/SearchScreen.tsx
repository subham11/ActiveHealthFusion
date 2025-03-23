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
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const { width, height } = Dimensions.get('window');

// Example categories for the Filter Modal left side
const FILTER_CATEGORIES = [
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

// Example sub-filters for each category
// In a real app, you might fetch or store this in a data structure.
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
    // etc.
  ],
  Color: [
    { label: 'Red', checked: false },
    { label: 'Blue', checked: false },
    { label: 'Green', checked: false },
    // etc.
  ],
  Brand: [
    { label: 'Roadster', checked: false },
    { label: 'H&M', checked: false },
    { label: 'Mast & Harbour', checked: false },
    { label: 'HERE&NOW', checked: false },
    // etc.
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

// Sort options for the Sort Modal
const SORT_OPTIONS = [
  'Price: High to Low',
  'Popularity',
  'Discount',
  'Price: Low to High',
  'Customer Rating',
];

// The dropdown items for the search user types
const SEARCH_USER_TYPES = ['Users', 'Nutritionists', 'Trainers'];

const SearchScreen: React.FC = () => {
  // State for dropdown
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState(SEARCH_USER_TYPES[0]);

  // State for text input
  const [searchText, setSearchText] = useState('');

  // State for modals
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  // State for selected sort option
  const [selectedSortOption, setSelectedSortOption] = useState('');

  // Filter UI states
  const [activeFilterCategory, setActiveFilterCategory] = useState<string>(
    FILTER_CATEGORIES[0]
  );
  const [filterData, setFilterData] = useState(FILTER_OPTIONS);

  // Toggle check for sub-filter
  const handleToggleFilter = (category: string, label: string) => {
    setFilterData((prev) => {
      const newCategoryOptions = prev[category].map((opt) =>
        opt.label === label ? { ...opt, checked: !opt.checked } : opt
      );
      return {
        ...prev,
        [category]: newCategoryOptions,
      };
    });
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    const resetData: Record<string, { label: string; checked: boolean }[]> = {};
    for (const cat of Object.keys(filterData)) {
      resetData[cat] = filterData[cat].map((opt) => ({ ...opt, checked: false }));
    }
    setFilterData(resetData);
  };

  // Apply filters (just closes the modal in this example)
  const handleApplyFilters = () => {
    setFilterModalVisible(false);
  };

  // Sort option selected
  const handleSelectSortOption = (option: string) => {
    setSelectedSortOption(option);
  };

  // Render a sub-filter item (checkbox)
  const renderSubFilterItem = ({
    item,
  }: {
    item: { label: string; checked: boolean };
  }) => {
    return (
      <TouchableOpacity
        style={styles.subFilterItem}
        onPress={() => handleToggleFilter(activeFilterCategory, item.label)}
      >
        <View style={styles.subFilterRadioCircle}>
          {item.checked && <View style={styles.subFilterRadioFill} />}
        </View>
        <Text style={styles.subFilterLabel}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header / Search Bar */}
      <View style={styles.searchBarContainer}>
        {/* Dropdown for user type */}
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text style={styles.dropdownText}>{selectedUserType}</Text>
          <FontAwesomeIcon icon={faChevronDown} size={16} color="#333" />
        </TouchableOpacity>
        {dropdownVisible && (
          <View style={styles.dropdownList}>
            {SEARCH_USER_TYPES.map((type) => (
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

        {/* TextInput */}
        <TextInput
          style={styles.searchInput}
          placeholder={`Search ${selectedUserType}...`}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* The rest of the screen content (results, etc.) could go here. */}
      <View style={{ flex: 1 }}>
        <Text style={styles.demoText}>
          (Demo) Searching for "{searchText}" in "{selectedUserType}"
        </Text>
      </View>

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
            {SORT_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.sortOptionItem}
                onPress={() => handleSelectSortOption(option)}
              >
                <View
                  style={[
                    styles.sortOptionRadio,
                    {
                      borderColor:
                        selectedSortOption === option ? '#FF4500' : '#ccc',
                    },
                  ]}
                >
                  {selectedSortOption === option && (
                    <View style={styles.sortOptionRadioFill} />
                  )}
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

            {/* Body: Two columns - left categories, right subfilters */}
            <View style={styles.filterModalBody}>
              {/* Left: categories */}
              <View style={styles.filterCategoryList}>
                <FlatList
                  data={FILTER_CATEGORIES}
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
              {/* Right: subfilters for the active category */}
              <View style={styles.filterSubList}>
                <FlatList
                  data={filterData[activeFilterCategory]}
                  keyExtractor={(item) => item.label}
                  renderItem={renderSubFilterItem}
                />
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },
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
  dropdownListItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownListItemText: {
    fontSize: 14,
    color: '#333',
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  /***********************
   * Demo
   ***********************/
  demoText: {
    marginTop: 16,
    marginHorizontal: 16,
    fontSize: 16,
    color: '#666',
  },
  /***********************
   * Bottom Bar
   ***********************/
  bottomBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  bottomBarButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  bottomBarButtonText: {
    fontSize: 16,
    color: '#FF4500',
    fontWeight: 'bold',
  },
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
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sortOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
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
  sortOptionRadioFill: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF4500',
  },
  sortOptionLabel: {
    fontSize: 14,
    color: '#333',
  },
  modalFooter: {
    marginTop: 16,
    alignItems: 'flex-end',
  },
  modalFooterButton: {
    backgroundColor: '#FF4500',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  modalFooterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
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
  filterModalHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearAllText: {
    color: '#FF4500',
    fontWeight: 'bold',
  },
  filterModalBody: {
    flexDirection: 'row',
    flex: 1,
  },
  filterCategoryList: {
    width: 120,
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  filterCategoryItem: {
    padding: 12,
  },
  activeFilterCategoryItem: {
    backgroundColor: '#fff',
    borderLeftWidth: 4,
    borderLeftColor: '#FF4500',
  },
  filterCategoryText: {
    fontSize: 14,
    color: '#333',
  },
  activeFilterCategoryText: {
    color: '#FF4500',
    fontWeight: 'bold',
  },
  filterSubList: {
    flex: 1,
    padding: 12,
  },
  subFilterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
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
  subFilterRadioFill: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF4500',
  },
  subFilterLabel: {
    fontSize: 14,
    color: '#333',
  },
  filterModalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  applyButtonText: {
    fontSize: 16,
    color: '#FF4500',
    fontWeight: 'bold',
  },
});
