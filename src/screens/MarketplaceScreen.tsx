import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MarketplaceScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Marketplace Screen</Text>
    </SafeAreaView>
  );
};

export default MarketplaceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
