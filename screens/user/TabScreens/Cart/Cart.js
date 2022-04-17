import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AntDesign, Ionicons, FontAwesome, EvilIcons, Feather } from '@expo/vector-icons';
import jeans from "../../../../images/jeans2.png";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Item from "@ant-design/react-native/lib/list/ListItem";

export default function Cart({ route, navigation }) {

    const [Items, setItems] = useState([]);
    const [fetchingData, setFetching] = useState(false);
    const [favouriteItems, setFavourites] = useState([]);
    const [token, setToken] = useState(null);
    const API_URL = 'https://outfit-adobe-server.herokuapp.com';

    async function fetchData() {
        var userToken = await AsyncStorage.getItem('user');
        setToken(userToken);
        console.log("USER ID in storage:", userToken);
        if (userToken != null) {


            setFetching(true);
            fetch(`${API_URL}/user/fetchCart`, {
                method: 'POST',
                body: JSON.stringify({
                    uid:userToken
                  }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(async res => {
                    try {

                        const jsonRes = await res.json();

                        if (jsonRes.message === true) {
                            setFetching(false);
                            //console.log("fetched", jsonRes.cart[0].items)
                            setItems(jsonRes.cart[0].items);
                        }

                        console.log("item lenths: ", Items.length)

                    } catch (err) {
                        console.log(err);
                    };
                })
                .catch(err => {
                    console.log("error: ", err);
                });

        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <View style={styles.container}>
            {/* {token !== null ? Items.map((item,key)=>
            (
            <View style={styles.productContainer}>
                <Image source={jeans} style={styles.productImg} />
                <View style={styles.productContentBox}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.mainText}>Denim Jeans</Text>
                        <EvilIcons name="close" size={20} style={styles.deleteIcon} />
                    </View>

                    <View style={[styles.contentContainer, { marginTop: -10 }]}>
                        <View>
                            <Text style={[styles.lightTxt]}>Size: M</Text>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Ionicons name="alert-circle-sharp" size={15} color='#0B587E' />
                                <Text style={[styles.lightTxt, { marginLeft: 5 }]}>Blue</Text>
                            </View>
                        </View>

                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity style={styles.quantityBtn}>
                                <Feather name="minus" />
                            </TouchableOpacity>
                            <Text>1</Text>
                            <TouchableOpacity style={[styles.quantityBtn, { marginLeft: 15, backgroundColor: '#084E71', borderColor: '#084E71' }]}>
                                <Feather name="plus" color="white" />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.mainText, { color: '#084867', marginTop: 7 }]}>1500 /-</Text>


                    </View>
                </View>
            </View>
            )) : (<>
            <View style={{alignItems:'center', marginHorizontal:10, justifyContent:'center', alignContent:'center'}}>
                <Text style={styles.subText}> Please Login into your account first.</Text>
                <Text style={{ color: '#799CAD' }}> Click on the Profile Icon below on the tab bar.</Text>
                </View>
            </>)
            } */}
            {Items.map((item,key)=>
            
            (
                
            <View style={styles.productContainer}>
                {console.log("fdjhj", item.pid.title)}
                <Image source={{uri: item.pid.picture}} style={styles.productImg} />
                <View style={styles.productContentBox}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.mainText}>{item.pid.title}</Text>
                        <EvilIcons name="close" size={20} style={styles.deleteIcon} />
                    </View>

                    <View style={[styles.contentContainer, { marginTop: -10 }]}>
                        <View>
                            <Text style={[styles.lightTxt]}>Size: {item.size}</Text>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Ionicons name="alert-circle-sharp" size={15} color={item.color} />
                                <Text style={[styles.lightTxt, { marginLeft: 5 }]}>Blue</Text>
                            </View>
                        </View>

                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity style={styles.quantityBtn}>
                                <Feather name="minus" />
                            </TouchableOpacity>
                            <Text>1</Text>
                            <TouchableOpacity style={[styles.quantityBtn, { marginLeft: 15, backgroundColor: '#084E71', borderColor: '#084E71' }]}>
                                <Feather name="plus" color="white" />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.mainText, { color: '#084867', marginTop: 7 }]}>1500 /-</Text>


                    </View>
                </View>
            </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingTop: 30
    },
    productContainer: {
        flexDirection: 'row',
        marginHorizontal: 50,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: '#C3C6C8'
    },
    productImg: {
        width: '33%',
        height: 120,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },

    productContentBox: {
        margin: 5,
    },
    quantityContainer: {
        marginTop: 10,
        flexDirection: 'row',

    },
    quantityBtn: {
        width: '18%',
        height: 25,
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#A3A6A7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    priceContainer: {
        marginTop: 70,
        backgroundColor: 'purple',
    },
    mainText: {
        fontSize: 20,
        marginBottom: 8,
        fontWeight: 'bold'
    },
    subText: {
        fontSize: 17,
        color: '#909193',
        margin:10,
        fontWeight:'bold'
    },
    lightTxt: {

        color: '#AAAAAB',
        fontSize: 13,
    },
    deleteIcon: {
        marginLeft: 50,
        marginTop: 7

    },

})