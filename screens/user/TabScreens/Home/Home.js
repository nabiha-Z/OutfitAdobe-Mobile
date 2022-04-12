
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, Dimensions, ActivityIndicator, } from 'react-native'
import { Entypo, Ionicons, AntDesign, MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
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
  const [categories, setcategories] = useState([{ title: "Jeans", img: jeans }, { title: "TShirt", img: shirt }, { title: "Suit", img: suit }, { title: "Dress", img: beauty }])
  const [Items, setItems] = useState([]);
  const [fetchingData, setFetching] = useState(false);
  const [favouriteItems, setFavourites] = useState([]);
  const [count, setCount] = useState(0);

  const API_URL = 'https://outfit-adobe-server.herokuapp.com';
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


      <ScrollView contentContainerStyle={{ overflow: 'scroll' }}>

        <View style={styles.header}>

          <Text style={[styles.heading, { fontSize: 15, color: '#7C7E7D' }]}>Find Outfits of your choice</Text>
        </View>

        {/* <Text style={[styles.heading, { fontSize: 40, marginTop: -20 }]}>Look</Text> */}

        <View style={styles.banner}>
          <Text style={[styles.heading, { fontSize: 25, color: 'white', marginTop: -9, left: -14, textAlign: 'left' }]}>Try the New Look</Text>
          <View style={{ width: '60%' }}>
            <Text style={[styles.lightTxt, { color: '#F7E7E4', textAlign: 'justify', }]}>The forecast says that dress season has officially arrived! Spring forward with our swing, springy, dress shop.</Text>
          </View>
        </View>

        <Image source={headerImg2} style={[styles.bannerImg, { marginLeft: SCREEN_WIDTH * 0.56 }]} />

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
                  onPress={() => { navigation.navigate('search-screen', { category: item.title }) }}
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
                      <Ionicons name="alert-circle-sharp" size={20} color={item.color} />
                      <Text style={[styles.txt]}>{item.color}</Text>
                    </View>

                    {/* <Text style={[styles.subheading, { fontSize: 18, color: '#666668', marginBottom: 10 }]}>{item.price}/-</Text> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin:10 }}>
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
    backgroundColor: '#E7AA9E',
    padding: 20,
    height: 155
  },
  bannerImg: {
    position: 'absolute',
    width: '50%',
    height: 200,
    zIndex: 2,
    marginTop: 26,

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
    backgroundColor: '#FAC4BA',
    margin: 10,
    marginHorizontal: 10,
    marginTop: 0,
    borderRadius: 5,

  },
  icon:{
      marginTop:5,  
  }

});

