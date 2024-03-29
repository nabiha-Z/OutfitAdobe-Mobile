
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, Dimensions, ActivityIndicator } from 'react-native'
import { Entypo, Ionicons, AntDesign, MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import ImagedCarouselCard from "react-native-imaged-carousel-card";
import search from "../../../../images/searchIcon.png";
import jeans from "../../../../images/jeans2.png";
import shirt from "../../../../images/shirt.png";
import suit from "../../../../images/suit2.jpg";
import dress from "../../../../images/dress2.jpeg";
import handwave from "../../../../images/waving-hand.png";
import headerImg from '../../../../images/headerImg1.png';
import headerImg2 from '../../../../images/headerImg4.png';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ route, navigation }) {

  const [searchVisible, setsearchVisible] = useState(false);
  const [isSelected, setSelected] = useState(false);
  const [check, setcheck] = useState(true);
  const [categories, setcategories] = useState([{ title: "Jeans", img: jeans }, { title: "Shirts", img: shirt }, { title: "Suits", img: suit }, { title: "Dress", img: dress }])
  const [Items, setItems] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [products, setProducts] = useState([]);
  const [fetchingData, setFetching] = useState(false);
  const [favouriteItems, setFavourites] = useState([]);
  const [count, setCount] = useState(0);

  const API_URL = 'https://outfitadobe-server.herokuapp.com';
  // const API_URL = 'http://192.168.100.8:8000';
  const recommendation = async () => {

    var counts = await AsyncStorage.getItem('counts');
    fetch(`${API_URL}/user/recommendations`, {
      method: 'POST',
      body: JSON.stringify({
        counts
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        //console.log(response);

        const jsonRes = await res.json();

        if (jsonRes.message === true) {
          try {
            setProducts(jsonRes.products)
            // setCheck(!check)
          } catch (e) {
            return null;
          }
        } else {
          message.error(response.data.error)
        }
      })
      .catch(function (error) {

      });
  }

  const fecthProducts = async () => {
    await fetch(`${API_URL}/user/latestProducts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async res => {
        try {

          const jsonRes = await res.json();

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
  }


  useEffect(() => {

    setFetching(true);
    fecthProducts();
    recommendation();
  }, [])

  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SCREEN_HEIGHT = Dimensions.get('window').height;

  const LoadingData = () => {
    return (
      <>
        <ActivityIndicator size="large" color="#E7AA9E" />
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
  }

  const categorySearch = async (category) => {
    await fetch(`${API_URL}/user/category-search`, {

      method: "POST",
      body: JSON.stringify({
        category
      }),

      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

      .then(async res => {
        try {

          const jsonRes = await res.json();

          if (jsonRes.message === true) {
            //setItems(jsonRes.products);
            navigation.navigate('search-screen', { Items: jsonRes.products })

          }

        } catch (err) {
          console.log(err);
        };
      })
      .catch(err => {
        console.log("error: ", err);
      });

  }

  const searchText = async () => {
    await fetch(`${API_URL}/user/search`, {

      method: "POST",
      body: JSON.stringify({
        searchField
      }),

      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(async res => {
        try {

          const jsonRes = await res.json();

          if (jsonRes.message === true) {
            //setItems(jsonRes.products);
            navigation.navigate('search-screen', { Items: jsonRes.products })

          }

        } catch (err) {
          console.log(err);
        };
      })
      .catch(err => {
        console.log("error: ", err);
      });
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
        <TextInput style={styles.searchField} placeholder="Search products" value={searchField} onChangeText={(e) => setSearchField(e)} />
        <TouchableOpacity style={styles.searchBtn} onPress={() => searchText()}>
          <Image source={search} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>


      <ScrollView contentContainerStyle={{ overflow: 'scroll' }}>

        <View style={styles.header}>

          <Text style={[styles.heading, { fontSize: 15, color: '#7C7E7D' }]}>Find Outfits of your choice</Text>
        </View>

        {/* <Text style={[styles.heading, { fontSize: 40, marginTop: -20 }]}>Look</Text> */}

        <Animatable.View
          animation="fadeIn"
          duration={1000}
          delay={300} style={styles.banner}>
          <Animatable.View
            animation="fadeInLeft"
            duration={1500}
            delay={900}
          >
            <Text style={[styles.heading, { fontSize: 24, color: 'white', marginTop: -9, left: -14, textAlign: 'left' }]}>Try the New Look</Text>
            <View style={{ width: '65%' }}>
              <Text style={[styles.lightTxt, { color: '#F3EAEA', textAlign: 'justify', }]}>The forecast says that dress season has officially arrived! Spring forward with our swing, springy, dress shop.</Text>
            </View>
          </Animatable.View>
        </Animatable.View>
        <Animatable.View
          animation="fadeInDown"
          duration={2000}
          delay={1000}
          style={[styles.bannerImgContainer, { marginLeft: SCREEN_WIDTH * 0.56 }]}>
          <Image source={headerImg2} style={[styles.bannerImg]} />
        </Animatable.View>

        <Text style={styles.heading}>Categories</Text>
        <View style={styles.divider}></View>
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
                  onPress={() => categorySearch(item.title)}
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
        <Text style={styles.heading}>Recommeded For You</Text>
        <View style={[styles.divider, { width: '60%' }]}></View>
        <Text style={styles.txt}>Products that you might like</Text>
        <View style={{ flexDirection: 'row' }}>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {products.map((item, key) =>
            (
              <>
                <TouchableOpacity
                  key={key}
                  onPress={() => navigation.navigate('Details', { details: item })}
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
                    overlayHeight={35}
                    overlayBackgroundColor="rgba(197, 171, 171,0.6)"

                  />
                </TouchableOpacity>
              </>
            )
            )}

          </ScrollView>

        </View>
        <Text style={styles.heading}>Newest Products</Text>
        <View style={[styles.divider, { width: '50%' }]}></View>

        {fetchingData ? <LoadingData /> : (
          <View style={styles.picksView}>
            {Items.map((item, key) =>
            (
              <>
                <TouchableOpacity
                  key={key}
                  onPress={() => navigation.navigate('Details', { details: item })} >
                  <ImagedCarouselCard
                    text=""
                    width={Math.round(SCREEN_WIDTH * 0.74)}
                    height={300}
                    source={{ uri: item.picture }}
                    borderRadius={4}
                    overlayHeight={0}
                    overlayBackgroundColor="rgba(0,0,0,0.4)"
                    key={key}
                  />
                  <View style={[styles.caption, { width: SCREEN_WIDTH * 0.74 }]} >
                    <View style={styles.description}>
                      <Text style={styles.subheading}>{item.title}</Text>
                      <TouchableOpacity onPress={() => favourite(item)} style={{ justifyContent: 'center' }}>
                        <Ionicons name="heart" color={item.fav ? '#F75451' : '#D3D3D3'} size={30}></Ionicons>
                      </TouchableOpacity>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <Ionicons name="alert-circle-sharp" size={15} color={item.color} />
                      <Text style={[styles.txt]}>{item.color}</Text>
                    </View>

                    {/* <Text style={[styles.subheading, { fontSize: 18, color: '#666668', marginBottom: 10 }]}>{item.price}/-</Text> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                      <Text style={[styles.subheading, { fontSize: 18, color: '#666668', marginBottom: 10 }]}>{item.price}/-</Text>
                      <MaterialIcons name="keyboard-arrow-right" size={19} color="#4B4949" style={styles.icon} />
                    </View>
                  </View>
                </TouchableOpacity>
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
    backgroundColor: '#C5ABAB',
    padding: 20,
    height: 155
  },
  bannerImgContainer: {
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    marginTop: 26,
  },
  bannerImg: {
    width: '50%',
    height: 200,
    marginLeft: 2
  },
  searchContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'row',
    marginTop: -20,
    flexDirection: 'row',
    marginLeft: 10
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
    color: '#616362',
  },
  header: {
    width: '60%',
    marginHorizontal: 10,

  },
  txt: {
    color: '#AAAAAB',
    paddingTop: 0,
    fontSize: 13,
    marginHorizontal: 10
  },
  subheading: {
    color: '#343537',
    fontSize: 20,
    fontWeight: 'bold'
  },
  picksView: {

    padding: 5,
    margin: 5,
    alignItems: 'center'

  },
  elevation: {
    elevation: 10,
    shadowColor: '#52006A',
  },
  description: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginTop: -28,
    borderTopWidth: 0,
    marginBottom: 20,
    padding: 10
  },
  color: {
    width: 59,
    height: 50,
    borderRadius: 20
  },

  divider: {
    width: '35%',
    height: 2,
    backgroundColor: '#C5ABAB',
    margin: 10,
    marginHorizontal: 10,
    marginTop: 0,
    borderRadius: 5,

  },
  icon: {
    marginTop: 5,
  }

});

