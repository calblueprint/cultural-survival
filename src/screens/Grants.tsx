import { StyleSheet, Text, View } from "react-native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import React, {useEffect, useState} from 'react'
import { getAllGrants, addGrant, getGrant, deleteGrant, updateGrantTitle} from '../firebase/firestore/grants'; 
import { Grant } from "../types/schema"; 


const auth = getAuth();
const GrantsScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();

  const[grants, setGrants] = useState([] as Grant[]);
  const[grant, setGrant] = useState(null);

  const grantToAdd : any = { 
    category: "data.category",
    countries: ["Guatemala", "Bolivia"],
    deadline: new Date(),
    description: "data.description",
    subject: "data.subject",
    title: "data.title",
  }




  useEffect(() => {

    const tesGrantQueries = async () => {
      // getGrant test
      const grant = await getGrant("M9ytyRWHtepT9DhzrmZI");
      console.log("Dummy Grant:")
      console.log(grant);
      // getAllGrants test
      const data = await getAllGrants();
      console.log("Grant array: ");
      console.log(data)
      setGrants(data);
   
  
    };

    tesGrantQueries();
  }, [])
  
  

  return (
    <View style={styles.container}>

      <div>
        {grants.map((grant) => {

          return (
          <div key="{grant}">  
            <h6>Title: {grant.title}</h6>
            <h6>Countries: {grant.countries.join(", ")}</h6>
            <h6>Description: {grant.description}</h6>
            <h6>Subject: {grant.subject}</h6>
            <h6>Deadline: {grant.category}</h6>

            <button 
              onClick={() => {
                if (grant.grant_id != "M9ytyRWHtepT9DhzrmZI") {
                  deleteGrant(grant.grant_id);
                }
              }}>
                Delete Grant
            </button>

            <button 
              onClick={() => {
                if (grant.grant_id != "M9ytyRWHtepT9DhzrmZI") {
                  updateGrantTitle(grant.grant_id, "Updated Title");
                }
              }}>
                Update Grant
            </button>
          </div>
          );



           })}
      </div>

      <Text>Grants Feed</Text>
  
      <Button
        title="Back"
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      />

      <Button
        title="Add Grant"
        style={styles.button}
        onPress={() => addGrant(grantToAdd)}
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