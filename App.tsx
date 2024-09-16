import 'react-native-gesture-handler';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddTripScreen from './screens/RegisterTripScreen';
import MapScreen from './screens/MapScreen';
import TripDetailsScreen from './screens/TripDetailsScreen';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }} 
      />
      
      <Tab.Screen 
        name="AddTrip" 
        component={AddTripScreen} 
        options={{
          title: 'Adicionar Viagem',
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
        }} 
      />

      <Tab.Screen 
        name="MapScreen" 
        component={MapScreen} 
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
        }} 
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="TripDetailsScreen"
          component={TripDetailsScreen}
          options={{ title: 'Detalhes da Viagem' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
