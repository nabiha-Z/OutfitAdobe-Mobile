import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import ImagedCarouselCard from "react-native-imaged-carousel-card";
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';

import { FontAwesome } from '@expo/vector-icons';


export default function Shop({ route, navigation }) {

    const [bookings, setbookings] = useState([]);
    const [check, setcheck] = useState(true);
    const [categories, setCategories] = useState([{ title: 'All', active: true }, { title: 'Men', active: false }, { title: 'Women', active: false }, { title: 'Shirts', active: false }, { title: 'Jeans', active: false }, { title: 'Suits', active: false }, { title: 'Dress', active: false }]);
    const [Items, setItems] = useState([]);
    const [fetchingData, setFetching] = useState(false);
    const [favouriteItems, setFavourites] = useState([]);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);

    const API_URL = 'https://outfitadobe-server.herokuapp.com';
    // const API_URL = 'http://192.168.100.8:8000';
    useEffect(() => {

        setFetching(true);
        fetch(`${API_URL}/admin/getproducts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(async res => {
                try {

                    const jsonRes = await res.json();

                    if (jsonRes.message === true) {
                        setFetching(false);
                        setItems(jsonRes.products);
                        setProducts(jsonRes.products);
                    }
                } catch (err) {
                    console.log(err);
                };
            })
            .catch(err => {
                console.log("error: ", err.message);
            });


    }, [])

    const SCREEN_WIDTH = Dimensions.get('window').width;
    const SCREEN_HEIGHT = Dimensions.get('window').height;

    const LoadingData = () => {
        return (
            <>
                <ActivityIndicator size="large" color="#E7AA9E" />
                {/* <Text style={{ paddingTop: 20, color: '#DEBF4D', textAlign: 'center' }}>
              Loading Data from JSON Placeholder API ...
            </Text> */}
            </>
        );
    };

    const favourite = (item) => {

        var fav = favouriteItems;
        if (item.fav === false) {
            fav.push(item.id);
            item.fav = true;


        } else {
            fav = fav.filter(val => val !== item.id)
            item.fav = false;
        }

        setFavourites(fav);
    }

    const changeActive = (item) => {
        console.log("title: ", item.title);
    
        const newData = categories.map((element) => {
            if (item.title === element.title) {
               
                return {
                    ...element,
                    active: true
                };
            } else {
                return {
                    ...element,
                    active: false
                };

            }

        })

        setCategories(newData);

        if (item.title === 'All') {
            setProducts(Items);
        } else {

            const data = [];
            Items.map((element) => {
                if (item.title.toLowerCase() === element.category.toLowerCase() || item.title.toLowerCase() === element.main_category.toLowerCase()) {
                    data.push(element);
                }
            })


            setProducts(data);
        }
    }

    const Tabs = ({ item }) => (
        <>
            <TouchableOpacity style={[styles.button, styles.elevation, { backgroundColor: item.active ? '#116E78' : 'white' }]} onPress={() => changeActive(item)}>
                <Text style={[styles.btnTxt, { color: item.active ? 'white' : '#8D8D90' }]}>{item.title}</Text>
            </TouchableOpacity>
        </>
    )

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>Discover Your Favourite</Text>
            </View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <View style={styles.categoryBtns}>
                    {categories.map((item, key) => (
                        <>
                            <Tabs item={item} key={key}/>
                        </>
                    ))}
                </View>
            </ScrollView>
            <ScrollView contentContainerStyle={{ overflow: 'scroll' }}>

                {fetchingData ? <LoadingData /> : (
                    <View style={styles.picksView} >
                        {products.map((item, key) =>
                        (
                            <>
                                <TouchableOpacity
                                    key={key}
                                    style={{ margin: 5 }}
                                    onPress={() => navigation.navigate('Details',{details:item})} >
                                    <ImagedCarouselCard
                                        text=""
                                        width={Math.round(SCREEN_WIDTH * 0.44)}
                                        height={200}
                                        source={{ uri: item.picture }}
                                        borderRadius={4}
                                        style={{ margin: 0 }}
                                        overlayHeight={0}
                                        overlayBackgroundColor="rgba(0,0,0,0.4)"
                                        key={key}
                                    />
                                    <View style={[styles.caption, { width: SCREEN_WIDTH * 0.44 }]}>
                                        <View style={styles.description}>
                                            <Text style={styles.subheading}>{item.title}</Text>
                                            <TouchableOpacity onPress={() => favourite(item)} style={{ justifyContent: 'center' }}>
                                                <Ionicons name="heart" color={item.fav ? '#F75451' : '#D3D3D3'} size={25}></Ionicons>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Ionicons name="alert-circle-sharp" size={20} color={item.colorCode} />
                                            <Text style={[styles.txt]}>{item.color}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={[styles.subheading, { fontSize: 18, color: '#666668', marginBottom: 10 }]}>{item.price}/-</Text>
                                            <MaterialIcons name="keyboard-arrow-right" size={17} color="#4B4949" style={styles.icon} />
                                        </View>


                                    </View>
                                </TouchableOpacity>
                            </>
                        ))}

                    </View>
                )}
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
    header: {
        margin: 10,
        marginHorizontal: 10
    },
    heading: {
        fontSize: 35,
        padding: 20,
        fontWeight: 'bold',
        letterSpacing: 1
    },
    mainText: {
        marginBottom: 8
    },
    subText: {
        fontSize: 13,
        color: '#75A4BB',
        lineHeight: 15,
    },
    categoryBtns: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        marginTop: -5,
        marginBottom: 25
    },
    button: {
        borderRadius: 15,
        margin: 10,
        fontSize: 13,
        backgroundColor: 'white',
        padding: 10,
        height: 30,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },

    btnTxt: {
        fontSize: 13,
        color: '#8D8D90'
    },
    picksView: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',


    },
    elevation: {
        elevation: 10,
        shadowColor: '#52006A',
    },
    description: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 26

    },
    txt: {
        color: '#AAAAAB',
        paddingTop: 0,
        fontSize: 13,
        marginHorizontal: 10
    },
    subheading: {
        width: '70%',
        color: '#343537',
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10
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
        borderWidth: 1,
        borderColor: '#EBE7E6',
        marginTop: -28,
        borderTopWidth: 0,
        marginBottom: 20,
        padding: 10
    },
    color: {
        width: 59,
        height: 50,
        borderRadius: 20
    },

    divider: {
        width: '40%',
        height: 10
    },
    icon:{
        marginTop:13,  
    }
})