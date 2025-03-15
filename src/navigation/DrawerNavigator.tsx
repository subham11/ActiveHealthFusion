import React from 'react';
import { Button, View, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import { useTranslation } from 'react-i18next';
// import AnimatedTitle from '../components/AnimatedTitle'; // <-- Import your animated title
import LinearGradient from 'react-native-linear-gradient';

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
        headerTintColor: 'white',
        headerBackground: () => (
          <LinearGradient
            colors={['#FF5349','#FFA500', '#FF0000']}
            style={{ flex: 1 }}
          />
        ),
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
            <Button title={t('language')} onPress={showLanguageOptions} color="white"/>
            <Button
              title={t('logout')}
              onPress={() => navigation.getParent()?.navigate('Login' as never)}
              color="white"
            />
          </View>
        ),
      })}
    >
      <Drawer.Screen
        name="HomeTabs"
        component={BottomTabNavigator}
        options={{
          drawerLabel: t('home'),
          // Instead of a static title, use your AnimatedTitle
          headerTitle: '',
        }}
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
