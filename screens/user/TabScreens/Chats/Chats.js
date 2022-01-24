import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import firebase from "firebase/app";
export default function Chats({ route, navigation }) {
    const [chats, setchats] = useState([])
    const auth = firebase.auth()
    const db = firebase.firestore()
    const collectionRef = db.collection('chat')
    async function getdata() {
        const id = auth.currentUser.uid;
        const data = await db.collection('chat-room').doc(auth.currentUser.uid).collection('person').get();
        const array = data.docs.map(
            (a) => {
                return (a.data())
            }
        )
        const result = [];
        const map = {};

        for (let i = 0; i < array.length; i++) {
            if (map[array[i]]) {
                continue;
            } else {
                result.push(array[i]);
                map[array[i]] = true;
            }
        }
        console.log("result", result);
        setchats(result)

    }

    useEffect(() => {
        getdata()
    }, [])

    return (
        <View style={styles.container}>
            {chats.map(
                (item) => {
                    return (
                        <TouchableOpacity key={item.to} style={styles.tabContainer} onPress={() => navigation.navigate("user_Chat", { uid: item.to, name: item.name })}>

                            <Ionicons name="chatbubble-ellipses-outline" size={26} color="#FFD933" style={{ marginRight: 10, top: 10 }} />
                            <View style={styles.textContainer}>
                                <Text style={styles.mainText}>{item.name}</Text>
                                <Text style={styles.subText}>Click to Chat</Text>
                            </View>
                            <AntDesign name="arrowright" size={16} color="#909193" style={{ marginHorizontal:40, top: 20 }} />
                        </TouchableOpacity>
                    );
                }
            )}
            {/* <TouchableOpacity style={styles.tabContainer} onPress={()=>navigation.navigate("Chat",{uid:"gjlqKidcixZjqYBMsduWvDvTmWQ2",name:"hi"})}>

                <FontAwesome name="dollar" size={16} color="black" style={{ marginRight: 10, top: 4 }} />
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>Go to chat</Text>
                    <Text style={styles.subText}></Text>
                </View>
                <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 55, top: 20 }} />
            </TouchableOpacity> */}







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
    tabContainer: {
        flexDirection: 'row',
        width: '90%',
        borderBottomWidth: 1,
        borderColor: '#D4D4D7',
        paddingBottom: 20,
        marginBottom: 10
    },
    textContainer: {
        width: '70%',
        justifyContent: 'center',
    },
    mainText: {
        fontSize: 20,
        marginBottom: 8
    },
    subText: {
        fontSize: 11,
        color: '#909193',
        lineHeight: 15,
    }
})