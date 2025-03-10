import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Dimensions, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../navigation/types';

type NavigationProps = DrawerNavigationProp<DrawerParamList>;

const SettingsScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    // Your logout logic here
    navigation.navigate('Login' as never);
  };

  const handleChangeLanguage = () => {
    // Example alert for language selection
    Alert.alert(t('selectLanguage'), '', [
      { text: t('english'), onPress: () => i18n.changeLanguage('en') },
      { text: t('hindi'), onPress: () => i18n.changeLanguage('hn') },
      { text: t('odia'), onPress: () => i18n.changeLanguage('or') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          {/* <Ionicons name="menu" size={28} color="black" style={styles.hamburgerIcon} /> */}
        </TouchableOpacity>
        <View style={styles.rightButtons}>
          {/* <Button title={t('logout')} onPress={handleLogout} /> */}
          <Button title={t('language')} onPress={handleChangeLanguage} />
        </View>
      </View>

      {/* Rest of Settings Screen */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://placekitten.com/400/400' }}
          style={styles.profileImage}
        />
      </View>
      <Text style={styles.text}>{t('settings')}</Text>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  hamburgerIcon: {
    // styling for hamburger icon if needed
  },
  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  profileImage: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    borderRadius: (Dimensions.get('window').width * 0.4) / 2,
    borderWidth: 2,
    borderColor: '#333',
  },
  text: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 18,
  },
});
