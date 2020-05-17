import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VendorList from './Pages/VendorList';

// Import all components with routes here


const Stack = createStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Vendors" component={VendorList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;