
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View, Text, TextInput, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import ImagedCarouselCard from "react-native-imaged-carousel-card";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Favourites({ route, navigation }) {

    const [searchTxt, setSearchField] = useState("");
    const [Items, setItems] = useState([]);
    const [saved, setSaved] = useState([]);
    const [fetchingData, setFetching] = useState(false);
    const [favouriteItems, setFavourites] = useState([]);
    const [count, setCount] = useState(0);
    const SCREEN_WIDTH = Dimensions.get('window').width;
    const SCREEN_HEIGHT = Dimensions.get('window').height;
    const [check, setCheck] = useState(false);
    const savedLists = [];

    const API_URL = 'https://outfitadobe-server.herokuapp.com';
    // const API_URL = 'http://192.168.100.8:8000';



    const loadSaved = async () => {
        setFetching(true);
        var user = await AsyncStorage.getItem('user');
        console.log("in funct", user);

        await fetch(`${API_URL}/user/viewFavourites`, {

            method: "POST",
            body: JSON.stringify({
                id: user,flag:"1"
            }),

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        .then(async res => {
            try {

                const jsonRes = await res.json();

                if (jsonRes.message === true) {
                    setSaved(jsonRes.favourites);
                    console.log("len: ", jsonRes.favourites.length)
                    setFetching(false);

                } else {
                    console.log("error found ", jsonRes.error)
                }

            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log("error: ", err.message);
        });

    }
    useEffect(() => {

        loadSaved();

    }, [check]);




    const LoadingData = () => {
        return (
            <>
                <ActivityIndicator size="large" color="#FBD92C" />
                {/* <Text style={{ paddingTop: 20, color: '#DEBF4D', textAlign: 'center' }}>
          Loading Data from JSON Placeholder API ...
        </Text> */}
            </>
        );

    };

    const unfav = (item) => {

        var fav = favouriteItems;

        
    }


    return (
        <View style={styles.container}>

            {fetchingData ? <LoadingData /> :
                saved.length !== 0 ? (
                    <>
                        <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.heading}>
                                Saved Products
                            </Text>

                            <View style={{ justifyContent: 'space-between' }}>


                                {saved.map((item, key) =>
                                (
                                    <View
                                        style={[styles.picksView, styles.elevation]}>
                                        <ImagedCarouselCard
                                            text=""
                                            width={SCREEN_WIDTH * 0.5}
                                            height={SCREEN_WIDTH * 0.5}
                                            shadowColor="#051934"
                                            source={{ uri: item.picture }}
                                            style={{ margin: 13 }}
                                            overlayHeight={0}


                                        />
                                        <View style={styles.caption}>
                                            <View style={styles.description}>
                                                <Text style={styles.subheading}>{item.title}</Text>
                                                <TouchableOpacity

                                                    activeOpacity={0.4}
                                                    onPress={() => unfav(item)} style={{ marginLeft: 10 }}>
                                                    <Ionicons name="heart" color='#F75451' size={30}></Ionicons>
                                                </TouchableOpacity>
                                            </View>

                                           
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                                                <Text style={[styles.subheading, { color: '#1CAFCA', fontSize: 19 }]}>Rs. {item.price}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                                )}

                            </View>

                            <View style={{ padding: 40 }}>

                            </View>
                        </ScrollView>
                    </>) : (
                    <View style={styles.container2}>
                        <Text style={styles.heading}>No Matching Results Found</Text>
                        <Image
                            source={require('../../../../images/draw9.png')}
                            style={{ width: '50%', height: '25%' }}
                        />
                    </View>
                )
            }


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white'
    },
    container2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    header: {
        textAlign: 'center',
        fontSize: 18,
        padding: 16,
        marginTop: 16,
    },
    topBar: {
        backgroundColor: 'white',
        height: 80,
        padding: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#D6D8D9',
        marginTop: 30

    },
    searchContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        flexDirection: 'row',
        marginTop: -20
    },
    searchField: {
        borderWidth: 1,
        borderColor: '#ADAFB5',
        borderRadius: 20,
        width: '70%',
        textAlign: 'center',
        margin: 10
    },
    heading: {
        fontSize: 30,
        marginTop: 10,
        padding: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#4D4C4A'
    },
    txt: {
        color: '#AAAAAB',
        padding: 5,
        paddingTop: 0,
        fontSize: 12
    },
    subheading: {
        color: '#343537',
        padding: 0,
        fontSize: 20,
        fontWeight: 'bold',
        height: 40,
    },
    picksView: {
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 6,
        alignItems: 'center'

    },
    elevation: {
        elevation: 5,
        shadowColor: '#52006A',
    },
    description: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 6,
        marginTop: 26

    },
    btnView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 5,
        marginBottom: 10
    },
    btn: {
        borderRadius: 7,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchIcon: {
        position: 'absolute',
        marginTop: 10,
        backgroundColor: '#FFC431',
        padding: 5,
        width: 30,
        height: 30,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 5,
        marginBottom: 10
    },
    btn: {
        borderRadius: 7,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    caption: {
        borderWidth: 0,
        borderColor: '#EBE7E6',
        borderRadius: 10,
        marginTop: -28,
        borderTopWidth: 0,
        marginBottom: 20,
        alignSelf: 'center',
        padding: 0,
        marginHorizontal: 20
    },
});

