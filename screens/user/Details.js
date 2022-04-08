import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, View, Text, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Button, Image, ListItem, ScrollView } from 'react-native';
import { Ionicons, Feather, AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SliderBox } from "react-native-image-slider-box";
import { CheckBox, colors } from "react-native-elements";

export default function Details({ route, navigation }) {
    const { details } = route.params;
    //console.log("details:", details);

    const [isSelected, setSelected] = useState(false);
    const [check1, setcheck1] = useState(true);
    const [staff, setstaff] = useState([])
    const [check, setcheck] = useState(1);
    const [error, setError] = useState("");
    const [products, setProducts] = useState([]);
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.pop()} style={{ margin: 15, zIndex: 2, backgroundColor: 'white' }}>
                    <MaterialIcons name="keyboard-arrow-left" size={40} color="black" style={{ zIndex: 1 }}></MaterialIcons>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => favourite()} style={{ justifyContent: 'center' }}>
                    <Ionicons name="heart-outline" color={isSelected ? '#F75451' : '#D3D3D3'} size={30}></Ionicons>
                </TouchableOpacity>
            )
        })
    }, [])
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


    return (
        <View>
            <ScrollView contentContainerStyle={{ height: SCREEN_HEIGHT * 1.6, backgroundColor: 'white' }}>
                <SliderBox
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
                />


                <View style={styles.description}>
                    <Text style={styles.heading}>{details.title}</Text>
                    <Text style={styles.subheading}> {details.price}/-</Text>
                    <Text style={[styles.heading, { fontSize: 16, color: '#214279' }]}>Description</Text>
                    <Text style={styles.txt}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                    {/* <Text style={[styles.txt, { marginHorizontal: 20 }]}>{details.detail}</Text> */}
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }}>
                        
                    </TouchableOpacity> */}
                        {/* <TouchableOpacity
                            style={{ flexDirection: 'row', backgroundColor: 'rgba(135, 199, 199,0.7)', padding: 10, borderRadius: 10 }}
                            key={details.store} onPress={() => navigation.navigate("user_Chat", { uid: details.store, name: details.name })}
                        >
                            <Ionicons name="chatbubble-outline" color='white' size={20} />
                            <Text style={{ color: 'white' }}> Chat Now</Text>
                        </TouchableOpacity>
                    </View> */} 
                    <View style={styles.variationContainer}>
                        <TouchableOpacity style={styles.colors}>


                        </TouchableOpacity>

                        <TouchableOpacity style={styles.sizes}>
                            
                            

                        </TouchableOpacity>
                    </View>
                    <View style={{ margin: 15, justifyContent: 'space-between', marginHorizontal: 25 }}>
                        <View style={{ flexDirection: 'row', }}>
                            <Ionicons
                                name="location"
                                size={17}
                                color="#BFC0C3"
                            />
                            <Text style={[styles.txt, { marginLeft: 6, fontSize: 15 }]}>{details.location}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialCommunityIcons
                                name="clock"
                                size={17}
                                color="#BFC0C3"
                            />
                            <Text style={[styles.txt, { marginLeft: 5, fontSize: 15 }]}>{details.time1} - {details.time2}</Text>
                        </View>

                        <Text style={[styles.heading, { color: '#383939', fontSize: 20 }]}>Products</Text>

                        <Text style={{ color: '#747676', fontSize: 12, padding: 10, marginTop: -5 }}>Select from the below products to add in the serivce</Text>

                    </View>

                    <Text style={[styles.heading, { color: '#383939', fontSize: 20, marginHorizontal: 20 }]}>Our Staff</Text>
                    <Text style={{ color: '#747676', fontSize: 13, padding: 10, marginHorizontal: 15, marginTop: -5 }}>Select the staff for your service</Text>

                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={true}
                        contentContainerStyle={{ height: 160, marginHorizontal: 25, justifyContent: 'center', alignItems: 'center' }}>
                        {staff.map((item, key) => (

                            <>
                                <TouchableOpacity
                                    style={styles.checkboxContainer}
                                    key={key}
                                    activeOpacity={0.4}

                                >

                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={styles.staffView}>

                                            <Image
                                                source={{ uri: item.img }}
                                                style={{
                                                    width: 70,
                                                    height: 70,
                                                    borderRadius: 40,
                                                    alignSelf: "center",
                                                }}
                                            />
                                        </View>
                                        <View style={styles.ratingView}>
                                            <AntDesign name="star" color="#EED51F" size={12} />
                                            <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: 'bold' }}>{item.rating} </Text>

                                        </View>
                                        <Text style={{ textAlign: 'center', fontSize: 14, color: '#000000', marginTop: 10, fontWeight: 'bold' }}>{item.name} </Text>
                                        <Text style={{ textAlign: 'center', fontSize: 10, color: '#B8BABB', marginTop: 2 }}>{item.profession} </Text>
                                    </View>

                                </TouchableOpacity>

                            </>
                        )

                        )}



                    </ScrollView>
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
    heading: {
        fontSize: 25,
        marginTop: 10,
        fontWeight: 'bold',
        color: 'white'
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
    heading: {
        fontSize: 20,
        marginTop: 10,
        padding: 10,
        fontWeight: 'bold'
    },
    txt: {
        color: '#AAAAAB',
        padding: 10,
        paddingTop: 0,
        fontSize: 13,
        marginHorizontal: 20
    },
    heading: {
        color: '#343537',
        padding: 10,
        fontSize: 18,
        fontWeight: 'bold',

    },
    subheading: {
        color: '#343537',
        padding: 10,
        fontWeight: 'bold',
        marginHorizontal: 20,
        fontSize: 16, 
        color: '#214279'

    },
    picksView: {

        padding: 5,
        margin: 5

    },
    elevation: {
        elevation: 10,
        shadowColor: '#52006A',
    },
    description: {
        flex:1,
        marginHorizontal: 20,
        marginTop: 26,
        flexWrap:'wrap'

    },
    btnView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: 5,
        marginBottom: 10,
    },
    btn: {
        borderRadius: 7,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%'
    },
    staffView: {
        width: 80,
        height: 80,
        borderRadius: 80,
        backgroundColor: '#CAEAEF',
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
        // marginHorizontal: 20
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
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
        marginRight: 10
    },

    ckItem: {
        alignSelf: "center",
        width: 300,
        height: 50,
        opacity: 0,
        position: "absolute",
    },
    productsView: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    customCheckbox: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#D4D4D7',
        width: '100%',
        height: 50,
        borderRadius: 5,
        borderColor: "white",
        backgroundColor: "white",
        borderColor: "#C8C4C4",
        flexDirection: 'row',
    },
    btnTxt: {
        fontSize: 11,
        opacity: 0.6,
        alignSelf: "center",
        textAlign: "center",
        top: 5,
    },
    errorMsg: {
        color: '#E32F0F',
        fontSize: 13,
        marginHorizontal: 10
    }
});