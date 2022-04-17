import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
import SignInScreen from "../../SigninScreen";


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
  
  function News() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>No new news</Text>
        <Image
        source={require('../../../../images/news.png')}
        style={{ width: '50%', height: '25%' }}
      />
      </View>
    );
  }




export default function Notifications() {
    return (
        <>
       <View>
         <Text>
           Cart
         </Text>
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
        marginTop:-50
    },
})