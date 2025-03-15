// HorizontalDoctorList.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import HexImage from './HexImage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';

const doctors = [
  {
    id: '1',
    imageUri: require('../assets/images/users/Doc_01.jpg'),
    label: 'Physical Therapist',
    icon: faUserDoctor,
  },
  {
    id: '2',
    imageUri: require('../assets/images/users/Doc_01.jpg'),
    label: 'Physical Therapist',
    icon: faUserDoctor,
  },
  {
    id: '3',
    imageUri: require('../assets/images/users/Doc_01.jpg'),
    label: 'Physical Therapist',
    icon: faUserDoctor,
  },
  {
    id: '4',
    imageUri: require('../assets/images/users/Doc_01.jpg'),
    label: 'Physical Therapist',
    icon: faUserDoctor,
  },
  {
    id: '5',
    imageUri: require('../assets/images/users/Doc_01.jpg'),
    label: 'Physical Therapist',
    icon: faUserDoctor,
  },
];

const IMAGE_SIZE = 100;

const HorizontalDoctorList = () => {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.itemContainer} activeOpacity={0.8}>
      <View style={[styles.imageWrapper, styles.shadow]}>
        <HexImage source={item.imageUri} size={IMAGE_SIZE} />
      </View>
      <View style={[styles.iconWrapper, styles.shadow]}>
        <FontAwesomeIcon
          icon={item.icon}
          size={28}
          color="teal"
          style={styles.icon}
        />
      </View>
      <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={doctors}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
    />
  );
};

export default HorizontalDoctorList;

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 5,
  },
  itemContainer: {
    width: IMAGE_SIZE,
    alignItems: 'center',
    marginRight: 25,
  },
  imageWrapper: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    // Optional: add a borderRadius if you want a more rounded container
    borderRadius: 10,
    overflow: 'hidden',
  },
  iconWrapper: {
    position: 'absolute',
    //bottom: 50,
    top: 0,
    right: -25,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    // Additional icon styling if needed
  },
  label: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});
