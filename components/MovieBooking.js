import {
  Text,
  StyleSheet,
  View,
  Switch,
  Image,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import DatePicker from './DatePicker';

// Import posters from the assets folder
const sense8Poster = require('../assets/sense8.jpeg');
const bodyProblemPoster = require('../assets/3bodyproblem.jpeg');
const matrixPoster = require('../assets/matrix.jpeg');

// Movie information
const movieList = [
  {
    id: 1,
    title: 'Sense8',
    age: 16,
    poster: sense8Poster,
  },
  {
    id: 2,
    title: '3 Body Problem',
    age: 16,
    poster: bodyProblemPoster,
  },
  {
    id: 3,
    title: 'The Matrix',
    age: 16,
    poster: matrixPoster,
  },
];

export default function MovieBooking({
  screenstyle,
  data,
  setData,
}) {
  const [totalTickets, setTotalTickets] = useState(1);
  const [balcony, setBalcony] = useState(false);
  const [movieDate, setMovieDate] = useState(new Date());

  // Find the selected movie
  const selectedMovie =
    movieList.find(
      (movie) => movie.title === data.movieTitle
    ) || movieList[0];

  // Update the selected movie in shared data
  function handleChangeMovieTitle(newTitle) {
    setData((previousData) => ({
      ...previousData,
      movieTitle: newTitle,
    }));
  }

  return (
    <View style={screenstyle}>
      <Text style={styles.label}>Choose Movie</Text>

      <Picker
        style={styles.textbox}
        selectedValue={selectedMovie.title}
        onValueChange={handleChangeMovieTitle}
      >
        {movieList.map((movie) => (
          <Picker.Item
            key={movie.id}
            label={movie.title}
            value={movie.title}
          />
        ))}
      </Picker>

      {/* Selected movie poster */}
      <View style={styles.posterContainer}>
        <Image
          source={selectedMovie.poster}
          style={styles.poster}
          resizeMode="contain"
        />

        <Text style={styles.movieTitle}>
          {selectedMovie.title}
        </Text>

        <Text style={styles.age}>
          Age rating: {selectedMovie.age}+
        </Text>
      </View>

      {/* Showing date */}
      <DatePicker
        thisDate={movieDate}
        setThisdate={setMovieDate}
        datelabel="Showing Date"
      />

      {/* Number of tickets */}
      <Text style={styles.label}>
        Number of Tickets: {totalTickets}
      </Text>

      <Slider
        minimumValue={1}
        maximumValue={5}
        step={1}
        value={totalTickets}
        style={styles.sliderstyle}
        onValueChange={setTotalTickets}
      />

      {/* Balcony seating */}
      <Text style={styles.label}>Balcony</Text>

      <View style={styles.switchContainer}>
        <Switch
          value={balcony}
          onValueChange={setBalcony}
        />

        <Text style={styles.switchText}>
          {balcony
            ? 'Balcony selected'
            : 'Standard seating'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  textbox: {
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 14,
  },

  posterContainer: {
    alignItems: 'center',
    marginVertical: 12,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },

  poster: {
    width: 180,
    height: 260,
    backgroundColor: '#eeeeee',
  },

  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },

  age: {
    fontSize: 14,
    marginTop: 4,
  },

  sliderstyle: {
    width: '100%',
    marginBottom: 15,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  switchText: {
    fontSize: 16,
  },
});
