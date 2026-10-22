
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MovieBooking from './components/MovieBooking';

const STORAGE_KEY = 'movieBookingData';

export default function App() {
  const [data, setData] = useState({
    movieTitle: 'Sense8',
    movieDate: new Date().toISOString(),
    totalTickets: 1,
    balcony: false,
  });

  const [message, setMessage] = useState('');

  async function saveData() {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
      );
      setMessage('Booking saved successfully!');
    } catch (error) {
      setMessage('Could not save the booking.');
      console.error(error);
    }
  }

  async function getData() {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);

      if (savedData !== null) {
        setData(JSON.parse(savedData));
        setMessage('Booking retrieved successfully!');
      } else {
        setMessage('No saved booking found.');
      }
    } catch (error) {
      setMessage('Could not retrieve the booking.');
      console.error(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Movie Booking</Text>

        <MovieBooking
          screenstyle={styles.movieScreen}
          data={data}
          setData={setData}
        />

        <View style={styles.buttons}>
          <Button title="Save Data" onPress={saveData} />
          <Button title="Get Data" onPress={getData} />
        </View>

        {message !== '' && (
          <Text style={styles.message}>{message}</Text>
        )}

        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Selected Movie</Text>
          <Text>{data.movieTitle}</Text>
          <Text>
            Tickets: {data.totalTickets}
          </Text>
          <Text>
            Balcony: {data.balcony ? 'Yes' : 'No'}
          </Text>
          <Text>
            Showing date:{' '}
            {data.movieDate
              ? new Date(data.movieDate).toLocaleDateString()
              : 'Not selected'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  movieScreen: {
    width: '100%',
  },
  buttons: {
    gap: 12,
    marginTop: 20,
  },
  message: {
    marginTop: 12,
    fontWeight: 'bold',
  },
  summary: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
