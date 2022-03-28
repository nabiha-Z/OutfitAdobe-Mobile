
import React, { useEffect, useState, useRef } from 'react';
import { Animated, Dimensions, View, Text, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Button, Image, ListItem, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

import Home from './TabScreens/Home/Home';
import Chats from './TabScreens/Chats/Chats';
import Bookings from './TabScreens/Bookings/Bookings';
import Profile from './TabScreens/Profile/Profile';
import Notification from './TabScreens/Notifications/Notification';

import { LogBox } from 'react-native';
import _ from 'lodash';
function getWidth() {
    let width = Dimensions.get("window").width

    // Horizontal Padding = 20...
    width = width - 50

    // Total five Tabs...
    return width / 5
}

LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
LogBox.ignoreAllLogs(); // ignore all logs

export default function Dashboard({ route, navigation }) {

    const tabOffsetValue = useRef(new Animated.Value(0)).current;
    const Tab = createBottomTabNavigator();
    return (
        <>
            <Tab.Navigator screenOptions={{
                showLabel: false,
                "tabBarShowLabel": false,
                "tabBarStyle": [
                    {
                        display: "flex",
                        backgroundColor: 'white',
                        marginTop: -30,
                        position: 'absolute',
                        bottom: 20,
                        marginHorizontal: 10,
                        backgroundColor: 'white',
                        marginTop: -30,
                        bottom: 20,
                        marginHorizontal: 10,
                        // Max Height...
                        height: 60,
                        borderRadius: 10,
                        // Shadow...
                        shadowColor: '#000',
                        shadowOpacity: 0.06,
                        shadowOffset: {
                            width: 10,
                            height: 10
                        },
                        paddingHorizontal: 20,
                    },
                    null
                ],
            }}>

                {
                    // Tab Screens....

                    // Tab ICons....
                }
                <Tab.Screen name={"Home"} component={Home} options={{
                    title: '',
                    headerStyle: {
                        height:0
                    },
                    // headerLeft: () =>

                    // (<TouchableOpacity
                    // style={{padding:20,paddingLeft: 20, top: 25}}
                    //     onPress={() => navigation.popToTop()}>
                    //     <FontAwesome5 name="arrow-left" size={20} color="black" />
                    // </TouchableOpacity>),
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            // centring Tab Button...
                            position: 'absolute',
                            top: 20
                        }}>
                            <FontAwesome5
                                name="home"
                                size={20}
                                color={focused ? '#FFD933' : 'gray'}
                            ></FontAwesome5>
                        </View>
                    )
                }} listeners={({ navigation, route }) => ({
                    // Onpress Update....
                    tabPress: e => {
                        Animated.spring(tabOffsetValue, {
                            toValue: 0,
                            useNativeDriver: true
                        }).start();
                    }
                })}></Tab.Screen>

                <Tab.Screen name={"Bookings"} component={Bookings} options={{
                    title: "Bookings",
                    headerStyle: {
                        height:110
                    },
                    headerTitleStyle: {
                        color: 'black',
                        textAlign: 'center',
                        left: 140,
                        top: 25
                    },

                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            // centring Tab Button...
                            position: 'absolute',
                            top: 20
                        }}>
                            <Octicons name="calendar" size={22} color={focused ? '#FFD933' : 'gray'} />
                           
                            
                        </View>
                    )
                }} listeners={({ navigation, route }) => ({
                    // Onpress Update....
                    tabPress: e => {
                        Animated.spring(tabOffsetValue, {
                            toValue: getWidth(),
                            useNativeDriver: true
                        }).start();
                    }
                })}></Tab.Screen>


            
                <Tab.Screen name={"Profile"} component={Profile} options={({ navigation, route }) => ({
                    title: "Business Profile",
                    headerStyle: {
                        height:110
                    },
                    headerTitleStyle: {
                        color: 'black',
                        textAlign: 'center',
                        left: 90,
                        top: 25
                    },
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            // centring Tab Button...
                            width: 55,
                            height: 55,
                            backgroundColor: '#ffd933',
                            borderRadius: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: Platform.OS == "android" ? 50 : 30
                        }}>
                            <FontAwesome5
                                name="user-alt"
                                size={20}
                                color='white'
                            ></FontAwesome5>
                        </View>
                    )
                })} listeners={({ navigation, route }) => ({
                    // Onpress Update....
                    tabPress: e => {
                        Animated.spring(tabOffsetValue, {
                            toValue: getWidth() * 2,
                            useNativeDriver: true
                        }).start();
                    }
                })}></Tab.Screen>

                <Tab.Screen name={"Notifications"} component={Notification} options={{
                    title: "Notifications",
                    headerStyle: {
                        height:110
                    },
                    headerTitleStyle: {
                        color: 'black',
                        textAlign: 'center',
                        left: 105,
                        top: 25
                    },
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            // centring Tab Button...
                            position: 'absolute',
                            top: 20
                        }}>
                            <FontAwesome5
                                name="bell"
                                size={20}
                                color={focused ? '#FFD933' : 'gray'}
                            ></FontAwesome5>
                        </View>
                    )
                }} listeners={({ navigation, route }) => ({
                    // Onpress Update....
                    tabPress: e => {
                        Animated.spring(tabOffsetValue, {
                            toValue: getWidth() * 3,
                            useNativeDriver: true
                        }).start();
                    }
                })}></Tab.Screen>

                <Tab.Screen name={"Chats"} component={Chats} options={{
                    title: "Chats",
                    headerStyle: {
                        height:110
                    },
                    headerTitleStyle: {
                        color: 'black',
                        textAlign: 'center',
                        left: 140,
                        top: 25
                    },
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            // centring Tab Button...
                            position: 'absolute',
                            top: 20
                        }}>
                            
                            <Ionicons
                                name="chatbox" 
                                size={20}
                                color={focused ? '#FFD933' : 'gray'} />
                            {/* <FontAwesome5
                                name="comment"
                                size={20}
                                color={focused ? '#FFD933' : 'gray'}
                            ></FontAwesome5> */}
                        </View>
                    )
                }} listeners={({ navigation, route }) => ({
                    // Onpress Update....
                    tabPress: e => {
                        Animated.spring(tabOffsetValue, {
                            toValue: getWidth() * 4,
                            useNativeDriver: true
                        }).start();
                    }
                })}></Tab.Screen>

            </Tab.Navigator>

            <Animated.View style={{
                width: getWidth() - 20,
                height: 2,
                backgroundColor: '#FFD933',
                position: 'absolute',
                bottom: 80,
                // Horizontal Padding = 20...
                left: 36,
                borderRadius: 20,
                transform: [
                    { translateX: tabOffsetValue }
                ]
            }}>

            </Animated.View>
        </>

    );
}