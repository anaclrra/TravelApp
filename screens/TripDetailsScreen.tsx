import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

export default function TripDetailsScreen() {
  const route = useRoute();
  const { tripId } = route.params as { tripId: string };
  const [trip, setTrip] = useState<any>(null);
  const [photos, setPhotos] = useState<string[]>([]);

  const { width } = Dimensions.get('window');
  const numColumns = Math.floor(width / 120); 

  useEffect(() => {
    const loadTrip = async () => {
      try {
        const trips = await AsyncStorage.getItem('trips');
        const tripsArray = trips ? JSON.parse(trips) : [];
        const foundTrip = tripsArray.find((trip: any) => trip.id === tripId);
        setTrip(foundTrip);
        if (foundTrip) {
          setPhotos(foundTrip.photos);
        }
      } catch (error) {
        console.error('Failed to load trip:', error);
      }
    };

    loadTrip();
  }, [tripId]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setPhotos([...photos, uri]);
      savePhotoToTrip(uri);
    }
  };

  const savePhotoToTrip = async (uri: string) => {
    try {
      const trips = await AsyncStorage.getItem('trips');
      let tripsArray = trips ? JSON.parse(trips) : [];

      const updatedTrips = tripsArray.map((trip: any) => {
        if (trip.id === tripId) {
          return { ...trip, photos: [...trip.photos, uri] };
        }
        return trip;
      });

      await AsyncStorage.setItem('trips', JSON.stringify(updatedTrips));
      console.log('Foto salva:', uri);
    } catch (error) {
      console.error('Failed to save photo:', error);
    }
  };

  if (!trip) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{trip.tripName}</Text>
        <Text style={styles.description}>{trip.description}</Text>
      </View>

      <TouchableOpacity onPress={pickImage} style={styles.addButton}>
        <Text style={styles.addButtonText}>Adicionar Foto</Text>
      </TouchableOpacity>

      <FlatList
        data={photos}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={[styles.image, { width: (width - 40) / numColumns, height: (width - 40) / numColumns }]} />
        )}
        numColumns={numColumns}
        contentContainerStyle={styles.imageContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCE4EC',
    padding: 2,
    paddingTop: 20,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#303F9F',
    marginBottom: 5,
  },
  description: {
    fontSize: 18,
    color: '#5C6BC0',
    textAlign: 'center',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#7986CB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  addButtonText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
  },
  image: {
    margin: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E1BEE7',
  },
  imageContainer: {
    alignItems: 'center',
  },
});