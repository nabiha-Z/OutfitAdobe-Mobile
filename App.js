import React, { useEffect, useState, useMemo, useContext, useReducer } from 'react';
import { StyleSheet, RefreshControl } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import CalendarScreen from './screens/Vendor/TabScreens/Profile/Calendar';
import Location from './screens/Vendor/TabScreens/Profile/Location';
import Password from './screens/Vendor/TabScreens/Profile/Password';
import user_Password from './screens/user/TabScreens/Profile/Password';
import user_Contact from './screens/user/TabScreens/Profile/Contact';
import SettingScreen from './screens/user/TabScreens/Profile/Settings';
import ChangePicture from './screens/user/TabScreens/Profile/ChangePicture';
import Favourites from './screens/user/TabScreens/Profile/Favourites';
import Dashboard_user from './screens/user/Dashboard';
import Details from './screens/user/Details';
import SearchedCategory from './screens/user/SearchCategory';
import SearchServices from './screens/user/SearchedServices';
import SignInScreen from './screens/user/UserAuthentication/SigninScreen';
import SignupScreen from './screens/user/UserAuthentication/SignupScreen';
import ForgotPassword from './screens/user/UserAuthentication/ForgotPassword';
import CodeVerification from './screens/user/UserAuthentication/CodeVerfication';
import ResetPassword from './screens/user/UserAuthentication/ResetPassword';
import MeasurementScreen from './screens/user/MeasuremenetsScreen'
import CameraScreen from './screens/user/CameraScreen';
import TryOnScreen from './screens/user/TryOnScreen';
import { AuthContext } from './components/context';


const Stack = createStackNavigator();
import AsyncStorage from '@react-native-async-storage/async-storage';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

function App() {

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(900).then(() => setRefreshing(false));
  }, []);

  const initialLoginState = {
    isLoading: true,
    userID: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'LOGGED_IN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userID: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userID: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userID: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    loggedIN: async (token) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      const userToken = token;

      try {
        await AsyncStorage.getItem('userToken', userToken);

      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userID, token: userToken });
    },
    signIn: async (currentUser, token) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      console.log("currentUser: ", currentUser)
      const userToken = token;
      const userID = String(currentUser);
      try {
        await AsyncStorage.setItem('userToken ', userToken);
        await AsyncStorage.setItem('user', userID);
        const y = await AsyncStorage.getItem('user');
        console.log("token set", y)
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userID, token: userToken });
    },
    signOut: async () => {
      // setUserToken(null);
      // setIsLoading(false);
      try {

        const u = await AsyncStorage.getItem('userToken');

        console.log("logged out: ")
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('user');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: async () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
  }), []);

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;

      try {
        var counts = "0,0,0,0,0,0";
        await AsyncStorage.setItem('counts', counts);
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGGED_IN', token: userToken });

    }, 1000);

  }, []);

  if (loginState.isLoading) {
    console.log("loading ..... ")
    // return (
    //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //     <ActivityIndicator size="large" />
    //   </View>
    // );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>

        <Stack.Navigator>
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

          <Stack.Screen name="SignInScreen" component={SignInScreen}
            options={({ navigation, route }) => ({
              title: '',
              headerStyle: {
                backgroundColor: '#47A7AB',
                height: 0
              },
            })}
          />

          <Stack.Screen name="ForgotPassword" component={ForgotPassword}
            options={({ navigation, route }) => ({
              title: '',
              headerStyle: {
                backgroundColor: 'white',
                height: 100
              },
            })}
          />

          <Stack.Screen name="CodeVerification" component={CodeVerification}
            options={({ route, navigation }) => ({
              title: 'OTP Code',
              headerStyle: {
                backgroundColor: 'white',
                height: 100
              },
            })}
          />


          <Stack.Screen name="SignupScreen" component={SignupScreen}
            options={({ navigation, route }) => ({
              title: 'Signup',
              headerStyle: {
                backgroundColor: 'white',
                height: 100
              },
              headerTitleStyle: {
                color: 'black',
                textAlign: 'center',
                left: 70,
              },
            })}
          />


          <Stack.Screen name="MeasurmenetScreen" component={MeasurementScreen}
            options={({ navigation, route }) => ({
              title: 'Measurements',
              headerStyle: {
                backgroundColor: 'white',
                height: 100
              },
              headerTitleStyle: {
                color: 'black',
                textAlign: 'center',
                left: 45,
              },
            })}
          />

          <Stack.Screen name="CameraScreen" component={CameraScreen}
            options={({ navigation, route }) => ({
              title: '',
              headerStyle: {
                backgroundColor: 'white',
                height: 0
              },
            })}
          />

          <Stack.Screen name="TryOnScreen" component={TryOnScreen}
            options={({ navigation, route }) => ({
              title: '',
              headerStyle: {
                backgroundColor: 'white',
                height: 0
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
              headerLeft: null
            })}
          />

          <Stack.Screen name="change_picture" component={ChangePicture}
            options={({ navigation, route }) => ({
              title: 'Profile Image',
              headerTitleStyle: {
                color: 'black',
                textAlign: 'center',
                left: 60,
              },
            })}
          />

          <Stack.Screen name="ResetScreen" component={ResetPassword}
            options={({ navigation, route }) => ({
              title: 'Reset Password',
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

          <Stack.Screen name="favourites" component={Favourites}
            options={() => ({
              title: 'Favourites',
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
          {/* <Stack.Screen name="bookingscreen" component={BookingScreen}
            options={() => ({
              title: '',
              headerStyle: {
                height: 0,

              },
            })}

          /> */}
          <Stack.Screen
            name="Details"
            component={Details}
            options={({ navigation, route }) => ({
              title: '',
              headerStyle: {
                height: 100,
              },



            })}

          />

          {/* <Stack.Screen name="bookingdetails" component={BookingDetails}
            options={({ navigation, route }) => ({
              title: '',
              headerStyle: {
                height: 0,

              },
            })}

          /> */}
          <Stack.Screen name="search-screen" component={SearchedCategory}
            options={({ navigation, route }) => ({
              title: 'Search Products',
              headerStyle: {
                height: 100,
              },
              headerTitleStyle: {
                color: 'black',
                textAlign: 'center',
                left: 40,
                fontWeight: 'bold'
              },
            })}

          />

          <Stack.Screen name="search-services" component={SearchServices}
            options={({ navigation, route }) => ({
              title: '',
              headerStyle: {
                height: 0,
              },
              headerLeft: null,
            })}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
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