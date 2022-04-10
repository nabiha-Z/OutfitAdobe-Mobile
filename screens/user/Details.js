import React, { useEffect, useState, useRef } from 'react';
import { Animated, Dimensions, View, Text, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Button, Image, ListItem, ScrollView } from 'react-native';
import { Ionicons, Feather, AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SliderBox } from "react-native-image-slider-box";
import ImagedCarouselCard from "react-native-imaged-carousel-card";
import { color } from 'react-native-elements/dist/helpers';

export default function Details({ route, navigation }) {
    const { details } = route.params;

    const [isSelected, setSelected] = useState(false);
    const [check1, setcheck1] = useState(true);
    const [staff, setstaff] = useState([])
    const [check, setcheck] = useState(false);
    const [error, setError] = useState("");
    const [loadingData, setLoadingData] = useState(false);
    const [loadingText, setLoadingText] = useState('Add to Cart')
    const [loadingIcon, setLoadingIcon] = useState('cart');
    const [products, setProducts] = useState([]);
    const [colors, setColors] = useState(['#741823', '#B4535D', '#D87373', '#E9A0A0']);
    const [sizes, setSizes] = useState([{ size: 'S', selected: true }, { size: 'M', selected: false }, { size: 'L', selected: false }, { size: 'XL', selected: false }]);
    var available = ['S', 'M', 'L', 'XL'];

    const API_URL = 'https://outfit-adobe-server.herokuapp.com';


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

        var tempSizes = [];
        sizes.map((item) => {
            if (!available.includes(item.size)) {
                console.log("item: ", item);
                setSizes(sizes.filter(element => element.size !== item.size))

            }
        })

    }, [check])




    const SCREEN_WIDTH = Dimensions.get('window').width;
    const SCREEN_HEIGHT = Dimensions.get('window').height;

    const favourite = () => {

    }

    const onChange = (item) => {

        const newData = products.map((newItem) => {
            if (newItem.pid === item.pid) {
                var color, background;
                if (item.selected === false) {
                    color = "#EAF3F2";
                    background = "#EAF3F2";
                } else {
                    color = "#C8C4C4";
                    background = "white";
                }


                return {
                    ...newItem,
                    border: color,
                    background: background,
                    selected: !item.selected,
                };

            }
            return {
                ...newItem,
                selected: newItem.selected,
            };


        });
        setProducts(newData);

    };

    const LoadingData = () => {
        return (
            <>
                <ActivityIndicator size="small" color="white" />
            </>
        );
    };

    const selectSize = (item) => {
        console.log("size: ", item.size);

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
        setcheck(check ? false : true)
    }

    const Addtocart = () => {
        setLoadingData(true);
        setTimeout(() => {
            
            setLoadingIcon('checkmark-sharp');
            setLoadingData(false);
            setLoadingText('Added ')
        }, 2000);

        setTimeout(() => {
            setLoadingIcon('cart');
            setLoadingText('Add to Cart')
        }, 4000);

    }


    return (
        <View>
            <ScrollView contentContainerStyle={{ height: SCREEN_HEIGHT * 1.1, backgroundColor: 'white' }}>
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
                            <Text style={[styles.subheading, { marginRight: 115, padding: 0 }]}>Size</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row' }}>
                                {colors.map((item, key) => (
                                    <TouchableOpacity style={[styles.colors, { backgroundColor: item }]} key={key}>
                                        <Text></Text>
                                    </TouchableOpacity>
                                ))}
                            </View>


                            <View style={{ flexDirection: 'row', marginLeft: 15, marginTop: -3 }}>


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
                    <TouchableOpacity style={[styles.btn, { backgroundColor: 'white', borderWidth: 1 }]}>
                        <Text style={[styles.btnTxt, { color: 'black' }]}>Try On</Text>
                        <Ionicons name="camera" size={20} style={{ margin: 5 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => Addtocart()}>
                        {loadingData ? <LoadingData /> : (
                            <>

                                <Text style={styles.btnTxt}>{loadingText}</Text>
                                <Ionicons name={loadingIcon} size={20} style={{ margin: 5, color: 'white' }} />

                            </>)}

                    </TouchableOpacity>
                </View>
            </ScrollView>


        </View>
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
        marginHorizontal: 10,
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
        marginHorizontal: 5
    },
    btnTxt: {
        textAlign: 'center',
        fontSize: 15,
        color: 'white'
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
        marginTop: 30,
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

});