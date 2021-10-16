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
import firebase from '../../database/firebaseDB';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const createUser = () => {
    if (email === '' && password === '' && name === '') {
      Alert.alert('Enter Details to Create New User!');
    } else {
      setIsLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          res.user.updateProfile({
            displayName: name,
          });
          console.log('User Created Successfully!');
          setName('');
          setEmail('');
          setPassword('');
          setIsLoading(false);
          navigation.navigate('Login');
        })
        .catch(error => {
            setErrMsg(error.message);
            if (error.code === 'auth/email-already-in-use') {
              console.log('The email address is already in use!');
              Alert.alert('Email address is already in use!');
            }
        
            if (error.code === 'auth/invalid-email') {
              console.log('The email address is invalid!');
              Alert.alert('Email address is invalid!');
            }
        
            console.error(error);
          })
    }
  };

  if (isLoading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        placeholder="Name"
        value={name}
        onChangeText={val => setName(val)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Email"
        value={email}
        onChangeText={val => setEmail(val)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Password"
        value={password}
        onChangeText={val => setPassword(val)}
        maxLength={15}
        secureTextEntry={true}
      />
      <Button color="#3740FE" title="Signup" onPress={() => createUser()} />

      <Text
        style={styles.loginText}
        onPress={() => navigation.navigate('Login')}>
        Already Registered? Click here to login
      </Text>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 35,
    backgroundColor: '#fff',
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
