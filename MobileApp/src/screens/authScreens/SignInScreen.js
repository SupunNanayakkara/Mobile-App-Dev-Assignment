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

const SignInScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const userLogin = () => {
    if (email === '' && password === '') {
      Alert.alert('Enter ');
    } else {
      setIsLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log(res);
          console.log('User logged-in successfully!');
          setEmail('');
          setPassword('');
          setIsLoading(false);
          navigation.navigate('Dashboard');
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
        placeholder="Email"
        value={email}
        onChangeText={val => setEmail(val)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Password"
        value={password}
        onChangeText={val => setPassword(password)}
        maxLength={15}
        secureTextEntry={true}
      />
      <Button color="#3740FE" title="Sign In" onPress={() => userLogin()} />

      <Text
        style={styles.loginText}
        onPress={() => navigation.navigate('Signup')}>
        Create New Account
      </Text>
    </View>
  );
};

export default SignInScreen;

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

{
  /* 
<View style={styles.container}>
      <View>
        <Header title="Sign In" type="arrow-left" />
      </View>

      <View style={{marginTop: 30}}>
        <View>
          <Input
            placeholder="Email"
            leftIcon={<Icon name="email" size={24} color="black" />}
          />
        </View>

        <View>
          <Input
            placeholder="Password"
            leftIcon={<Icon name="lock" size={24} color="black" />}
            secureTextEntry={true}
          />
        </View>

        <View style={{marginHorizontal: 20, marginVertical: 20}}>
          <Button
            title="Login"
            buttonStyle={parameters.styledLoginButton}
            titleStyle={parameters.loginButtonTitle}
          />
        </View>

        <View style={{alighItem: 'center', marginTop: 15}}>
          <Text
            style={{color: 'blue'}}
            onPress={() => Linking.openURL('http://google.com')}>
            Forgotten password?
          </Text>
        </View>

        <View style={{marginHorizontal: 20, marginVertical: 20}}>
          <Button
            title="Create Account"
            buttonStyle={parameters.styledCreateButton}
            titleStyle={parameters.createButtonTitle}
          />
        </View>
      </View>
    </View>
*/
}
