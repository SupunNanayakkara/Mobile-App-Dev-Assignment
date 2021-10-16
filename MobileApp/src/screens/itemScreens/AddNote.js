import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import DatePicker from 'react-native-datepicker';

let addNote = (title, description, date) => {
  firestore().collection('Notes').add({
    noteTitle: title,
    description: description,
    date: date,
  });
};

const AddNote = () => {
  const [noteTitle, setNoteTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

  const handleSubmit = () => {
    if(title != '' && description != '' && date != ''){
        addNote(noteTitle, description, date);
        Alert.alert("Note Saved Successfully");
    }
    else{
        Alert.alert("Fill Remaining Fields!");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}> ADD NOTE</Text>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder={'Title'}
          value={noteTitle}
          onChangeText={val => setNoteTitle(val)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          multiline={true}
          numberOfLines={5}
          placeholder={'Description'}
          value={description}
          onChangeText={val => setDescription(val)}
        />
      </View>
      <View style={styles.inputGroup}>
        <DatePicker
          style={{width: 200}}
          date={this.state.date}
          mode="date"
          placeholder="Select Date"
          format="YYYY-MM-DD"
          minDate={today}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={date => setDate(date)}
        />
      </View>
      <View style={styles.button}>
        <Button title="Add Note" onPress={() => handleSubmit()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    marginTop: 15,
    marginBottom: 15,
    padding: 35,
    color: 'blue',
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'green',
    color: 'white',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default AddNote;
