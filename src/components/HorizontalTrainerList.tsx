import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from 'react-native';

// Example icons from FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

const { width } = Dimensions.get('window');

// Sample data
const trainers = [
    {
        id: '1',
        imageUri: require('../assets/images/users/UserProfile.jpg'),
        label: 'BEST TRAINER',
        icon: faTrophy,
    },
    {
        id: '2',
        imageUri: require('../assets/images/users/UserProfile.jpg'),
        label: 'BEST TRAINER',
        icon: faTrophy,
    },
    {
        id: '3',
        imageUri: require('../assets/images/users/UserProfile.jpg'),
        label: 'BEST TRAINER',
        icon: faTrophy,
    },
    {
        id: '3',
        imageUri: require('../assets/images/users/UserProfile.jpg'),
        label: 'BEST TRAINER',
        icon: faTrophy,
    },
];

const HorizontalTrainerList = () => {
    // Render each trainer item
    const renderItem = ({ item }: any) => (
        <TouchableOpacity style={styles.itemContainer} activeOpacity={0.8}>
            {/* Image Container with optional custom corners or border */}
            <View style={styles.imageWrapper}>
                <Image source={ item.imageUri } style={styles.image} />
                {/* Icon in bottom-right corner */}
                {item.icon && (
                    <FontAwesomeIcon
                        icon={item.icon}
                        size={32}
                        color="gold"
                        style={styles.icon}
                    />
                )}
            </View>
            {/* Label below the image */}
            <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={trainers}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
        />
    );
};

const styles = StyleSheet.create({
    listContent: {
        paddingHorizontal: 16,
    },
    itemContainer: {
        width: 100, // or adjust as needed
        marginRight: 16,
        alignItems: 'center',
    },
    imageWrapper: {
        position: 'relative', // for absolute-positioned icon
        width: '100%',
        height: 140,
        borderWidth: 2, // if you want a visible border
        borderColor: '#ccc',
        borderTopLeftRadius: 30, // e.g., top-left corner radius
        borderTopRightRadius: 0, // e.g., top-right corner radius
        borderBottomLeftRadius: 0, // you can keep these 0 if you want a "ticket" shape
        borderBottomRightRadius: 30,
        overflow: 'hidden', // ensures image corners are clipped
    },
    image: {
        width: '100%',
        height: '100%',
        // If you want to clip to the border's shape, no need for separate borderRadius here
    },
    icon: {
        position: 'absolute',
        bottom: 5,
        right: 5,
    },
    label: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default HorizontalTrainerList;
