
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, Dimensions, ActivityIndicator, } from 'react-native'
import firebase from 'firebase/app';
import firebaseConfig from '../../../../Firebase/FirebaseConfig';
import { Entypo, Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import ImagedCarouselCard from "react-native-imaged-carousel-card";

import education from "../../../../images/education.jpg";
import health from "../../../../images/health.jpg";
import beauty from "../../../../images/beauty.jpeg";
import legal from "../../../../images/legal1.jpg";
import jeans from "../../../../images/jeans2.png";
import shirt from "../../../../images/shirt.png";
import suit from "../../../../images/suit2.jpg";
import handwave from "../../../../images/waving-hand.png";
import headerImg from '../../../../images/headerImg1.png';
import headerImg2 from '../../../../images/headerImg4.png';

export default function Home({ route, navigation }) {

  const [searchTxt, setSearchField] = useState(" ");
  const [searchVisible, setsearchVisible] = useState(false);
  const [isSelected, setSelected] = useState(false);
  const [check, setcheck] = useState(true);
  const [categories, setcategories] = useState([{ title: "Jeans", img: jeans }, { title: "Shirts",  img: shirt }, { title: "Suits",  img: suit }, { title: "Dresses", img: beauty }])
  const [Items, setItems] = useState([]);
  const [fetchingData, setFetching] = useState(false);
  const [favouriteItems, setFavourites] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {

    // if (Items.length==0) {
    //   setFetching(true);

    //     console.log("items:", Items);
    //     setFetching(false);


    // }



  }, [check])
  const SCREEN_WIDTH = Dimensions.get('window').width;

  const LoadingData = () => {
    return (
      <>
        <ActivityIndicator size="large" color="#FBD92C" />
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

    // db.collection("users").doc(auth.currentUser.uid).update({
    //   favourites: fav
    // }).then(
    //   (data) => {
    //     check ? setcheck(false) : setcheck(true);

    //   }
    // )
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Ionicons name="menu-outline" style={styles.menuicon} />
        <View style={styles.topBarContent}>

          <View style={styles.profile}>
            <Text style={styles.lightTxt}>Welcome </Text>
            <Image source={handwave} style={styles.handwaveIcon} />
          </View>
          <View>
            <AntDesign name="user" style={styles.userIcon} />
          </View>
        </View>

      </View>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchField} placeholder="Search products" />

      </View>


      <ScrollView>

        <View style={styles.banner}>
          <Text>Try the New Look</Text>
        </View>

        <Image source={headerImg2} style={[styles.bannerImg, { marginLeft: SCREEN_WIDTH * 0.56 }]} />

        {fetchingData ? <LoadingData /> : (
          <View style={{ flexDirection: 'row' }}>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {Items.map((item, key) =>
              (
                <TouchableOpacity onPress={() => navigation.navigate('details', { details: item })} activeOpacity={0.7} key={key}>
                  <ImagedCarouselCard
                    text={item.name}
                    width={180}
                    height={240}
                    shadowColor="#051934"
                    source={{ uri: item.img }}
                    style={{ margin: 10 }}
                    textStyle={{ fontSize: 15, color: 'white', textAlign: 'center', fontWeight: 'bold' }}
                    overlayHeight={50}
                    overlayBackgroundColor="rgba(0,0,0,0.6)"

                  />
                </TouchableOpacity>
              )
              )}

            </ScrollView>

          </View>

        )}
        <Text style={styles.heading}>Categories</Text>
        <Text style={styles.txt}>Find the outfits you need by browsing through the categories</Text>
        <View style={{ flexDirection: 'row' }}>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {categories.map((item, key) =>
            (
              <>
                <TouchableOpacity
                  onPress={() => { navigation.navigate('search-screen', { category: item }) }}
                  activeOpacity={0.4}
                  key={key}>

                  <ImagedCarouselCard
                    text={item.title}
                    width={120}
                    height={150}
                    shadowColor="#02060D"
                    source={item.img}
                    style={{ margin: 10 }}
                    textStyle={{ fontSize: 15, color: 'white', textAlign: 'center', fontWeight: 'bold' }}
                    overlayHeight={40}
                    overlayBackgroundColor="rgba(20, 20, 21,0.6)"

                  />
                </TouchableOpacity>
              </>
            )
            )}

          </ScrollView>

        </View>
        <Text style={styles.heading}>Our Picks</Text>
        {fetchingData ? <LoadingData /> : (
          <View style={styles.picksView}>
            {Items.map((item, key) =>
            (
              <>
                <ImagedCarouselCard
                  text={item.name}
                  width={Math.round(SCREEN_WIDTH * 0.84)}
                  height={360}
                  shadowColor="#051934"
                  source={{ uri: item.img }}
                  borderRadius={10}
                  style={{ margin: 10 }}
                  textStyle={{ fontSize: 15, color: 'white', textAlign: 'center', fontWeight: 'bold' }}
                  overlayHeight={50}
                  overlayBackgroundColor="rgba(0,0,0,0.4)"
                  key={key}
                />
                <View style={styles.caption}>
                  <View style={styles.description}>
                    <Text style={styles.subheading}>{item.name}</Text>
                    <TouchableOpacity onPress={() => favourite(item)} style={{ justifyContent: 'center' }}>
                      <Ionicons name="heart" color={item.fav ? '#F75451' : '#D3D3D3'} size={30}></Ionicons>
                    </TouchableOpacity>
                  </View>
                  <Text style={[styles.txt, { marginLeft: 6 }]}>{item.detail}</Text>
                  <Text style={[styles.subheading, { marginLeft: 5, fontSize: 16 }]}>$ {item.price}</Text>

                  <View style={{ flexDirection: 'row', margin: 15, justifyContent: 'space-between', marginRight: 20 }}>

                    <View style={{ flexDirection: 'row' }}>
                      <MaterialCommunityIcons
                        name="clock"
                        size={17}
                        color="#BFC0C3"
                      />
                      <Text style={[styles.txt, { marginLeft: 5, fontSize: 15 }]}>{item.time1} - {item.time2}</Text>
                    </View>
                  </View>

                  <View style={styles.btnView}>
                    {/* <TouchableOpacity style={[styles.btn, { backgroundColor: '#BAC7CE', margin: 6 }]} onPress={() => navigation.navigate('details', {details:item})}>
                    <Text style={{ color: 'white' }}>View Details</Text>
                  </TouchableOpacity> */}
                    <TouchableOpacity style={[styles.btn, { backgroundColor: '#336B99', margin: 6 }]} onPress={() => navigation.navigate('details', { details: item })}>
                      <Text style={{ color: 'white' }}>View Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            ))}

          </View>
        )}

        <View style={{ padding: 40 }}>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white'
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
  topBar: {
    backgroundColor: 'white',
    height: 60,
    padding: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
    paddingTop: 13,
    marginHorizontal: 10

  },
  topBarContent: {
    flexDirection: 'row',
    marginTop: 15,
    marginRight: -30
  },
  menuicon:{
    backgroundColor:'#DDDDDF',
    padding:5,
    borderRadius:30,
    fontSize: 20

  },
  profile: {
    flexDirection: 'row',
  },
  userIcon: {
    backgroundColor: '#DDDDDF',
    padding: 10,
    borderRadius: 20,
    fontSize: 15,
    marginTop: -5
  },
  handwaveIcon: {
    width: '18%',
    height: '45%',
    marginTop: 2
  },
  lightTxt: {
    color: '#9C9D9F'
  },
  banner: {
    margin: 10,
    marginTop: 60,
    borderRadius: 10,
    backgroundColor: '#E0E1E3',
    padding: 20,
    height: 130
  },
  bannerImg: {
    position: 'absolute',
    width: '45%',
    height: '25%',
    zIndex: 2,
    marginTop:33
  },
  searchContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'row',
    marginTop: -20
  },
  searchField: {
    borderWidth: 1,
    borderColor: '#ADAFB5',
    borderRadius: 20,
    width: '80%',
    textAlign: 'center',
    margin: 10
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
    fontWeight: 'bold'
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
  caption: {
    borderWidth: 1,
    borderColor: '#EBE7E6',
    borderRadius: 10,
    marginTop: -28,
    borderTopWidth: 0,
    margin: -2,
    marginBottom: 20
  },

});

