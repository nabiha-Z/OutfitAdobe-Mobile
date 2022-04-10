
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import ImagedCarouselCard from "react-native-imaged-carousel-card";

export default function SearchedCategory({ route, navigation }) {

  const { category } = route.params;
  console.log("category: ", category)
  const [searchTxt, setSearchField] = useState("");
  const [isSelected, setSelected] = useState(false);
  const [fetchingData, setFetching] = useState(false);
  const [check, setcheck] = useState(true);
  //const [categories, setcategories] = useState([{ title: "Education", count: 5, img: education }, { title: "Health", count: 5, img: health }, { title: "Legal", count: 5, img: legal }, { title: "Beauty", count: 5, img: beauty }])
  const [Items, setItems] = useState([]);
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SCREEN_HEIGHT = Dimensions.get('window').height;

  const API_URL = 'https://outfit-adobe-server.herokuapp.com';

  useEffect(() => {
    setFetching(true);
    fetch(`${API_URL}/user/category-search`, {

      method: "POST",
      body: JSON.stringify({
        category: category.toLowerCase()
      }),

      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

      .then(async res => {
        try {

          const jsonRes = await res.json();

          if (jsonRes.message === true) {

            console.log("fetched");
            setItems(jsonRes.products);
            setFetching(false);

          }

        } catch (err) {
          console.log(err);
        };
      })
      .catch(err => {
        console.log("error: ", err);
      });

  }, [])

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
 {/* <MaterialIcons
            name="keyboard-arrow-left"
            size={30}
            color="#41403F"
            style={{ marginTop: 5 }} /> */}

  return (
   
    <View style={styles.container}>
      <View style={styles.topBar}>
       
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
        <TouchableOpacity
            activeOpacity={0.5}
            style={styles.searchIcon}
            onPress={() => { navigation.navigate('search-services', { searchText: searchTxt }) }}>
            <Ionicons
              name="search"
              size={25}
              color="#2A261B"
            />
          </TouchableOpacity>
          <TextInput name="searchfield" value={searchTxt} onChange={(txt) => setSearchField(txt)} style={styles.searchField} placeholder='Type your text' />
         
        </View>

      </View>


      
          <ScrollView contentContainerStyle={{ overflow: 'scroll' }}>

            {fetchingData ? <LoadingData /> : Items.length !== 0 ? (
              <View style={styles.picksView} >
                {Items.map((item, key) =>
                (
                  <>

                    <TouchableOpacity
                      key={key}
                      style={{ margin: 5 }}
                      onPress={() => navigation.navigate('Details', { details: item })} >
                      <ImagedCarouselCard
                        text=""
                        width={Math.round(SCREEN_WIDTH * 0.4)}
                        height={200}
                        source={{ uri: item.picture }}
                        borderRadius={4}
                        style={{ margin: 0 }}
                        overlayHeight={0}
                        overlayBackgroundColor="rgba(0,0,0,0.4)"
                        key={key}
                      />
                      <View style={[styles.caption, { width: SCREEN_WIDTH * 0.4 }]}>
                        <View style={styles.description}>
                          <Text style={styles.subheading}>{item.title}</Text>
                          <TouchableOpacity onPress={() => favourite(item)} style={{ justifyContent: 'center' }}>
                            <Ionicons name="heart" color={item.fav ? '#F75451' : '#D3D3D3'} size={25}></Ionicons>
                          </TouchableOpacity>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                          <Ionicons name="alert-circle-sharp" size={20} color={item.color} />
                          <Text style={[styles.txt]}>{item.color}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={[styles.subheading, { fontSize: 18, color: '#666668', marginBottom: 10 }]}>{item.price}/-</Text>
                          <MaterialIcons name="keyboard-arrow-right" size={17} color="#4B4949" style={styles.icon} />
                        </View>


                      </View>
                    </TouchableOpacity>
                  </>
                ))}

              </View>
            ) : (
        <View style={styles.container2}>
          <Text style={styles.heading}>No Matching Results Found</Text>
          <Image
            source={require('../../images/draw9.png')}
            style={{ width: '50%', height: '25%' }}
          />
        </View>
      )
      }
 </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#F9F9F9'
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
  topBar: {
    backgroundColor: '#F9F9F9',
    padding: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,

  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
 
  },
  searchField: {
    position:'relative',
    borderWidth: 1,
    backgroundColor:'white',
    borderColor: '#ADAFB5',
    borderRadius: 5,
    width: '80%',
    textAlign: 'center',
    margin: 10,
    height:35,
    padding:10
  },
  searchIcon: {
    marginTop: 10,
    padding: 5,
    zIndex:2,
    position:'absolute',
    marginLeft:-80,
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
    height: 40
  },
  picksView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',


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
  txt: {
    color: '#AAAAAB',
    paddingTop: 0,
    fontSize: 13,
    marginHorizontal: 10
  },
  subheading: {
    width: '70%',
    color: '#343537',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10
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
    width: '40%',
    height: 10
  },
  icon: {
    marginTop: 13,
  }
});

