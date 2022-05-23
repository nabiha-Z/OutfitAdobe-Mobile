import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, RefreshControl } from 'react-native';
import { AntDesign, Ionicons, FontAwesome, EvilIcons, Feather } from '@expo/vector-icons';
import jeans from "../../../../images/jeans2.png";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Item from "@ant-design/react-native/lib/list/ListItem";

export default function Cart({ route, navigation }) {

    const [Items, setItems] = useState([]);
    const [fetchingData, setFetching] = useState(false);
    const [favouriteItems, setFavourites] = useState([]);
    const [cartId, setCartId] = useState();
    const [token, setToken] = useState(null);
    const [check, setCheck] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const SCREEN_WIDTH = Dimensions.get('window').width;
    const SCREEN_HEIGHT = Dimensions.get('window').height;
    const API_URL = 'https://outfitadobe-server.herokuapp.com';
    // const API_URL = 'http://192.168.100.8:8000';

    async function fetchData() {
        var userToken = await AsyncStorage.getItem('user');
        setToken(userToken);
        console.log("USER ID in storage:", userToken);
        if (userToken != null) {
            setFetching(true);
            fetch(`${API_URL}/user/fetchCart`, {
                method: 'POST',
                body: JSON.stringify({
                    uid: userToken
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
                            console.log("fetched")
                            setCartId(jsonRes.cart[0]._id)
                            setItems(jsonRes.cart[0].items);
                        }

                        console.log("item len: ", Items.length)

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
    }, [check])
    

    const updatequantity = async (pid, quant, val) => {
        var quantity = quant + (val);
        if (quantity == 0) {
            deleteFunc(pid)
        } else {
            await fetch(`${API_URL}/user/updateQuantity`, {
                method: 'POST',
                body: JSON.stringify({
                    cid: cartId,
                    itemId: pid,
                    quantity: quantity
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(async res => {
                    try {

                        const jsonRes = await res.json();

                        if (jsonRes.message === true) {
                            console.log("updated")
                            setCheck(!check)
                        }

                    } catch (err) {
                        console.log(err);
                    };
                })
                .catch(err => {
                    console.log("error: ", err);
                });
        }
    }

    const deleteFunc = async (pid) => {
        console.log("pid: ", pid)
        await fetch(`${API_URL}/user/deleteCartItem`, {
            method: 'POST',
            body: JSON.stringify({
                cid: cartId,
                itemId: pid,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(async res => {
                try {
                    const jsonRes = await res.json();
                    console.log("jsonRes: ", jsonRes)
                    if (jsonRes.message === true) {
                        console.log("deleted")
                        //setItems(jsonRes.cart.items);
                        setCheck(!check)
                    }

                } catch (err) {
                    console.log(err);
                };
            })
            .catch(err => {
                console.log("error: ", err.message);
            });
    }

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={{ height: SCREEN_HEIGHT * 1, width: SCREEN_WIDTH * 1 }}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={refreshing}
                //         onRefresh={onRefresh}
                //     />
                // }
            >
                {token !== null && Items.map((item, key) =>
                (

                    <View style={styles.productContainer} key={key}>
                        <Image source={{ uri: item.pid.picture }} style={styles.productImg} />
                        <View style={styles.productContentBox}>
                            <View style={styles.contentContainer}>
                                <Text style={[styles.mainText, { width: '60%' }]}>{item.pid.title}</Text>
                                <EvilIcons name="close" size={20} style={styles.deleteIcon} onPress={() => deleteFunc(item._id)} />
                            </View>

                            <View style={[styles.contentContainer, { marginTop: -10 }]}>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Text style={[styles.lightTxt]}>{item.size} / </Text>
                                    <Ionicons name="alert-circle-sharp" size={15} color={item.color} />

                                </View>

                            </View>
                            <View style={styles.contentContainer}>
                                <Text style={[styles.mainText, { color: '#084867', marginTop: 7, fontSize: 16 }]}>{item.pid.price * item.quantity} /-</Text>
                                <View style={styles.quantityContainer}>
                                    <TouchableOpacity
                                        style={styles.quantityBtn}
                                        onPress={() => updatequantity(item._id, item.quantity, -1)}>
                                        <Feather name="minus" />
                                    </TouchableOpacity>
                                    <Text>{item.quantity}</Text>
                                    <TouchableOpacity
                                        style={[styles.quantityBtn, { marginLeft: 15, backgroundColor: '#084E71', borderColor: '#084E71' }]}
                                        onPress={() => updatequantity(item._id, item.quantity, 1)}>
                                        <Feather name="plus" color="white" />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
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
        marginHorizontal: 20,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderColor: '#E9EBEC',
        marginLeft: 10

    },
    productImg: {
        width: '25%',
        height: 100,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },

    productContentBox: {
        margin: 5,
    },
    quantityContainer: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 33

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
    mainText: {
        fontSize: 20,
        marginBottom: 8,
        fontWeight: 'bold'
    },
    subText: {
        fontSize: 17,
        color: '#909193',
        margin: 10,
        fontWeight: 'bold'
    },
    lightTxt: {
        color: '#AAAAAB',
        fontSize: 13,
    },
    deleteIcon: {
        marginRight: 50,
        marginTop: 7

    },

})