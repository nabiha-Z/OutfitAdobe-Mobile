
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import ImagedCarouselCard from "react-native-imaged-carousel-card";

export default function SearchedItem({ route, navigation }) {

  const { searchText } = route.params;
  console.log("TEXT: ", searchText)
  const [searchTxt, setSearchField] = useState("");
  const [searchVisible, setsearchVisible] = useState(false);
  const [isSelected, setSelected] = useState(false);
  const [check, setcheck] = useState(true);
  //const [categories, setcategories] = useState([{ title: "Education", count: 5, img: education }, { title: "Health", count: 5, img: health }, { title: "Legal", count: 5, img: legal }, { title: "Beauty", count: 5, img: beauty }])
  const [Items, setItems] = useState([]);
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SCREEN_HEIGHT = Dimensions.get('window').height;

  

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => { navigation.pop() }}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={30}
            color="#41403F"
            style={{ marginTop: 5 }} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
          <TextInput name="searchfield" value={searchTxt} onChange={(txt) => setSearchField(txt)} style={styles.searchField} placeholder='Type your text' />
          <TouchableOpacity style={styles.searchIcon}>
            <Ionicons
              name="search"
              size={20}
              color="#2A261B"
            />
          </TouchableOpacity>
        </View>

      </View>


      {Items.length !== 0 ? (
        <>
          <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.heading}>
              Matched Results
            </Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>


              {Items.map((item, key) =>
              (
                <TouchableOpacity
                  style={[styles.picksView,styles.elevation]}
                  onPress={() => navigation.navigate('details', { details: item })}
                  activeOpacity={0.7} key={key}>
                  <ImagedCarouselCard
                    text=""
                    width={SCREEN_WIDTH * 0.33}
                    height={SCREEN_WIDTH * 0.33}
                    shadowColor="#051934"
                    source={{ uri: item.img }}
                    style={{ margin: 13 }}
                    overlayHeight={0}

                  />
                  <View style={styles.caption}>
                    <View style={styles.description}>
                      <Text style={styles.subheading}>{item.name}</Text>
                      {/* <TouchableOpacity onPress={() => favourite(item)} style={{ justifyContent: 'center' }}>
                        <Ionicons name="heart" color={item.fav ? '#F75451' : '#D3D3D3'} size={30}></Ionicons>
                      </TouchableOpacity> */}
                    </View>

                    <View style={{ flexDirection: 'row', marginTop:10, marginHorizontal:5 }}>
                      <MaterialCommunityIcons
                        name="clock"
                        size={17}
                        color="#BFC0C3"
                      />
                      <Text style={[styles.txt]}>{item.time1} - {item.time2}</Text>

                    </View>
                    <View style={{ flexDirection:'row',justifyContent: 'flex-end', marginTop:10 }}>
                      <Text style={[styles.subheading, { color:'#10B984', fontSize:19 }]}>$ {item.price}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
              )}

            </View>

            <View style={{ padding: 40 }}>

            </View>
          </ScrollView>
        </>) : (
        <View style={styles.container2}>
          {console.log("not found")}
          <Text style={styles.heading}>No Matching Results Found</Text>
          <Image
            source={require('../../images/draw9.png')}
            style={{ width: '50%', height: '25%' }}
          />
        </View>
      )
      }


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white'
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
  topBar: {
    backgroundColor: 'white',
    height: 80,
    padding: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D8D9',
    marginTop: 30

  },
  searchContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    flexDirection: 'row',
    marginTop: -20
  },
  searchField: {
    borderWidth: 1,
    borderColor: '#ADAFB5',
    borderRadius: 20,
    width: '70%',
    textAlign: 'center',
    margin: 10
  },
  heading: {
    fontSize: 30,
    marginTop: 10,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4D4C4A'
  },
  txt: {
    color: '#AAAAAB',
    padding: 5,
    paddingTop: 0,
    fontSize: 12
  },
  subheading: {
    color: '#343537',
    padding: 0,
    fontSize: 14,
    fontWeight: 'bold',
    height:40
  },
  picksView: {
   backgroundColor:'white',
   marginRight:6,
   borderRadius:6,
   alignItems:'center'
   
  },
  elevation: {
    elevation: 5,
    shadowColor: '#52006A',
  },
  description: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 6,
    marginRight: 10,
    marginTop: 26

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
  searchIcon: {
    position: 'absolute',
    marginTop: 10,
    backgroundColor: '#FFC431',
    padding: 5,
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  description: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 6,
    marginRight: 10,
    marginTop: 26

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
    borderWidth: 0,
    borderColor: '#EBE7E6',
    borderRadius: 10,
    marginTop: -28,
    borderTopWidth: 0,

    marginBottom: 20,
    width: '80%',
    alignSelf: 'center',
    padding: 0
  },
});

