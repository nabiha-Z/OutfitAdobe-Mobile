
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import ImagedCarouselCard from "react-native-imaged-carousel-card";

export default function SearchedCategory({ route, navigation }) {

  const { Items } = route.params;
  console.log("category: ", Items.length)
  const [searchTxt, setSearchField] = useState("");
  const [products, setProducts] = useState([]);
  const [fetchingData, setFetching] = useState(false);
  const [check, setcheck] = useState(true);
  const [categories, setCategories] = useState([{ title: 'All', active: true }, { title: 'Men', active: false }, { title: 'Women', active: false }]);
  //const [categories, setcategories] = useState([{ title: "Education", count: 5, img: education }, { title: "Health", count: 5, img: health }, { title: "Legal", count: 5, img: legal }, { title: "Beauty", count: 5, img: beauty }])
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SCREEN_HEIGHT = Dimensions.get('window').height;

  const API_URL = 'https://outfit-adobe-server.herokuapp.com';

  useEffect(() => {
    setProducts(Items);
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

  const changeActive = (item) => {
    console.log("title: ", item.title);

    const newData = categories.map((element) => {
      if (item.title === element.title) {

        return {
          ...element,
          active: true
        };
      } else {
        return {
          ...element,
          active: false
        };

      }

    })

    setCategories(newData);

    if (item.title === 'All') {
      setProducts(Items);
    } else {

      const data = [];
      Items.map((element) => {
        if (item.title.toLowerCase() === element.category.toLowerCase() || item.title.toLowerCase() === element.main_category.toLowerCase()) {
          data.push(element);
        }
      })


      setProducts(data);
    }
  }

  const Tabs = ({ item }) => (
    <>
      <TouchableOpacity style={[styles.button, styles.elevation, { backgroundColor: item.active ? '#116E78' : 'white' }]} onPress={() => changeActive(item)}>
        <Text style={[styles.btnTxt, { color: item.active ? 'white' : '#8D8D90' }]}>{item.title}</Text>
      </TouchableOpacity>
    </>
  )

  return (

    <View style={styles.container}>
      <View style={styles.topBar}>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.categoryBtns}>
            {categories.map((item, key) => (
              <>
                <Tabs item={item} key={key} />
              </>
            ))}
          </View>
        </ScrollView>
        {/* <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
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
         
        </View> */}

      </View>



      <ScrollView contentContainerStyle={{ overflow: 'scroll' }}>

        {fetchingData ? <LoadingData /> : Items.length !== 0 ? (
          <View style={styles.picksView} >
            {products.map((item, key) =>
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
                      <Ionicons name="alert-circle-sharp" size={20} color={item.colorCode} />
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
    backgroundColor: 'white'
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
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
  categoryBtns: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    marginTop: -5,
    marginBottom: 5,
    marginLeft:30
},
  searchField: {
    position: 'relative',
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#ADAFB5',
    borderRadius: 5,
    width: '80%',
    textAlign: 'center',
    margin: 10,
    height: 35,
    padding: 10
  },
  searchIcon: {
    marginTop: 10,
    padding: 5,
    zIndex: 2,
    position: 'absolute',

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
});

