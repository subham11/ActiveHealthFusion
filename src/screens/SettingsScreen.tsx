import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const imageSize = width * 0.4;

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    // Perform logout logic, then navigate to Login
    navigation.navigate('Login' as never);
  };

  const handleChangeLanguage = () => {
    // Example of a simple popup approach
    Alert.alert(t('selectLanguage'), '', [
      { text: t('english'), onPress: () => i18n.changeLanguage('en') },
      { text: t('hindi'), onPress: () => i18n.changeLanguage('hn') },
      { text: t('odia'), onPress: () => i18n.changeLanguage('or') },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar with Log Off and Language Button */}
      <View style={styles.topBar}>
        <Button title={t('logout')} onPress={handleLogout} />
        <Button title={t('language')} onPress={handleChangeLanguage} />
      </View>

      {/* Profile Picture */}
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
    flex: 1
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 16,
    marginTop: 8
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 40
  },
  profileImage: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
    borderWidth: 2,
    borderColor: '#333'
  },
  text: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 18
  }
});
