import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NavigationProp } from './navigation/type';

export default function HomeScreen() {
  const [trips, setTrips] = useState<any[]>([]);
  const navigation = useNavigation<NavigationProp>();


  useFocusEffect(
    useCallback(() => {
      const loadTrips = async () => {
        try {
          const savedTrips = await AsyncStorage.getItem('trips');
          if (savedTrips) {
            setTrips(JSON.parse(savedTrips));
          }
        } catch (error) {
          console.error('Failed to load trips:', error);
        }
      };

      loadTrips();
    }, [])
  );

  const handlePress = (tripId: string) => {
    navigation.navigate('TripDetailsScreen', { tripId });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tripCard}>
            <Text style={styles.tripName}>{item.tripName}</Text>
            <Text style={styles.tripDate}>{item.date}</Text>
            <Text style={styles.tripDescription}>{item.description}</Text>
            <TouchableOpacity onPress={() => handlePress(item.id)} style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>Ver memórias</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCE4EC',
    padding: 20,
  },
  tripCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  tripName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  tripDescription: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 8,
  },
  tripDate: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 12,
  },
  detailsButton: {
    backgroundColor: '#7986CB',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  detailsButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
});
