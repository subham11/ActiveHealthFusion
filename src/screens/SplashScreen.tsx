import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

const SplashScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login' as never);
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.appName}>{t('appName')}</Text>
      <ActivityIndicator size="large" color="#000" />
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  appName: {
    fontSize: 24,
    marginBottom: 20
  }
});
