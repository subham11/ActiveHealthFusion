import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import PostsScreen from '../screens/PostsScreen';
import MarketplaceScreen from '../screens/MarketplaceScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faPodcast, faShop, faSearch, faPerson } from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarBackground: () => (
          <LinearGradient
            colors={['#FF7F50', '#FF4500']} // example: orange to red
            style={{ flex: 1 }}
          />
        ),
        // Make the tab bar transparent so the gradient shows
        tabBarStyle: {
          backgroundColor: 'transparent',
        },
        // Active/Inactive icon + label colors
        tabBarActiveTintColor: '#FFF',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.6)',
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = faHome; // default
          switch (route.name) {
            case 'Home':
              iconName = faHome;
              break;
            case 'AddPost':
              iconName = faPodcast;
              break;
            case 'Marketplace':
              iconName = faShop;
              break;
            case 'Search':
              iconName = faSearch;
              break;
            case 'Profile':
              iconName = faPerson;
              break;
          }
          return <FontAwesomeIcon icon={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: t('home') }} />
      <Tab.Screen name="Posts" component={PostsScreen} options={{ title: t('posts') }} />
      <Tab.Screen name="Marketplace" component={MarketplaceScreen} options={{ title: t('marketplace') }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ title: t('search') }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: t('profile') }} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
