
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, Dimensions, ActivityIndicator, } from 'react-native'
import { Entypo, Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import ImagedCarouselCard from "react-native-imaged-carousel-card";

import education from "../../../../images/education.jpg";
import search from "../../../../images/searchIcon.png";
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
  const [categories, setcategories] = useState([{ title: "Jeans", img: jeans }, { title: "Shirts", img: shirt }, { title: "Suits", img: suit }, { title: "Dresses", img: beauty }])
  const [Items, setItems] = useState([]);
  const [fetchingData, setFetching] = useState(false);
  const [favouriteItems, setFavourites] = useState([]);
  const [count, setCount] = useState(0);

  const API_URL = 'http://192.168.100.10:8000';
  useEffect(() => {

    setFetching(true);
    fetch(`${API_URL}/user/latestProducts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async res => {
        try {

          const jsonRes = await res.json();
          console.log("res: ", jsonRes)
          if (jsonRes.message === true) {
            setFetching(false);
            console.log("fetched")
            setItems(jsonRes.products);
          }
          // if (res.message === true) {
          //  console.log("Data:", data)
          // }


        } catch (err) {
          console.log(err);
        };
      })
      .catch(err => {
        console.log("error: ", err);
      });


  }, [])
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SCREEN_HEIGHT = Dimensions.get('window').height;

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
        <TouchableOpacity style={styles.searchBtn}>
          <Image source={search} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>


      <ScrollView contentContainerStyle={{ height: SCREEN_HEIGHT * 0.9 }}>

        <View style={styles.header}>

          <Text style={[styles.heading, { fontSize: 15, color: '#7C7E7D' }]}>Find Outfits of your choice</Text>
        </View>

        {/* <Text style={[styles.heading, { fontSize: 40, marginTop: -20 }]}>Look</Text> */}

        <View style={styles.banner}>
          <Text style={[styles.heading, { fontSize: 25, color: 'white', marginTop: -9, left: -14 }]}>Try the New Look</Text>
          <View style={{ width: '60%' }}>
            <Text style={[styles.lightTxt, { color: '#F7E7E4' }]}>The forecast says that dress season has officially arrived! Spring forward with our swing, springy, dress shop.</Text>
          </View>
        </View>

        <Image source={headerImg2} style={[styles.bannerImg, { marginLeft: SCREEN_WIDTH * 0.56 }]} />


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
                  key={key}
                  onPress={() => { navigation.navigate('search-screen', { category: item }) }}
                  activeOpacity={0.4}
                >

                  <ImagedCarouselCard
                    key={key}
                    text={item.title}
                    width={120}
                    height={150}
                    shadowColor="#02060D"
                    source={item.img}
                    style={{ margin: 10 }}
                    textStyle={{ fontSize: 15, color: 'white', textAlign: 'center' }}
                    overlayHeight={50}
                    overlayBackgroundColor="rgba(20, 20, 21,0.4)"

                  />
                </TouchableOpacity>
              </>
            )
            )}

          </ScrollView>

        </View>
        <Text style={styles.heading}>Newest Products</Text>
        {fetchingData ? <LoadingData /> : (
          <View style={styles.picksView}>
            {Items.map((item, key) =>
            (
              <>
                {console.log("item.title: ", item.title)}
                <ImagedCarouselCard
                  text={item.title}
                  width={Math.round(SCREEN_WIDTH * 0.84)}
                  height={360}
                  shadowColor="#051934"
                  source={{ uri: item.picture }}
                  borderRadius={10}
                  style={{ margin: 10 }}
                  textStyle={{ fontSize: 15, color: 'white', textAlign: 'center', fontWeight: 'bold' }}
                  overlayHeight={50}
                  overlayBackgroundColor="rgba(0,0,0,0.4)"
                  key={key}
                />
                <View style={styles.caption}>
                  <View style={styles.description}>
                    <Text style={styles.subheading}>{item.title}</Text>
                    <TouchableOpacity onPress={() => favourite(item)} style={{ justifyContent: 'center' }}>
                      <Ionicons name="heart" color={item.fav ? '#F75451' : '#D3D3D3'} size={30}></Ionicons>
                    </TouchableOpacity>
                  </View>
                  <Text style={[styles.txt, { marginLeft: 6 }]}>{item.color}</Text>
                  <Text style={[styles.subheading, { marginLeft: 5, fontSize: 16 }]}>$ {item.price}</Text>

                  <View style={{ flexDirection: 'row', margin: 15, justifyContent: 'space-between', marginRight: 20 }}>


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
  menuicon: {
    backgroundColor: '#DDDDDF',
    padding: 5,
    borderRadius: 30,
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
    color: '#6E6F6E',
    fontSize: 13
  },
  banner: {
    margin: 10,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#E7AA9E',
    padding: 20,
    height: 130
  },
  bannerImg: {
    position: 'absolute',
    width: '50%',
    height: '30%',
    zIndex: 2,
    marginTop: 9
  },
  searchContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'row',
    marginTop: -20,
    flexDirection: 'row',
  },
  searchField: {
    borderWidth: 1,
    borderColor: '#ADAFB5',
    borderRadius: 20,
    width: '85%',
    textAlign: 'center',
    margin: 10,
    marginLeft: 10
  },
  searchBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    padding: 15,
    backgroundColor: '#E7AA9E',
    borderRadius: 20,
    width: 15,
    height: 15,
    zIndex: 2,
    left: -30,
    top: -10



  },
  searchIcon: {
    position: 'absolute',
    borderRadius: 20,
    margin: 15,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    left: -9
  },
  heading: {
    fontSize: 20,
    marginTop: 10,
    padding: 10,
    fontWeight: 'bold',
    color: '#616362'
  },
  header: {
    width: '60%',
    marginHorizontal: 10,

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

