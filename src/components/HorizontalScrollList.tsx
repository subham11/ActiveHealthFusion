import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import LinearGradient from "react-native-linear-gradient";
import { RootStackParamList } from "../navigation/types";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrophy, faStar, faHeart, faDumbbell } from "@fortawesome/free-solid-svg-icons";

// Map icon strings from JSON to FontAwesome icons
const iconMapping: { [key: string]: any } = {
  faTrophy: faTrophy,
  faStar: faStar,
  faHeart: faHeart,
  faDumbbell: faDumbbell,
};

export type UserItem = {
  id: string;
  name: string;
  image: any; // require(...) reference
  profileDetails: string;
  profilePrice: string;
  profileReviews: string;
  description: string;
  icon?: string; // e.g. "faTrophy"
};

type UserProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "UserProfile"
>;

interface HorizontalScrollListProps {
  userList: UserItem[];
  imageGradientColors?: string[];
  iconGradientColors?: string[];
}

const HorizontalScrollList: React.FC<HorizontalScrollListProps> = ({
  userList,
  imageGradientColors = ["red", "orange"],
  iconGradientColors = ["red", "orange"],
}) => {
  const navigation = useNavigation<UserProfileScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <FlatList
        data={userList}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            {/* Gradient border around the circular image */}
            <LinearGradient
              colors={imageGradientColors}
              style={styles.imageGradientBorder}
            >
              <Image source={item.image} style={styles.image} />
            </LinearGradient>

            {/* If there's an icon, wrap it in a gradient border */}
            {item.icon && iconMapping[item.icon] && (
              <View style={styles.iconWrapper}>
                <LinearGradient
                  colors={iconGradientColors}
                  style={styles.iconGradientBorder}
                >
                  <FontAwesomeIcon
                    icon={iconMapping[item.icon]}
                    color="#fff"
                    size={24}
                  />
                </LinearGradient>
              </View>
            )}

            {/* Name below the image */}
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HorizontalScrollList;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    // borderWidth: 2,
    // borderColor: 'red',
  },
  listContainer: {
    paddingHorizontal: 5,
  },
  item: {
    alignItems: "center",
    marginHorizontal: 10,
    position: "relative",
  },
  /* ------------------------------
   *  IMAGE + IMAGE GRADIENT BORDER
   * ------------------------------ */
  imageGradientBorder: {
    // Slightly larger than the image so the gradient shows as a border
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  /* ------------------------------
   *  ICON + ICON GRADIENT BORDER
   * ------------------------------ */
  iconWrapper: {
    position: "absolute",
    bottom: 30,
    right: -10,
  },
  iconGradientBorder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
});
