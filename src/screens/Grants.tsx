import { StyleSheet, Text, View } from "react-native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import React, {useEffect, useState} from 'react'
import { getAllGrants, addGrant, getGrant, deleteGrant} from '../firebase/firestore/grants'; 
import { Grant } from "../types/schema"; 


const auth = getAuth();

const GrantsScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();
  const [grantTitle, setGrantTitle] = useState("");


  useEffect(() => {
    const testGetGrants = async () => {
      const grant = await getGrant("M9ytyRWHtepT9DhzrmZI");
      console.log(grant.title);
      setGrantTitle(grant.title);
      await deleteGrant("lv2ImxH4vJLxZEB7H3eZ");

    };

    testGetGrants();
  }, [])
  
  

  return (
    <View style={styles.container}>
      {grantTitle}

      <Text>Grants Feed</Text>
      <Button
        title="Back"
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      />
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

export default GrantsScreen;