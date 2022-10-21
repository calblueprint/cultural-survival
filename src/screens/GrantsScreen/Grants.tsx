import { StyleSheet, Text, View } from "react-native";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import React, {useEffect, useState} from 'react'
import { getAllGrants, addGrant, getGrant, deleteGrant, updateGrantTitle} from '../../firebase/firestore/grants'; 
import  { onSnapshot} from "firebase/firestore";
import { Grant } from "../../types/schema"; 
import styles from "./styles";

const defaultGrant: Grant = {
  grant_id: "",
  category: "",
  countries: [],
  deadline: new Date(),
  description: "",
  subject: "",
  title: "",

}

const dummyGrant: any = {
  category: "dummy-category",
  countries: ["dummyCountry1", "dummyCountry2"],
  deadline: new Date(),
  description: "dummyDescription",
  subject: "dummySubject",
  title: "dummySubject",

}


const auth = getAuth();
const GrantsScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();
  const[grant, setGrant] = useState(defaultGrant);

  const[grants, setGrants] = useState([] as Grant[]); // will probs be the most helpful for displaying updates!! after updating just run get allgrants and setgrants


  useEffect(() => {

    const tesGrantQueries = async () => {
      // getGrant test
      const grant = await getGrant("M9ytyRWHtepT9DhzrmZI");
      console.log("Dummy Grant:")
      console.log(grant);
      // getAllGrants test
      const data = await getAllGrants();
      setGrants(data);
    };

    tesGrantQueries();
  }, [])

  const completeDelete = async (grantID : string) => {
    const newGrants = grants;

    setGrants(newGrants);

  }
  

  return (
    <View style={styles.container}>

      <div>
        {grants.map((grant) => {

          return (
          <div key={grant.grant_id}>  
            <h6>Title: {grant.title}</h6>
            <h6>Countries: {grant.countries.join(", ")}</h6>
            <h6>Description: {grant.description}</h6>
            <h6>Subject: {grant.subject}</h6>
            <h6>Deadline: {grant.category}</h6>

            <button 
              onClick={ () => {
                if (grant.grant_id != "M9ytyRWHtepT9DhzrmZI") {
                  deleteGrant(grant.grant_id);
                  completeDelete(grant.grant_id);
                }
              }}>
                Delete Grant
            </button>

            <button 
              onClick={async () => {
                if (grant.grant_id != "M9ytyRWHtepT9DhzrmZI") {
                  updateGrantTitle(grant.grant_id, "Updated Title");
                  const data = await getAllGrants();
                  setGrants(data);
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
        onPress={async () => {
          addGrant(dummyGrant);
          const data = await getAllGrants();
          setGrants(data);

        }} //just for testing
      />
    </View>
  );
};


export default GrantsScreen;
