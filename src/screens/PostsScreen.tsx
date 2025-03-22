// PostsScreen.tsx
import React from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { posts } from '../data/postsData';
import PostCard from '../components/PostCard';

const PostsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // main theme color
  },
  listContent: {
    padding: 16,
  },
});
