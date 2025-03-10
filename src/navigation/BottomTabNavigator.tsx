import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AddPostScreen from '../screens/AddPostScreen';
import MarketplaceScreen from '../screens/MarketplaceScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: t('home') }} />
      <Tab.Screen name="AddPost" component={AddPostScreen} options={{ title: t('addPost') }} />
      <Tab.Screen name="Marketplace" component={MarketplaceScreen} options={{ title: t('marketplace') }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ title: t('search') }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: t('profile') }} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
