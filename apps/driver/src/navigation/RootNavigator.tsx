import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';

import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#ffffff' }, headerShadowVisible: false, contentStyle: { backgroundColor: '#F8FAFC' }}}>
        <Stack.Screen 
           name="Today's route" 
           component={HomeScreen} 
           options={{
             headerRight: () => (
               <View style={{ backgroundColor: '#D1FAE5', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16 }}>
                 <Text style={{ color: '#047857', fontSize: 12, fontWeight: 'bold' }}>5 stops</Text>
               </View>
             )
           }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
