import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VendorList from './Screens/VendorList';
import VendorDetail from './Screens/VendorDetail';
import ProductDetail from './Screens/ProductDetail';
import CartDetail from './Screens/CartDetail';
import OrderDetail from './Screens/OrderDetail';

// Import all components with routes here


const Stack = createStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Vendors" component={VendorList} />
        <Stack.Screen name="VendorDetail" component={VendorDetail} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="CartDetail" component={CartDetail} />
        <Stack.Screen name="OrderDetail" component={OrderDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;