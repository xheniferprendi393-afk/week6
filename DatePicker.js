import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePicker({
  thisDate,
  setThisdate,
  datelabel,
}) {
  const [showDTP, setShowDTP] = useState(false);

  function handleDateChange(event, selectedDate) {
    setShowDTP(false);

    if (selectedDate) {
      setThisdate(selectedDate);
    }
  }

  // Web date selector
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{datelabel}</Text>

        <input
          type="date"
          value={
            thisDate
              ? `${thisDate.getFullYear()}-${String(
                  thisDate.getMonth() + 1
                ).padStart(2, '0')}-${String(
                  thisDate.getDate()
                ).padStart(2, '0')}`
              : ''
          }
          onChange={(event) => {
            if (event.target.value) {
              const [year, month, day] =
                event.target.value.split('-').map(Number);

              setThisdate(new Date(year, month - 1, day));
            }
          }}
          style={{
            width: '100%',
            padding: 12,
            fontSize: 16,
            border: '1px solid #cccccc',
            borderRadius: 6,
            boxSizing: 'border-box',
          }}
        />
      </View>
    );
  }

  // Native date selector for Android and iOS
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{datelabel}</Text>

      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDTP(true)}
      >
        <Text style={styles.dateText}>
          {thisDate
            ? thisDate.toLocaleDateString()
            : 'Choose Date'}
        </Text>
      </TouchableOpacity>

      {showDTP && (
        <DateTimePicker
          value={thisDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },

  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  dateButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 6,
    padding: 12,
  },

  dateText: {
    fontSize: 16,
    color: '#222222',
  },
});
