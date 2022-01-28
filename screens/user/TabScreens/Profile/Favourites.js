
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View, Text, TextInput, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native'
import firebase from 'firebase/app';
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import ImagedCarouselCard from "react-native-imaged-carousel-card";

export default function Favourites({ route, navigation }) {

    const db = firebase.firestore();
    const auth = firebase.auth();
    const [searchTxt, setSearchField] = useState("");
    const [check, setcheck] = useState(true);
    const [Items, setItems] = useState([]);
    const [fetchingData, setFetching] = useState(false);
    const [favouriteItems, setFavourites] = useState([]);
    const [count, setCount] = useState(0);
    const SCREEN_WIDTH = Dimensions.get('window').width;
    const SCREEN_HEIGHT = Dimensions.get('window').height;

    useEffect(() => {

        if (Items.length === 0) {
            setCount(1);
        }
        setFetching(true);
        db.collection('users').get().then(
            (data) => {
                data.docs.map(
                    (data1) => {
                        if (data1.id === auth.currentUser.uid) {
                            var a = data1.data();
                            var fav = a.favourites;
                            setFavourites(fav);

                        }
                    }
                )
            })

            var temp = [];

        db.collection('services').get().then(

            (data) => {
                
                data.docs.map((data1) => {
                    favouriteItems.map((item) => {
                        if (item === data1.id) {
                            var a = data1.data();
                            a.id = data1.id;
                            temp.push(a);
                        }

                    })
                }
                )
                setItems(temp);
                setFetching(false);
            })
            if(count===0){
                setItems(temp);
                
                check?setcheck(false):setcheck(true);
                setCount(2);
            }

    }, [check])

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

        fav = fav.filter(val => val !== item.id)
        setFavourites(fav);

        db.collection("users").doc(auth.currentUser.uid).update({
            favourites: fav
        }).then(
            (data) => {
                check ? setcheck(false) : setcheck(true);

            }
        )
    }


    return (
        <View style={styles.container}>

            {fetchingData ? <LoadingData /> :
                Items.length !== 0 ? (
                    <>
                        <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.heading}>
                                Saved Services
                            </Text>

                            <View style={{ justifyContent:'space-between' }}>


                                {Items.map((item, key) =>
                                (
                                    <View
                                        style={[styles.picksView, styles.elevation]}>
                                        <ImagedCarouselCard
                                            text=""
                                            width={SCREEN_WIDTH * 0.5}
                                            height={SCREEN_WIDTH * 0.5}
                                            shadowColor="#051934"
                                            source={{ uri: item.img }}
                                            style={{ margin: 13 }}
                                            overlayHeight={0}


                           />
                                        <View style={styles.caption}>
                                            <View style={styles.description}>
                                                <Text style={styles.subheading}>{item.name}</Text>
                                                <TouchableOpacity
                                                    
                                                    activeOpacity={0.4}
                                                    onPress={() => unfav(item)} style={{ marginLeft: 10 }}>
                                                    <Ionicons name="heart" color='#F75451' size={30}></Ionicons>
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 5 }}>
                                                <MaterialCommunityIcons
                                                    name="clock"
                                                    size={17}
                                                    color="#BFC0C3"
                                                />
                                                <Text style={[styles.txt]}>{item.time1} - {item.time2}</Text>

                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                                                <Text style={[styles.subheading, { color: '#10B984', fontSize: 19 }]}>$ {item.price}</Text>
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
        margin:10,
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

