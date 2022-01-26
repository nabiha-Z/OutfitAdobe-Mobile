
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, Dimensions, } from 'react-native'
import firebase from 'firebase/app';
import { Entypo, Ionicons, EvilIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import ImagedCarouselCard from "react-native-imaged-carousel-card";

export default function SearchItems({ route, navigation }) {

  const { category } = route.params;
  const db = firebase.firestore();
  const auth = firebase.auth();
  const [searchTxt, setSearchField] = useState("");
  const [searchVisible, setsearchVisible] = useState(false);
  const [isSelected, setSelected] = useState(false);
  const [check, setcheck] = useState(true);
  //const [categories, setcategories] = useState([{ title: "Education", count: 5, img: education }, { title: "Health", count: 5, img: health }, { title: "Legal", count: 5, img: legal }, { title: "Beauty", count: 5, img: beauty }])
  const [Items, setItems] = useState([]);
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SCREEN_HEIGHT = Dimensions.get('window').height;
  
  useEffect(() => {
    db.collection('services').get().then(


      (data) => {
        var temp = [];
        data.docs.map(
          (data1) => {
            if (data1.data().category === category.title) {
              console.log("found:", data1.data().category)
              console.log("length:", Items.length());
              temp.push(data1.data());
            }


          }

        )
        setItems(temp);
        
      }
    )

  }, [])

  // navigation.setOptions({

  //   headerLeft: null
  // })


  const favourite = (item) => {

    console.log(item);
    const newData = Items.map((element) => {
      if (element.id === item.id) {
        var color, background;
        console.log("fav:", item.fav)
        const f = element.fav;
        console.log("f:", !f)
        return {
          ...element,
          fav: !element.fav
        };
      }
      return {
        ...element,
        fav: element.fav
      };

    });
    setItems(newData);
    console.log("fav:", newData.fav)
  }
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Ionicons
          name="location"
          size={25}
          color="#BFC0C3"
          style={{ marginTop: 5 }} />
        <Image
          source={require('../../images/mainlogo.png')}
          style={{ width: '40%', height: '60%', marginTop: 0 }}
        />
        {!searchVisible ?
          <TouchableOpacity onPress={() => setsearchVisible(true)}>
            <Ionicons
              name="search"
              size={25}
              color="#BFC0C3"
              style={{ marginTop: 5 }}
            />
          </TouchableOpacity>
          : <Text>       </Text>}
      </View>
      {searchVisible ?
        (<View style={styles.searchContainer}>
          <TextInput name="searchfield" value={searchTxt} onChange={(txt) => setSearchField(txt)} style={styles.searchField} placeholder='Type your text' />
          <TouchableOpacity>
            <Ionicons
              name="search"
              size={25}
              color="#BFC0C3"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setsearchVisible(false)}>
            <Entypo
              name="cross"
              size={25}
              color="red"
            />
          </TouchableOpacity>

        </View>) : console.log("false")}

      {Items.length!== 0 ? (
        <>
          <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.heading}>
              {category.title} Services
            </Text>
            <TouchableOpacity onPress={() => { navigation.pop() }} style={{ marginBottom: 30 }}>
              <Text>go back</Text>
            </TouchableOpacity>
            <View>


              {Items.map((item, key) =>
              (
                <TouchableOpacity onPress={() => navigation.navigate('details', { details: item })} activeOpacity={0.7} key={key}>
                  <ImagedCarouselCard
                    text={item.name}
                    width={SCREEN_WIDTH * 0.9}
                    height={SCREEN_WIDTH}
                    shadowColor="#051934"
                    source={{ uri: item.img }}
                    style={{ margin: 20 }}

                  />
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
    borderBottomColor: '#D6D8D9'

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
    width: '80%',
    textAlign: 'center',
    margin: 10
  },
  heading: {
    fontSize: 30,
    marginTop: 10,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center'
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
  }
});

