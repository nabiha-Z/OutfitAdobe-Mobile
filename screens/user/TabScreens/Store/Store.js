import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';



export default function Bookings({ route, navigation }) {

    const [bookings, setbookings] = useState([]);
    const [check, setcheck] = useState(true);
    const [categories, setCategories] = useState([{ title: 'All', active: true }, { title: 'Men', active: false }, { title: 'Women', active: false }, { title: 'Shirts', active: false }, { title: 'Jeans', active: false }, { title: 'Suits', active: false }, { title: 'Dresses', active: false }]);


    const changeActive = (item) => {
        console.log("title: ", item.title);
        var active;
        const newData = categories.map((element) => {
            if (item.title === element.title) {
                active = true;
                return {
                    ...element,
                    active:active
                  };
            } else {
                return {
                    ...element,
                    active:false
                  };
              
            }
            
        })

        console.log("categories: ", newData);
        setCategories(newData);
    }

    const Tabs = ({item}) => (
        <>
            <TouchableOpacity  style={[styles.button, styles.elevation, { backgroundColor: item.active ? '#116E78' : 'white' }]} onPress={() => changeActive(item)}>
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
                        <Tabs item={item}/>
                        </>
                    ))}
                </View>
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
        margin: 20,
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
        margin: 10
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
    elevation: {
        elevation: 10,
        shadowColor: '#52006A',
    },
})