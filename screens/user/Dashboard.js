import React, { useEffect, useState, useRef } from 'react';
import { Animated, Dimensions, View, RefreshControl, TouchableOpacity, Button, Image, ListItem, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Entypo, FontAwesome5, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import Home from './TabScreens/Home/Home';
import Cart from './TabScreens/Cart/Cart';
import EmptyCart from './TabScreens/Cart/EmptyCart';
import Store from './TabScreens/Store/Store';
import Profile from './TabScreens/Profile/Profile';
import SigninScreen from './UserAuthentication/SigninScreen';
import Notification from './TabScreens/Notifications/Notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Dashboard({ route, navigation }) {


    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(900).then(() => setRefreshing(false));
    }, []);

    const tabOffsetValue = useRef(new Animated.Value(0)).current;
    const Tab = createBottomTabNavigator();
    const [token, setToken] = useState(null);
    const [check, setCheck] = useState(true);
    const [prev, setprev] = useState(null)

    async function fetchData() {
        var userToken = await AsyncStorage.getItem('user');
        setToken(userToken);
        console.log("Tokenn in storage:", userToken);
    }
    useEffect(() => {
        fetchData();
        console.log("check: ", check)
    }, [check])

    return (
        <>

            <Tab.Navigator initialRouteName='Home' screenOptions={{
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
            }}
            >

                {
                    // Tab Screens....

                    // Tab ICons....
                }
                <Tab.Screen name={"Home"} component={Home} options={{
                    title: '',
                    headerStyle: {
                        height: 0
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
                                color={focused ? '#9C626B' : '#BCBCBF'}
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

                <Tab.Screen name={"Store"} component={Store} options={{
                    title: "",
                    headerStyle: {
                        height: 0
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
                            <Entypo name="shop" size={22} color={focused ? '#9C626B' : '#BCBCBF'} />


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



                <Tab.Screen name={"Profile"} children={() => token === null ? <SigninScreen check={check} setCheck={setCheck} />
                    :
                    <Profile check={check} setCheck={setCheck} />}
                    options={({ navigation, route }) => ({
                        title: token != null ? " Profile Info " : "",
                        headerStyle: {
                            height: token === null ? 0 : 100
                        },
                        headerTitleStyle: {
                            color: 'black',
                            textAlign: 'center',
                            left: 110,
                            fontWeight:'bold',
                            top: token === null ? 0 : 20,

                        },
                        tabBarIcon: ({ focused }) => (
                            <View style={{
                                // centring Tab Button...
                                width: 55,
                                height: 55,
                                backgroundColor: '#9C626B',
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

                <Tab.Screen name={"Cart"} component={token === null ? EmptyCart:Cart}
                 options={{
                    title: "Your Cart",
                    headerStyle: {
                        height: 110
                    },
                    headerTitleStyle: {
                        color: 'black',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        letterSpacing: 1,
                        left: 115,
                        top: 25
                    },
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            // centring Tab Button...
                            position: 'absolute',
                            top: 20
                        }}>
                            <FontAwesome
                                name="opencart"
                                size={20}
                                color={focused ? '#9C626B' : '#BCBCBF'}
                            ></FontAwesome>
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

                <Tab.Screen name={"Notfication"} component={Notification} options={{
                    title: "Notification",
                    headerStyle: {
                        height: 110
                    },
                    headerTitleStyle: {
                        color: '#3D3F3F',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        letterSpacing: 1,
                        left: 115,
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
                                color={focused ? '#9C626B' : '#BCBCBF'} />
                            {/* <FontAwesome5
                                name="comment"
                                size={20}
                                color={focused ? '#9C626B' : '#BCBCBF'}
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
                backgroundColor: '#9C626B',
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