import React from 'react';
import { Button, View, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import { useTranslation } from 'react-i18next';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { t, i18n } = useTranslation();

  const showLanguageOptions = () => {
    Alert.alert(t('selectLanguage'), '', [
      {
        text: t('english'),
        onPress: () => i18n.changeLanguage('en'),
      },
      {
        text: t('hindi'),
        onPress: () => i18n.changeLanguage('hn'),
      },
      {
        text: t('odia'),
        onPress: () => i18n.changeLanguage('or'),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
            <Button title={t('language')} onPress={showLanguageOptions} />
            <Button
              title={t('logout')}
              onPress={() => navigation.getParent()?.navigate('Login' as never)}
            />
          </View>
        ),
      })}
    >
      <Drawer.Screen
        name="HomeTabs"
        component={BottomTabNavigator}
        options={{ drawerLabel: t('home') }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ drawerLabel: t('settings') }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
