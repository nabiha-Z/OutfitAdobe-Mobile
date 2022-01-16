import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, View, Text, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Button, Image, ListItem, ScrollView } from 'react-native';
import { Ionicons, Feather, AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from 'firebase/app';
import { SliderBox } from "react-native-image-slider-box";
import { CheckBox } from "react-native-elements";
import one from "../../images/health.jpg";

export default function Details({ route, navigation }) {
    const db=firebase.firestore();
    const { details } = route.params;
    console.log("details:", details)
    const auth = firebase.auth();
    const [isSelected, setSelected] = useState(details.fav);
    const [check1,setcheck1]=useState(true);
    const [staff, setstaff] = useState([{ id: 1, name: "Alex", rating: 4.6, profession: 'Hairstylist', rank: 'Senior' }, { id: 2, name: "Zender", rating: 5.0, profession: 'Senior Makeup Artist', rank: 'Senior' }, { id: 3, name: "Charles", rating: 4.9, profession: 'Menicure Artist', rank: 'Mediocre' }, { id: 4, name: "Adams", rating: 4.0, profession: 'Menicure Artist', rank: 'Junior' }, { id: 3, name: "Charles", rating: 4.9, profession: 'Menicure Artist', rank: 'Senior' }, { id: 3, name: "Charles", rating: 4.9, profession: 'Menicure Artist', rank: 'Senior' }])
    const [check, setcheck] = useState(1);
    const [selctedProd, setselctedProd] = useState()
    const [products, setProducts] = useState([
        {
            id: 0,
            icon: one,
            title: "Product 1",
            price: 500,
            selected: false,
        },
        {
            id: 1,
            icon: one,
            title: "Product 2",
            price: 400,
            selected: false,
        },
        {
            id: 2,
            icon: one,
            title: "Product 3",
            price: 300,
            selected: false,
        },
        {
            id: 3,
            icon: one,
            price: 600,
            title: "Product 4",
            selected: false,
        },
    ]);
    useEffect(async()=>{
     await   db.collection('products').get().then(
        
            (data)=>{
                var temp=[];
                data.docs.map(
                    (data1)=>{
                        if(data1.data().store==details.store){
                            temp.push(data1.data());
                        }
                      
                    }
                   
                )
               setProducts(temp);
            }
        )

        await   db.collection('staffs').get().then(
        
            (data)=>{
                var temp=[];
                data.docs.map(
                    (data1)=>{
                        if(data1.data().store==details.store){
                            temp.push(data1.data());
                        }
                      
                    }
                   
                )
             setstaff(temp);
            }
        )
    
       },[check1])
    const SCREEN_WIDTH = Dimensions.get('window').width;
    const SCREEN_HEIGHT = Dimensions.get('window').height;
    
    if (check == 1) {
        const newData = products.map((newItem) => {

            newItem.border = '#C8C4C4'
            newItem.background = 'white'
            newItem.selected = false

            return newItem


        });

        setProducts(newData);
        setcheck(-1)
    }
    const favourite = () => {

        setSelected(!isSelected)
    }

    const onChange = (item) => {
      
        const newData = products.map((newItem) => {
            if (newItem.id === item.id) {
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

    const nextScreen = (staff) => {
        const selectedData = [];
        products.map((item, key) => {
            if (item.selected == true) {
                console.log("gfgfdg")
                selectedData.push({
                    id: item.id,
                    price:item.price,
                    title: item.title,
                    icon: item.icon,
                    selected: item.selected,
                })
            }
        })

        navigation.navigate('bookingscreen', { service: details, staff: staff, products: selectedData })
    }

    return (
        <View
        style={{marginTop:70}}
        >
           
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
               
                imageLoadingColor="#FAB7A0"
            />

            <ScrollView contentContainerStyle={{ height: SCREEN_HEIGHT * 1.6, backgroundColor: 'white' }}>
                <View style={styles.description}>
                    <Text style={styles.subheading}>{details.name}</Text>
                    <TouchableOpacity onPress={() => favourite()} style={{ justifyContent: 'center' }}>
                        <Ionicons name="heart" color={isSelected ? '#F75451' : '#D3D3D3'} size={30}></Ionicons>
                    </TouchableOpacity>
                </View>
                <Text style={[styles.txt, { marginHorizontal: 20 }]}>{details.detail}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }}>
                    <Text style={[styles.subheading, { marginHorizontal: 20, fontSize: 16, color: '#214279' }]}>$ {details.price}</Text>
                    {/* <TouchableOpacity style={[styles.btn, { backgroundColor: '#336B99', width: '30%' }]} onPress={() => navigation.navigate('bookingscreen', { item: details })}>
                        <Text style={{ color: 'white' }}>Book</Text>
                    </TouchableOpacity> */}
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


                    <Text style={[styles.heading, { color: '#383939', fontSize: 17 }]}>Products</Text>


                    <View style={styles.productsView}>
                        {products.map((item, key) => (
                            <>
                                <View style={styles.checkboxContainer} key={key}>
                                    <CheckBox
                                        key={item.id}
                                        checked={item.selected}
                                        containerStyle={[styles.ckItem, { zIndex: 1 }]}
                                        disabled={false}
                                        onAnimationType="fill"
                                        offAnimationType="fade"
                                        boxType="square"
                                        onPress={() => onChange(item)}
                                    />
                                    <View
                                        style={[
                                            styles.customCheckbox,
                                            {
                                                zIndex: 0,
                                                borderColor: item.border,
                                                backgroundColor: item.background,
                                            },
                                        ]}
                                    >

                                        <Image
                                            source={{uri:item.img}}
                                            style={{
                                                width: 30,
                                                height: 30,
                                                borderRadius: 30 / 2,
                                                alignSelf: "center",
                                            }}
                                        />
                                        <View style={styles.textContainer}>
                                            <Text style={styles.mainText}>{item.name}</Text>
                                        </View>

                                        <Text>$ {item.price}</Text>
                                    </View>
                                </View>
                            </>
                        ))}
                    </View>

                </View>

                <Text style={[styles.heading, { color: '#383939', fontSize: 20, marginHorizontal: 20 }]}>Our Staff</Text>

                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    contentContainerStyle={{ height: 160, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                    {staff.map((item, key) =>
                    (
                        <>
                            <TouchableOpacity
                                style={styles.checkboxContainer}
                                key={key}
                                activeOpacity={0.4}
                                onPress={() => nextScreen(item)}
                            >

                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={styles.staffView}>
                                        {/* <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: '#0F6B7A' }}>{item.name[0].toUpperCase()} </Text> */}
                                        <Image
                                            source={{uri:item.img}}
                                            style={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 30,
                                                alignSelf: "center",
                                            }}
                                        />
                                    </View>

                                    <View style={styles.ratingView}>
                                        <AntDesign name="star" color="#EED51F" size={12} />
                                        <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: 'bold' }}>{item.name} </Text>
                                    </View>
                                    <Text style={{ textAlign: 'center', fontSize: 14, color: '#000000', marginTop: 10, fontWeight: 'bold'}}>{item.name} </Text>
                                    <Text style={{ textAlign: 'center', fontSize: 10, color: '#B8BABB', marginTop: 2 }}>{item.service} </Text>

                                </View>
                            </TouchableOpacity>

                        </>
                    )
                    )}

                </ScrollView>
                <Text>fsdfsd</Text>
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
        fontSize: 13
    },
    subheading: {
        color: '#343537',
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 26

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
});