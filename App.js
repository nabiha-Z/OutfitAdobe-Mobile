import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Button, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignupScreen';
import VendorLogin from './screens/VendorLogin';
import LoginScreen from './screens/LoginScreen';
import VendorSignup from './screens/VendorSignup';
import SignupLocation from './screens/SignupLocation';
import WorkingHours from './screens/Workinghours';
import Dashboard from './screens/Vendor/Dashboard';
import StaffDetails from './screens/Vendor/TabScreens/Profile/Staffs';
import AddStaff from './screens/Vendor/TabScreens/Profile/NewStaff';
import ContactScreen from './screens/Vendor/TabScreens/Profile/Contact';
import SettingScreen from './screens/Vendor/TabScreens/Profile/Settings';
import CalendarScreen from './screens/Vendor/TabScreens/Profile/Calendar';
import Location from './screens/Vendor/TabScreens/Profile/Location';
import Password from './screens/Vendor/TabScreens/Profile/Password';
import user_Password from './screens/user/TabScreens/Profile/Password';
import user_Contact from './screens/user/TabScreens/Profile/Contact';
import user_Setting from './screens/user/TabScreens/Profile/Settings';
import Dashboard_user from './screens/user/Dashboard';
import Details from './screens/user/Details';
import BookingScreen from './screens/user/BookingScreen';
import PaymentScreen from './screens/user/PaymentScreen';
import Chats from './screens/Vendor/TabScreens/Chats/userChat';
import user_Chats from './screens/user/TabScreens/Chats/userChat';
import ServicesDetails from './screens/Vendor/TabScreens/Profile/Services';
import NewService from './screens/Vendor/TabScreens/Profile/NewService';
import InventoryDetails from './screens/Vendor/TabScreens/Profile/Inventory';
import NewInventory from './screens/Vendor/TabScreens/Profile/NewInventory';
import BookingDetails from './screens/user/BookingDetails';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}
          options={({ navigation, route }) => ({
            title: '',
            headerStyle: {
              backgroundColor: '#47A7AB',
              height: 0
            },
          })}
        />
        <Stack.Screen name="Dashboard_user" component={Dashboard_user}
          options={({ navigation, route }) => ({
            title: '',
            headerStyle: {
              backgroundColor: '#47A7AB',
              height: 0
            },
            headerLeft: null
          })}
        />
        <Stack.Screen name="Chat" component={Chats}
          options={({ navigation, route }) => ({
            title: '',
            headerStyle: {
              backgroundColor: '#47A7AB',
              height: 0
            },
          })}
        />
        <Stack.Screen name="user_Chat" component={user_Chats}
          options={({ navigation, route }) => ({
            title: route.params.name,
            headerStyle: {
              backgroundColor: '#FFFFFF',

            },

          })}
        />
        <Stack.Screen name="LoginScreen" component={LoginScreen}
          options={({ navigation, route }) => ({
            title: 'Login',
            headerStyle: {
              backgroundColor: 'white',
              height: 100
            },
          })}
        />
        <Stack.Screen name="VendorLogin" component={VendorLogin}
          options={({ navigation, route }) => ({
            title: 'Vendor',
            headerStyle: {
              backgroundColor: 'white',
              height: 100
            },
          })}
        />
        <Stack.Screen name="SignupScreen" component={SignupScreen}
          options={({ navigation, route }) => ({
            title: 'SignUp',
            headerStyle: {
              backgroundColor: 'white',
              height: 100
            },
          })}
        />
        <Stack.Screen name="VendorSignup" component={VendorSignup}
          options={({ navigation, route }) => ({
            title: 'Business Information',
            headerStyle: {
              backgroundColor: 'white',
              height: 100
            },
          })}
        />
        <Stack.Screen name="SignupLocation" component={SignupLocation}
          options={({ navigation, route }) => ({
            title: 'Set your location',
            headerStyle: {
              backgroundColor: 'white',
              height: 100
            },
          })}
        />
        <Stack.Screen name="WorkingHours" component={WorkingHours}
          options={({ navigation, route }) => ({
            title: 'Set your timings',
            headerStyle: {
              backgroundColor: 'white',
              height: 100
            },
          })}
        />
        <Stack.Screen name="Dashboard" component={Dashboard}
          options={({ navigation, route }) => ({
            title: '',
            headerStyle: {
              backgroundColor: '#47A7AB',
              height: 0
            },
            headerLeft: null
          })}
        />

        <Stack.Screen name="StaffDetails" component={StaffDetails}
          options={({ navigation, route }) => ({
            title: 'Staff Details',
            headerStyle: {
              height: 100
            },
            headerTitleStyle: {
              color: 'black',
              textAlign: 'center',
              left: 60,
            },
          })}
        />
        <Stack.Screen name="AddStaff" component={AddStaff}
          options={({ navigation, route }) => ({
            title: 'New Staff',
            headerTitleStyle: {
              color: 'black',
              textAlign: 'center',
              left: 70,
            },
          })}
        />
        <Stack.Screen name="ProductDetails" component={InventoryDetails}
          options={({ navigation, route }) => ({
            title: 'Product Details',
            headerStyle: {
              height: 100
            },
            headerTitleStyle: {
              color: 'black',
              textAlign: 'center',
              left: 60,
            },
          })}
        />
        <Stack.Screen name="AddProduct" component={NewInventory}
          options={({ navigation, route }) => ({
            title: 'New Product',
            headerTitleStyle: {
              color: 'black',
              textAlign: 'center',
              left: 70,
            },
          })}
        />
        <Stack.Screen name="ServiceDetails" component={ServicesDetails}
          options={({ navigation, route }) => ({
            title: 'Service Details',
            headerStyle: {
              height: 100
            },
            headerTitleStyle: {
              color: 'black',
              textAlign: 'center',
              left: 60,
            },
          })}
        />
        <Stack.Screen name="AddService" component={NewService}
          options={({ navigation, route }) => ({
            title: 'New Service',
            headerTitleStyle: {
              color: 'black',
              textAlign: 'center',
              left: 70,
            },
          })}
        />
        <Stack.Screen name="ContactScreen" component={ContactScreen}
          options={({ navigation, route }) => ({
            title: 'Contact Center',
            headerTitleStyle: {
              color: 'black',
              textAlign: 'center',
              left: 50,
            },
          })}
        />
        <Stack.Screen name="user_ContactScreen" component={user_Contact}
          options={({ navigation, route }) => ({
            title: 'Contact Center',
            headerTitleStyle: {
              color: 'black',
              textAlign: 'center',
              left: 50,
            },
          })}
        />

        <Stack.Screen name="SettingScreen" component={SettingScreen}
          options={({ navigation, route }) => ({
            title: '',
            headerStyle: {
              height: 0,

            },
          })}

        />
        <Stack.Screen name="user_SettingScreen" component={user_Setting}
          options={({ navigation, route }) => ({
            title: '',
            headerStyle: {
              height: 0,

            },
          })}

        />
        <Stack.Screen name="CalendarScreen" component={CalendarScreen}
          options={({ navigation, route }) => ({
            title: 'Change Calendar',
            headerStyle: {
              height: 100,
            },
            headerTitleStyle: {

              color: 'black',
              textAlign: 'center',
              left: 30,
            },
          })}

        />

        <Stack.Screen name="Location" component={Location}
          options={({ navigation, route }) => ({
            title: 'Change Location',
            headerStyle: {
              height: 100,
            },
            headerTitleStyle: {

              color: 'black',
              textAlign: 'center',
              left: 30,
            },
          })}

        />

        <Stack.Screen name="Password" component={Password}
          options={({ navigation, route }) => ({
            title: 'Change Password',
            headerStyle: {
              height: 100,
            },
            headerTitleStyle: {

              color: 'black',
              textAlign: 'center',
              left: 30,
            },
          })}

        />
        <Stack.Screen name="user_Password" component={user_Password}
          options={({ navigation, route }) => ({
            title: 'Change Password',
            headerStyle: {
              height: 100,
            },
            headerTitleStyle: {

              color: 'black',
              textAlign: 'center',
              left: 30,
            },
          })}

        />
        <Stack.Screen name="bookingscreen" component={BookingScreen}
          options={({ navigation, route }) => ({
            title: '',
            headerStyle: {
              height: 0,

            },
          })}

        />
        <Stack.Screen name="details" component={Details}
          options={({ navigation, route }) => ({
            title: '',
            headerStyle: {
              height: 0,

            },



          })}

        />
        <Stack.Screen name="paymentscreen" component={PaymentScreen}
          options={({ navigation, route }) => ({
            title: '',
            headerStyle: {
              height: 0,

            },
          })}

        />

        <Stack.Screen name="bookingdetails" component={BookingDetails}
          options={({ navigation, route }) => ({
            title: '',
            headerStyle: {
              height: 0,

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