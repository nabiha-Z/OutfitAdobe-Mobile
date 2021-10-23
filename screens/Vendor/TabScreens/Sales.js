import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function Home() {
    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <FontAwesome name="dollar" size={16} color="black" style={{ marginRight: 10, top: 4 }} />
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>Daily Sales</Text>
                    <Text style={styles.subText}>See daily totals of sales made and payments cancelled</Text>
                </View>
                <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 55, top: 20 }} />
            </View>

            <View style={styles.tabContainer}>
                <FontAwesome name="dollar" size={16} color="black" style={{ marginRight: 10, top: 4 }} />
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>Invoices</Text>
                    <Text style={styles.subText}>List all sales made, with filter and extract options</Text>
                </View>
                <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 55, top: 20 }} />
            </View>

            <View style={styles.tabContainer}>
                <FontAwesome name="dollar" size={16} color="black" style={{ marginRight: 10, top: 4 }} />
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>Vouchers</Text>
                    <Text style={styles.subText}>List all the vouchers issued, with filter and extract options</Text>
                </View>
                <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 55, top: 20 }} />
            </View>

            <View style={styles.tabContainer}>
                <FontAwesome name="dollar" size={16} color="black" style={{ marginRight: 10, top: 4 }} />
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>Statics and Analytics</Text>
                    <Text style={styles.subText}>See all statics here</Text>
                </View>
                <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 55, top: 20 }} />
            </View>

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
        borderBottomWidth:1,
        borderColor:'#D4D4D7',
        paddingBottom:20,
        marginBottom:10
    },
    textContainer: {
        width: '70%',
        justifyContent: 'center',
    },
    mainText: {
        marginBottom: 8
    },
    subText: {
        fontSize: 9,
        color: '#909193',
        lineHeight: 13,
    }
})