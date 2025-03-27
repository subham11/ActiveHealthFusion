import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import DrawerNavigator from './DrawerNavigator'; // We'll create a Drawer containing bottom tabs + settings
import ViewCartScreen from '../screens/ViewCartScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ViewProfileScreen from '../screens/ViewProfileScreen';
import MediaDetailsScreen from '../screens/MediaDetailsScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={DrawerNavigator} />
      <Stack.Screen name="ViewCart" component={ViewCartScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="ViewProfile" component={ViewProfileScreen} />
      <Stack.Screen name="MediaDetails" component={MediaDetailsScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
