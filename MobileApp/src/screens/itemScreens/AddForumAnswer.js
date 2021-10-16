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

let addForum = (title, description, date) => {
  firestore().collection('Forum').add({
    forumTitle: title,
    description: description,
    date: date,
    answer_list:{}
  });
};

const AddAnswer = () => {
  //const [forumTitle, setForumTitle] = useState('');
  const [description, setDescription] = useState('');
  //const [date, setDate] = useState('');

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

  const handleSubmit = () => {
    if(title != '' && description != ''){
        addForum(forumTitle, description, today);
        Alert.alert("Answer Saved Successfully");
    }
    else{
        Alert.alert("Fill Remaining Fields!");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}> ADD ANSWER</Text>
      {/*<View style={styles.inputGroup}>
        <TextInput
          placeholder={'Title'}
          value={forumTitle}
          onChangeText={val => setForumTitle(val)}
        />
      </View>*/}
      <View style={styles.inputGroup}>
        <TextInput
          multiline={true}
          numberOfLines={6}
          placeholder={'Answer'}
          value={description}
          onChangeText={val => setDescription(val)}
        />
      </View>
      
      <View style={styles.button}>
        <Button title="Submit Answer" onPress={() => handleSubmit()} />
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

export default AddAnswer;
