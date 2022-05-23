import React, { useEffect, useState, useRef } from 'react';
import { Animated, Dimensions, View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, Feather, AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SliderBox } from "react-native-image-slider-box";
import ImagedCarouselCard from "react-native-imaged-carousel-card";
import { color } from 'react-native-elements/dist/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';

export default function Details({ route, navigation }) {
    const { details } = route.params;  
    details.size = 'S';
    const [fetchingData, setFetching] = useState(false);
    const [isSelected, setSelected] = useState(false);
    const [check1, setcheck1] = useState(true);
    const [staff, setstaff] = useState([])
    const [check, setcheck] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [loadingText, setLoadingText] = useState('Add to Cart')
    const [loadingIcon, setLoadingIcon] = useState('cart');
    const [animation, setAnimation] = useState('fadeInUp');
    const [duration, setDuration] = useState(1000);
    const [btnBackground, setBtnbackground] = useState('#114D53')
    const [products, setProducts] = useState([]);
    const [suggested, setSuggested] = useState([]);
    const [colors, setColors] = useState(['#741823', '#B4535D', '#D87373', '#E9A0A0']);
    const [selectedSize, setSelectedSize] = useState("");

    const [sizes, setSizes] = useState([{ size: 'S', selected: true }, { size: 'M', selected: false }, { size: 'L', selected: false }, { size: 'XL', selected: false }]);
    var available = ['S', 'M', 'L', 'XL'];

    const API_URL = 'https://outfitadobe-server.herokuapp.com';
    // const API_URL = 'http://192.168.100.8:8000';

    const fetchSimilar = async () => {
        setFetching(true);
        //console.log("here");
        await fetch(`${API_URL}/user/smartAdvisor`, {
            method: 'POST',
            body: JSON.stringify({
                category: details.category, main_category:details.main_category, product_color: details.color
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(async (res) => {
                try {

                    const jsonRes = await res.json();

                    console.log("json: ", jsonRes.products.length)
                    if (jsonRes.message === true) {
                        setFetching(false);
                        
                        setSuggested(jsonRes.products)
                    }

                    

                } catch (err) {
                    console.log(err);
                };
            })
            .catch(function (error) {

            });
    }


    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.pop()} style={{ margin: 15, zIndex: 2, backgroundColor: 'white' }}>
                    <MaterialIcons name="keyboard-arrow-left" size={40} color="#646262" style={{ zIndex: 1 }}></MaterialIcons>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => favourite()} style={{ justifyContent: 'center', marginHorizontal: 20 }}>
                    <Ionicons name="heart-outline" color={isSelected ? '#F75451' : '#646262'} size={30}></Ionicons>
                </TouchableOpacity>
            )
        })

        sizes.map((item) => {
            if (!details.sizes.includes(item.size)) {
                setSizes(sizes.filter(element => element.size !== item.size))
            }
        })
        fetchSimilar()

    }, [check])


    const SCREEN_WIDTH = Dimensions.get('window').width;
    const SCREEN_HEIGHT = Dimensions.get('window').height;

    const favourite = () => {

    }


    const LoadingItems = () => {
        return (
            <>
                <ActivityIndicator size="small" color="white" />
            </>
        );
    };

    const selectSize = (item) => {
        console.log("item: ", item)
        const updatedSizes = sizes.map((element) => {
            if (item.size === element.size) {

                return {
                    ...element,
                    selected: true
                };
            } else {
                return {
                    ...element,
                    selected: false
                };

            }

        })

        setSizes(updatedSizes);
        setSelectedSize(item.size);
        console.log("de: ", item.size)

    }

    const Addtocart = async () => {
        setLoadingData(true);

        const uid = await AsyncStorage.getItem('user');
        if (uid === null) {
            alert("Login first!")
            navigation.navigate('Dashboard_user')
        }
       

        console.log("details.size: ",selectedSize)
        await fetch(`${API_URL}/user/addCart`, {

            method: "POST",
            body: JSON.stringify({
                uid,
                product: details,
                size: selectedSize,
                color: details.color
            }),

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            .then(async res => {
                try {

                    const jsonRes = await res.json();

                    if (jsonRes.message === true) {
                        setLoadingData(false)
                        setLoadingIcon('checkmark-sharp');
                        setLoadingText('Added')
                        setDuration(700)
                        setAnimation('slideInDown')
                        setBtnbackground('#319E92')

                        setTimeout(() => {
                            setLoadingData(false);
                            setLoadingIcon('cart');
                            setLoadingText('Add to Cart')
                            setAnimation('slideInLeft')
                            setBtnbackground('#114D53');
                            setDuration(1500)

                        }, 3000);


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


    return (
        <View>
            <ScrollView contentContainerStyle={{ height: SCREEN_HEIGHT * 1.5, backgroundColor: 'white' }}>
                <ImagedCarouselCard
                    text=""
                    width={Math.round(SCREEN_WIDTH * 0.8)}
                    height={300}
                    source={{ uri: details.picture }}
                    borderRadius={4}
                    style={{ margin: 0, borderRadius: 20, alignSelf: 'center', margin: 20 }}
                    overlayHeight={0}
                    overlayBackgroundColor="rgba(0,0,0,0.4)"

                />
                {/* <SliderBox
                    images={[details.img]}
                    sliderBoxHeight={SCREEN_WIDTH * 0.9}
                    dotColor="#FAB7A0"
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 10,
                        marginHorizontal: 8,
                        padding: 0,
                        margin: 0
                    }}

                    imageLoadingColor="FFE035"
                /> */}


                <View style={styles.description}>
                    <Text style={styles.heading}>{details.title}</Text>
                    <Text style={[styles.subheading]}>{details.price}/-</Text>
                    <Text style={[styles.heading, { fontSize: 16, marginTop: 5, marginBottom: 0 }]}>Description</Text>
                    <Text style={[styles.txt]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Text>

                    <View style={styles.variationContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={[styles.subheading, { margin: 0, padding: 0 }]}>Color</Text>
                            <Text style={[styles.subheading, { marginRight: 150, padding: 0 }]}>Size</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>


                            <TouchableOpacity style={[styles.colors, { backgroundColor: details.colorCode }]}>
                                <Text></Text>
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', marginLeft: 85, marginTop: -3 }}>


                                {sizes.map((item, key) => (
                                    <TouchableOpacity
                                        style={[styles.size, { backgroundColor: item.selected ? '#7EA5A5' : 'white', borderColor: item.selected ? '#7EA5A5' : '#6B6E6E' }]}
                                        key={key}
                                        onPress={() => selectSize(item)}>
                                        <Text style={[{ color: item.selected ? 'white' : 'black', fontSize: 15, fontWeight: 'bold' }]}>{item.size}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[styles.footerBtns, { width: SCREEN_WIDTH * 1 }]}>
                    <TouchableOpacity style={[styles.btn, { backgroundColor: 'white', borderWidth: 1 }]} onPress={()=>navigation.navigate('TryOnScreen',{dressid:details._id, category:details.category})}>
                        <Text style={[styles.btnTxt, { color: 'black' }]}>Try On</Text>
                        <Ionicons name="camera" size={20} style={{ margin: 5 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, { backgroundColor: btnBackground }]} onPress={() => Addtocart()}>
                        {loadingData ? <LoadingItems /> : (
                            <>

                                <Animatable.View
                                    animation={animation} style={styles.animatedText} duration={duration}>
                                    <Text style={styles.btnTxt}>{loadingText}</Text>
                                    <Ionicons name={loadingIcon} size={20} style={{ margin: 5, color: 'white' }} />
                                </Animatable.View>
                            </>)}

                    </TouchableOpacity>
                </View>

                <View style={styles.suggestion}>
                    <Text style={styles.heading}>Suggested For You</Text>
                    <View style={styles.divider}></View>
                    <Text style={styles.txt}>Products that matches with your current selection</Text>
                    <View style={{ flexDirection: 'row' }}>

                        {fetchingData ? <LoadingItems /> : (
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                {suggested.map((item, key) =>
                                (
                                    <>
                                        <TouchableOpacity
                                            key={key}
                                            onPress={() => navigation.navigate('Details',{details:item})}
                                            activeOpacity={0.4}
                                        >

                                            <ImagedCarouselCard
                                                key={key}
                                                text={item.title}
                                                width={120}
                                                height={150}
                                                shadowColor="#02060D"
                                                source={{ uri: item.picture }}
                                                style={{ margin: 10 }}
                                                textStyle={{ fontSize: 12, color: 'white', textAlign: 'center' }}
                                                overlayHeight={40}
                                                overlayBackgroundColor="rgba(32, 30, 30,0.5)"

                                            />
                                        </TouchableOpacity>
                                    </>
                                )
                                )}

                            </ScrollView>
                        )}
                    </View>

                </View>
            </ScrollView >


        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    topView: {
        backgroundColor: '#212F3D',
        padding: 10,
        justifyContent: 'flex-end',
        height: 250,

    },
    lowerView: {
        margin: 15,
        marginBottom: 30,

    },
    tabContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: '#D4D4D7',
        paddingBottom: 20,
        margin: 15
    },
    textContainer: {
        width: '70%',
        justifyContent: 'center',
    },
    mainText: {
        marginBottom: 8,
        marginLeft: 8
    },
    subText: {
        fontSize: 11,
        color: '#909193',
        lineHeight: 15,
    },

    txt: {
        color: '#949696',
        padding: 10,
        paddingTop: 0,
        fontSize: 14,
        width: '100%',
        textAlign: 'justify'
    },

    description: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 5,
        flexWrap: 'wrap',

    },
    heading: {
        color: '#343537',
        fontSize: 22,
        fontWeight: 'bold',
        margin: 6,
        padding: 5,
        paddingBottom: 15

    },
    subheading: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#787B7B',
        margin: 6,
        marginTop: -19,
        padding: 5
    },
    elevation: {
        elevation: 10,
        shadowColor: '#52006A',
    },

    btn: {
        height: 40,
        width: '95%',
        borderRadius: 4,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#114D53',
        margin: 5,

    },
    btnTxt: {
        textAlign: 'center',
        fontSize: 15,
        color: 'white'
    },
    animatedText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5
    },
    ratingView: {
        width: 60,
        height: 15,
        borderRadius: 20,
        padding: 10,
        marginTop: -10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E0E3E3'

    },
    errorMsg: {
        color: '#E32F0F',
        fontSize: 13,
        marginHorizontal: 10
    },
    variationContainer: {
        margin: 25,
        marginHorizontal: 15
    },

    colors: {
        width: 25,
        height: 25,
        borderRadius: 5,
        margin: 5
    },
    size: {
        width: 30,
        height: 30,
        borderRadius: 20,
        padding: 2,
        borderWidth: 1,
        margin: 5,
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        alignItems: 'center'
    },
    footerBtns: {
        display: "flex",
        backgroundColor: 'white',
        padding: 10,
        marginHorizontal: 10,
        backgroundColor: 'white',
        bottom: 20,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        height: 90,
        borderRadius: 10,
        borderTopWidth: 1,
        borderColor: '#C6CBCA',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: {
            width: 10,
            height: 10
        },
        paddingHorizontal: 20,
        marginLeft: 0
    },
    footerBtnsTxt: {
        fontSize: 16,
        marginRight: 5,
        fontWeight: '200',
        color: '#2F5492',
    },
    suggestion: {
        marginHorizontal: 20,

    }
});