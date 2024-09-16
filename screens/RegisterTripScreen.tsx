import React from 'react';
import { View, Text, TextInput, Button, StyleSheet,  Image, ScrollView, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text'
import { NavigationProp } from './navigation/type';

const validationSchema = Yup.object().shape({
  tripName: Yup.string().required('Nome da viagem é obrigatório'),
  description: Yup.string().required('Descrição é obrigatória'),
  date: Yup.string()
    .required('Data é obrigatória')
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      'Formato de data inválido (DD/MM/YYYY)'
    ),
});


export default function AddTripScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleSubmit = async (values: { tripName: string; description: string; date: string},  { resetForm }: { resetForm: () => void }) => {
    const newTrip = {
      id: new Date().toISOString(),
      tripName: values.tripName,
      description: values.description,
      date: values.date,
      photos: [] as string[],
    };

    try {
      const trips = await AsyncStorage.getItem('trips');
      const tripsArray = trips ? JSON.parse(trips) : [];
      tripsArray.push(newTrip);
      await AsyncStorage.setItem('trips', JSON.stringify(tripsArray));
      resetForm();
      navigation.navigate('Home');
    } catch (error) {
      console.error('Failed to save trip:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    
        <Image
          source={{ uri: 'https://png.pngtree.com/png-clipart/20220404/original/pngtree-beach-landscape-illustration-design-png-image_7501416.png' }} // Replace with your image URL or local path
          style={styles.backgroundImage}
        />
      <Formik
        initialValues={{ tripName: '', description: '', date: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
          <View style={styles.form}>
            <Text style={styles.label}>Titulo:</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('tripName')}
              value={values.tripName}
              placeholder="Digite o nome da viagem"
            />
            {errors.tripName && <Text style={styles.error}>{errors.tripName}</Text>}

            <Text style={styles.label}>Descrição:</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('description')}
              value={values.description}
              placeholder="Digite a descrição"
            />
            {errors.description && <Text style={styles.error}>{errors.description}</Text>}

            <Text style={styles.label}>Data:</Text>
            <TextInputMask
              type={'datetime'}
              options={{ format: 'DD/MM/YYYY' }}
              style={styles.input}
              value={values.date}
              onChangeText={(text) => setFieldValue('date', text)}
              placeholder="DD/MM/YYYY"
            />
            {errors.date && <Text style={styles.error}>{errors.date}</Text>}

             <TouchableOpacity onPress={() => handleSubmit()} style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>Adicionar Viagem</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCE4EC',
    padding: 20,
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 8,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    color: '#303F9F',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderBottomColor: '#E8EAF6',
    borderBottomWidth: 2,
    borderRadius: 2,
    padding: 10,
    marginBottom: 12,
},
  error: {
    color: '#D32F2F',
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