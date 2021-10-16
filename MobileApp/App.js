import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from './src/screens/authScreens/SignInScreen';
import SignUpScreen from './src/screens/authScreens/SignUpScreen';

import {View, Text, StyleSheet, Dimension, StatusBar} from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#3740FE',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Login"
          component={SignInScreen}
          options={({title: 'Login'}, {headerLeft: null})}
        />
        <Stack.Screen
          name="Signup"
          component={SignUpScreen}
          options={{title: 'Sign Up'}}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={({title: 'Dashboard'}, {headerLeft: null})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

{/*const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

<View style={styles.container}>
<StatusBar barStyle="light-content" backgroundColor={colors.statusbar} />

<SignInScreen />
</View>;*/}
