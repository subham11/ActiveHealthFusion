import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import HexImage from "./HexImage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";

const data = [
  {
    id: "1",
    image: require("../assets/images/users/UserProfile.jpg"),
    label: "BEST NUTRITIONIST",
  },
  {
    id: "2",
    image: require("../assets/images/users/UserProfile.jpg"),
    label: "BEST NUTRITIONIST",
  },
  {
    id: "3",
    image: require("../assets/images/users/UserProfile.jpg"),
    label: "BEST NUTRITIONIST",
  },
  // ... more items if needed
];

const ITEM_WIDTH = 100; // width of each apple shape

const HorizontalAppleList = () => {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.imageWrapper}>
        {/* Apple-shaped image using the updated AppleImage (with provided SVG apple path) */}
        <HexImage source={item.image} size={ITEM_WIDTH} />
        {/* Icon overlay positioned near the top center */}
        <FontAwesomeIcon
          icon={faSeedling}
          size={28}
          color="green"
          style={[
            styles.icon,
            {
              top: ITEM_WIDTH * 0.1, // e.g., 10% of the width
              left: ITEM_WIDTH * 0.4, // e.g., 40% of the width
            },
          ]}
        />
      </View>
      <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
    />
  );
};

export default HorizontalAppleList;

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    alignItems: "center",
    marginRight: 20,
  },
  imageWrapper: {
    position: "relative",
  },
  icon: {
    position: "absolute",
  },
  label: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
});
