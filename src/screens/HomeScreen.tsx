import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { fetchPosts } from '../store/postsSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import HorizontalProfileList from '../components/HorizontalScrollList';
import HorizontalTrainerList from '../components/HorizontalTrainerList';
import HorizontalDoctorList from '../components/HorizontalDoctorList';
import userData from "../data/userList.json";  // JSON data
import { userImages } from "../data/userImages";

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.posts);
  const transformedData = userData.map((item) => ({
    ...item,
    image: userImages[item.image], // look up the require in userImages
  }));

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.body}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <HorizontalProfileList
        userList={transformedData}
        imageGradientColors={["#FF0000", "#FFA500"]} // Custom gradient for image border
        iconGradientColors={["#FF0000", "#FFA500"]}  // Custom gradient for icon border
      />
      <HorizontalTrainerList />
      <HorizontalDoctorList />
      {/* <HorizontalDoctorList /> */}
      {/* <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      /> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  card: {
    backgroundColor: '#eee',
    marginBottom: 10,
    padding: 10,
    borderRadius: 6
  },
  title: {
    fontWeight: 'bold'
  }
});
