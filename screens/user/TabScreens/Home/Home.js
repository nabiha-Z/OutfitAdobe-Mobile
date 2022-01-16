
import React, { useState,useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, Dimensions, } from 'react-native'
import firebase from 'firebase/app';
import firebaseConfig from '../../../../Firebase/FirebaseConfig';
import { Entypo, Ionicons, EvilIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import ImagedCarouselCard from "react-native-imaged-carousel-card";

import view1 from "../../../../images/view1.jpg";
import view2 from "../../../../images/view2.jpg";
import view4 from "../../../../images/view4.jpg";
import view5 from "../../../../images/view5.jpg";

import education from "../../../../images/education.jpg";
import health from "../../../../images/health.jpg";
import beauty from "../../../../images/beauty.jpeg";
import legal from "../../../../images/legal1.jpg";

export default function Home({ route, navigation }) {

const db=firebase.firestore();
  const auth = firebase.auth();
  const [searchTxt, setSearchField] = useState("");
  const [searchVisible, setsearchVisible] = useState(false);
  const [isSelected, setSelected] = useState(false);
  const [check,setcheck]=useState(true);
  const [images, setimages] = useState([view1, view2, view4, view5]);
  const [categories, setcategories] = useState([{ title: "Education", count: 5, img: education }, { title: "Health", count: 5, img: health }, { title: "Legal", count: 5, img: legal }, { title: "Beauty", count: 5, img: beauty }])
  const [Items, setItems] = useState([])
  useEffect(()=>{
   db.collection('services').get().then(
        
        (data)=>{
            var temp=[];
            data.docs.map(
                (data1)=>{
                   temp.push(data1.data());
                    
                }
               
            )
            setItems(temp);    
        }
    )

   },[check])
  console.log(auth.currentUser.displayName);
  const SCREEN_WIDTH = Dimensions.get('window').width;
  console.log("width:", SCREEN_WIDTH)
  
  navigation.setOptions({
    headerLeft: null
  })


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
          style={{ marginTop: 25 }} />
        <Text style={{ color: '#8D94AA', fontSize: 20, marginTop: 25 }}>Q Plus</Text>
        {!searchVisible ?
          <TouchableOpacity onPress={() => setsearchVisible(true)}>
            <Ionicons
              name="search"
              size={25}
              color="#BFC0C3"
              style={{ marginTop: 25 }}
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

      <ScrollView>
        <Text style={styles.heading}>
          Popular Searches
        </Text>

        <View style={{ flexDirection: 'row' }}>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {Items.map((item, key) =>
            (
              <TouchableOpacity onPress={() => navigation.navigate('details', {details:item})} activeOpacity={0.7} key={key}>
                <ImagedCarouselCard
                  text={item.name}
                  width={200}
                  height={280}
                  shadowColor="#051934"
                  source={{uri:item.img}}
                  style={{ margin: 10 }}

                />
              </TouchableOpacity>
            )
            )}

          </ScrollView>

        </View>

        {/* <Text style={styles.heading}>Categories</Text>
        <Text style={styles.txt}>Find the best services you need by browsing through the categories</Text>
        <View style={{ flexDirection: 'row' }}> */}

          {/* <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {categories.map((item, key) =>
            (
              <ImagedCarouselCard
                text={item.title}
                width={100}
                height={150}
                shadowColor="#02060D"
                source={item.img}
                style={{ margin: 10 }}
                textStyle={{ fontSize: 15, color: 'white', textAlign: 'center' }}
                overlayHeight={40}
                overlayBackgroundColor="rgba(5, 15, 32,0.5)"

              />
            )
            )}

          </ScrollView>

        </View> */}
        <Text style={styles.heading}>Our Picks</Text>

        <View style={[styles.picksView]}>
          {Items.map((item, key) =>
          (
            <>
              <ImagedCarouselCard
                text={item.name}
                width={Math.round(SCREEN_WIDTH * 0.9)}
                height={380}
                shadowColor="#051934"
                source={{uri:item.img}}
                borderRadius={10}
                style={{ margin: 10, alignSelf: 'center', zIndex: 1 }}
                overlayBackgroundColor="rgba(5, 15, 32,0.0)"
              />
              <View style={{
                borderWidth: 1,
                borderColor: '#EBE7E6',
                borderRadius: 10,
                marginTop: -28,
                borderTopWidth: 0,
                margin: -2,
                marginBottom: 20
              }}>
                <View style={styles.description}>
                  <Text style={styles.subheading}>{item.name}</Text>
                  <TouchableOpacity onPress={() => favourite(item)} style={{ justifyContent: 'center' }}>
                    <Ionicons name="heart" color={item.fav ? '#F75451' : '#D3D3D3'} size={30}></Ionicons>
                  </TouchableOpacity>
                </View>
                <Text style={[styles.txt, { marginLeft: 6 }]}>{item.detail}</Text>
                <Text style={[styles.subheading, { marginLeft: 5, fontSize: 16 }]}>$ {item.price}</Text>

                <View style={{ flexDirection: 'row', margin: 15, justifyContent: 'space-between', marginRight: 20 }}>
                  <View style={{ flexDirection: 'row', }}>
                    <Ionicons
                      name="location"
                      size={17}
                      color="#BFC0C3"
                    />
                    <Text style={[styles.txt, { marginLeft: 5, fontSize: 15 }]}>{item.location}</Text>
                  </View>
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
                  <TouchableOpacity style={[styles.btn, { backgroundColor: '#BAC7CE', margin: 6 }]} onPress={() => navigation.navigate('details', {details:item})}>
                    <Text style={{ color: 'white' }}>View Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.btn, { backgroundColor: '#336B99', margin: 6 }]} onPress={()=>navigation.navigate('details',{details:item})}>
                    <Text style={{ color: 'white' }}>Book</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ))}

        </View>

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
    height: 90,
    padding: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10

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
  }
});

