import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Tab = createMaterialTopTabNavigator();
import SignInScreen from "../../UserAuthentication/SigninScreen";

const FLASK_API = 'http://127.0.0.1:5000';


function Activity() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>No new activity</Text>

      <Image
        source={require('../../../../images/activity.png')}
        style={{ width: '50%', height: '25%' }}
      />
    </View>
  );
}






export default function Notifications() {

  const takemeasurements = async() =>{
    const uid = await AsyncStorage.getItem('user');
    console.log(uid);

    fetch("http://192.168.100.2:5000/measurements", {
      method: 'POST',
      body: JSON.stringify({
        user: uid
    }),

    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
  })
      .then(async res => {
          try {
  
              const jsonRes = await res.json();
              console.log("response: ", jsonRes);
             
          } catch (err) {
              console.log(err);
          };
      })
      .catch(err => {
          console.log("error: ", err.message);
      });
  }
  return (
    <>
      <View>
        <TouchableOpacity onPress={()=>takemeasurements()} style={{backgroundColor:'pink', width:'50%', padding:20}}>
          <Text>
            Measurements
          </Text>
        </TouchableOpacity>

      </View>

      {/* <Tab.Navigator
                screenOptions={{
                    labelStyle: { fontSize: 14 },
                    tabStyle: { flex: 1, justifyContent: 'center',  },
                    indicatorStyle: {
                        marginHorizontal: '5%',
                        width: '40%'
                    },
                }}
            >
                <Tab.Screen name="Sign In" component={SignInScreen} />
                <Tab.Screen name="News" component={News} />
                
            </Tab.Navigator> */}

    </>
  )


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    margin: 25,
    fontWeight: 'bold',
    color: '#5B5A59',
    marginTop: -50
  },
})