import { StyleSheet, Text, View } from "react-native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { Button } from "react-native-elements";
import {useEffect, useState} from 'react';
import { getAuth, signOut } from "firebase/auth";
import { getAudio } from "../firebase/firestore/audio.ts";
import  { db } from "../firebaseApp";
import  { collection, doc } from "firebase/firestore";



const auth = getAuth();



const AudioScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();
  const [audio, setAudio] = useState([]);

// useEffect(() => {
//   const getAudio = async() => {
//   const data = await getAudio('c2t1XX4BwD3hhberGdQH');
//   console.log(data);
//   // setAudio(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
//   };

//   getAudio();
// }, []);


useEffect(() => {
  getAudio('c2t1XX4BwD3hhberGdQH').then((audio) => {
    setAudio(audio);
    console.log(audio.authors);
  })

  getAudio();
}, []);


  return (
    <View style={styles.container}>
      <Text>AudioFIREBASE_ Feed</Text>
      <Button
        title="Back"
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      />
      <Text>
       <div> 
       <h1> Authors: {audio.authors} </h1>
       <h1> Description : {audio.description} </h1>
       <h1> Title: {audio.title} </h1> 
       <h1> File: {audio.file} </h1>
       </div>
      </Text> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 10,
  },
});

export default AudioScreen;