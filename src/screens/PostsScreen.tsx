import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PostsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Add Post Screen</Text>
    </SafeAreaView>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
