
import React from 'react';
import {StyleSheet,View,Text} from 'react-native'
import firebase from 'firebase/app';
import firebaseConfig from '../../../../Firebase/FirebaseConfig';

export default function Home({route, navigation}) {
  const auth=firebase.auth();
  console.log(auth.currentUser.displayName)
  return (
    <View>
<Text style={{textAlign:'center',fontSize:20,padding:20,margin:20}}>
  Welcome back, {auth.currentUser.displayName}
</Text>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
});

