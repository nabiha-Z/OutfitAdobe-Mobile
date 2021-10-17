import  React, { useEffect, useState } from 'react';
import { Button, Alert,View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DataTable } from 'react-native-paper';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignupScreen';
import VendorLogin from './screens/VendorLogin';
import LoginScreen from './screens/LoginScreen';
import VendorSignup from './screens/VendorSignup';
import SignupLocation from './screens/SignupLocation';
import WorkingHours from './screens/Workinghours';



const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} 
       options={({ navigation, route }) => ({
         title:'',
          headerStyle: {
           backgroundColor:'#47A7AB',
            height:0 
          },
          })}
          />
          <Stack.Screen name="LoginScreen" component={LoginScreen} 
       options={({ navigation, route }) => ({
         title:'Login',
          headerStyle: {
           backgroundColor:'white',
            height:100 
          },
          })}
          />
        <Stack.Screen name="VendorLogin" component={VendorLogin} 
       options={({ navigation, route }) => ({
         title:'Vendor',
          headerStyle: {
           backgroundColor:'white',
            height:100 
          },
          })}
          />
          <Stack.Screen name="SignupScreen" component={SignupScreen} 
       options={({ navigation, route }) => ({
         title:'SignUp',
          headerStyle: {
           backgroundColor:'white',
            height:100 
          },
          })}
          />
          <Stack.Screen name="VendorSignup" component={VendorSignup} 
       options={({ navigation, route }) => ({
         title:'Business Information',
          headerStyle: {
           backgroundColor:'white',
            height:100 
          },
          })}
          />
           <Stack.Screen name="SignupLocation" component={SignupLocation} 
       options={({ navigation, route }) => ({
         title:'Set your location',
          headerStyle: {
           backgroundColor:'white',
            height:100 
          },
          })}
          />
          <Stack.Screen name="WorkingHours" component={WorkingHours} 
       options={({ navigation, route }) => ({
         title:'Set your timings',
          headerStyle: {
           backgroundColor:'white',
            height:100 
          },
          })}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
 
});



export default App;