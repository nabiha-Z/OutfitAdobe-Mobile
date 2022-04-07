import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();


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

  function News2() {
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

  function News3() {
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

  function News4() {
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

  function News6() {
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
  function News5() {
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
       
    
            <Tab.Navigator
                screenOptions={{
                    labelStyle: { fontSize: 14 },
                    tabStyle: { flex: 1, justifyContent: 'center' },
                    indicatorStyle: {
                        marginHorizontal: '5%',
                        width: '40%'
                    },
                }}
            >
                <Tab.Screen name="Activity" component={Activity} />
                <Tab.Screen name="News" component={News} />
                <Tab.Screen name="News2" component={News2} />
                <Tab.Screen name="News3" component={News3} />
                <Tab.Screen name="News4" component={News4} />
                <Tab.Screen name="News5" component={News5} />
                <Tab.Screen name="News6" component={News6} />
                
            </Tab.Navigator>
     
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